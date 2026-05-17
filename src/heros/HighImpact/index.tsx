'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Page } from '@/payload-types'
import RichText from '@/components/RichText'
import { optimizedCloudinaryUrl } from '@/utilities/optimizedCloudinaryUrl'

export const HighImpactHero: React.FC<Page['hero']> = (props) => {
  const { setHeaderTheme } = useHeaderTheme()
  const { media, richText } = props as any

  // links can be absent or in either format
  const links = (props as any)?.links ?? []

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  // Safely extract the image URL from the media object
  let imgUrl = ''
  let imgAlt = ''
  if (media && typeof media === 'object' && 'url' in media) {
    imgUrl = (media as any).url || ''
    imgAlt = (media as any).alt || ''
  }

  const optimizedSrc = imgUrl ? optimizedCloudinaryUrl(imgUrl) : ''

  // Helper to get label, href, newTab from either flat or nested format
  const getLinkLabel = (item: any) => item?.label || item?.link?.label || ''
  const getLinkHref = (item: any) => {
    if (item?.url) return item.url
    if (item?.link?.url) return item.link.url
    if (item?.link?.type === 'reference' && item.link.reference?.slug)
      return `/${item.link.reference.slug}`
    return '#'
  }
  const getLinkNewTab = (item: any) => item?.newTab ?? item?.link?.newTab ?? false

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white w-full"
      data-theme="dark"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full min-h-[80vh]">
          {optimizedSrc && (
            <Image
              src={optimizedSrc}
              alt={imgAlt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}
        </div>
        {/* dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Centered Content Layer */}
      <div className="relative z-10 container mx-auto px-6 flex items-center justify-center min-h-[80vh]">
        <div className="max-w-[36.5rem] text-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-4">
              {links.map((item: any, i: number) => (
                <li key={i}>
                  <Link
                    href={getLinkHref(item)}
                    target={getLinkNewTab(item) ? '_blank' : undefined}
                    className="inline-block rounded-lg px-8 py-4 text-lg transition-all hover:shadow-lg"
                    style={{ backgroundColor: 'var(--color-primary)', color: '#1A1A1A' }}
                  >
                    {getLinkLabel(item)}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
