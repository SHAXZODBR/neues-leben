"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsOfService() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Terms of Service",
      lastUpdated: "Last Updated: April 20, 2025",
      introduction:
        "Welcome to Neues Leben. These terms and conditions outline the rules and regulations for the use of our website.",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content:
            "By accessing this website, you accept these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use this website.",
        },
        {
          title: "2. License to Use Website",
          content:
            "Unless otherwise stated, Neues Leben and/or its licensors own the intellectual property rights in the website and material on the website. Subject to the license below, all these intellectual property rights are reserved.",
        },
        {
          title: "3. Limitations of Liability",
          content:
            "The information on this website is provided free-of-charge, and you acknowledge that it would be unreasonable to hold us liable for any inaccuracies or incompleteness in this information.",
        },
        {
          title: "4. Breaches of These Terms and Conditions",
          content:
            "Without prejudice to our other rights under these terms and conditions, if you breach these terms and conditions in any way, we may take such action as we deem appropriate to deal with the breach, including suspending your access to the website, prohibiting you from accessing the website, and/or bringing court proceedings against you.",
        },
        {
          title: "5. Variation",
          content:
            "We may revise these terms and conditions from time to time. The revised terms and conditions shall apply to the use of our website from the date of publication of the revised terms and conditions on our website.",
        },
      ],
      backToHome: "Back to Home",
    },
    uz: {
      title: "Xizmat ko'rsatish shartlari",
      lastUpdated: "Oxirgi yangilanish: 20-aprel, 2025-yil",
      introduction:
        "Neues Leben saytiga xush kelibsiz. Ushbu shartlar va qoidalar veb-saytimizdan foydalanish qoidalarini belgilaydi.",
      sections: [
        {
          title: "1. Shartlarni qabul qilish",
          content:
            "Ushbu veb-saytga kirib, siz ushbu shartlar va qoidalarni to'liq qabul qilasiz. Agar siz ushbu shartlar va qoidalar yoki ushbu shartlar va qoidalarning biron bir qismiga rozi bo'lmasangiz, siz ushbu veb-saytdan foydalanmasligingiz kerak.",
        },
        {
          title: "2. Veb-saytdan foydalanish uchun litsenziya",
          content:
            "Boshqacha ko'rsatilmagan bo'lsa, Neues Leben va/yoki uning litsenziya beruvchilari veb-sayt va veb-saytdagi materiallarga intellektual mulk huquqlariga ega. Quyidagi litsenziyaga muvofiq, barcha ushbu intellektual mulk huquqlari himoyalangan.",
        },
        {
          title: "3. Javobgarlik cheklovlari",
          content:
            "Ushbu veb-saytdagi ma'lumotlar bepul taqdim etiladi va siz ushbu ma'lumotlardagi har qanday noaniqliklar yoki to'liq emasligi uchun bizni javobgar deb hisoblash noto'g'ri bo'lishini tan olasiz.",
        },
        {
          title: "4. Ushbu shartlar va qoidalarning buzilishi",
          content:
            "Ushbu shartlar va qoidalar bo'yicha boshqa huquqlarimizga zarar yetkazmagan holda, agar siz ushbu shartlar va qoidalarni biron bir tarzda buzsangiz, biz buzilish bilan shug'ullanish uchun tegishli deb hisoblaydigan choralarni ko'rishimiz mumkin, jumladan, veb-saytga kirishingizni to'xtatish, veb-saytga kirishingizni taqiqlash va/yoki sizga qarshi sud jarayonlarini boshlash.",
        },
        {
          title: "5. O'zgarishlar",
          content:
            "Biz vaqti-vaqti bilan ushbu shartlar va qoidalarni qayta ko'rib chiqishimiz mumkin. Qayta ko'rib chiqilgan shartlar va qoidalar veb-saytimizda qayta ko'rib chiqilgan shartlar va qoidalar e'lon qilingan kundan boshlab veb-saytimizdan foydalanishga nisbatan qo'llaniladi.",
        },
      ],
      backToHome: "Bosh sahifaga qaytish",
    },
    ru: {
      title: "Условия использования",
      lastUpdated: "Последнее обновление: 20 апреля 2025 г.",
      introduction:
        "Добро пожаловать в Neues Leben. Эти условия определяют правила и положения для использования нашего веб-сайта.",
      sections: [
        {
          title: "1. Принятие условий",
          content:
            "Получая доступ к этому веб-сайту, вы полностью принимаете эти условия. Если вы не согласны с этими условиями или любой их частью, вы не должны использовать этот веб-сайт.",
        },
        {
          title: "2. Лицензия на использование веб-сайта",
          content:
            "Если не указано иное, Neues Leben и/или его лицензиары владеют правами интеллектуальной собственности на веб-сайт и материалы на веб-сайте. В соответствии с приведенной ниже лицензией все эти права интеллектуальной собственности защищены.",
        },
        {
          title: "3. Ограничения ответственности",
          content:
            "Информация на этом веб-сайте предоставляется бесплатно, и вы признаете, что было бы необоснованно привлекать нас к ответственности за любые неточности или неполноту этой информации.",
        },
        {
          title: "4. Нарушения этих условий",
          content:
            "Без ущерба для наших других прав по этим условиям, если вы нарушаете эти условия каким-либо образом, мы можем принять такие меры, которые мы считаем подходящими для решения проблемы нарушения, включая приостановление вашего доступа к веб-сайту, запрет вам доступа к веб-сайту и/или возбуждение судебного разбирательства против вас.",
        },
        {
          title: "5. Изменения",
          content:
            "Мы можем время от времени пересматривать эти условия. Пересмотренные условия применяются к использованию нашего веб-сайта с даты публикации пересмотренных условий на нашем веб-сайте.",
        },
      ],
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
          <p className="text-sm text-gray-500 mt-2">{currentContent.lastUpdated}</p>
        </div>

        <p className="text-lg text-gray-700">{currentContent.introduction}</p>

        <div className="space-y-6">
          {currentContent.sections.map((section, index) => (
            <div key={index} className="space-y-2">
              <h2 className="text-xl font-semibold text-primary-700">{section.title}</h2>
              <p className="text-gray-700">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
