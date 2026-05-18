'use client'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { SerializedLinkNode, type DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as PayloadRichText,
} from '@payloadcms/richtext-lexical/react'
import { TypographyJSXConverters } from 'payload-lexical-typography/converters'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface SerializedImageNode {
  type: 'image'
  src: string
  altText: string
  width?: number
  height?: number
  maxWidth?: number
  children?: any[]
  version: number
}

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  ...TypographyJSXConverters,

  // Custom text converter with typed node
  text: ({ node }: { node: { text: string; style?: string | Record<string, string> } }) => {
    const { text, style } = node
    if (style) {
      const styleObj: React.CSSProperties = {}
      if (typeof style === 'string') {
        style.split(';').forEach((decl) => {
          const [prop, value] = decl.split(':').map((s) => s.trim())
          if (prop && value) {
            const camelProp = prop.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
            ;(styleObj as any)[camelProp] = value
          }
        })
      } else if (typeof style === 'object') {
        Object.assign(styleObj, style)
      }
      return <span style={styleObj}>{text}</span>
    }
    return <span>{text}</span>
  },

  blocks: {
    mediaBlock: ({ node }: { node: { fields: MediaBlockProps } }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...(node.fields as any)}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer
      />
    ),
    code: ({ node }: { node: { fields: CodeBlockProps } }) => (
      <CodeBlock className="col-start-2" {...node.fields} />
    ),
    image: ({ node }: { node: SerializedImageNode }) => {
      const { src, altText, width } = node
      return (
        <img
          src={src}
          alt={altText || ''}
          style={{
            width: width ? `${width}px` : 'auto',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      )
    },
  },
})

// … rest of the file (Props, normalizeEditorState, default export) remains EXACTLY the same

type Props = {
  data: any
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const normalizeEditorState = (data: any): DefaultTypedEditorState => {
  if (Array.isArray(data)) {
    return {
      root: {
        children: data,
        direction: null,
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    } as DefaultTypedEditorState
  }
  if (data && typeof data === 'object' && 'root' in data) {
    return data as DefaultTypedEditorState
  }
  return {
    root: {
      children: [],
      direction: null,
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  } as DefaultTypedEditorState
}

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, data, ...rest } = props
  const editorState = normalizeEditorState(data)

  return (
    <PayloadRichText
      converters={jsxConverters}
      data={editorState}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
