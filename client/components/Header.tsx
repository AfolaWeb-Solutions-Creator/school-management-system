import Image from 'next/image'
import Button from './Button'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-8 md:mb-0 md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down">Welcome to Our School</h1>
          <p className="text-xl mb-6 animate-fade-in-up">Your vision, we design, we build</p>
          <Button variant="secondary" className="animate-bounce">
            Learn More
          </Button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/Screenshot (91).png"
            alt="School Logo"
            width={300}
            height={300}
            className="rounded-full shadow-2xl animate-fade-in"
          />
        </div>
      </div>
    </header>
  )
}