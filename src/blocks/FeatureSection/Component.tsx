'use client'

import React from 'react'
import {
  Heart,
  FileText,
  Users,
  Star,
  Shield,
  Award,
  BadgeCheck,
  ThumbsUp,
  Globe,
  Briefcase,
  Handshake,
  type LucideIcon,
} from 'lucide-react'
import AnimateOnScroll from '@/components/AnimateOnScroll'

const ICON_MAP: Record<string, LucideIcon> = {
  heart: Heart,
  fileText: FileText,
  users: Users,
  star: Star,
  shield: Shield,
  award: Award,
  badgeCheck: BadgeCheck,
  thumbsUp: ThumbsUp,
  globe: Globe,
  briefcase: Briefcase,
  handshake: Handshake,
}

type FeatureSectionProps = {
  heading?: string
  headingColor?: string
  subheading?: string
  subheadingColor?: string
  backgroundColor?: string
  columns?: string
  features?: {
    icon: string
    title: string
    description: string
    titleColor?: string
    descriptionColor?: string
    cardBgColor?: string
    cardBorderColor?: string
    iconBgColor?: string
    iconColor?: string
    id?: string | null
  }[]
  enableAnimation?: boolean
  id?: string | null
  settings?: {
    // ← new: theme settings from the page
    primaryColor?: string
    secondaryColor?: string
    linkColor?: string
    // You could also include surface, border, muted if needed
  }
}

export const FeatureSectionBlockComponent: React.FC<FeatureSectionProps> = ({
  heading,
  headingColor,
  subheading,
  subheadingColor,
  backgroundColor,
  columns = '3',
  features,
  enableAnimation = true,
  settings,
}) => {
  if (!features || features.length === 0) return null

  const cols = parseInt(columns, 10)
  const gridCols = ['', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4']
  const colClass = gridCols[Math.min(cols, 4)] || 'grid-cols-3'

  // Resolve theme colours (fallback to CSS variables)
  const primary = settings?.primaryColor || 'var(--color-primary)'
  const secondary = settings?.secondaryColor || 'var(--color-secondary)'
  const textColor = 'var(--color-text)'
  const muted = 'var(--color-muted)'
  const surface = 'var(--color-surface)'
  const border = 'var(--color-border)'

  return (
    <section
      className="py-20"
      style={{
        backgroundColor: backgroundColor || 'var(--bg-body)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {heading && (
            <h2
              className="text-4xl md:text-5xl mb-4"
              style={{
                fontFamily: 'var(--font-heading)',
                color: headingColor || primary,
              }}
            >
              {heading}
            </h2>
          )}
          {subheading && (
            <p
              className="text-xl max-w-2xl mx-auto"
              style={{ color: subheadingColor || textColor }}
            >
              {subheading}
            </p>
          )}
        </div>

        <div className={`grid grid-cols-1 md:${colClass} gap-8`}>
          {features.map((feature, index) => {
            const IconComponent = ICON_MAP[feature.icon] || Heart

            const cardContent = (
              <div
                className="flex flex-col h-full p-8 rounded-lg border-2 hover:shadow-xl transition-shadow"
                style={{
                  backgroundColor: feature.cardBgColor || surface,
                  borderColor: feature.cardBorderColor || border,
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
                  style={{
                    backgroundColor: feature.iconBgColor || primary,
                  }}
                >
                  <IconComponent
                    className="w-8 h-8"
                    style={{ color: feature.iconColor || '#1A1A1A' }}
                  />
                </div>
                <h3
                  className="text-2xl mb-4 text-center"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: feature.titleColor || textColor,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className="leading-relaxed flex-1 text-center"
                  style={{ color: feature.descriptionColor || muted }}
                >
                  {feature.description}
                </p>
              </div>
            )

            return enableAnimation ? (
              <AnimateOnScroll
                key={feature.id || index}
                preset="fadeUp"
                delay={index * 0.1}
                className="h-full"
              >
                {cardContent}
              </AnimateOnScroll>
            ) : (
              <div key={feature.id || index} className="h-full">
                {cardContent}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeatureSectionBlockComponent
