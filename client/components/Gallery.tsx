'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const gallery = [
  { title: 'Academic Excellence', image: '/placeholder.svg?height=200&width=200', description: 'Rigorous curriculum designed to challenge and inspire students.' },
  { title: 'Sports Programs', image: '/placeholder.svg?height=200&width=200', description: 'Comprehensive athletics program promoting teamwork and physical fitness.' },
  { title: 'Arts & Culture', image: '/placeholder.svg?height=200&width=200', description: 'Rich cultural experiences fostering creativity and self-expression.' },
  { title: 'Technology Integration', image: '/placeholder.svg?height=200&width=200', description: 'Cutting-edge technology enhancing the learning experience.' },
  { title: 'Community Service', image: '/placeholder.svg?height=200&width=200', description: 'Opportunities for students to make a positive impact in their community.' },
  { title: 'Career Guidance', image: '/placeholder.svg?height=200&width=200', description: 'Personalized counseling to help students plan for their future.' },
]

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    let scrollInterval: NodeJS.Timeout | null = null

    if (scrollContainer) {
      const cloneContent = () => {
        const scrollContent = scrollContainer.firstElementChild
        if (scrollContent) {
          scrollContainer.appendChild(scrollContent.cloneNode(true))
        }
      }

      cloneContent()

      const scroll = () => {
        if (scrollContainer) {
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.scrollLeft = 0 // Reset scroll
          } else {
            scrollContainer.scrollLeft += 1 // Adjust speed here
          }
        }
      }

      scrollInterval = setInterval(scroll, 20) // Adjust scroll speed here

      return () => {
        if (scrollInterval) {
          clearInterval(scrollInterval)
        }
      }
    }
  }, [])

  return (
    <section id="gallery" className="py-16 bg-teal-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-teal-600">Our Gallery</h2>
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden whitespace-nowrap"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', // Fades the sides for smooth viewing
          }}
        >
          <div className="flex">
            {gallery.concat(gallery).map((service, index) => (
              <div key={index} className="flex-shrink-0 w-64 mx-4">
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden h-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-teal-600">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
