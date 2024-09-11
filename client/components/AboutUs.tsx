import Image from 'next/image'

export default function AboutUs() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-teal-600 animate-fade-in">About Us</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 animate-slide-in-left">
            <Image
              src="/placeholder.svg?height=300&width=500"
              alt="About Our School"
              width={500}
              height={300}
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="md:w-1/2 md:pl-8 animate-slide-in-right">
            <p className="text-lg mb-4 text-gray-700">
              Sky&apos;s the limit, we aim for the moon! Our school is dedicated to providing a nurturing environment where students can thrive academically, socially, and emotionally.
            </p>
            <p className="text-lg text-gray-700">
              With a focus on innovation and excellence, we prepare our students for the challenges of the future. Our experienced faculty and state-of-the-art facilities ensure that every student receives a world-class education tailored to their individual needs and aspirations.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}