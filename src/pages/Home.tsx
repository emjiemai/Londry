import { ContactStrip } from '../components/ContactStrip'
import { Hero } from '../components/Hero'
import { Locations } from '../components/Locations'
import { Partners } from '../components/Partners'
import { Services } from '../components/Services'
import { VisitCta } from '../components/VisitCta'

export function HomePage() {
  return (
    <>
      <Hero />
      <ContactStrip />
      <Services />
      <Partners />
      <Locations />
      <VisitCta />
    </>
  )
}
