import Button from './Button'

const newsItems = [
  {
    title: 'Annual Science Fair Winners Announced',
    date: 'May 15, 2023',
    excerpt: 'Congratulations to all participants and winners of this year\'s Science Fair. The creativity and innovation displayed were truly inspiring.',
  },
  {
    title: 'New Sports Facility Opening Next Month',
    date: 'April 28, 2023',
    excerpt: 'Congratulations to all participants and winners of this year\'s Science Fair. The creativity and innovation displayed were truly inspiring.',
  },
  {
    title: 'Our Students Upcoming Art Exhibition ',
    date: 'April 10, 2023',
    excerpt: 'Congratulations to all participants and winners of this year\'s Science Fair. The creativity and innovation displayed were truly inspiring.',
  },
]

export default function News() {
  return (
    <section id="news" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-teal-600 animate-fade-in">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-teal-600">{item.title}</h3>
                <p className="text-emerald-600 text-sm mb-4">{item.date}</p>
                <p className="text-gray-700 mb-4">{item.excerpt}</p>
                <Button>Read more</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}