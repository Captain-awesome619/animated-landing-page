'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import ReactLenis from 'lenis/react'

import Navbar from '../components/Navbar'
import HomePage from '../module/Home/page'
import LenisProvider from '@/components/LenisProvider'

export default function Home() {
  return (
    <>
      <LenisProvider>
        <HomePage />
      </LenisProvider>
    </>
  )
}
