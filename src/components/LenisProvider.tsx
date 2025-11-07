'use client'

import gsap from 'gsap'
import ReactLenis, { LenisRef, useLenis } from 'lenis/react'
import React, { ReactNode, useEffect, useRef } from 'react'

const LenisProvider = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <ReactLenis
      root
      options={{
        duration: 2,
        autoRaf: false,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  )
}

export default LenisProvider
