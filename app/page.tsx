import HeroSection from "@/components/hero-section";
import MedicalJournalCTA from "@/components/medical-journal-cta";
import AboutSection from "@/components/about-section";
import MissionSection from "@/components/mission-section";
import ValuesSection from "@/components/values-section";
import TeamSection from "@/components/team-section";
import CultureSection from "@/components/culture-section";
import AchievementsSection from "@/components/achievements-section";
import PartnersSection from "@/components/partners-section";
import InfrastructureSection from "@/components/infrastructure-section";
import CoverageSection from "@/components/coverage-section";
import ContactSection from "@/components/contact-section";
import ScrollToTop from "@/components/scroll-to-top";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <HeroSection />
      <MedicalJournalCTA />
      <AboutSection />
      <MissionSection />
      <ValuesSection />
      <TeamSection />
      <CultureSection />
      <AchievementsSection />
      <PartnersSection />
      <InfrastructureSection />
      <CoverageSection />
      <ContactSection />
      <ScrollToTop />
    </div>
  );
}
