'use client'

import React from 'react'
import Image from 'next/image'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import RichText from '@/components/RichText'

type TeamSectionProps = {
  backgroundColor?: string | null
  contentWidth?: 'contained' | 'full'
  image?: { url?: string; alt?: string } | string | null
  overlayGradientStart?: string | null
  overlayGradientEnd?: string | null
  overlayOpacity?: number | null
  heading?: string | null
  headingColor?: string | null
  content?: any
  quoteText?: string | null
  quoteBorderColor?: string | null
  quoteTextColor?: string | null
  enableAnimation?: boolean | null
  id?: string | null
  // Theme settings from parent page
  settings?: {
    primaryColor?: string
    secondaryColor?: string
    linkColor?: string
  }
}

export const TeamSectionBlockComponent: React.FC<TeamSectionProps> = ({
  backgroundColor,
  contentWidth = 'contained',
  image,
  overlayGradientStart,
  overlayGradientEnd,
  overlayOpacity = 0.1,
  heading,
  headingColor,
  content,
  quoteText,
  quoteBorderColor,
  quoteTextColor,
  enableAnimation = true,
  settings,
}) => {
  // Resolve theme colours
  const primary = settings?.primaryColor || 'var(--color-primary)'
  const secondary = settings?.secondaryColor || 'var(--color-secondary)'

  // Default gradient colours – use theme if admin left them empty
  const gradientStart = overlayGradientStart || primary
  const gradientEnd = overlayGradientEnd || secondary

  const imgUrl =
    typeof image === 'object' && image !== null && 'url' in image
      ? image.url
      : typeof image === 'string'
        ? image
        : undefined
  const imgAlt =
    typeof image === 'object' && image !== null && 'alt' in image ? image.alt || '' : ''

  const wrapper = (children: React.ReactNode) =>
    enableAnimation ? (
      <AnimateOnScroll preset="fadeUp">{children}</AnimateOnScroll>
    ) : (
      <>{children}</>
    )

  return (
    <section className="py-20" style={{ backgroundColor: backgroundColor || 'var(--bg-body)' }}>
      <div
        className={
          contentWidth === 'contained'
            ? 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
            : 'px-4 sm:px-6 lg:px-8'
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          {wrapper(
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              {imgUrl ? (
                <>
                  <Image
                    src={imgUrl}
                    alt={imgAlt}
                    width={800}
                    height={500}
                    className="w-full h-[500px] object-cover"
                    unoptimized
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
                      opacity: overlayOpacity ?? 0.1,
                    }}
                  />
                </>
              ) : (
                <div className="w-full h-[500px] bg-gray-200" />
              )}
            </div>,
          )}

          {/* Content */}
          {wrapper(
            <div>
              {heading && (
                <h2
                  className="text-4xl md:text-5xl mb-6"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: headingColor || primary,
                  }}
                >
                  {heading}
                </h2>
              )}

              {content && (
                <div
                  className="space-y-4 text-lg leading-relaxed"
                  style={{ color: 'var(--color-text)' }}
                >
                  <RichText data={content} enableGutter={false} enableProse={false} />
                </div>
              )}

              {quoteText && (
                <div
                  className="mt-8 p-6 rounded-lg"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: `2px solid ${quoteBorderColor || primary}`,
                  }}
                >
                  <p
                    className="text-lg italic"
                    style={{ color: quoteTextColor || 'var(--color-text)' }}
                  >
                    {quoteText}
                  </p>
                </div>
              )}
            </div>,
          )}
        </div>
      </div>
    </section>
  )
}

export default TeamSectionBlockComponent
