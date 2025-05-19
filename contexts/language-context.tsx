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
    "nav.about": "About",
    "nav.mission": "Mission",
    "nav.values": "Values",
    "nav.team": "Team",
    "nav.culture": "Culture",
    "nav.achievements": "Achievements",
    "nav.partners": "Partners",
    "nav.infrastructure": "Infrastructure",
    "nav.coverage": "Coverage",
    "nav.contact": "Contact",

    // Hero section
    "hero.tagline": "We believe that health is the foundation of a happy life!",
    "hero.description":
      "NEUES LEBEN LLC is a distribution company operating in the pharmaceutical industry in Uzbekistan. The company was founded in 2018, starting its history with wholesale sales of medicines throughout the Republic of Uzbekistan.",
    "hero.description2":
      "Today, our business direction is direct distribution of medicines through our own sales department. Since 2019, the company has moved to a new level by signing direct contracts with foreign manufacturers.",
    "hero.learnMore": "Learn More",
    "hero.contactUs": "Contact Us",
    "hero.established": "Established in 2018",
    "hero.quality": "Quality, Timely Delivery, Reliable Partnership",

    // About section
    "about.title": "About Us",
    "about.subtitle": "Your reliable partner in the pharmaceutical industry",
    "about.founded": "Founded in 2018",
    "about.warehouse":
      "The warehouse received the highest rating for compliance with quality standards for warehouse facilities.",
    "about.paragraph1":
      "ООО 'NEUES LEBEN' – дистрибьюторская компания, осуществляющая свою деятельность в сфере фармацевтической индустрии на рынке Узбекистана. Компания 'NEUES LEBEN' была основана в 2018 году, начала свою историю с оптовых продаж лекарственных средств, с покрытием по всей Республики Узбекистан.",
    "about.paragraph2":
      "С 2019 года компания перешла на новый уровень, заключив прямые договора с зарубежными производителями, что позволило осуществлять ввоз и промоцию лекарственных средств высокого качества. Компания 'NEUES LEBEN' располагает складом, на котором осуществляется качественное хранение лекарственных препаратов.",
    "about.conclusion":
      "The main principles of our work are product quality, timely delivery, and reliable partnership!",

    // Mission section
    "mission.title": "Our Mission",
    "mission.paragraph1":
      "Ensuring the protection of health and improving the quality of life of the country's population by informing consumers about new trends in effective and affordable treatment.",
    "mission.paragraph2":
      "The company applies modern approaches in its work and uses the latest developments to improve the health and well-being of patients.",
    "mission.healthFocus": "We strive to improve the quality of life of the nation",
    "mission.protection": "Health Protection",
    "mission.protectionDesc": "We ensure access to quality medicines",
    "mission.community": "Community Focus",
    "mission.communityDesc": "We work for the benefit of society",
    "mission.care": "Patient Care",
    "mission.careDesc": "We use modern approaches to improve well-being",

    // Values section
    "values.title": "Our Values",
    "values.subtitle": "The principles that guide our company",
    "values.honesty.title": "Honesty",
    "values.honesty.description":
      "The fundamental value of our company. We believe in openness, transparency, and truthfulness in all our relationships - with clients, partners, employees, and society.",
    "values.professionalism.title": "Professionalism",
    "values.professionalism.description":
      "We constantly develop our skills and knowledge to provide quality services to clients and promptly respond to their requests.",
    "values.leadership.title": "Leadership",
    "values.leadership.description": "We focus on achieving ambitious goals and encourage leadership aimed at results.",
    "values.aspiration.title": "Aspiration",
    "values.aspiration.description":
      "We strive for success in business and help our clients and partners achieve success.",
    "values.support.title": "Support",
    "values.support.description":
      "We are a reliable partner and provide comprehensive support to achieve joint success.",

    // Team section
    "team.title": "Our Team",
    "team.companyPrefix": "At",
    "team.employeeCount": "work more than",
    "team.employeeSuffix": "highly qualified employees",
    "team.departmentsTitle": "Our departments include:",
    "team.departments.medical": "Team of medical representatives",
    "team.departments.foreign": "Foreign economic activity department",
    "team.departments.legal": "Legal department",
    "team.departments.sales": "Sales and marketing department",
    "team.departments.registration": "Medicine registration department",
    "team.departments.hr": "HR department",
    "team.departments.logistics": "Logistics department",
    "team.departments.customs": "Team of customs declarants",
    "team.departments.admin": "Administrative department",
    "team.teamSpirit":
      "Each employee strengthens the company's image as a reliable pharmaceutical distributor, ensuring high-quality service and a professional approach to work.",
    "team.gallery.title": "Meet Our Team",
    "team.gallery.memberDescription":
      "A dedicated professional with extensive experience in the pharmaceutical industry. Committed to our mission of improving health and quality of life through innovative solutions and reliable partnerships.",
    "team.gallery.showMore": "Show More",
    "team.gallery.showLess": "Show Less",

    // Culture section
    "culture.title": "Corporate Culture",
    "culture.paragraph1":
      "Our corporate culture is based on proven values and traditions. We support family values, healthy lifestyle, development, and learning.",
    "culture.paragraph2":
      "We are proud of our achievements in the market and the fact that our employees undergo internships abroad. Joint holidays, competitions, and modern forms of communication make us a cohesive team.",
    "culture.paragraph3": "Each employee strengthens the company's image as a reliable pharmaceutical distributor.",
    "culture.family.title": "Family Values",
    "culture.family.description": "We support and promote family values and healthy lifestyle",
    "culture.achievements.title": "Market Achievements",
    "culture.achievements.description": "We are proud of our accomplishments in the pharmaceutical market",
    "culture.internships.title": "International Experience",
    "culture.internships.description": "Our employees undergo internships abroad to enhance their skills",
    "culture.events.title": "Team Building",
    "culture.events.description": "Joint holidays and events make us a cohesive team",

    // Achievements section
    "achievements.title": "Our Achievements",
    "achievements.award": "Sales Leader of the Year",
    "achievements.description":
      "For the past four years, our team has held leading positions in the pharmaceutical industry, annually receiving the 'Sales Leader of the Year' award in the INSO group of companies.",
    "achievements.growth": "Team Growth",
    "achievements.growthDescription":
      "The growth of our team from 14 to 135 people is clear evidence of the success of our activities in the pharmaceutical industry and the growing demand for our products.",
    "achievements.growthChart": "Team Growth Dynamics",
    "achievements.award1.title": "Sales Leader 2022",
    "achievements.award1.year": "INSO Group",
    "achievements.award2.title": "Best Distributor 2023",
    "achievements.award2.year": "Pharmaceutical Association",
    "achievements.award3.title": "Quality Excellence 2024",
    "achievements.award3.year": "Industry Recognition",

    // Partners section
    "partners.title": "Our Partners",
    "partners.subtitle": "We collaborate with leading pharmaceutical manufacturers worldwide",
    "partners.countries": "We collaborate with:",
    "partners.southKorea": "South Korea",
    "partners.poland": "Poland",
    "partners.china": "China",
    "partners.india": "India",
    "partners.products": "Exclusive Products",
    "partners.productsDescription": "More than 50 types of exclusive drugs from foreign and local production",
    "partners.product": "Product",

    // Infrastructure section
    "infrastructure.title": "Our Infrastructure",
    "infrastructure.subtitle": "NEUES LEBEN has a modern logistics infrastructure",
    "infrastructure.warehouse.title": "Modern Warehouse",
    "infrastructure.warehouse.description":
      "The company has a warehouse that meets GDP (Good Distribution Practice) standards.",
    "infrastructure.warehouse.standards": "Highest quality standards compliance",
    "infrastructure.warehouse.size": "Warehouse area: 10,000 square meters (10,000 m²)",
    "infrastructure.logistics.title": "Advanced Logistics",
    "infrastructure.logistics.description":
      "Vehicles are equipped with modern refrigeration units to ensure safe and quality transportation of products with the required temperature regime.",
    "infrastructure.logistics.temperature": "Temperature control at all stages",
    "infrastructure.logistics.modern": "Modern Fleet",
    "infrastructure.logistics.efficient": "Efficient delivery across the country",

    // Coverage section
    "coverage.title": "Our Coverage",
    "coverage.subtitle": "We carry out sales throughout Uzbekistan",
    "coverage.description":
      "We carry out sales throughout Uzbekistan, ensuring reliable supply of medicines to all regions of the country.",
    "coverage.offices": "Regional Offices",
    "coverage.officesDescription":
      "In all regions of the country, we have distribution offices under the leadership of regional managers.",
    "coverage.mapTitle": "Nationwide Distribution",
    "coverage.mapDescription": "Ensuring access to quality medicines across Uzbekistan",
    "coverage.cooperation": "We are open for mutually beneficial and long-term cooperation",

    // Contact section
    "contact.title": "Contact Us",
    "contact.subtitle": "We are open for mutually beneficial and long-term cooperation",
    "contact.form.title": "Send Us a Message",
    "contact.form.name": "Name",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.email": "Email",
    "contact.form.emailPlaceholder": "Your email",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder": "Your message",
    "contact.form.submit": "Send Message",
    "contact.info.title": "Contact Information",
    "contact.info.address.title": "Address",
    "contact.info.address.value": "Tashkent, Uzbekistan",
    "contact.info.phone.title": "Phone",
    "contact.info.phone.value": "+998 71 123 4567",
    "contact.info.email.title": "Email",
    "contact.info.email.value": "info@neuesleben.com",
    "contact.info.tagline": "Your reliable partner in the pharmaceutical industry",
  },
  uz: {
    // Navigation
    "nav.home": "Bosh sahifa",
    "nav.about": "Biz haqimizda",
    "nav.mission": "Missiya",
    "nav.values": "Qadriyatlar",
    "nav.team": "Jamoa",
    "nav.culture": "Madaniyat",
    "nav.achievements": "Yutuqlar",
    "nav.partners": "Hamkorlar",
    "nav.infrastructure": "Infratuzilma",
    "nav.coverage": "Qamrov",
    "nav.contact": "Aloqa",

    // Hero section
    "hero.tagline": "Biz sog'liq baxtli hayotning asosi deb ishonamiz!",
    "hero.description":
      "'NEUES LEBEN' MChJ – O'zbekiston farmatsevtika bozorida faoliyat yurituvchi distribyutor kompaniya. 'NEUES LEBEN' kompaniyasi 2018 yilda tashkil etilgan bo'lib, o'z faoliyatini O'zbekiston Respublikasi bo'ylab dori vositalarini ulgurji sotishdan boshlagan.",
    "hero.description2":
      "Bugungi kunda faoliyat yo'nalishi - o'z savdo bo'limi orqali dori vositalarini to'g'ridan-to'g'ri distribyutsiya qilish. 2019 yildan boshlab kompaniya xorijiy ishlab chiqaruvchilar bilan to'g'ridan-to'g'ri shartnomalar tuzib, yangi darajaga ko'tarildi.",
    "hero.learnMore": "Batafsil",
    "hero.contactUs": "Biz bilan bog'laning",
    "hero.established": "2018 yilda tashkil etilgan",
    "hero.quality": "Sifat, O'z vaqtida yetkazib berish, Ishonchli hamkorlik",

    // About section
    "about.title": "Biz haqimizda",
    "about.subtitle": "Farmatsevtika sohasidagi ishonchli hamkoringiz",
    "about.founded": "2018 yilda tashkil etilgan",
    "about.warehouse":
      "Ombor ombor binolarining sifat standartlariga muvofiqligining eng yuqori baholanishiga erishdi.",
    "about.paragraph1":
      "ООО 'NEUES LEBEN' – O'zbekiston farmatsevtika bozorida faoliyat yurituvchi distribyutor kompaniya. 'NEUES LEBEN' kompaniyasi 2018 yilda tashkil etilgan bo'lib, o'z faoliyatini O'zbekiston Respublikasi bo'ylab dori vositalarini ulgurji sotishdan boshlagan.",
    "about.paragraph2":
      "2019 yildan boshlab kompaniya xorijiy ishlab chiqaruvchilar bilan to'g'ridan-to'g'ri shartnomalar tuzib, yangi darajaga ko'tarildi, bu esa yuqori sifatli dori vositalarini import qilish va targ'ib qilish imkonini berdi. 'NEUES LEBEN' kompaniyasi dori vositalarini sifatli saqlash amalga oshiriladigan omborga ega.",
    "about.conclusion":
      "Ishimizning asosiy tamoyillari - biz taklif qiladigan mahsulot sifati, o'z vaqtida yetkazib berish va ishonchli hamkorlik!",

    // Mission section
    "mission.title": "Bizning missiyamiz",
    "mission.paragraph1":
      "Mamlakatimiz aholisining sog'lig'ini himoya qilish va hayot sifatini oshirish, iste'molchilarni samarali va arzon davolanish bo'yicha yangi tendensiyalar haqida xabardor qilish orqali.",
    "mission.paragraph2":
      "Kompaniya o'z ishida zamonaviy yondashuvlarni qo'llaydi va bemorlarning sog'lig'i va farovonligini yaxshilash uchun eng so'nggi ishlanmalardan foydalanadi.",
    "mission.healthFocus": "Biz millatning hayot sifatini yaxshilashga intilamiz",
    "mission.protection": "Sog'liqni saqlash",
    "mission.protectionDesc": "Biz sifatli dori vositalariga kirishni ta'minlaymiz",
    "mission.community": "Jamiyatga yo'naltirilganlik",
    "mission.communityDesc": "Biz jamiyat manfaati uchun ishlaymiz",
    "mission.care": "Bemorga g'amxo'rlik",
    "mission.careDesc": "Farovonlikni yaxshilash uchun zamonaviy yondashuvlardan foydalanamiz",

    // Values section
    "values.title": "Qadriyatlarimiz",
    "values.subtitle": "Kompaniyamizga yo'l ko'rsatadigan tamoyillar",
    "values.honesty.title": "Halollik",
    "values.honesty.description":
      "Kompaniyamizning asosiy qadriyati. Biz mijozlar, hamkorlar, xodimlar va jamiyat bilan barcha munosabatlarda ochiqlik, shaffoflik va rostgo'ylikka ishonamiz.",
    "values.professionalism.title": "Professionallik",
    "values.professionalism.description":
      "Biz mijozlarga sifatli xizmat ko'rsatish va ularning so'rovlariga tezkor javob berish uchun o'z ko'nikmalarimiz va bilimlarimizni doimiy ravishda rivojlantiramiz.",
    "values.leadership.title": "Yetakchilik",
    "values.leadership.description":
      "Biz kundalik faoliyatimizda yuqori maqsadlarga erishishga intilamiz va natijaga yo'naltirilgan yetakchilikni rag'batlantiramiz.",
    "values.aspiration.title": "Intilish",
    "values.aspiration.description":
      "Biz biznesdagi muvaffaqiyatga intilamiz va mijozlarimiz hamda hamkorlarimizga muvaffaqiyatga erishishga yordam beramiz.",
    "values.support.title": "Qo'llab-quvvatlash",
    "values.support.description":
      "Biz ishonchli hamkormiz va birgalikdagi muvaffaqiyatga erishish uchun har tomonlama qo'llab-quvvatlashni ta'minlaymiz.",

    // Team section
    "team.title": "Jamoamiz",
    "team.companyPrefix": "",
    "team.employeeCount": "NEUES LEBEN kompaniyasida",
    "team.employeeSuffix": "dan ortiq yuqori malakali xodimlar ishlaydi",
    "team.departmentsTitle": "Bizning bo'limlarimiz:",
    "team.departments.medical": "Tibbiy vakillari jamoasi",
    "team.departments.foreign": "Tashqi iqtisodiy faoliyat bo'limi",
    "team.departments.legal": "Yuridik bo'lim",
    "team.departments.sales": "Sotish va marketing bo'limi",
    "team.departments.registration": "Dori vositalarini ro'yxatga olish bo'limi",
    "team.departments.hr": "HR-bo'limi (xodimlarni boshqarish bo'limi)",
    "team.departments.logistics": "Logistika bo'limi",
    "team.departments.customs": "Deklarantlar jamoasi",
    "team.departments.admin": "Ma'muriy boshqaruv bo'limi",
    "team.teamSpirit":
      "Har bir xodim yuqori sifatli xizmat va ishga professional yondashuvni ta'minlab, kompaniyaning ishonchli farmatsevtika distribyutori sifatidagi obro'sini mustahkamlaydi.",
    "team.gallery.title": "Jamoamiz bilan tanishing",
    "team.gallery.memberDescription":
      "Farmatsevtika sohasida katta tajribaga ega bo'lgan fidoyi mutaxassis. Innovatsion yechimlar va ishonchli hamkorlik orqali sog'liqni saqlash va hayot sifatini yaxshilash missiyamizga sodiq.",
    "team.gallery.showMore": "Ko'proq ko'rsatish",
    "team.gallery.showLess": "Kamroq ko'rsatish",

    // Culture section
    "culture.title": "Korporativ madaniyat",
    "culture.paragraph1":
      "Bizning korporativ madaniyatimiz sinovdan o'tgan qadriyatlar va an'analarga asoslangan. Biz oilaviy qadriyatlarni, sog'lom turmush tarzini qo'llab-quvvatlaymiz, rivojlanamiz va o'rganamiz.",
    "culture.paragraph2":
      "Biz bozordagi yutuqlarimiz va xodimlarimiz chet ellarda stajirovka o'tayotgani bilan faxrlanamiz. Birgalikdagi bayramlar, tanlovlar va muloqotning zamonaviy shakllari bizni jipslashgan jamoaga aylantiradi.",
    "culture.paragraph3":
      "Har bir xodim kompaniyaning ishonchli farmatsevtika distribyutori sifatidagi obro'sini mustahkamlaydi.",
    "culture.family.title": "Oilaviy qadriyatlar",
    "culture.family.description":
      "Biz oilaviy qadriyatlarni va sog'lom turmush tarzini qo'llab-quvvatlaymiz va targ'ib qilamiz",
    "culture.achievements.title": "Bozordagi yutuqlar",
    "culture.achievements.description": "Biz farmatsevtika bozoridagi yutuqlarimiz bilan faxrlanamiz",
    "culture.internships.title": "Xalqaro tajriba",
    "culture.internships.description":
      "Xodimlarimiz o'z ko'nikmalarini oshirish uchun chet ellarda stajirovka o'taydilar",
    "culture.events.title": "Jamoa qurish",
    "culture.events.description": "Birgalikdagi bayramlar va tadbirlar bizni jipslashgan jamoaga aylantiradi",

    // Achievements section
    "achievements.title": "Yutuqlarimiz",
    "achievements.award": "Yilning sotish lideri",
    "achievements.description":
      "So'nggi to'rt yil davomida jamoamiz farmatsevtika sohasida yetakchi o'rinlarni egallab, INSO kompaniyalari guruhida har yili 'Yilning sotish lideri' mukofotini olmoqda.",
    "achievements.growth": "Jamoa o'sishi",
    "achievements.growthDescription":
      "Jamoamizning 14 dan 135 kishigacha o'sishi farmatsevtika sohasidagi faoliyatimiz muvaffaqiyati va mahsulotlarimizga bo'lgan talabning o'sib borayotganining yaqqol dalilidir.",
    "achievements.growthChart": "Jamoa o'sishi dinamikasi",
    "achievements.award1.title": "Sotish lideri 2022",
    "achievements.award1.year": "INSO guruhi",
    "achievements.award2.title": "Eng yaxshi distribyutor 2023",
    "achievements.award2.year": "Farmatsevtika uyushmasi",
    "achievements.award3.title": "Sifat mukammalligi 2024",
    "achievements.award3.year": "Soha e'tirofi",

    // Partners section
    "partners.title": "Hamkorlarimiz",
    "partners.subtitle": "Biz dunyoning yetakchi farmatsevtika ishlab chiqaruvchilari bilan hamkorlik qilamiz",
    "partners.countries": "Biz quyidagilar bilan hamkorlik qilamiz:",
    "partners.southKorea": "Janubiy Koreya",
    "partners.poland": "Polsha",
    "partners.china": "Xitoy",
    "partners.india": "Hindiston",
    "partners.products": "Eksklyuziv mahsulotlar",
    "partners.productsDescription":
      "Xorijiy va mahalliy ishlab chiqarishdan 50 dan ortiq turdagi eksklyuziv dori vositalari",
    "partners.product": "Mahsulot",

    // Infrastructure section
    "infrastructure.title": "Infratuzilmamiz",
    "infrastructure.subtitle": "NEUES LEBEN zamonaviy logistika infratuzilmasiga ega",
    "infrastructure.warehouse.title": "Zamonaviy ombor",
    "infrastructure.warehouse.description":
      "Kompaniya GDP (Yaxshi distribyutsiya amaliyoti) standartlariga javob beradigan omborga ega.",
    "infrastructure.warehouse.standards": "Eng yuqori sifat standartlariga muvofiqlik",
    "infrastructure.warehouse.size": "Ombor maydoni: 10 ming kvadrat metr (10 000 m²)",
    "infrastructure.logistics.title": "Ilg'or logistika",
    "infrastructure.logistics.description":
      "Transport vositalari zamonaviy sovutish qurilmalari bilan jihozlangan bo'lib, talab qilinadigan harorat rejimida mahsulotlarni xavfsiz va sifatli tashishni ta'minlaydi.",
    "infrastructure.logistics.temperature": "Barcha bosqichlarda haroratni nazorat qilish",
    "infrastructure.logistics.modern": "Zamonaviy avtoparkimiz",
    "infrastructure.logistics.efficient": "Butun mamlakat bo'ylab samarali yetkazib berish",

    // Coverage section
    "coverage.title": "Qamrovimiz",
    "coverage.subtitle": "Biz butun O'zbekiston bo'ylab sotuvlarni amalga oshiramiz",
    "coverage.description":
      "Biz butun O'zbekiston bo'ylab sotuvlarni amalga oshiramiz, mamlakatning barcha hududlariga dori vositalarini ishonchli yetkazib berishni ta'minlaymiz.",
    "coverage.offices": "Mintaqaviy ofislar",
    "coverage.officesDescription":
      "Mamlakatning barcha hududlarida mintaqaviy menejerlar rahbarligida distribyutsiya ofislarimiz mavjud.",
    "coverage.mapTitle": "Butun mamlakat bo'ylab distribyutsiya",
    "coverage.mapDescription": "O'zbekiston bo'ylab sifatli dori vositalariga kirishni ta'minlash",
    "coverage.cooperation": "Biz o'zaro manfaatli va uzoq muddatli hamkorlik uchun ochiqmiz",

    // Contact section
    "contact.title": "Biz bilan bog'laning",
    "contact.subtitle": "Biz o'zaro manfaatli va uzoq muddatli hamkorlik uchun ochiqmiz",
    "contact.form.title": "Bizga xabar yuboring",
    "contact.form.name": "Ism",
    "contact.form.namePlaceholder": "Ismingiz",
    "contact.form.email": "Email",
    "contact.form.emailPlaceholder": "Emailingiz",
    "contact.form.message": "Xabar",
    "contact.form.messagePlaceholder": "Xabaringiz",
    "contact.form.submit": "Xabar yuborish",
    "contact.info.title": "Aloqa ma'lumotlari",
    "contact.info.address.title": "Manzil",
    "contact.info.address.value": "Toshkent, O'zbekiston",
    "contact.info.phone.title": "Telefon",
    "contact.info.phone.value": "+998 71 123 4567",
    "contact.info.email.title": "Email",
    "contact.info.email.value": "info@neuesleben.com",
    "contact.info.tagline": "Farmatsevtika sohasidagi ishonchli hamkoringiz",
  },
  ru: {
    // Navigation
    "nav.home": "Главная",
    "nav.about": "О нас",
    "nav.mission": "Миссия",
    "nav.values": "Ценности",
    "nav.team": "Команда",
    "nav.culture": "Культура",
    "nav.achievements": "Достижения",
    "nav.partners": "Партнеры",
    "nav.infrastructure": "Инфраструктура",
    "nav.coverage": "Покрытие",
    "nav.contact": "Контакты",

    // Hero section
    "hero.tagline": "Мы верим, что здоровье — основа счастливой жизни!",
    "hero.description":
      "ООО 'NEUES LEBEN' – дистрибьюторская компания, осуществляющая свою деятельность в сфере фармацевтической индустрии на рынке Узбекистана. Компания 'NEUES LEBEN' была основана в 2018 году, начала свою историю с оптовых продаж лекарственных средств, с покрытием по всей Республики Узбекистан.",
    "hero.description2":
      "На сегодняшний день направление деятельности - прямая дистрибуция лекарственных средств через собственный торговый отдел. С 2019 года компания перешла на новый уровень, заключив прямые договора с зарубежными производителями.",
    "hero.learnMore": "Узнать больше",
    "hero.contactUs": "Связаться с нами",
    "hero.established": "Основано в 2018",
    "hero.quality": "Качество, Своевременность, Надежное партнерство",

    // About section
    "about.title": "О компании",
    "about.subtitle": "Ваш надежный партнер в фармацевтической индустрии",
    "about.founded": "Основано в 2018",
    "about.warehouse": "Склад получил наивысшую оценку соответствия стандартам качества складских помещений.",
    "about.paragraph1":
      "ООО 'NEUES LEBEN' – дистрибьюторская компания, осуществляющая свою деятельность в сфере фармацевтической индустрии на рынке Узбекистана. Компания 'NEUES LEBEN' была основана в 2018 году, начала свою историю с оптовых продаж лекарственных средств, с покрытием по всей Республики Узбекистан.",
    "about.paragraph2":
      "С 2019 года компания перешла на новый уровень, заключив прямые договора с зарубежными производителями, что позволило осуществлять ввоз и промоцию лекарственных средств высокого качества. Компания 'NEUES LEBEN' располагает складом, на котором осуществляется качественное хранение лекарственных препаратов.",
    "about.conclusion":
      "Основными принципами нашей работы является качество продукта который мы предлагаем, своевременность доставки и надежное партнерство!",

    // Mission section
    "mission.title": "Наша миссия",
    "mission.paragraph1":
      "Обеспечение защиты здоровья и повышение качества жизни населения страны, путем информирования потребителей о новых тенденциях по эффективному и доступному лечению.",
    "mission.paragraph2":
      "Компания применяет современные подходы в работе и использует новейшие разработки с целью улучшения здоровья и самочувствия пациентов.",
    "mission.healthFocus": "Мы стремимся к улучшению качества жизни нации",
    "mission.protection": "Защита здоровья",
    "mission.protectionDesc": "Мы обеспечиваем доступ к качественным лекарствам",
    "mission.community": "Фокус на сообщество",
    "mission.communityDesc": "Мы работаем на благо общества",
    "mission.care": "Забота о пациентах",
    "mission.careDesc": "Мы используем современные подходы для улучшения благополучия",

    // Values section
    "values.title": "Наши ценности",
    "values.subtitle": "Принципы, которыми руководствуется наша компания",
    "values.honesty.title": "Честность",
    "values.honesty.description":
      "основополагающая ценность нашей компании. Мы верим в открытость, прозрачность и правдивость во всех наших взаимоотношениях – с клиентами, партнерами, сотрудниками и обществом",
    "values.professionalism.title": "Профессионализм",
    "values.professionalism.description":
      "мы постоянно развиваем свои навыки и знания, чтобы предоставлять клиентам качественные услуги и оперативно отвечать на их запросы",
    "values.leadership.title": "Лидерство",
    "values.leadership.description":
      "мы фокусируемся на достижении амбициозных целей и поощряем лидерство, направленное на результат",
    "values.aspiration.title": "Стремление",
    "values.aspiration.description":
      "мы стремимся к успеху в бизнесе и помогаем достигать успеха нашим клиентам и партнерам",
    "values.support.title": "Поддержка",
    "values.support.description":
      "мы являемся надежным партнером и предоставляем всестороннюю поддержку для достижениястижения совместного успеха",

    // Team section
    "team.title": "Наша команда",
    "team.companyPrefix": "В компании",
    "team.employeeCount": "работают более",
    "team.employeeSuffix": "высококвалифицированных сотрудников",
    "team.departmentsTitle": "Наши отделы:",
    "team.departments.medical": "Команда медицинских представителей",
    "team.departments.foreign": "Отдел внешнеэкономической деятельности",
    "team.departments.legal": "Юридический отдел",
    "team.departments.sales": "Отдел продаж и маркетинга",
    "team.departments.registration": "Отдел регистрации ЛС",
    "team.departments.hr": "HR-отдел (отдел по управлению персоналом)",
    "team.departments.logistics": "Отдел логистики",
    "team.departments.customs": "Команда декларантов",
    "team.departments.admin": "Отдел АУП",
    "team.teamSpirit":
      "Каждый сотрудник укрепляет имидж компании как надёжного фармдистрибьютора, обеспечивая высокое качество обслуживания и профессиональный подход к работе.",
    "team.gallery.title": "Познакомьтесь с нашей командой",
    "team.gallery.memberDescription":
      "Преданный профессионал с обширным опытом работы в фармацевтической отрасли. Привержен нашей миссии по улучшению здоровья и качества жизни через инновационные решения и надежные партнерские отношения.",
    "team.gallery.showMore": "Показать больше",
    "team.gallery.showLess": "Показать меньше",

    // Culture section
    "culture.title": "Корпоративная культура",
    "culture.paragraph1":
      "Наша корпоративная культура основана на проверенных ценностях и традициях. Мы поддерживаем семейные ценности, здоровый образ жизни, развиваемся и учимся.",
    "culture.paragraph2":
      "Гордимся достижениями на рынке и тем, что наши сотрудники проходят стажировки за рубежом. Совместные праздники, конкурсы и современные формы общения делают нас сплочённой командой.",
    "culture.paragraph3": "Каждый сотрудник укрепляет имидж компании как надёжного фармдистрибьютора.",
    "culture.family.title": "Семейные ценности",
    "culture.family.description": "Мы поддерживаем и продвигаем семейные ценности и здоровый образ жизни",
    "culture.achievements.title": "Достижения на рынке",
    "culture.achievements.description": "Мы гордимся нашими достижениями на фармацевтическом рынке",
    "culture.internships.title": "Международный опыт",
    "culture.internships.description": "Наши сотрудники проходят стажировки за рубежом для повышения квалификации",
    "culture.events.title": "Командообразование",
    "culture.events.description": "Совместные праздники и мероприятия делают нас сплоченной командой",

    // Achievements section
    "achievements.title": "Наши достижения",
    "achievements.award": "Лидер года по продажам",
    "achievements.description":
      "На протяжении последних четырех лет наша команда занимает лидирующие позиции по продажам в фармацевтической отрасли в группе холдинга ООО «Inso Farm Deluxe», ежегодно получая награду «Лидер года по продажам».",
    "achievements.growth": "Рост нашей команды",
    "achievements.growthDescription":
      "Рост нашей команды с 14 до 135 человек – наглядное подтверждение успеха нашей деятельности в фармацевтической отрасли и растущего спроса на наши продукты.",
    "achievements.growthChart": "Динамика роста команды",
    "achievements.award1.title": "Лидер продаж 2022",
    "achievements.award1.year": "Группа INSO",
    "achievements.award2.title": "Лучший дистрибьютор 2023",
    "achievements.award2.year": "Фармацевтическая ассоциация",
    "achievements.award3.title": "Превосходство качества 2024",
    "achievements.award3.year": "Признание отрасли",

    // Partners section
    "partners.title": "Наши партнеры",
    "partners.subtitle": "Мы сотрудничаем с ведущими фармацевтическими производителями по всему миру",
    "partners.countries": "Мы сотрудничаем с:",
    "partners.southKorea": "Южная Корея",
    "partners.poland": "Польша",
    "partners.china": "Китай",
    "partners.india": "Индия",
    "partners.products": "Эксклюзивные препараты",
    "partners.productsDescription": "Более 50 видов эксклюзивных препаратов зарубежного и местного производства",
    "partners.product": "Продукт",

    // Infrastructure section
    "infrastructure.title": "Инфраструктура",
    "infrastructure.subtitle": "Компания NEUES LEBEN обладает современной логистической инфраструктурой",
    "infrastructure.warehouse.title": "Современный склад",
    "infrastructure.warehouse.description":
      "В распоряжении компании имеется склад, соответствующий стандартам GDP (Good Distribution Practice).",
    "infrastructure.warehouse.standards": "Соответствие высочайшим стандартам качества",
    "infrastructure.warehouse.size": "Площадь склада 10 тысяч квадратных метров (10 000 м²)",
    "infrastructure.logistics.title": "Передовая логистика",
    "infrastructure.logistics.description":
      "Автотранспортные средства оснащены современными холодильными установками, что обеспечивает безопасную и качественную перевозку продукции с соблюдением требуемого температурного режима.",
    "infrastructure.logistics.temperature": "Контроль температурного режима на всех этапах",
    "infrastructure.logistics.modern": "Современный автопарк",
    "infrastructure.logistics.efficient": "Эффективная доставка по всей стране",

    // Coverage section
    "coverage.title": "Наше покрытие",
    "coverage.subtitle": "Мы осуществляем продажи по всему Узбекистану",
    "coverage.description":
      "Мы осуществляем продажи по всему Узбекистану, обеспечивая надежные поставки лекарственных средств во все регионы страны.",
    "coverage.offices": "Региональные офисы",
    "coverage.officesDescription":
      "Во всех регионах страны у нас действуют дистрибьюторские офисы под руководством региональных менеджеров.",
    "coverage.mapTitle": "Общенациональная дистрибуция",
    "coverage.mapDescription": "Обеспечение доступа к качественным лекарствам по всему Узбекистану",
    "coverage.cooperation": "Мы открыты для взаимовыгодного и долгосрочного сотрудничества",

    // Contact section
    "contact.title": "Связаться с нами",
    "contact.subtitle": "Мы открыты для взаимовыгодного и долгосрочного сотрудничества",
    "contact.form.title": "Отправьте нам сообщение",
    "contact.form.name": "Имя",
    "contact.form.namePlaceholder": "Ваше имя",
    "contact.form.email": "Email",
    "contact.form.emailPlaceholder": "Ваш email",
    "contact.form.message": "Сообщение",
    "contact.form.messagePlaceholder": "Ваше сообщение",
    "contact.form.submit": "Отправить сообщение",
    "contact.info.title": "Контактная информация",
    "contact.info.address.title": "Адрес",
    "contact.info.address.value": "Ташкент, Узбекистан",
    "contact.info.phone.title": "Телефон",
    "contact.info.phone.value": "+998 71 123 4567",
    "contact.info.email.title": "Email",
    "contact.info.email.value": "info@neuesleben.com",
    "contact.info.tagline": "Ваш надежный партнер в фармацевтической индустрии",
  },
}

// Define the provider props
interface LanguageProviderProps {
  children: ReactNode
}

// Create the provider component
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Initialize the language state from localStorage if available
  const [language, setLanguageState] = useState<Language>("ru")

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
