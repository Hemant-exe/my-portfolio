"use client"

import { useEffect } from 'react'

interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
}

// Simple analytics tracking
export function trackEvent({ action, category, label, value }: AnalyticsEvent) {
  // In a real implementation, you would send this to your analytics service
  // For now, we'll just log it and potentially send to Google Analytics
  console.log('Analytics Event:', { action, category, label, value })
  
  // Google Analytics 4 example
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track page views
export function trackPageView(url: string) {
  console.log('Page View:', url)
  
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: url,
    })
  }
}

// Hook for tracking portfolio interactions
export function useAnalytics() {
  useEffect(() => {
    // Track initial page load
    trackPageView(window.location.pathname)
  }, [])

  const trackProjectView = (projectTitle: string) => {
    trackEvent({
      action: 'view_project',
      category: 'Portfolio',
      label: projectTitle,
    })
  }

  const trackProjectClick = (projectTitle: string, type: 'github' | 'demo') => {
    trackEvent({
      action: 'click_project_link',
      category: 'Portfolio',
      label: `${projectTitle}_${type}`,
    })
  }

  const trackContactForm = (action: 'start' | 'submit' | 'error') => {
    trackEvent({
      action: `contact_form_${action}`,
      category: 'Contact',
    })
  }

  const trackNavigation = (section: string) => {
    trackEvent({
      action: 'navigate',
      category: 'Navigation',
      label: section,
    })
  }

  return {
    trackProjectView,
    trackProjectClick,
    trackContactForm,
    trackNavigation,
  }
}
