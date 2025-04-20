"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function Hero() {
  const { t } = useLanguage()

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-primary-50 dark:from-background dark:to-primary-950/20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary-800 dark:text-primary-400">
                {t("hero.title")}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">{t("hero.description")}</p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="font-josefin-sans" onClick={() => scrollToSection("mission")}>
                {t("hero.learnMore")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-josefin-sans"
                onClick={() => scrollToSection("contact")}
              >
                {t("hero.contactUs")}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=550&width=550"
              width={550}
              height={550}
              alt="Hero Image"
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
