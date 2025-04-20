"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CookiePolicy() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Cookie Policy",
      lastUpdated: "Last Updated: April 20, 2025",
      introduction:
        "This Cookie Policy explains how Neues Leben uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.",
      sections: [
        {
          title: "1. What are cookies?",
          content:
            "Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.",
        },
        {
          title: "2. Why do we use cookies?",
          content:
            "We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as 'essential' or 'strictly necessary' cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our website.",
        },
        {
          title: "3. How can you control cookies?",
          content:
            "You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject.",
        },
        {
          title: "4. Types of cookies we use",
          content:
            "Essential website cookies: These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Performance cookies: These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. Functionality cookies: These cookies enable the website to provide enhanced functionality and personalization.",
        },
        {
          title: "5. Changes to this Cookie Policy",
          content:
            "We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.",
        },
      ],
      backToHome: "Back to Home",
    },
    uz: {
      title: "Kuki siyosati",
      lastUpdated: "Oxirgi yangilanish: 20-aprel, 2025-yil",
      introduction:
        "Ushbu Kuki siyosati Neues Leben veb-saytimizga tashrif buyurganingizda sizni tanib olish uchun kukilar va shunga o'xshash texnologiyalardan qanday foydalanishini tushuntiradi. U ushbu texnologiyalar nima ekanligini va nima uchun ulardan foydalanishimizni, shuningdek, ulardan foydalanishimizni nazorat qilish huquqlaringizni tushuntiradi.",
      sections: [
        {
          title: "1. Kukilar nima?",
          content:
            "Kukilar - bu veb-saytga tashrif buyurganingizda kompyuteringiz yoki mobil qurilmangizga joylashtiriladigan kichik ma'lumotlar fayllari. Kukilar veb-sayt egalari tomonidan o'z veb-saytlarini ishlashi yoki samaraliroq ishlashi uchun, shuningdek hisobot ma'lumotlarini taqdim etish uchun keng qo'llaniladi.",
        },
        {
          title: "2. Nima uchun kukilardan foydalanamiz?",
          content:
            "Biz bir necha sabablarga ko'ra birinchi tomon va uchinchi tomon kukilaridan foydalanamiz. Ba'zi kukilar veb-saytimiz ishlashi uchun texnik sabablarga ko'ra talab qilinadi va biz ularni 'muhim' yoki 'qat'iy zarur' kukilar deb ataymiz. Boshqa kukilar bizga veb-saytimizda tajribani yaxshilash uchun foydalanuvchilarimizning qiziqishlarini kuzatish va maqsad qilish imkonini beradi.",
        },
        {
          title: "3. Kukilarni qanday boshqarish mumkin?",
          content:
            "Siz kukilarni qabul qilish yoki rad etish to'g'risida qaror qabul qilish huquqiga egasiz. Siz Kuki roziligini boshqarish dasturida parametrlarni o'rnatish orqali kuki huquqlaringizni amalga oshirishingiz mumkin. Kuki roziligini boshqarish dasturi sizga qabul qiladigan yoki rad etadigan kukilar toifalarini tanlash imkonini beradi.",
        },
        {
          title: "4. Biz foydalanadigan kukilar turlari",
          content:
            "Muhim veb-sayt kukilari: Ushbu kukilar veb-saytimiz orqali sizga xizmatlar ko'rsatish va uning ba'zi xususiyatlaridan, masalan, xavfsiz joylarga kirishdan foydalanish uchun qat'iy zarurdir. Samaradorlik kukilari: Ushbu kukilar veb-saytimizning ishlashini va funksionalligini oshirish uchun ishlatiladi, lekin ulardan foydalanish uchun muhim emas. Funksionallik kukilari: Ushbu kukilar veb-saytga kengaytirilgan funksionallik va shaxsiylashtirish imkonini beradi.",
        },
        {
          title: "5. Ushbu Kuki siyosatiga o'zgartirishlar",
          content:
            "Biz vaqti-vaqti bilan ushbu Kuki siyosatini yangilashimiz mumkin, masalan, biz foydalanadigan kukilardagi o'zgarishlarni yoki boshqa operatsion, huquqiy yoki tartibga solish sabablari uchun. Shuning uchun, iltimos, kukilar va tegishli texnologiyalardan foydalanishimiz haqida xabardor bo'lish uchun ushbu Kuki siyosatini muntazam ravishda qayta ko'rib chiqing.",
        },
      ],
      backToHome: "Bosh sahifaga qaytish",
    },
    ru: {
      title: "Политика использования файлов cookie",
      lastUpdated: "Последнее обновление: 20 апреля 2025 г.",
      introduction:
        "Эта Политика использования файлов cookie объясняет, как Neues Leben использует файлы cookie и аналогичные технологии для распознавания вас при посещении нашего веб-сайта. В ней объясняется, что это за технологии и почему мы их используем, а также ваши права на контроль над их использованием.",
      sections: [
        {
          title: "1. Что такое файлы cookie?",
          content:
            "Файлы cookie — это небольшие файлы данных, которые размещаются на вашем компьютере или мобильном устройстве при посещении веб-сайта. Файлы cookie широко используются владельцами веб-сайтов для обеспечения работы своих веб-сайтов или для более эффективной работы, а также для предоставления отчетной информации.",
        },
        {
          title: "2. Почему мы используем файлы cookie?",
          content:
            "Мы используем собственные и сторонние файлы cookie по нескольким причинам. Некоторые файлы cookie необходимы по техническим причинам для работы нашего веб-сайта, и мы называем их 'необходимыми' или 'строго необходимыми' файлами cookie. Другие файлы cookie также позволяют нам отслеживать и нацеливаться на интересы наших пользователей для улучшения опыта на нашем веб-сайте.",
        },
        {
          title: "3. Как вы можете контролировать файлы cookie?",
          content:
            "Вы имеете право решать, принимать или отклонять файлы cookie. Вы можете реализовать свои права в отношении файлов cookie, установив свои предпочтения в Менеджере согласия на использование файлов cookie. Менеджер согласия на использование файлов cookie позволяет выбирать, какие категории файлов cookie вы принимаете или отклоняете.",
        },
        {
          title: "4. Типы файлов cookie, которые мы используем",
          content:
            "Необходимые файлы cookie веб-сайта: Эти файлы cookie строго необходимы для предоставления вам услуг через наш веб-сайт и для использования некоторых его функций, таких как доступ к защищенным областям. Файлы cookie производительности: Эти файлы cookie используются для повышения производительности и функциональности нашего веб-сайта, но не являются необходимыми для их использования. Функциональные файлы cookie: Эти файлы cookie позволяют веб-сайту обеспечивать расширенную функциональность и персонализацию.",
        },
        {
          title: "5. Изменения в этой Политике использования файлов cookie",
          content:
            "Мы можем время от времени обновлять эту Политику использования файлов cookie, например, для отражения изменений в используемых нами файлах cookie или по другим операционным, юридическим или нормативным причинам. Поэтому, пожалуйста, регулярно пересматривайте эту Политику использования файлов cookie, чтобы быть в курсе нашего использования файлов cookie и связанных технологий.",
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
