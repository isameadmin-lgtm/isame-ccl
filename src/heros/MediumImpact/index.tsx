import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { optimizedCloudinaryUrl } from '@/utilities/optimizedCloudinaryUrl'

export const MediumImpactHero: React.FC<any> = (props) => {
  const { media, richText } = props
  const links = props?.links ?? []

  // Safely extract image URL and alt from the media object
  let imgUrl = ''
  let imgAlt = ''
  if (media && typeof media === 'object' && 'url' in media) {
    imgUrl = (media as any).url || ''
    imgAlt = (media as any).alt || ''
  }

  const optimizedSrc = imgUrl ? optimizedCloudinaryUrl(imgUrl) : ''

  // Helper to get label, href, newTab from either flat or nested link format
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
    <div className="">
      <div className="container mb-8">
        {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
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

      <div className="container">
        {optimizedSrc && (
          <div>
            <div className="-mx-4 md:-mx-8 2xl:-mx-16">
              <Image
                src={optimizedSrc}
                alt={imgAlt}
                width={1920}
                height={1080}
                className="w-full h-auto object-cover"
                priority
                sizes="100vw"
              />
            </div>
            {media && typeof media === 'object' && (media as any).caption && (
              <div className="mt-3">
                <RichText data={(media as any).caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
