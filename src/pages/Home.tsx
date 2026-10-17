import { ContactStrip } from '../components/ContactStrip'
import { DownloadCta } from '../components/DownloadCta'
import { Hero } from '../components/Hero'
import { Locations } from '../components/Locations'
import { Partners } from '../components/Partners'
import { Services } from '../components/Services'

export function HomePage() {
  return (
    <>
      <Hero />
      <ContactStrip />
      <Services />
      <Partners />
      <Locations />
      <DownloadCta />
    </>
  )
}
