// Only works in client components
'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const wrapperRef = useRef<HTMLElement | null>(null)

  useGSAP(() => {
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    )
  }, [pathname])

  return <section ref={wrapperRef}>{children}</section>
}
