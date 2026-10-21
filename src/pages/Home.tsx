import { ContactStrip } from '../components/ContactStrip'
import { Faq } from '../components/Faq'
import { Hero } from '../components/Hero'
import { Locations } from '../components/Locations'
import { Partners } from '../components/Partners'
import { Services } from '../components/Services'
import { Videos } from '../components/Videos'
import { VisitCta } from '../components/VisitCta'

export function HomePage() {
  return (
    <>
      <Hero />
      <ContactStrip />
      <Services />
      <Partners />
      <Videos />
      <Locations />
      <Faq />
      <VisitCta />
    </>
  )
}
