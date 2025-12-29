"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Briefcase, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Careers() {
  const { language, t } = useLanguage()

  const content = {
    en: {
      title: "Careers at Neues Leben",
      description: "Join our team and make a difference in healthcare.",
      noOpenings:
        "We currently don't have any open positions. Please check back later or send your resume to careers@neuesleben.uz for future opportunities.",
      openings: "Open Positions",
      positions: [],
      applyNow: "Apply Now",
      backToHome: "Back to Home",
      emailUs: "Send Resume",
      stayConnected: "Stay Connected",
      stayConnectedDesc: "Even though we don't have open positions right now, we're always looking for talented professionals to join our team in the future."
    },
    uz: {
      title: "Neues Leben'da karyera",
      description: "Jamoamizga qo'shiling va sog'liqni saqlash sohasida o'zgarish qiling.",
      noOpenings:
        "Hozirda ochiq lavozimlar yo'q. Iltimos, keyinroq qayta tekshiring yoki kelajakdagi imkoniyatlar uchun rezyumengizni careers@neuesleben.uz manziliga yuboring.",
      openings: "Ochiq lavozimlar",
      positions: [],
      applyNow: "Hozir murojaat qiling",
      backToHome: "Bosh sahifaga qaytish",
      emailUs: "Rezyume yuborish",
      stayConnected: "Bog'lanib turing",
      stayConnectedDesc: "Hozirda ochiq lavozimlar bo'lmasa-da, biz kelajakda jamoamizga qo'shilish uchun iste'dodli mutaxassislarni doimo qidiramiz."
    },
    ru: {
      title: "Карьера в Neues Leben",
      description: "Присоединяйтесь к нашей команде и вносите изменения в сфере здравоохранения.",
      noOpenings:
        "В настоящее время у нас нет открытых вакансий. Пожалуйста, проверьте позже или отправьте свое резюме на careers@neuesleben.uz для будущих возможностей.",
      openings: "Открытые вакансии",
      positions: [],
      applyNow: "Подать заявку",
      backToHome: "Вернуться на главную",
      emailUs: "Отправить резюме",
      stayConnected: "Оставайтесь на связи",
      stayConnectedDesc: "Хотя сейчас у нас нет открытых вакансий, мы всегда ищем талантливых специалистов для нашей команды в будущем."
    },
    de: {
      title: "Karriere bei Neues Leben",
      description: "Werden Sie Teil unseres Teams und bewirken Sie Veränderungen im Gesundheitswesen.",
      noOpenings:
        "Derzeit haben wir keine offenen Stellen. Bitte schauen Sie später wieder vorbei oder senden Sie Ihren Lebenslauf an careers@neuesleben.uz für zukünftige Möglichkeiten.",
      openings: "Offene Stellen",
      positions: [],
      applyNow: "Jetzt bewerben",
      backToHome: "Zurück zur Startseite",
      emailUs: "Lebenslauf senden",
      stayConnected: "Bleiben Sie in Kontakt",
      stayConnectedDesc: "Auch wenn wir derzeit keine offenen Stellen haben, suchen wir immer nach talentierten Fachleuten, die unserem Team in Zukunft beitreten möchten."
    },
  }

  const currentContent = content[language as keyof typeof content] || content.en

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {currentContent.backToHome}
          </Button>
        </Link>
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
            {currentContent.title}
          </h1>
          <p className="text-lg text-muted-foreground mt-2">{currentContent.description}</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">{currentContent.openings}</h2>

          {currentContent.positions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {currentContent.positions.map((position: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{position.title}</CardTitle>
                    <CardDescription>
                      {position.location} • {position.type}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{position.description}</p>
                    <Button>{currentContent.applyNow}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {/* No vacancies card */}
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-foreground">{currentContent.stayConnected}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{currentContent.stayConnectedDesc}</p>
                  <p className="text-muted-foreground">{currentContent.noOpenings}</p>
                  <a href="mailto:careers@neuesleben.uz">
                    <Button className="gap-2">
                      <Mail className="h-4 w-4" />
                      {currentContent.emailUs}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
