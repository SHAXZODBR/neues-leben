"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// Define the supported languages
export type Language = "en" | "uz" | "ru" | "de";

// Create a context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

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
    "nav.blog": "Medical Journal",

    // Blog/Medical Journal
    "blog.title": "Medical Research & Clinical Insights",
    "blog.subtitle":
      "Evidence-based articles, case studies, and clinical guidelines from healthcare professionals across all specialties.",
    "blog.loading": "Loading latest articles...",
    "blog.tryAgain": "Try Again",
    "blog.peerReviewed": "Peer-Reviewed Medical Literature",
    "blog.searchPlaceholder": "Search articles by title, specialty...",
    "blog.search": "Search",
    "blog.browseArchive": "Browse Complete Archive",
    "blog.showingArticles": "Showing {count} articles",
    "blog.inCategory": "in",
    "blog.matching": "matching",
    "blog.allPublications": "All Publications",
    "blog.specialties": "Specialties",
    "blog.mostRead": "Most Read",
    "blog.mostCited": "Most Cited",
    "blog.views": "views",
    "blog.citations": "citations",
    "blog.medicalUpdates": "Medical Updates",
    "blog.newsletterText":
      "Get the latest research and clinical insights delivered to your inbox.",
    "blog.subscribe": "Subscribe",
    "blog.previous": "Previous",
    "blog.next": "Next",
    "blog.page": "Page",
    "blog.of": "of",
    "blog.readFullArticle": "Read Full Article",
    "blog.backToJournal": "Back to Journal",
    "blog.completeArchive": "Complete Archive",
    "blog.allPublicationsArchive": "All Medical Publications",
    "blog.archiveDescription":
      "Browse our complete collection of peer-reviewed articles and clinical research, organized chronologically.",
    "blog.articles": "Articles",
    "blog.years": "Years",
    "blog.article": "article",
    "blog.lookingForResearch": "Looking for specific research?",
    "blog.useSearch":
      "Use our search to find articles by topic, author, or keyword.",
    "blog.searchArticles": "Search Articles",
    "blog.forHealthcareProfessionals":
      "For licensed healthcare professionals only",

    // Doctor verification modal
    "verification.title": "Healthcare Professional Verification",
    "verification.subtitle": "Access to Medical Literature",
    "verification.notice": "Important Notice",
    "verification.noticeText":
      "The medical articles and research content in this section are intended for licensed healthcare professionals only. The information presented is for educational purposes and should not replace clinical judgment.",
    "verification.confirmCredentials": "Please confirm your credentials",
    "verification.confirmText":
      "I confirm that I am a licensed healthcare professional (physician, nurse, pharmacist, or other qualified medical practitioner) and I understand that the content is intended for professional medical education.",
    "verification.cancel": "Cancel",
    "verification.confirm": "Confirm & Continue",
    "verification.terms":
      "By continuing, you agree to our Terms of Service and Privacy Policy",

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
      "'NEUES LEBEN' LLC is a distribution company operating in the pharmaceutical industry in the Uzbek market. The company 'NEUES LEBEN' was founded in 2018 and began its journey with wholesale sales of medicines, covering the entire territory of the Republic of Uzbekistan.",

    "about.paragraph2":
      "Since 2019, the company has reached a new level by signing direct contracts with foreign manufacturers, which has enabled the import and promotion of high-quality medicines. 'NEUES LEBEN' has a warehouse that ensures proper storage of pharmaceutical products.",
    "about.conclusion":
      "The main principles of our work are product quality, timely delivery, and reliable partnership!",

    // Mission section
    "mission.title": "Our Mission",
    "mission.paragraph1":
      "Ensuring the protection of health and improving the quality of life of the country's population by informing consumers about new trends in effective and affordable treatment.",
    "mission.paragraph2":
      "The company applies modern approaches in its work and uses the latest developments to improve the health and well-being of patients.",
    "mission.healthFocus":
      "We strive to improve the quality of life of the nation",
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
    "values.leadership.description":
      "We focus on achieving ambitious goals and encourage leadership aimed at results.",
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
    "culture.paragraph3":
      "Each employee strengthens the company's image as a reliable pharmaceutical distributor.",
    "culture.family.title": "Family Values",
    "culture.family.description":
      "We support and promote family values and healthy lifestyle",
    "culture.achievements.title": "Market Achievements",
    "culture.achievements.description":
      "We are proud of our accomplishments in the pharmaceutical market",
    "culture.internships.title": "International Experience",
    "culture.internships.description":
      "Our employees undergo internships abroad to enhance their skills",
    "culture.events.title": "Team Building",
    "culture.events.description":
      "Joint holidays and events make us a cohesive team",

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
    "partners.subtitle":
      "We collaborate with leading pharmaceutical manufacturers worldwide",
    "partners.countries": "We collaborate with:",
    "partners.southKorea": "South Korea",
    "partners.poland": "Poland",
    "partners.china": "China",
    "partners.india": "India",
    "partners.products": "Exclusive Products",
    "partners.productsDescription":
      "More than 50 types of exclusive drugs from foreign and local production",
    "partners.product": "Product",

    // Infrastructure section
    "infrastructure.title": "Our Infrastructure",
    "infrastructure.subtitle":
      "NEUES LEBEN has a modern logistics infrastructure",
    "infrastructure.warehouse.title": "Modern Warehouse",
    "infrastructure.warehouse.description":
      "The company has a warehouse that meets GDP (Good Distribution Practice) standards.",
    "infrastructure.warehouse.standards":
      "Highest quality standards compliance",
    "infrastructure.warehouse.size":
      "Warehouse area: 10,000 square meters (10,000 m²)",
    "infrastructure.logistics.title": "Advanced Logistics",
    "infrastructure.logistics.description":
      "Vehicles are equipped with modern refrigeration units to ensure safe and quality transportation of products with the required temperature regime.",
    "infrastructure.logistics.temperature": "Temperature control at all stages",
    "infrastructure.logistics.modern": "Modern Fleet",
    "infrastructure.logistics.efficient":
      "Efficient delivery across the country",

    // Coverage section
    "coverage.title": "Our Coverage",
    "coverage.subtitle": "We carry out sales throughout Uzbekistan",
    "coverage.description":
      "We carry out sales throughout Uzbekistan, ensuring reliable supply of medicines to all regions of the country.",
    "coverage.offices": "Regional Offices",
    "coverage.officesDescription":
      "In all regions of the country, we have distribution offices under the leadership of regional managers.",
    "coverage.mapTitle": "Nationwide Distribution",
    "coverage.mapDescription":
      "Ensuring access to quality medicines across Uzbekistan",
    "coverage.cooperation":
      "We are open for mutually beneficial and long-term cooperation",
    "coverage.uzbekistanMap": "Uzbekistan Coverage Map",
    "coverage.stats.regions": "Regions Covered",
    "coverage.stats.team": "Team Members",
    "coverage.stats.network": "Distribution Network",

    // Contact section

    "contact.title": "Contact Us",
    "contact.subtitle":
      "We are open for mutually beneficial and long-term cooperation",
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
    "contact.info.address.value":
      "100047, Uzbekistan, Tashkent city, Yashnabad district, Akhangaran highway, Parkent street, No. 333",
    "contact.info.phone.title": "Phone",
    "contact.info.phone.value": "+998 90 903 03 31 / +998 97 769 64 80",
    "contact.info.email.title": "Email",
    "contact.info.email.value":
      "info@neuesleben.uz, import@neuesleben.uz, sales@neuesleben.uz",
    "contact.info.tagline":
      "Your reliable partner in the pharmaceutical industry",

    //Footer section
    "footer.description":
      "NEUES LEBEN LLC is a distribution company operating in the pharmaceutical industry of Uzbekistan.",
    "footer.about": "About",
    "footer.aboutUs": "About Us",
    "footer.mission": "Mission",
    "footer.values": "Values",
    "footer.team": "Team",
    "footer.activities": "Activities",
    "footer.partners": "Partners",
    "footer.infrastructure": "Infrastructure",
    "footer.coverage": "Coverage",
    "footer.achievements": "Achievements",
    "footer.contacts": "Contacts",
    "footer.location": "Tashkent, Uzbekistan",
    "footer.rights": "All rights reserved.",
    "footer.openToCooperation":
      "We are open for mutually beneficial and long-term cooperation.",
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
    "nav.blog": "Tibbiy Jurnal",

    // Blog/Medical Journal
    "blog.title": "Tibbiy Tadqiqotlar va Klinik Tushunchalar",
    "blog.subtitle":
      "Barcha mutaxassisliklar bo'yicha sog'liqni saqlash mutaxassislaridan dalillarga asoslangan maqolalar, klinik holatlar va ko'rsatmalar.",
    "blog.loading": "Maqolalar yuklanmoqda...",
    "blog.tryAgain": "Qayta urinish",
    "blog.peerReviewed": "Ekspert Tekshiruvidan O'tgan Tibbiy Adabiyot",
    "blog.searchPlaceholder":
      "Maqolalarni sarlavha, mutaxassislik bo'yicha qidirish...",
    "blog.search": "Qidirish",
    "blog.browseArchive": "To'liq Arxivni Ko'rish",
    "blog.showingArticles": "{count} ta maqola ko'rsatilmoqda",
    "blog.inCategory": "kategoriyasida",
    "blog.matching": "mos keladigan",
    "blog.allPublications": "Barcha Nashrlar",
    "blog.specialties": "Mutaxassisliklar",
    "blog.mostRead": "Eng Ko'p O'qilgan",
    "blog.mostCited": "Eng Ko'p Iqtibos Qilingan",
    "blog.views": "ko'rish",
    "blog.citations": "iqtibos",
    "blog.medicalUpdates": "Tibbiy Yangiliklar",
    "blog.newsletterText":
      "Eng so'nggi tadqiqotlar va klinik tushunchalarni elektron pochtangizga oling.",
    "blog.subscribe": "Obuna bo'lish",
    "blog.previous": "Oldingi",
    "blog.next": "Keyingi",
    "blog.page": "Sahifa",
    "blog.of": "dan",
    "blog.readFullArticle": "To'liq Maqolani O'qish",
    "blog.backToJournal": "Jurnalga Qaytish",
    "blog.completeArchive": "To'liq Arxiv",
    "blog.allPublicationsArchive": "Barcha Tibbiy Nashrlar",
    "blog.archiveDescription":
      "Ekspert tekshiruvidan o'tgan maqolalar va klinik tadqiqotlarning to'liq to'plamini xronologik tartibda ko'ring.",
    "blog.articles": "Maqolalar",
    "blog.years": "Yillar",
    "blog.article": "maqola",
    "blog.lookingForResearch": "Muayyan tadqiqot qidiryapsizmi?",
    "blog.useSearch":
      "Mavzu, muallif yoki kalit so'z bo'yicha maqolalarni topish uchun qidiruvimizdan foydalaning.",
    "blog.searchArticles": "Maqolalarni Qidirish",
    "blog.forHealthcareProfessionals":
      "Faqat litsenziyalangan tibbiyot xodimlari uchun",

    // Doctor verification modal
    "verification.title": "Sog'liqni Saqlash Mutaxassisi Tekshiruvi",
    "verification.subtitle": "Tibbiy Adabiyotga Kirish",
    "verification.notice": "Muhim Eslatma",
    "verification.noticeText":
      "Ushbu bo'limdagi tibbiy maqolalar va tadqiqot materiallari faqat litsenziyalangan sog'liqni saqlash mutaxassislari uchun mo'ljallangan. Taqdim etilgan ma'lumotlar ta'lim maqsadlarida va klinik qarorlarni almashtirmasligi kerak.",
    "verification.confirmCredentials": "Iltimos, malakangizni tasdiqlang",
    "verification.confirmText":
      "Men litsenziyalangan sog'liqni saqlash mutaxassisi (shifokor, hamshira, farmatsevt yoki boshqa malakali tibbiy amaliyotchi) ekanligimni va kontent professional tibbiy ta'lim uchun mo'ljallanganligini tushunishimni tasdiqlayman.",
    "verification.cancel": "Bekor qilish",
    "verification.confirm": "Tasdiqlash va Davom etish",
    "verification.terms":
      "Davom etish orqali siz Foydalanish shartlari va Maxfiylik siyosatiga rozilik bildirasiz",

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
    "mission.healthFocus":
      "Biz millatning hayot sifatini yaxshilashga intilamiz",
    "mission.protection": "Sog'liqni saqlash",
    "mission.protectionDesc":
      "Biz sifatli dori vositalariga kirishni ta'minlaymiz",
    "mission.community": "Jamiyatga yo'naltirilganlik",
    "mission.communityDesc": "Biz jamiyat manfaati uchun ishlaymiz",
    "mission.care": "Bemorga g'amxo'rlik",
    "mission.careDesc":
      "Farovonlikni yaxshilash uchun zamonaviy yondashuvlardan foydalanamiz",

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
    "team.departments.registration":
      "Dori vositalarini ro'yxatga olish bo'limi",
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
    "culture.achievements.description":
      "Biz farmatsevtika bozoridagi yutuqlarimiz bilan faxrlanamiz",
    "culture.internships.title": "Xalqaro tajriba",
    "culture.internships.description":
      "Xodimlarimiz o'z ko'nikmalarini oshirish uchun chet ellarda stajirovka o'taydilar",
    "culture.events.title": "Jamoa qurish",
    "culture.events.description":
      "Birgalikdagi bayramlar va tadbirlar bizni jipslashgan jamoaga aylantiradi",

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
    "partners.subtitle":
      "Biz dunyoning yetakchi farmatsevtika ishlab chiqaruvchilari bilan hamkorlik qilamiz",
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
    "infrastructure.subtitle":
      "NEUES LEBEN zamonaviy logistika infratuzilmasiga ega",
    "infrastructure.warehouse.title": "Zamonaviy ombor",
    "infrastructure.warehouse.description":
      "Kompaniya GDP (Yaxshi tarqatish amaliyoti) standartlariga javob beradigan omborga ega.",
    "infrastructure.warehouse.standards":
      "Eng yuqori sifat standartlariga muvofiqlik",
    "infrastructure.warehouse.size":
      "Ombor maydoni: 10 ming kvadrat metr (10 000 m²)",
    "infrastructure.logistics.title": "Ilg'or logistika",
    "infrastructure.logistics.description":
      "Transport vositalari zamonaviy sovutish qurilmalari bilan jihozlangan bo'lib, talab qilinadigan harorat rejimida mahsulotlarni xavfsiz va sifatli tashishni ta'minlaydi.",
    "infrastructure.logistics.temperature":
      "Barcha bosqichlarda haroratni nazorat qilish",
    "infrastructure.logistics.modern": "Zamonaviy avtoparkimiz",
    "infrastructure.logistics.efficient":
      "Butun mamlakat bo'ylab samarali yetkazib berish",

    // Coverage section
    "coverage.title": "Qamrovimiz",
    "coverage.subtitle":
      "Biz butun O'zbekiston bo'ylab sotuvlarni amalga oshiramiz",
    "coverage.description":
      "Biz butun O'zbekiston bo'ylab sotuvlarni amalga oshiramiz, mamlakatning barcha hududlariga dori vositalarini ishonchli yetkazib berishni ta'minlaymiz.",
    "coverage.offices": "Mintaqaviy ofislar",
    "coverage.officesDescription":
      "Mamlakatning barcha hududlarida mintaqaviy menejerlar rahbarligida distribyutsiya ofislarimiz mavjud.",
    "coverage.mapTitle": "Butun mamlakat bo'ylab distribyutsiya",
    "coverage.mapDescription":
      "O'zbekiston bo'ylab sifatli dori vositalariga kirishni ta'minlash",
    "coverage.cooperation":
      "Biz o'zaro manfaatli va uzoq muddatli hamkorlik uchun ochiqmiz",
    "coverage.uzbekistanMap": "O‘zbekiston qamrov xaritasi",
    "coverage.stats.regions": "Qamrab olingan hududlar",
    "coverage.stats.team": "Jamoa a’zolari",
    "coverage.stats.network": "Taqsimot tarmog‘i",

    // Contact section
    "contact.title": "Biz bilan bog'laning",
    "contact.subtitle":
      "Biz o‘zaro manfaatli va uzoq muddatli hamkorlik uchun ochiqmiz",
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
    "contact.info.address.value":
      "100047, O‘zbekiston Respublikasi, Toshkent shahri, Yashnobod tumani, Ohangaron shossesi, Parkent ko‘chasi, 333-uy",
    "contact.info.phone.title": "Telefon",
    "contact.info.phone.value": "+998 90 903 03 31 / +998 97 769 64 80",
    "contact.info.email.title": "Email",
    "contact.info.email.value":
      "info@neuesleben.uz, import@neuesleben.uz, sales@neuesleben.uz",
    "contact.info.tagline": "Farmatsevtika sohasidagi ishonchli hamkoringiz",

    //Footer section
    "footer.description":
      "NEUES LEBEN MChJ — O‘zbekiston farmatsevtika sohasida faoliyat yurituvchi distribyutorlik kompaniyasi.",
    "footer.about": "Kompaniya haqida",
    "footer.aboutUs": "Biz haqimizda",
    "footer.mission": "Missiya",
    "footer.values": "Qadriyatlar",
    "footer.team": "Jamoa",
    "footer.activities": "Faoliyat",
    "footer.partners": "Hamkorlar",
    "footer.infrastructure": "Infratuzilma",
    "footer.coverage": "Qamrov",
    "footer.achievements": "Yutuqlar",
    "footer.contacts": "Aloqa",
    "footer.location": "Tashkent, O‘zbekiston",
    "footer.rights": "Barcha huquqlar himoyalangan.",
    "footer.openToCooperation":
      "Biz o‘zaro manfaatli va uzoq muddatli hamkorlik uchun ochiqmiz.",
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
    "nav.blog": "Медицинский Журнал",

    // Blog/Medical Journal
    "blog.title": "Медицинские Исследования и Клинические Обзоры",
    "blog.subtitle":
      "Научно обоснованные статьи, клинические случаи и рекомендации от специалистов здравоохранения всех направлений.",
    "blog.loading": "Загружаем свежие статьи...",
    "blog.tryAgain": "Попробовать снова",
    "blog.peerReviewed": "Рецензируемая Медицинская Литература",
    "blog.searchPlaceholder": "Поиск статей по названию, специальности...",
    "blog.search": "Поиск",
    "blog.browseArchive": "Просмотреть Полный Архив",
    "blog.showingArticles": "Показано {count} статей",
    "blog.inCategory": "в категории",
    "blog.matching": "соответствующих",
    "blog.allPublications": "Все Публикации",
    "blog.specialties": "Специальности",
    "blog.mostRead": "Самые Читаемые",
    "blog.mostCited": "Самые Цитируемые",
    "blog.views": "просмотров",
    "blog.citations": "цитирований",
    "blog.medicalUpdates": "Медицинские Новости",
    "blog.newsletterText":
      "Получайте последние исследования и клинические обзоры на вашу почту.",
    "blog.subscribe": "Подписаться",
    "blog.previous": "Назад",
    "blog.next": "Далее",
    "blog.page": "Страница",
    "blog.of": "из",
    "blog.readFullArticle": "Читать Полную Статью",
    "blog.backToJournal": "Вернуться к Журналу",
    "blog.completeArchive": "Полный Архив",
    "blog.allPublicationsArchive": "Все Медицинские Публикации",
    "blog.archiveDescription":
      "Просмотрите нашу полную коллекцию рецензируемых статей и клинических исследований в хронологическом порядке.",
    "blog.articles": "Статьи",
    "blog.years": "Годы",
    "blog.article": "статья",
    "blog.lookingForResearch": "Ищете конкретное исследование?",
    "blog.useSearch":
      "Используйте наш поиск для нахождения статей по теме, автору или ключевому слову.",
    "blog.searchArticles": "Поиск Статей",
    "blog.forHealthcareProfessionals":
      "Только для лицензированных медицинских работников",

    // Doctor verification modal
    "verification.title": "Верификация Медицинского Специалиста",
    "verification.subtitle": "Доступ к Медицинской Литературе",
    "verification.notice": "Важное Уведомление",
    "verification.noticeText":
      "Медицинские статьи и исследовательский контент в этом разделе предназначены только для лицензированных специалистов здравоохранения. Представленная информация носит образовательный характер и не должна заменять клиническое суждение.",
    "verification.confirmCredentials":
      "Пожалуйста, подтвердите вашу квалификацию",
    "verification.confirmText":
      "Я подтверждаю, что являюсь лицензированным специалистом здравоохранения (врачом, медсестрой, фармацевтом или другим квалифицированным медицинским практиком) и понимаю, что контент предназначен для профессионального медицинского образования.",
    "verification.cancel": "Отмена",
    "verification.confirm": "Подтвердить и Продолжить",
    "verification.terms":
      "Продолжая, вы соглашаетесь с Условиями использования и Политикой конфиденциальности",

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
    "about.warehouse":
      "Склад получил наивысшую оценку соответствия стандартам качества складских помещений.",
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
    "mission.protectionDesc":
      "Мы обеспечиваем доступ к качественным лекарствам",
    "mission.community": "Фокус на сообщества",
    "mission.communityDesc": "Мы работаем на благо общества",
    "mission.care": "Забота о пациентах",
    "mission.careDesc":
      "Мы используем современные подходы для улучшения благополучия",

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
    "team.departments.admin": "Отдел АУП",
    "team.departments.hr": "HR-отдел (отдел по управлению персоналом)",
    "team.departments.legal": "Юридический отдел",
    "team.departments.sales": "Отдел продаж и маркетинга",
    "team.departments.medical": "Команда медицинских представителей",
    "team.departments.foreign": "Отдел внешнеэкономической деятельности",
    "team.departments.registration": "Отдел регистрации ЛС",
    "team.departments.logistics": "Отдел логистики",
    "team.departments.customs": "Команда декларантов",
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
    "culture.paragraph3":
      "Каждый сотрудник укрепляет имидж компании как надёжного фармдистрибьютора.",
    "culture.family.title": "Семейные ценности",
    "culture.family.description":
      "Мы поддерживаем и продвигаем семейные ценности и здоровый образ жизни",
    "culture.achievements.title": "Достижения на рынке",
    "culture.achievements.description":
      "Мы гордимся нашими достижениями на фармацевтическом рынке",
    "culture.internships.title": "Международный опыт",
    "culture.internships.description":
      "Наши сотрудники проходят стажировки за рубежом для повышения квалификации",
    "culture.events.title": "Командообразование",
    "culture.events.description":
      "Совместные праздники и мероприятия делают нас сплоченной командой",

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
    "partners.subtitle":
      "Мы сотрудничаем с ведущими фармацевтическими производителями по всему миру",
    "partners.countries": "Мы сотрудничаем с:",
    "partners.southKorea": "Южная Корея",
    "partners.poland": "Польша",
    "partners.china": "Китай",
    "partners.india": "Индия",
    "partners.products": "Эксклюзивные препараты",
    "partners.productsDescription":
      "Более 50 видов эксклюзивных препаратов зарубежного и местного производства",
    "partners.product": "Продукт",

    // Infrastructure section
    "infrastructure.title": "Инфраструктура",
    "infrastructure.subtitle":
      "Компания NEUES LEBEN обладает современной логистической инфраструктурой",
    "infrastructure.warehouse.title": "Современный склад",
    "infrastructure.warehouse.description":
      "В распоряжении компании имеется склад, соответствующий стандартам Надлежащая дистрибьюторская практика (GDP).",
    "infrastructure.warehouse.standards":
      "Соответствие высочайшим стандартам качества",
    "infrastructure.warehouse.size":
      "Площадь склада 10 тысяч квадратных метров (10 000 м²)",
    "infrastructure.logistics.title": "Передовая логистика",
    "infrastructure.logistics.description":
      "Автотранспортные средства оснащены современными холодильными установками, что обеспечивает безопасную и качественную перевозку продукции с соблюдением требуемого температурного режима.",
    "infrastructure.logistics.temperature":
      "Контроль температурного режима на всех этапах",
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
    "coverage.mapDescription":
      "Обеспечение доступа к качественным лекарствам по всему Узбекистану",
    "coverage.cooperation":
      "Мы открыты для взаимовыгодного и долгосрочного сотрудничества",
    "coverage.uzbekistanMap": "Карта покрытия Узбекистана",
    "coverage.stats.regions": "Охваченные регионы",
    "coverage.stats.team": "Сотрудники команды",
    "coverage.stats.network": "Сеть распределения",

    // Contact section
    "contact.title": "Связаться с нами",
    "contact.subtitle":
      "Мы открыты для взаимовыгодного и долгосрочного сотрудничества",
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
    "contact.info.address.value":
      "100047, Республика Узбекистан г.Ташкент, Яшнабадский район, Ахангаранское шоссе, ул. Паркентская № 333",
    "contact.info.phone.title": "Телефон",
    "contact.info.phone.value": "+998 90 903 03 31 / +998 97 769 64 80",
    "contact.info.email.title": "Email",
    "contact.info.email.value":
      "info@neuesleben.uz, import@neuesleben.uz, sales@neuesleben.uz",
    "contact.info.tagline": "Ваш надежный партнер в фармацевтической индустрии",
    //Footer section

    "footer.description":
      "ООО «NEUES LEBEN» — дистрибьюторская компания, работающая в фармацевтической отрасли Узбекистана.",
    "footer.about": "О компании",
    "footer.aboutUs": "О нас",
    "footer.mission": "Миссия",
    "footer.values": "Ценности",
    "footer.team": "Команда",
    "footer.activities": "Деятельность",
    "footer.partners": "Партнеры",
    "footer.infrastructure": "Инфраструктура",
    "footer.coverage": "Покрытие",
    "footer.achievements": "Достижения",
    "footer.contacts": "Контакты",
    "footer.location": "Ташкент, Узбекистан",
    "footer.rights": "Все права защищены.",
    "footer.openToCooperation":
      "Мы открыты для взаимовыгодного и долгосрочного сотрудничества.",
  },

  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.about": "Über uns",
    "nav.mission": "Mission",
    "nav.values": "Werte",
    "nav.team": "Team",
    "nav.culture": "Kultur",
    "nav.achievements": "Erfolge",
    "nav.partners": "Partner",
    "nav.infrastructure": "Infrastruktur",
    "nav.coverage": "Abdeckung",
    "nav.contact": "Kontakt",
    "nav.blog": "Medizinisches Journal",

    // Blog/Medical Journal
    "blog.title": "Medizinische Forschung & Klinische Erkenntnisse",
    "blog.subtitle":
      "Evidenzbasierte Artikel, Fallstudien und klinische Leitlinien von Gesundheitsexperten aller Fachrichtungen.",
    "blog.loading": "Lade aktuelle Artikel...",
    "blog.tryAgain": "Erneut versuchen",
    "blog.peerReviewed": "Peer-Reviewed Medizinische Literatur",
    "blog.searchPlaceholder": "Artikel nach Titel, Fachgebiet suchen...",
    "blog.search": "Suchen",
    "blog.browseArchive": "Vollständiges Archiv durchsuchen",
    "blog.showingArticles": "{count} Artikel werden angezeigt",
    "blog.inCategory": "in",
    "blog.matching": "passend zu",
    "blog.allPublications": "Alle Publikationen",
    "blog.specialties": "Fachgebiete",
    "blog.mostRead": "Meistgelesen",
    "blog.mostCited": "Meistzitiert",
    "blog.views": "Aufrufe",
    "blog.citations": "Zitierungen",
    "blog.medicalUpdates": "Medizinische Updates",
    "blog.newsletterText":
      "Erhalten Sie die neuesten Forschungsergebnisse und klinischen Erkenntnisse per E-Mail.",
    "blog.subscribe": "Abonnieren",
    "blog.previous": "Zurück",
    "blog.next": "Weiter",
    "blog.page": "Seite",
    "blog.of": "von",
    "blog.readFullArticle": "Vollständigen Artikel lesen",
    "blog.backToJournal": "Zurück zum Journal",
    "blog.completeArchive": "Vollständiges Archiv",
    "blog.allPublicationsArchive": "Alle Medizinischen Publikationen",
    "blog.archiveDescription":
      "Durchsuchen Sie unsere vollständige Sammlung von peer-reviewed Artikeln und klinischer Forschung, chronologisch geordnet.",
    "blog.articles": "Artikel",
    "blog.years": "Jahre",
    "blog.article": "Artikel",
    "blog.lookingForResearch": "Suchen Sie nach bestimmter Forschung?",
    "blog.useSearch":
      "Nutzen Sie unsere Suche, um Artikel nach Thema, Autor oder Stichwort zu finden.",
    "blog.searchArticles": "Artikel Suchen",
    "blog.forHealthcareProfessionals":
      "Nur für lizenzierte medizinische Fachkräfte",

    // Doctor verification modal
    "verification.title": "Verifizierung für Medizinische Fachkräfte",
    "verification.subtitle": "Zugang zur Medizinischen Literatur",
    "verification.notice": "Wichtiger Hinweis",
    "verification.noticeText":
      "Die medizinischen Artikel und Forschungsinhalte in diesem Bereich sind nur für lizenzierte Gesundheitsfachkräfte bestimmt. Die präsentierten Informationen dienen Bildungszwecken und sollten das klinische Urteil nicht ersetzen.",
    "verification.confirmCredentials":
      "Bitte bestätigen Sie Ihre Qualifikation",
    "verification.confirmText":
      "Ich bestätige, dass ich eine lizenzierte Gesundheitsfachkraft bin (Arzt, Krankenschwester, Apotheker oder anderer qualifizierter medizinischer Praktiker) und verstehe, dass der Inhalt für die professionelle medizinische Ausbildung bestimmt ist.",
    "verification.cancel": "Abbrechen",
    "verification.confirm": "Bestätigen & Fortfahren",
    "verification.terms":
      "Durch Fortfahren stimmen Sie unseren Nutzungsbedingungen und Datenschutzrichtlinien zu",

    // Hero section
    "hero.tagline":
      "Wir glauben, dass die Gesundheit die Grundlage für ein glückliches Leben ist!",
    "hero.description":
      "NEUES LEBEN LLC ist ein Vertriebsunternehmen der Pharmaindustrie auf dem usbekischen Markt. Das Unternehmen NEUES LEBEN wurde 2018 gegründet und begann seine Geschichte mit dem Großhandelsverkauf von Arzneimitteln in der gesamten Republik Usbekistan.",
    "hero.description2":
      "Bis heute konzentriert sich das Unternehmen auf den Direktvertrieb von Arzneimitteln über eine eigene Vertriebsabteilung. Seit 2019 hat das Unternehmen eine neue Dimension erreicht und schließt Direktverträge mit ausländischen Herstellern ab.",
    "hero.learnMore": "Mehr erfahren",
    "hero.contactUs": "Kontaktieren Sie uns",
    "hero.established": "Gegründet 2018",
    "hero.quality": "Qualität, Pünktlichkeit, zuverlässige Partnerschaft",

    // About section
    "about.title": "Über das Unternehmen",
    "about.subtitle": "Ihr zuverlässiger Partner in der Pharmaindustrie",
    "about.founded": "Gegründet 2018",
    "about.warehouse":
      "Das Lager erhielt die höchste Bewertung für die Einhaltung der Lagerqualitätsstandards.",
    "about.paragraph1":
      "NEUES LEBEN LLC ist ein Vertriebsunternehmen der Pharmaindustrie auf dem usbekischen Markt. Das Unternehmen NEUES LEBEN wurde 2018 gegründet und begann seine Geschichte mit dem Großhandelsverkauf von Arzneimitteln in der gesamten Republik Usbekistan.",
    "about.paragraph2":
      "Seit 2019 hat das Unternehmen eine neue Dimension erreicht und schließt Direktverträge mit ausländischen Herstellern ab, die den Import und die Vermarktung hochwertiger Arzneimittel ermöglichen. Das Unternehmen NEUES LEBEN verfügt über ein Lager, in dem Arzneimittel in höchster Qualität gelagert werden.",
    "about.conclusion":
      "Die wichtigsten Grundsätze unserer Arbeit sind die Qualität unserer Produkte, pünktliche Lieferung und zuverlässige Partnerschaft!",

    // Mission section
    "mission.title": "Unsere Mission",
    "mission.paragraph1":
      "Gesundheitsschutz gewährleisten und die Lebensqualität der Bevölkerung des Landes verbessern, indem wir Verbraucher über neue Trends bei wirksamen und erschwinglichen Behandlungen informieren.",
    "mission.paragraph2":
      "Das Unternehmen verwendet moderne Ansätze und benutzt die neuesten Entwicklungen, um die Gesundheit und das Wohlbefinden der Patienten zu verbessern.",
    "mission.healthFocus":
      "Wir streben danach, die Lebensqualität der Nation zu verbessern.",
    "mission.protection": "Gesundheitsschutz",
    "mission.protectionDesc":
      "Wir ermöglichen Zugang zu hochwertigen Medikamenten",
    "mission.community": "Fokus auf die Gemeinschaft",
    "mission.communityDesc": "Wir arbeiten zum Wohle der Gesellschaft",
    "mission.care": "Patientenbetreuung",
    "mission.careDesc":
      "Wir nutzen moderne Ansätze zur Verbesserung des Wohlbefindens",

    // Values section
    "values.title": "Unsere Werte",
    "values.subtitle": "Die Prinzipien, die unser Unternehmen leiten",
    "values.honesty.title": "Ehrlichkeit",
    "values.honesty.description":
      "ist der Grundwert unseres Unternehmens. Wir glauben an Offenheit, Transparenz und Wahrhaftigkeit in all unseren Beziehungen – mit Kunden, Partnern, Mitarbeitern und der Gesellschaft.",
    "values.professionalism.title": "Professionalität",
    "values.professionalism.description":
      "Wir entwickeln unsere Fähigkeiten und Kenntnisse ständig weiter, um unseren Kunden qualitativ hochwertige Dienstleistungen zu bieten und ihre Anfragen umgehend zu beantworten.",
    "values.leadership.title": "Führung",
    "values.leadership.description":
      "Wir konzentrieren uns auf das Erreichen ehrgeiziger Ziele und fördern ergebnisorientierte Führung.",
    "values.aspiration.title": "Streben",
    "values.aspiration.description":
      "Wir streben nach geschäftlichem Erfolg und unterstützen unsere Kunden und Partner dabei, erfolgreich zu sein.",
    "values.support.title": "Unterstützung",
    "values.support.description":
      "Wir sind ein zuverlässiger Partner und unterstützen Sie umfassend für den gemeinsamen Erfolg.",

    // Team section
    "team.title": "Unser Team",
    "team.companyPrefix": "",
    "team.employeeCount": "NEUES LEBEN beschäftigt über",
    "team.employeeSuffix": "hochqualifizierte Mitarbeiter.",
    "team.departmentsTitle": "Unsere Abteilungen:",
    "team.departments.admin": "Abteilung für Verwaltungs- und Führungskräfte",
    "team.departments.hr": "Personalabteilung (Personalmanagement)",
    "team.departments.legal": "Rechtsabteilung",
    "team.departments.sales": "Vertriebs- und Marketingabteilung",
    "team.departments.medical": "Team der Medizinvertreter",
    "team.departments.foreign": "Abteilung für Außenwirtschaftsaktivitäten",
    "team.departments.registration": "Abteilung für Arzneimittelregistrierung",
    "team.departments.logistics": "Logistikabteilung",
    "team.departments.customs": "Team der Anmelder",
    "team.teamSpirit":
      "Jeder Mitarbeiter stärkt das Image des Unternehmens als zuverlässiger Pharmahändler, indem er qualitativ hochwertige Dienstleistungen und eine professionelle Arbeitsweise bietet.",
    "team.gallery.title": "Lernen Sie unser Team kennen",
    "team.gallery.memberDescription":
      "Ein engagierter Fachmann mit umfangreicher Erfahrung in der Pharmaindustrie. Verpflichtet zu unserer Mission, Gesundheit und Lebensqualität durch innovative Lösungen und zuverlässige Partnerschaften zu verbessern.",
    "team.gallery.showMore": "mehr anzeigen",
    "team.gallery.showLess": "weniger anzeigen",

    // Culture section
    "culture.title": "Unternehmenskultur",
    "culture.paragraph1":
      "Unsere Unternehmenskultur basiert auf bewährten Werten und Traditionen. Wir fördern Familienwerte und einen gesunden Lebensstil, entwickeln uns weiter und lernen dazu.",
    "culture.paragraph2":
      "Wir sind stolz auf unsere Erfolge am Markt und darauf, dass unsere Mitarbeiter Praktika im Ausland absolvieren. Gemeinsame Urlaube, Wettbewerbe und moderne Kommunikationsformen machen uns zu einem eingeschworenen Team.",
    "culture.paragraph3":
      "Jeder Mitarbeiter stärkt das Image des Unternehmens als zuverlässiger Pharmahändler.",
    "culture.family.title": "Familienwerte",
    "culture.family.description":
      "Wir unterstützen und fördern Familienwerte und einen gesunden Lebensstil",
    "culture.achievements.title": "Markterfolge",
    "culture.achievements.description":
      "Wir sind stolz auf unsere Erfolge im Pharmamarkt.",
    "culture.internships.title": "Internationale Erfahrung",
    "culture.internships.description":
      "Unsere Mitarbeiter absolvieren Praktika im Ausland, um ihre Qualifikationen zu verbessern.",
    "culture.events.title": "Teambilding",
    "culture.events.description":
      "Gemeinsame Urlaube und Events machen uns zu einem eingeschworenen Team.",

    // Achievements section
    "achievements.title": "Unsere Erfolge",
    "achievements.award": "Vertriebsleiter des Jahres",
    "achievements.description":
      "In den letzten vier Jahren hatte unser Team führende Positionen im Vertrieb der Pharmaindustrie in der Holdinggruppe Inso Farm Deluxe LLC inne und wurde jährlich mit der Auszeichnung Sales Leader of the Year ausgezeichnet.",
    "achievements.growth": "Unser Teamwachstum",
    "achievements.growthDescription":
      "Unser Teamwachstum von 14 auf 135 Mitarbeiter ist ein klarer Beleg für den Erfolg unserer Aktivitäten in der Pharmaindustrie und die steigende Nachfrage nach unseren Produkten.",
    "achievements.growthChart": "Teamwachstumsdynamik",
    "achievements.award1.title": "Vertriebsleiter 2022",
    "achievements.award1.year": "INSO Group",
    "achievements.award2.title": "Bester Distributor 2023",
    "achievements.award2.year": "Pharmazeutischer Verband",
    "achievements.award3.title": "Qualitätsexzellenz 2024",
    "achievements.award3.year": "Branchenanerkennung",

    // Partners section
    "partners.title": "Unsere Partner",
    "partners.subtitle":
      "Wir kooperieren mit führenden Pharmaherstellern weltweit.",
    "partners.countries": "Wir kooperieren mit:",
    "partners.southKorea": "Südkorea",
    "partners.poland": "Polen",
    "partners.china": "China",
    "partners.india": "Indien",
    "partners.products": "Exklusive Arzneimittel",
    "partners.productsDescription":
      "Mehr als 50 exklusive Arzneimittel aus ausländischer und lokaler Produktion",
    "partners.product": "Produkt",

    // Infrastructure section
    "infrastructure.title": "Infrastruktur",
    "infrastructure.subtitle":
      "NEUES LEBEN verfügt über eine moderne Logistikinfrastruktur.",
    "infrastructure.warehouse.title": "Modernes Lager",
    "infrastructure.warehouse.description":
      "Das Unternehmen verfügt über ein Lager. Das Unternehmen erfüllt die Standards der Good Distribution Practice (GDP).",
    "infrastructure.warehouse.standards":
      "Einhaltung höchster Qualitätsstandards",
    "infrastructure.warehouse.size": "Lagerfläche: 10.000 m²",
    "infrastructure.logistics.title": "Moderne Logistik",
    "infrastructure.logistics.description":
      "Die Fahrzeuge sind mit modernen Kühlaggregaten ausgestattet, die einen sicheren und qualitativ hochwertigen Transport der Produkte unter Einhaltung der erforderlichen Temperaturbedingungen gewährleisten.",
    "infrastructure.logistics.temperature":
      "Temperaturkontrolle in allen Phasen",
    "infrastructure.logistics.modern": "Moderner Fuhrpark",
    "infrastructure.logistics.efficient": "Effiziente Lieferung im ganzen Land",

    // Coverage section
    "coverage.title": "Unsere Reichweite",
    "coverage.subtitle": "Wir verkaufen in ganz Usbekistan",
    "coverage.description":
      "Wir verkaufen in ganz Usbekistan und gewährleisten eine zuverlässige Versorgung mit Arzneimitteln in alle Regionen des Landes.",
    "coverage.offices": "Regionale Niederlassungen",
    "coverage.officesDescription":
      "Wir verfügen über Vertriebsbüros in allen Regionen des Landes unter der Leitung von Regionalmanagern.",
    "coverage.mapTitle": "Landesweite Verteilung",
    "coverage.mapDescription":
      "Sicherung des Zugangs zu hochwertigen Medikamenten in ganz Usbekistan",
    "coverage.cooperation":
      "Wir sind offen für eine für beide Seiten vorteilhafte und langfristige Zusammenarbeit.",
    "coverage.uzbekistanMap": "Abdeckungskarte Usbekistan",
    "coverage.stats.regions": "Abgedeckte Regionen",
    "coverage.stats.team": "Teammitglieder",
    "coverage.stats.network": "Vertriebsnetz",

    // Contact section
    "contact.title": "Kontaktieren Sie uns",
    "contact.subtitle":
      "Wir sind offen für eine für beide Seiten vorteilhafte und langfristige Zusammenarbeit",
    "contact.form.title": "Senden Sie uns eine Nachricht",
    "contact.form.name": "Name",
    "contact.form.namePlaceholder": "Ihr Name",
    "contact.form.email": "E-Mail",
    "contact.form.emailPlaceholder": "Ihr E-Mail",
    "contact.form.message": "Nachricht",
    "contact.form.messagePlaceholder": "Ihre Nachricht",
    "contact.form.submit": "Nachricht senden",
    "contact.info.title": "Kontaktinformationen",
    "contact.info.address.title": "Adresse",
    "contact.info.address.value":
      "100047, Republik Usbekistan, Taschkent, Bezirk Yashnabad, Akhangaran Highway, st. Parkentskaya Nr. 333",
    "contact.info.phone.title": "Telefon",
    "contact.info.phone.value": "+998 90 903 03 31 / +998 97 769 64 80",
    "contact.info.email.title": "E-Mail",
    "contact.info.email.value":
      "info@neuesleben.uz, import@neuesleben.uz, sales@neuesleben.uz",
    "contact.info.tagline": "Ihr zuverlässiger Partner in der Pharmaindustrie",

    //Footer section
    "footer.description":
      "OOO NEUES LEBEN ist ein Vertriebsunternehmen, das in der pharmazeutischen Industrie Usbekistans tätig ist.",
    "footer.about": "Über uns",
    "footer.aboutUs": "Über uns",
    "footer.mission": "Mission",
    "footer.values": "Werte",
    "footer.team": "Team",
    "footer.activities": "Aktivitäten",
    "footer.partners": "Partner",
    "footer.infrastructure": "Infrastruktur",
    "footer.coverage": "Abdeckung",
    "footer.achievements": "Erfolge",
    "footer.contacts": "Kontakt",
    "footer.location": "Taschkent, Usbekistan",
    "footer.rights": "Alle Rechte vorbehalten.",
    "footer.openToCooperation":
      "Wir sind offen für eine für beide Seiten vorteilhafte und langfristige Zusammenarbeit.",
  },
};

// Define the provider props
interface LanguageProviderProps {
  children: ReactNode;
}

// Create the provider component
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Initialize the language state from localStorage if available
  const [language, setLanguageState] = useState<Language>("ru");

  // Effect to load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["en", "uz", "ru", "de"].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Function to set language and save to localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  // Translation function
  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  // Return the provider with the value
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
