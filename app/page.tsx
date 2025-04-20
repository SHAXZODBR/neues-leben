import Hero from "@/components/hero"
import MissionSection from "@/components/mission-section"
import ValuesSection from "@/components/values-section"
import TeamSection from "@/components/team-section"
import ContactSection from "@/components/contact-section"
import ScrollToTop from "@/components/scroll-to-top"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Hero />
      <MissionSection />
      <ValuesSection />
      <TeamSection />
      <ContactSection />
      <ScrollToTop />
    </div>
  )
}
