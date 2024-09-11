import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
]

const quickLinks = [
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Admissions', href: '#admissions' },
  { name: 'News', href: '#news' },
  { name: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-emerald-600 to-teal-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">School Name</h3>
            <p className="text-sm mb-4">Empowering minds, shaping futures</p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-emerald-300 transition duration-300"
                  aria-label={link.name}
                >
                  <link.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-emerald-300 transition duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-sm mb-2">123 Education Lane, Cityville, State 12345</p>
            <p className="text-sm mb-2">Phone: (123) 456-7890</p>
            <p className="text-sm mb-2">Email: info@schoolname.edu</p>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Stay updated with our latest news and events.</p>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md sm:rounded-r-none bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 flex-grow mb-2 sm:mb-0"
              />
              <button
                type="submit"
                className="bg-emerald-600 text-white px-4 py-2 rounded-md sm:rounded-l-none hover:bg-emerald-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-emerald-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} School Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}