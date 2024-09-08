import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import DragDrop from '@/components/DragDrop'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  

  return (
    <div className='w-full sm:max-w-7xl mx-auto mt-10 sm:mt-20 bg-black'>
      <DragDrop/>
    </div>
  )
}
