import FeatureComparison from '@/components/FeatureComparison'
import NewsletterSignup from '@/components/NewsletterSignup'
import Timeline from '@/components/Timeline'
import React from 'react'

function WhyUs() {
  return (
    <div className="min-h-screen bg-background">
      <FeatureComparison />
      <Timeline />
      <NewsletterSignup />
    </div>
  )
}

export default WhyUs