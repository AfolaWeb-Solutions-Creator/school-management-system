import { Star } from 'lucide-react'
import Button from './Button'

const admissionInfo = [
  { 
    grade: 'Elementary (K-5)', 
    fee: '$8,000', 
    requirements: 'Age 5-11, Basic reading and math skills',
    rating: 4.8,
    description: 'Our elementary program focuses on building a strong foundation in core subjects while fostering creativity and curiosity.'
  },
  { 
    grade: 'Middle School (6-8)', 
    fee: '$10,000', 
    requirements: 'Age 11-14, Completed elementary education',
    rating: 4.9,
    description: 'The middle school curriculum is designed to challenge students and prepare them for the rigors of high school.'
  },
  { 
    grade: 'High School (9-12)', 
    fee: '$12,000', 
    requirements: 'Age 14-18, Completed middle school education',
    rating: 4.7,
    description: 'Our high school program offers a wide range of advanced courses and college preparation to ensure student success.'
  },
]

const RatingBar = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function Admissions() {
  return (
    <section id="admissions" className="py-16 bg-gradient-to-b from-emerald-50 to-teal-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-teal-600 animate-fade-in">Admissions</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-8 text-center animate-fade-in-up text-gray-700">
            Join our vibrant learning community! Our admissions process is designed to ensure that each student 
            is a perfect fit for our nurturing and challenging academic environment. We look for curious minds, 
            passionate learners, and students ready to make a positive impact.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {admissionInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-teal-600">{info.grade}</h3>
                  <RatingBar rating={info.rating} />
                  <p className="mt-4 text-gray-600">{info.description}</p>
                  <div className="mt-4">
                    <p className="text-sm text-emerald-600"><strong>Annual Tuition:</strong> {info.fee}</p>
                    <p className="text-sm text-gray-500"><strong>Requirements:</strong> {info.requirements}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 space-y-8">
            <h3 className="text-2xl font-semibold text-center text-teal-600">Our Admissions Process</h3>
            <ol className="list-decimal list-inside space-y-4 text-gray-700">
              <li className="animate-fade-in-left" style={{animationDelay: '100ms'}}>
                <strong>Application Submission:</strong> Complete our online application form and submit required documents.
              </li>
              <li className="animate-fade-in-left" style={{animationDelay: '200ms'}}>
                <strong>Entrance Exam:</strong> Participate in our grade-appropriate assessment to evaluate academic readiness.
              </li>
              <li className="animate-fade-in-left" style={{animationDelay: '300ms'}}>
                <strong>Interview:</strong> Meet with our admissions team for a personal interview and campus tour.
              </li>
              <li className="animate-fade-in-left" style={{animationDelay: '400ms'}}>
                <strong>Decision:</strong> Receive our admissions decision within two weeks of completing all steps.
              </li>
            </ol>
          </div>
          <div className="mt-12 text-center animate-bounce">
            <Button>Start Your Application</Button>
          </div>
        </div>
      </div>
    </section>
  )
}