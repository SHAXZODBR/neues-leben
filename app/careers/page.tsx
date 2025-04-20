"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Careers() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Careers at Neues Leben",
      description: "Join our team and make a difference in healthcare information.",
      noOpenings:
        "We currently don't have any open positions. Please check back later or send your resume to careers@neuesleben.com for future opportunities.",
      openings: "Open Positions",
      positions: [
        {
          title: "Medical Content Writer",
          location: "Tashkent, Uzbekistan",
          type: "Full-time",
          description:
            "We're looking for a Medical Content Writer to create accurate and engaging health-related content for our platforms.",
        },
        {
          title: "Digital Marketing Specialist",
          location: "Remote",
          type: "Full-time",
          description: "Join our marketing team to help spread awareness about health information and our services.",
        },
      ],
      applyNow: "Apply Now",
      backToHome: "Back to Home",
    },
    uz: {
      title: "Neues Leben'da karyera",
      description: "Jamoamizga qo'shiling va sog'liqni saqlash ma'lumotlarida o'zgarish qiling.",
      noOpenings:
        "Hozirda ochiq lavozimlar yo'q. Iltimos, keyinroq qayta tekshiring yoki kelajakdagi imkoniyatlar uchun rezyumengizni careers@neuesleben.com manziliga yuboring.",
      openings: "Ochiq lavozimlar",
      positions: [
        {
          title: "Tibbiy kontent yozuvchisi",
          location: "Toshkent, O'zbekiston",
          type: "To'liq stavka",
          description:
            "Biz platformalarimiz uchun aniq va qiziqarli sog'liq bilan bog'liq kontent yaratish uchun Tibbiy kontent yozuvchisini qidiryapmiz.",
        },
        {
          title: "Raqamli marketing mutaxassisi",
          location: "Masofaviy",
          type: "To'liq stavka",
          description:
            "Sog'liq haqidagi ma'lumotlar va xizmatlarimiz haqida xabardorlikni oshirishga yordam berish uchun marketing jamoamizga qo'shiling.",
        },
      ],
      applyNow: "Hozir murojaat qiling",
      backToHome: "Bosh sahifaga qaytish",
    },
    ru: {
      title: "Карьера в Neues Leben",
      description: "Присоединяйтесь к нашей команде и вносите изменения в информацию о здравоохранении.",
      noOpenings:
        "В настоящее время у нас нет открытых вакансий. Пожалуйста, проверьте позже или отправьте свое резюме на careers@neuesleben.com для будущих возможностей.",
      openings: "Открытые вакансии",
      positions: [
        {
          title: "Медицинский контент-писатель",
          location: "Ташкент, Узбекистан",
          type: "Полный рабочий день",
          description:
            "Мы ищем Медицинского контент-писателя для создания точного и увлекательного контента, связанного со здоровьем, для наших платформ.",
        },
        {
          title: "Специалист по цифровому маркетингу",
          location: "Удаленно",
          type: "Полный рабочий день",
          description:
            "Присоединяйтесь к нашей маркетинговой команде, чтобы помочь распространять информацию о здоровье и наших услугах.",
        },
      ],
      applyNow: "Подать заявку",
      backToHome: "Вернуться на главную",
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
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-800">
            {currentContent.title}
          </h1>
          <p className="text-lg text-gray-700 mt-2">{currentContent.description}</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary-700">{currentContent.openings}</h2>

          {currentContent.positions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {currentContent.positions.map((position, index) => (
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
            <p>{currentContent.noOpenings}</p>
          )}
        </div>
      </div>
    </div>
  )
}
