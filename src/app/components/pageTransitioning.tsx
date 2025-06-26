// Only works in client components
'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 0.5 })
  }, [pathname])

  return <>{children}</>
}
