"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicy() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: April 20, 2025",
      introduction:
        "At Neues Leben, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.",
      sections: [
        {
          title: "1. Information We Collect",
          content:
            "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Identity Data, Contact Data, Technical Data, Usage Data, and Marketing and Communications Data.",
        },
        {
          title: "2. How We Use Your Information",
          content:
            "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: Where we need to perform the contract we are about to enter into or have entered into with you. Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests. Where we need to comply with a legal obligation.",
        },
        {
          title: "3. Data Security",
          content:
            "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.",
        },
        {
          title: "4. Your Legal Rights",
          content:
            "Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.",
        },
        {
          title: "5. Contact Us",
          content:
            "If you have any questions about this privacy policy or our privacy practices, please contact us at info@neuesleben.com.",
        },
        {
          title: "6. Medical Professional Verification",
          content:
            "To access professional medical content, we require verification of your status as a healthcare professional. We collect and store your IP address, User-Agent, and the confirmation text indefinitely for legal compliance and audit purposes.",
        },
      ],
      backToHome: "Back to Home",
    },
    uz: {
      title: "Maxfiylik siyosati",
      lastUpdated: "Oxirgi yangilanish: 20-aprel, 2025-yil",
      introduction:
        "Neues Leben kompaniyasida biz sizning shaxsiy ma'lumotlaringizni hurmat qilamiz va ularni himoya qilishga intilamiz. Ushbu maxfiylik siyosati sizga veb-saytimizga tashrif buyurganingizda shaxsiy ma'lumotlaringizni qanday himoya qilishimiz va sizning maxfiylik huquqlaringiz hamda qonun sizni qanday himoya qilishi haqida ma'lumot beradi.",
      sections: [
        {
          title: "1. Biz to'playdigan ma'lumotlar",
          content:
            "Biz siz haqingizda turli xil shaxsiy ma'lumotlarni to'plashimiz, foydalanishimiz, saqlashimiz va uzatishimiz mumkin, ularni quyidagicha guruhlarga ajratganmiz: Shaxsiy ma'lumotlar, Aloqa ma'lumotlari, Texnik ma'lumotlar, Foydalanish ma'lumotlari va Marketing va kommunikatsiya ma'lumotlari.",
        },
        {
          title: "2. Ma'lumotlaringizdan qanday foydalanamiz",
          content:
            "Biz sizning shaxsiy ma'lumotlaringizdan faqat qonun ruxsat bergan hollarda foydalanamiz. Ko'pincha, biz sizning shaxsiy ma'lumotlaringizdan quyidagi holatlarda foydalanamiz: Siz bilan tuzilgan yoki tuzilayotgan shartnomani bajarish uchun zarur bo'lganda. Bizning qonuniy manfaatlarimiz uchun zarur bo'lganda va sizning manfaatlaringiz va asosiy huquqlaringiz ushbu manfaatlardan ustun bo'lmaganda. Qonuniy majburiyatni bajarish uchun zarur bo'lganda.",
        },
        {
          title: "3. Ma'lumotlar xavfsizligi",
          content:
            "Biz sizning shaxsiy ma'lumotlaringizni tasodifan yo'qotilishi, ruxsatsiz foydalanilishi yoki kirilishi, o'zgartirilishi yoki oshkor qilinishining oldini olish uchun tegishli xavfsizlik choralarini ko'rdik. Bundan tashqari, biz sizning shaxsiy ma'lumotlaringizga kirishni faqat biznes ehtiyojlari bo'lgan xodimlar, agentlar, pudratchilar va boshqa uchinchi shaxslar bilan cheklaymiz.",
        },
        {
          title: "4. Sizning huquqiy huquqlaringiz",
          content:
            "Ma'lum sharoitlarda, siz ma'lumotlarni himoya qilish qonunlari bo'yicha shaxsiy ma'lumotlaringizga nisbatan huquqlarga egasiz, jumladan, kirish, tuzatish, o'chirish, cheklash, uzatish, qayta ishlashga e'tiroz bildirish, ma'lumotlarni ko'chirish huquqi va (qayta ishlashning qonuniy asosi rozilik bo'lgan hollarda) rozilikni qaytarib olish huquqi.",
        },
        {
          title: "5. Biz bilan bog'laning",
          content:
            "Agar sizda ushbu maxfiylik siyosati yoki bizning maxfiylik amaliyotimiz haqida savollaringiz bo'lsa, iltimos, info@neuesleben.com orqali biz bilan bog'laning.",
        },
        {
          title: "6. Tibbiy Mutaxassisni Tasdiqlash",
          content:
            "Professional tibbiy tarkibga kirish uchun biz sizning sog'liqni saqlash mutaxassisi ekanligingizni tasdiqlashni talab qilamiz. Biz qonuniy muvofiqlik va audit maqsadlari uchun IP manzilingiz, User-Agent va tasdiqlash matnini muddatsiz saqlaymiz.",
        },
      ],
      backToHome: "Bosh sahifaga qaytish",
    },
    ru: {
      title: "Политика конфиденциальности",
      lastUpdated: "Последнее обновление: 20 апреля 2025 г.",
      introduction:
        "В компании Neues Leben мы уважаем вашу конфиденциальность и стремимся защищать ваши личные данные. Эта политика конфиденциальности расскажет вам о том, как мы заботимся о ваших личных данных, когда вы посещаете наш веб-сайт, и расскажет о ваших правах на конфиденциальность и о том, как закон защищает вас.",
      sections: [
        {
          title: "1. Информация, которую мы собираем",
          content:
            "Мы можем собирать, использовать, хранить и передавать различные виды персональных данных о вас, которые мы сгруппировали следующим образом: Идентификационные данные, Контактные данные, Технические данные, Данные об использовании и Маркетинговые и коммуникационные данные.",
        },
        {
          title: "2. Как мы используем вашу информацию",
          content:
            "Мы будем использовать ваши персональные данные только тогда, когда это разрешено законом. Чаще всего мы будем использовать ваши персональные данные в следующих обстоятельствах: Когда нам необходимо выполнить договор, который мы собираемся заключить или уже заключили с вами. Когда это необходимо для наших законных интересов, и ваши интересы и основные права не перевешивают эти интересы. Когда нам необходимо соблюдать юридическое обязательство.",
        },
        {
          title: "3. Безопасность данных",
          content:
            "Мы приняли соответствующие меры безопасности для предотвращения случайной потери, использования или доступа к вашим персональным данным несанкционированным способом, их изменения или раскрытия. Кроме того, мы ограничиваем доступ к вашим персональным данным теми сотрудниками, агентами, подрядчиками и другими третьими сторонами, которым это необходимо знать по деловым причинам.",
        },
        {
          title: "4. Ваши законные права",
          content:
            "При определенных обстоятельствах у вас есть права в соответствии с законами о защите данных в отношении ваших персональных данных, включая право запрашивать доступ, исправление, удаление, ограничение, передачу, возражать против обработки, переносимость данных и (если законным основанием обработки является согласие) отзывать согласие.",
        },
        {
          title: "5. Свяжитесь с нами",
          content:
            "Если у вас есть какие-либо вопросы об этой политике конфиденциальности или наших практиках конфиденциальности, пожалуйста, свяжитесь с нами по адресу info@neuesleben.com.",
        },
        {
          title: "6. Верификация Медицинского Специалиста",
          content:
            "Для доступа к профессиональному медицинскому контенту мы требуем подтверждения вашего статуса медицинского работника. Мы собираем и храним ваш IP-адрес, User-Agent и текст подтверждения бессрочно для целей соблюдения законодательства и аудита.",
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
