import Navbar from '../components/Navbar'
import Header from '../components/Header'
import AboutUs from '../components/AboutUs'
import Services from '../components/Gallery'
import News from '../components/News'
import Admissions from '../components/Admissions'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-teal-50">
      <Navbar />
      <Header />
      <main className="space-y-16">
        <AboutUs />
        <Services />
        <News />
        <Admissions />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
