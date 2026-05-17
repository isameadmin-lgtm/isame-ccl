import React from 'react'
import RichText from '@/components/RichText'

export const LowImpactHero: React.FC<any> = (props) => {
  const { children, richText } = props

  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
