'use client'

import { useState } from 'react'
import Link from 'next/link'

const navItems = [
  { name: 'About Us', href: '#about' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'News', href: '#news' },
  { name: 'Admissions', href: '#admissions' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('')

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName)
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold">School Logo</Link>
          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`hover:text-emerald-200 transition duration-300 pb-1 border-b-2 ${
                  activeItem === item.name ? 'border-white' : 'border-transparent'
                }`}
                onClick={() => handleItemClick(item.name)}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/Portal" className="px-6 py-3 rounded-md font-semibold transition duration-300 shadow-md hover:shadow-lg text-sm md:text-base bg-gradient-to-r from-teal-600 to-emerald-500 text-white hover:from-teal-700 hover:to-emerald-600">
              Portal
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                ) : (
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-500 transition duration-300 ${
                  activeItem === item.name ? 'bg-emerald-600' : ''
                }`}
                onClick={() => handleItemClick(item.name)}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/Portal" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-500 transition duration-300 ${
                  activeItem === item.name ? 'bg-emerald-600">
              Portal
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}