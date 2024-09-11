import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-teal-600 to-emerald-500 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in">Get in Touch</h2>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <p className="text-lg mb-6">
              We&apos;re always here to answer your questions and provide more information about our school. 
              Whether you&apos;re a prospective student, parent, or community member, we&apos;d love to hear from you!
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6 animate-fade-in-left">
              <div className="flex items-center space-x-4">
                <MapPin className="w-8 h-8 text-emerald-200" />
                <div>
                  <h3 className="font-semibold text-xl mb-1">Our Location</h3>
                  <p>123 Education Lane, Cityville, State 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-8 h-8 text-emerald-200" />
                <div>
                  <h3 className="font-semibold text-xl mb-1">Phone</h3>
                  <p>(123) 456-7890</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-8 h-8 text-emerald-200" />
                <div>
                  <h3 className="font-semibold text-xl mb-1">Email</h3>
                  <p>info@ourschool.edu</p>
                </div>
              </div>
            </div>
            <div className="space-y-6 animate-fade-in-right">
              <div className="flex items-center space-x-4">
                <Clock className="w-8 h-8 text-emerald-200" />
                <div>
                  <h3 className="font-semibold text-xl mb-1">Office Hours</h3>
                  <p>Monday - Friday: 8:00 AM - 4:00 PM</p>
                  <p>Saturday: 9:00 AM - 1:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
              <div className="bg-emerald-600 p-6 rounded-lg shadow-lg">
                <h3 className="font-semibold text-xl mb-4">Connect With Us</h3>
                <p className="mb-4">Follow us on social media for the latest updates, events, and news about our school community.</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-emerald-200 hover:text-white transition duration-300">Facebook</a>
                  <a href="#" className="text-emerald-200 hover:text-white transition duration-300">Twitter</a>
                  <a href="#" className="text-emerald-200 hover:text-white transition duration-300">Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}