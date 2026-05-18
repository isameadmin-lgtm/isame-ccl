import type { Metadata } from 'next'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode, cookies } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import type { Post } from '@/payload-types'
import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Sidebar } from '@/components/Sidebar'
import { THEME_PRESETS } from '@/theme/themePresets'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  return posts.docs.map(({ slug }) => ({ slug }))
}

type Args = { params: Promise<{ slug?: string }> }

const getLocale = async (): Promise<'en' | 'es'> => {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('locale')
  return localeCookie?.value === 'es' ? 'es' : 'en'
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  const payload = await getPayload({ config: configPromise })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 100,
    sort: 'title',
  })
  const { docs: recentPosts } = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 5,
    where: { _status: { equals: 'published' } },
    sort: '-publishedAt',
    select: { title: true, slug: true, heroImage: true, publishedAt: true },
  })

  const locale = await getLocale()
  const settings = await payload.findGlobal({ slug: 'settings', locale })

  // ----- THEME PRESET INTEGRATION -----
  const themePreset = settings?.themePreset || 'isame'
  const preset = THEME_PRESETS[themePreset as keyof typeof THEME_PRESETS] ?? THEME_PRESETS.isame

  const primaryColor = settings?.colors?.primaryColor || preset?.colors?.primary || '#D4AF37'
  const secondaryColor = settings?.colors?.secondaryColor || preset?.colors?.secondary || '#A7A9AC'
  const linkColor = settings?.colors?.linkColor || preset?.colors?.link || primaryColor
  const bodyBgColor = settings?.colors?.bodyBgColor || preset?.colors?.background || '#1A1A1A'
  const textColor = settings?.colors?.textColor || preset?.colors?.text || '#FFFFFF'
  const headingFont =
    settings?.typography?.headingFontFamily ||
    preset?.typography?.headingFont ||
    'Playfair Display, serif'
  const bodyFont =
    settings?.typography?.bodyFontFamily || preset?.typography?.bodyFont || 'Inter, sans-serif'

  // Dynamic shadow using primary color
  const shadowStyle = {
    boxShadow: `1px 3px 9px 6px ${primaryColor}`,
  }

  return (
    <article
      className="pt-16 pb-16"
      style={{
        backgroundColor: bodyBgColor,
        fontFamily: bodyFont,
        color: textColor,
      }}
    >
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <PostHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <div className="prose-wrapper">
            <RichText
              className="max-w-[48rem] mx-auto p-[20px] mb-8 md:mb-0"
              data={post.content}
              enableGutter={false}
              style={shadowStyle} // ← dynamic shadow
            />
          </div>
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedPosts.filter((p) => typeof p === 'object')}
            />
          )}
        </div>
      </div>

      {/* Pass resolved theme colors to Sidebar */}
      <Sidebar
        categories={categories}
        recentPosts={recentPosts}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        linkColor={linkColor}
        bodyBgColor={bodyBgColor}
        headingFont={headingFont}
        bodyFont={bodyFont}
        textColor={textColor}
      />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })
  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] || null
})
