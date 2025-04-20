"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define the supported languages
export type Language = "en" | "uz" | "ru"

// Create a context type
type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// All translations
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.mission": "Mission",
    "nav.values": "Values",
    "nav.services": "Services",
    "nav.team": "Team",
    "nav.contact": "Contact",

    // Hero section
    "hero.title": "Neues Leben",
    "hero.description":
      "Ensuring health protection and improving the quality of life for the population by informing consumers about new trends in effective and accessible treatment. We are an informant in the healthcare industry committed to improving the nation's quality of life.",
    "hero.learnMore": "Learn More",
    "hero.contactUs": "Contact Us",

    // Mission section
    "mission.title": "Our Mission",
    "mission.description":
      "Ensuring health protection and improving the quality of life for the population of the country by informing consumers about new trends in effective and accessible treatment. The company applies modern approaches in its work and uses the latest developments to improve the health and well-being of patients.",
    "mission.approach.title": "Modern Approaches",
    "mission.approach.description":
      "The company applies modern approaches in its work and uses the latest developments to improve the health and well-being of patients.",
    "mission.care.title": "Patient-Centered Care",
    "mission.care.description":
      "We focus on providing information that puts patients first, ensuring they have access to the best treatment options.",
    "mission.quality.title": "Quality Assurance",
    "mission.quality.description":
      "We maintain high standards in all our information, ensuring accuracy and reliability for healthcare professionals and patients.",

    // Values section
    "values.title": "Our Values",
    "values.description": "The professional standards and principles that guide every employee of our company.",
    "values.people": "People",
    "values.people.description": "Healthy, energetic, self-developing, and happy individuals.",
    "values.openness": "Openness",
    "values.openness.description": "The sincere ability to adapt and receive new information for mutual development.",
    "values.fairness": "Fairness",
    "values.fairness.description": "Openness, honesty, and objectivity.",
    "values.ambition": "Ambition",
    "values.ambition.description": "Competitiveness and diligence.",
    "values.teamwork": "Teamwork",
    "values.teamwork.description": "Respect, cohesion, friendliness, mutual understanding, and tolerance.",
    "values.responsibility": "Responsibility",
    "values.responsibility.description": "Flexibility and discipline.",
    "values.improvement": "Self-Improvement",
    "values.improvement.description": "Professional and personal growth, engagement in sports.",

    // Services section
    "services.title": "Our Services",
    "services.description":
      "We provide comprehensive information and resources to help improve health and quality of life.",
    "services.health.title": "Health Information",
    "services.health.description": "Access to the latest research and information on health trends and treatments.",
    "services.wellness.title": "Wellness Programs",
    "services.wellness.description":
      "Comprehensive programs designed to improve overall wellness and quality of life through holistic approaches.",
    "services.education.title": "Educational Resources",
    "services.education.description":
      "Educational materials and resources to help patients understand their health conditions.",
    "services.learnMore": "Learn More",

    // Team section
    "team.title": "Our Team",
    "team.description": "Meet the dedicated professionals who make our mission possible.",
    "team.viewProfile": "View Profile",
    "team.management": "Management Team",
    "team.organization": "Organization Structure",
    "team.director": "Director",
    "team.medicalDirector": "Medical Director",
    "team.researchDirector": "Research Director",
    "team.communicationsManager": "Communications Manager",
    "team.financeManager": "Finance Manager",
    "team.chiefAccountant": "Chief Accountant",
    "team.marketingSpecialist": "Marketing Specialist",
    "team.productManager": "Product Manager",
    "team.legalConsultant": "Legal Consultant",

    // Contact section
    "contact.title": "Contact Us",
    "contact.description": "Have questions or need more information? Get in touch with our team.",
    "contact.info.title": "Contact Information",
    "contact.info.description": "Reach out to us through any of these channels.",
    "contact.address.title": "Address",
    "contact.address.value": "123 Health Avenue, Medical District, Tashkent, Uzbekistan",
    "contact.phone.title": "Phone",
    "contact.phone.value": "+998 71 123 4567",
    "contact.email.title": "Email",
    "contact.email.value": "info@neuesleben.com",
    "contact.hours.title": "Office Hours",
    "contact.hours.description": "When you can reach us.",
    "contact.hours.weekdays": "Monday - Friday",
    "contact.hours.weekdays.time": "9:00 AM - 6:00 PM",
    "contact.hours.saturday": "Saturday",
    "contact.hours.saturday.time": "10:00 AM - 4:00 PM",
    "contact.hours.sunday": "Sunday",
    "contact.hours.sunday.time": "Closed",
    "contact.message.title": "Send Us a Message",
    "contact.message.description": "Fill out the form below and we'll get back to you as soon as possible.",
    "contact.form.name": "Name",
    "contact.form.name.placeholder": "Your name",
    "contact.form.email": "Email",
    "contact.form.email.placeholder": "Your email",
    "contact.form.message": "Message",
    "contact.form.message.placeholder": "Your message",
    "contact.form.submit": "Send Message",

    // Footer
    "footer.description":
      "Neues Leben - an informant in the healthcare industry in the Republic of Uzbekistan, informing consumers about new trends in effective and accessible treatment to improve the quality of life of the nation.",
    "footer.company": "Company",
    "footer.mission": "Mission",
    "footer.values": "Values",
    "footer.team": "Team",
    "footer.careers": "Careers",
    "footer.services": "Services",
    "footer.health": "Health Information",
    "footer.wellness": "Wellness Programs",
    "footer.education": "Educational Resources",
    "footer.partnerships": "Partnerships",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.cookie": "Cookie Policy",
    "footer.rights": "All rights reserved.",
  },
  uz: {
    // Navigation
    "nav.home": "Asosiy",
    "nav.mission": "Maqsadimiz",
    "nav.values": "Qadriyatlarimiz",
    "nav.services": "Xizmatlar",
    "nav.team": "Jamoa",
    "nav.contact": "Aloqa",

    // Hero section
    "hero.title": "Neues Leben",
    "hero.description":
      "Iste'molchilarni samarali va qulay davolash usullari haqida xabardor qilish orqali aholining salomatligini himoya qilish va hayot sifatini yaxshilash. Biz sog'liqni saqlash sohasida millat hayot sifatini yaxshilashga sodiq axborot beruvchimiz.",
    "hero.learnMore": "Ko'proq ma'lumot",
    "hero.contactUs": "Biz bilan bog'lanish",

    // Mission section
    "mission.title": "Maqsadimiz",
    "mission.description":
      "Iste'molchilarni samarali va qulay davolash tendentsiyalari haqida xabardor qilish orqali mamlakat aholisining sog'lig'ini himoya qilish va hayot sifatini yaxshilash. Kompaniya o'z ishida zamonaviy yondashuvlarni qo'llaydi va bemorlarning sog'lig'i va farovonligini yaxshilash uchun eng so'nggi ishlanmalardan foydalanadi.",
    "mission.approach.title": "Zamonaviy yondashuvlar",
    "mission.approach.description":
      "Kompaniya o'z ishida zamonaviy yondashuvlarni qo'llaydi va bemorlarning sog'lig'i va farovonligini yaxshilash uchun eng so'nggi ishlanmalardan foydalanadi.",
    "mission.care.title": "Bemorga yo'naltirilgan g'amxo'rlik",
    "mission.care.description":
      "Biz bemorlarni birinchi o'ringa qo'yadigan ma'lumotlarni taqdim etishga, ularga eng yaxshi davolanish imkoniyatlariga ega bo'lishiga e'tibor qaratamiz.",
    "mission.quality.title": "Sifat kafolati",
    "mission.quality.description":
      "Biz barcha ma'lumotlarimizda yuqori standartlarni saqlaymiz, sog'liqni saqlash bo'yicha mutaxassislar va bemorlar uchun aniqlik va ishonchlilikni ta'minlaymiz.",

    // Values section
    "values.title": "Qadriyatlarimiz",
    "values.description": "Kompaniyamizning har bir xodimiga yo'l ko'rsatadigan kasbiy standartlar va tamoyillar.",
    "values.people": "Insonlar",
    "values.people.description": "Sog'lom, energiyaga to'la, o'zini rivojlantiruvchi va baxtli insonlar.",
    "values.openness": "Ochiqlik",
    "values.openness.description":
      "O'zaro rivojlanish uchun moslashish va yangi ma'lumotlarni qabul qilish qobiliyati.",
    "values.fairness": "Adolat",
    "values.fairness.description": "Ochiqlik, halollik va xolislik.",
    "values.ambition": "Intilish",
    "values.ambition.description": "Raqobatbardoshlik va tirishqoqlik.",
    "values.teamwork": "Jamoaviy ish",
    "values.teamwork.description": "Hurmat, yaxlitlik, do'stlik, o'zaro tushunish va bag'rikenglik.",
    "values.responsibility": "Mas'uliyat",
    "values.responsibility.description": "Moslashuvchanlik va intizom.",
    "values.improvement": "O'zini takomillashtirish",
    "values.improvement.description": "Kasbiy va shaxsiy o'sish, sport bilan shug'ullanish.",

    // Services section
    "services.title": "Xizmatlarimiz",
    "services.description":
      "Biz sog'liq va hayot sifatini yaxshilashga yordam berish uchun keng qamrovli ma'lumot va resurslarni taqdim etamiz.",
    "services.health.title": "Sog'liq haqida ma'lumot",
    "services.health.description":
      "Sog'liq tendentsiyalari va davolanish usullari bo'yicha eng so'nggi tadqiqotlar va ma'lumotlarga kirish.",
    "services.wellness.title": "Sog'lomlashtirish dasturlari",
    "services.wellness.description":
      "Umumiy salomatlik va hayot sifatini yaxlit yondashuvlar orqali yaxshilash uchun mo'ljallangan dasturlar.",
    "services.education.title": "Ta'lim resurslari",
    "services.education.description":
      "Bemorlarga o'z sog'liq holatlarini tushunishga yordam beruvchi ta'lim materiallari va resurslar.",
    "services.learnMore": "Ko'proq ma'lumot",

    // Team section
    "team.title": "Jamoamiz",
    "team.description": "Maqsadimizni amalga oshirishga hissa qo'shadigan fidoyi mutaxassislar bilan tanishing.",
    "team.viewProfile": "Profilni ko'rish",
    "team.management": "Boshqaruv guruhi",
    "team.organization": "Tashkiliy tuzilma",
    "team.director": "Direktor",
    "team.medicalDirector": "Tibbiyot direktori",
    "team.researchDirector": "Tadqiqot direktori",
    "team.communicationsManager": "Aloqa menejeri",
    "team.financeManager": "Moliya menejeri",
    "team.chiefAccountant": "Bosh buxgalter",
    "team.marketingSpecialist": "Marketing mutaxassisi",
    "team.productManager": "Mahsulot menejeri",
    "team.legalConsultant": "Yuridik maslahatchi",

    // Contact section
    "contact.title": "Biz bilan bog'lanish",
    "contact.description": "Savollaringiz bormi yoki qo'shimcha ma'lumot kerakmi? Jamoamiz bilan bog'laning.",
    "contact.info.title": "Aloqa ma'lumotlari",
    "contact.info.description": "Biz bilan quyidagi kanallar orqali bog'lanishingiz mumkin.",
    "contact.address.title": "Manzil",
    "contact.address.value": "Sog'liq ko'chasi 123, Tibbiyot tumani, Toshkent, O'zbekiston",
    "contact.phone.title": "Telefon",
    "contact.phone.value": "+998 71 123 4567",
    "contact.email.title": "Email",
    "contact.email.value": "info@neuesleben.com",
    "contact.hours.title": "Ish vaqtlari",
    "contact.hours.description": "Biz bilan qachon bog'lanishingiz mumkin.",
    "contact.hours.weekdays": "Dushanba - Juma",
    "contact.hours.weekdays.time": "9:00 - 18:00",
    "contact.hours.saturday": "Shanba",
    "contact.hours.saturday.time": "10:00 - 16:00",
    "contact.hours.sunday": "Yakshanba",
    "contact.hours.sunday.time": "Dam olish kuni",
    "contact.message.title": "Bizga xabar yuboring",
    "contact.message.description": "Quyidagi formani to'ldiring va biz sizga imkon qadar tezroq javob beramiz.",
    "contact.form.name": "Ism",
    "contact.form.name.placeholder": "Ismingiz",
    "contact.form.email": "Email",
    "contact.form.email.placeholder": "Elektron pochtangiz",
    "contact.form.message": "Xabar",
    "contact.form.message.placeholder": "Xabaringiz",
    "contact.form.submit": "Xabar yuborish",

    // Footer
    "footer.description":
      "Neues Leben - O'zbekiston Respublikasidagi sog'liqni saqlash sohasida axborot beruvchi, iste'molchilarni samarali va qulay davolash bo'yicha yangi tendentsiyalar haqida xabardor qilish orqali millat hayot sifatini yaxshilash.",
    "footer.company": "Kompaniya",
    "footer.mission": "Maqsadimiz",
    "footer.values": "Qadriyatlarimiz",
    "footer.team": "Jamoa",
    "footer.careers": "Karyera",
    "footer.services": "Xizmatlar",
    "footer.health": "Sog'liq haqida ma'lumot",
    "footer.wellness": "Sog'lomlashtirish dasturlari",
    "footer.education": "Ta'lim resurslari",
    "footer.partnerships": "Hamkorlik",
    "footer.legal": "Huquqiy",
    "footer.privacy": "Maxfiylik siyosati",
    "footer.terms": "Xizmat ko'rsatish shartlari",
    "footer.cookie": "Kuki siyosati",
    "footer.rights": "Barcha huquqlar himoyalangan.",
  },
  ru: {
    // Navigation
    "nav.home": "Главная",
    "nav.mission": "Миссия",
    "nav.values": "Ценности",
    "nav.services": "Услуги",
    "nav.team": "Команда",
    "nav.contact": "Контакты",

    // Hero section
    "hero.title": "Neues Leben",
    "hero.description":
      "Обеспечение защиты здоровья и улучшение качества жизни населения путем информирования потребителей о новых тенденциях в эффективном и доступном лечении. Мы являемся информатором в сфере здравоохранения, стремящимся улучшить качество жизни нации.",
    "hero.learnMore": "Узнать больше",
    "hero.contactUs": "Связаться с нами",

    // Mission section
    "mission.title": "Наша миссия",
    "mission.description":
      "Обеспечение защиты здоровья и улучшение качества жизни населения страны путем информирования потребителей о новых тенденциях в эффективном и доступном лечении. Компания применяет современные подходы в своей работе и использует новейшие разработки для улучшения здоровья и благополучия пациентов.",
    "mission.approach.title": "Современные подходы",
    "mission.approach.description":
      "Компания применяет современные подходы в своей работе и использует новейшие разработки для улучшения здоровья и благополучия пациентов.",
    "mission.care.title": "Пациентоориентированная забота",
    "mission.care.description":
      "Мы фокусируемся на предоставлении информации, которая ставит пациентов на первое место, обеспечивая им доступ к лучшим вариантам лечения.",
    "mission.quality.title": "Гарантия качества",
    "mission.quality.description":
      "Мы поддерживаем высокие стандарты во всей нашей информации, обеспечивая точность и надежность для медицинских работников и пациентов.",

    // Values section
    "values.title": "Наши ценности",
    "values.description":
      "Профессиональные стандарты и принципы, которыми руководствуется каждый сотрудник нашей компании.",
    "values.people": "Люди",
    "values.people.description": "Здоровые, энергичные, саморазвивающиеся и счастливые личности.",
    "values.openness": "Открытость",
    "values.openness.description":
      "Искренняя способность адаптироваться и воспринимать новую информацию для взаимного развития.",
    "values.fairness": "Справедливость",
    "values.fairness.description": "Открытость, честность и объективность.",
    "values.ambition": "Амбициозность",
    "values.ambition.description": "Конкурентоспособность и усердие.",
    "values.teamwork": "Командная работа",
    "values.teamwork.description": "Уважение, сплоченность, дружелюбие, взаимопонимание и толерантность.",
    "values.responsibility": "Ответственность",
    "values.responsibility.description": "Гибкость и дисциплина.",
    "values.improvement": "Самосовершенствование",
    "values.improvement.description": "Профессиональный и личностный рост, занятия спортом.",

    // Services section
    "services.title": "Наши услуги",
    "services.description":
      "Мы предоставляем комплексную информацию и ресурсы для улучшения здоровья и качества жизни.",
    "services.health.title": "Информация о здоровье",
    "services.health.description": "Доступ к новейшим исследованиям и информации о тенденциях и методах лечения.",
    "services.wellness.title": "Программы благополучия",
    "services.wellness.description":
      "Комплексные программы, разработанные для улучшения общего благополучия и качества жизни через целостные подходы.",
    "services.education.title": "Образовательные ресурсы",
    "services.education.description":
      "Образовательные материалы и ресурсы, помогающие пациентам понять свои состояния здоровья.",
    "services.learnMore": "Узнать больше",

    // Team section
    "team.title": "Наша команда",
    "team.description": "Познакомьтесь с преданными профессионалами, которые делают нашу миссию возможной.",
    "team.viewProfile": "Просмотреть профиль",
    "team.management": "Группа управления",
    "team.organization": "Организационная структура",
    "team.director": "Директор",
    "team.medicalDirector": "Медицинский директор",
    "team.researchDirector": "Директор по исследованиям",
    "team.communicationsManager": "Менеджер по коммуникациям",
    "team.financeManager": "Менеджер по финансам",
    "team.chiefAccountant": "Главный бухгалтер",
    "team.marketingSpecialist": "Специалист по маркетингу",
    "team.productManager": "Менеджер по продукту",
    "team.legalConsultant": "Юридический консультант",

    // Contact section
    "contact.title": "Связаться с нами",
    "contact.description": "Есть вопросы или нужна дополнительная информация? Свяжитесь с нашей командой.",
    "contact.info.title": "Контактная информация",
    "contact.info.description": "Связаться с нами можно через любой из этих каналов.",
    "contact.address.title": "Адрес",
    "contact.address.value": "Проспект Здоровья 123, Медицинский район, Ташкент, Узбекистан",
    "contact.phone.title": "Телефон",
    "contact.phone.value": "+998 71 123 4567",
    "contact.email.title": "Email",
    "contact.email.value": "info@neuesleben.com",
    "contact.hours.title": "Часы работы",
    "contact.hours.description": "Когда вы можете с нами связаться.",
    "contact.hours.weekdays": "Понедельник - Пятница",
    "contact.hours.weekdays.time": "9:00 - 18:00",
    "contact.hours.saturday": "Суббота",
    "contact.hours.saturday.time": "10:00 - 16:00",
    "contact.hours.sunday": "Воскресенье",
    "contact.hours.sunday.time": "Выходной",
    "contact.message.title": "Отправьте нам сообщение",
    "contact.message.description": "Заполните форму ниже, и мы свяжемся с вами как можно скорее.",
    "contact.form.name": "Имя",
    "contact.form.name.placeholder": "Ваше имя",
    "contact.form.email": "Email",
    "contact.form.email.placeholder": "Ваш email",
    "contact.form.message": "Сообщение",
    "contact.form.message.placeholder": "Ваше сообщение",
    "contact.form.submit": "Отправить сообщение",

    // Footer
    "footer.description":
      "Neues Leben - информатор в сфере здравоохранения в Республике Узбекистан, информирующий потребителей о новых тенденциях в эффективном и доступном лечении для повышения качества жизни нации.",
    "footer.company": "Компания",
    "footer.mission": "Миссия",
    "footer.values": "Ценности",
    "footer.team": "Команда",
    "footer.careers": "Карьера",
    "footer.services": "Услуги",
    "footer.health": "Информация о здоровье",
    "footer.wellness": "Программы благополучия",
    "footer.education": "Образовательные ресурсы",
    "footer.partnerships": "Партнерства",
    "footer.legal": "Правовая информация",
    "footer.privacy": "Политика конфиденциальности",
    "footer.terms": "Условия использования",
    "footer.cookie": "Политика использования файлов cookie",
    "footer.rights": "Все права защищены.",
  },
}

// Define the provider props
interface LanguageProviderProps {
  children: ReactNode
}

// Create the provider component
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Initialize the language state from localStorage if available
  const [language, setLanguageState] = useState<Language>("en")

  // Effect to load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "uz", "ru"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Function to set language and save to localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  // Return the provider with the value
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Create a hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
