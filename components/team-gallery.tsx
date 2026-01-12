"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type TeamMember = {
  id: number;
  name: string;
  nameLatin: string;
  position: {
    en: string;
    uz: string;
    ru: string;
    de: string;
  };
  description: {
    en: string;
    uz: string;
    ru: string;
    de: string;
  };
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 5,
    name: "Хўжаев Жаҳонгир",
    nameLatin: "Xo'jayev Jahongir",
    position: {
      en: "Founder",
      uz: "Asoschi",
      ru: "Основатель",
      de: "Gründer",
    },
    description: {
      en: "Strategic leader and expert with many years of experience in the pharmaceutical industry. Consistently develops the company based on values of quality, innovation, and responsibility. Committed to the mission of improving health and quality of life through implementing modern solutions and building long-term, reliable partnerships.",
      uz: "Farmatsevtika sohasida ko'p yillik tajribaga ega strategik lider va ekspert. Sifat, innovatsiyalar va mas'uliyat qadriyatlariga tayanib, kompaniyani izchil rivojlantirib kelmoqda. Zamonaviy echimlarni joriy etish va uzoq muddatli, ishonchli hamkorlik aloqalarini o'rnatish orqali salomatlik va hayot sifatini yaxshilash missiyasiga sodiq.",
      ru: "Стратегический лидер и эксперт с многолетним опытом в фармацевтической отрасли. Последовательно развивает компанию, опираясь на ценности качества, инноваций и ответственности. Привержен миссии улучшения здоровья и качества жизни через внедрение современных решений и выстраивание долгосрочных, надёжных партнёрских отношений.",
      de: "Strategischer Leiter und Experte mit langjähriger Erfahrung in der Pharmaindustrie. Entwickelt das Unternehmen konsequent auf der Grundlage von Werten wie Qualität, Innovation und Verantwortung weiter. Engagiert für die Mission, Gesundheit und Lebensqualität durch die Einführung moderner Lösungen und den Aufbau langfristiger, zuverlässiger Partnerschaften zu verbessern.",
    },
    image: "/Team/J_Xujayev.jpg",
  },
  {
    id: 2,
    name: "Ахтамов Озот Азимбоевич",
    nameLatin: "Akhtamov Ozod Azimboyevich",
    position: {
      en: "CEO",
      uz: "Bosh direktor",
      ru: "Директор",
      de: "Geschäftsführer",
    },
    description: {
      en: "Experienced executive with a systematic approach to management and a deep understanding of business processes. Ensures sustainable company development, effective team interaction, and high operational standards. Focused on achieving strategic goals and delivering long-term value to partners and clients.",
      uz: "Boshqaruvga tizimli yondashuv va biznes jarayonlarini chuqur tushunishga ega tajribali rahbar. Kompaniyaning barqaror rivojlanishini, jamoalarning samarali o'zaro hamkorligini va yuqori operatsion standartlarni ta'minlaydi. Strategik maqsadlarga erishish va hamkorlar hamda mijozlar uchun uzoq muddatli qiymat yaratishga yo'naltirilgan.",
      ru: "Опытный руководитель с системным подходом к управлению и глубоким пониманием бизнес-процессов. Обеспечивает устойчивое развитие компании, эффективное взаимодействие команд и высокие стандарты операционной деятельности. Ориентирован на достижение стратегических целей и долгосрочную ценность для партнёров и клиентов.",
      de: "Erfahrener Manager mit einem systematischen Führungsansatz und einem tiefen Verständnis für Geschäftsprozesse. Gewährleistet eine nachhaltige Unternehmensentwicklung, effektive Teaminteraktion und hohe operative Standards. Fokussiert auf das Erreichen strategischer Ziele und langfristigen Wert für Partner und Kunden.",
    },
    image: "/Team/АхтамовОзотАзимбоевичДиректор.jpg",
  },
  {
    id: 27,
    name: "Хужаев Жавохиир Жамшидхон Угли",
    nameLatin: "Xo'jayev Javohir Jamshidkhon",
    position: {
      en: "Financial Director",
      uz: "Moliyachi",
      ru: "Финансист",
      de: "Finanzier",
    },
    description: {
      en: "Experienced finance professional with a systematic approach to managing financial flows and a deep understanding of economic processes. Ensures financial stability, transparent reporting, and effective resource planning. Focused on achieving strategic goals, optimizing costs, and creating long-term value for businesses, partners, and clients.",
      uz: "Moliyaviy oqimlarni boshqarishda tizimli yondashuvga ega va iqtisodiy jarayonlarni chuqur tushunadigan tajribali moliyachi. Moliyaviy barqarorlikni, hisobotlarning shaffofligini va resurslardan samarali rejalashtirishni ta’minlaydi. Strategik maqsadlarga erishish, xarajatlarni optimallashtirish hamda biznes, hamkorlar va mijozlar uchun uzoq muddatli qiymat yaratishga yo‘naltirilgan.",
      ru: "Опытный финансист с системным подходом к управлению финансовыми потоками и глубоким пониманием экономических процессов. Обеспечивает финансовую устойчивость, прозрачность отчётности и эффективное планирование ресурсов. Ориентирован на достижение стратегических целей, оптимизацию затрат и создание долгосрочной ценности для бизнеса, партнёров и клиентов.",
      de: "Erfahrener Finanzexperte mit einem systematischen Ansatz im Management von Finanzströmen und einem tiefen Verständnis wirtschaftlicher Prozesse. Gewährleistet finanzielle Stabilität, transparente Berichterstattung und eine effiziente Ressourcenplanung. Fokussiert auf das Erreichen strategischer Ziele, Kostenoptimierung und die Schaffung langfristiger Werte für Unternehmen, Partner und Kunden.",
    },
    image: "/Team/Javohir.jpg",
  },
  {
    id: 3,
    name: "Шатемирова Дилфуза Каюмовна",
    nameLatin: "Shatemirova Dilfuza Kayumovna",
    position: {
      en: "Quality Control Manager",
      uz: "Sifat nazorati menejeri",
      ru: "Менеджер по качеству продукции",
      de: "Produktqualitätsmanager",
    },
    description: {
      en: "Specialist in quality assurance focusing on compliance with industry standards and regulatory requirements. Responsible for product quality control, implementing and maintaining quality systems, ensuring processes meet safety and reliability requirements.",
      uz: "Sanoat standartlari va me'yoriy talablarga rioya qilishga qaratilgan sifatni ta'minlash bo'yicha mutaxassis. Mahsulot sifatini nazorat qilish, sifat tizimlarini joriy etish va yuritish, shuningdek, jarayonlarning xavfsizlik va ishonchlilik talablariga muvofiqligini ta'minlashga mas'ul.",
      ru: "Специалист в области обеспечения качества с фокусом на соблюдение отраслевых стандартов и нормативных требований. Отвечает за контроль качества продукции, внедрение и поддержание систем качества, а также за соответствие процессов требованиям безопасности и надёжности.",
      de: "Spezialistin für Qualitätssicherung mit Fokus auf die Einhaltung von Industriestandards und regulatorischen Anforderungen. Verantwortlich für die Produktqualitätskontrolle, die Einführung und Aufrechterhaltung von Qualitätssystemen sowie die Sicherstellung, dass Prozesse den Sicherheits- und Zuverlässigkeitsanforderungen entsprechen.",
    },
    image: "/Team/ШатемироваДилфузаКаюмовнаменеджер по контролю кач.jpg",
  },
  {
    id: 4,
    name: "Юсупова Мукаддас Юлдашбаевна",
    nameLatin: "Yusupova Mukaddas Yuldashboyevna",
    position: {
      en: "HRD",
      uz: "HRD",
      ru: "HRD",
      de: "HRD (Personalwesen)",
    },
    description: {
      en: "Professional HR leader focused on human capital development and building strong corporate culture. Formulates and implements HR strategy, builds effective recruitment, development, and retention systems, fostering employee engagement and achieving company strategic goals.",
      uz: "Inson kapitalini rivojlantirish va kuchli korporativ madaniyatni shakllantirishga qaratilgan professional HR rahbari. HR strategiyasini shakllantiradi va amalga oshiradi, xodimlarni tanlash, rivojlantirish va saqlab qolishning samarali tizimlarini quradi, xodimlarning jalb qilinganligini oshirishga va kompaniyaning strategik maqsadlariga erishishga hissa qo'shadi.",
      ru: "Профессиональный HR-лидер с фокусом на развитие человеческого капитала и формирование сильной корпоративной культуры. Формирует и реализует HR-стратегию, выстраивает эффективные системы подбора, развития и удержания персонала, способствуя росту вовлечённости сотрудников и достижению стратегических целей компании.",
      de: "Professionelle HR-Führungskraft mit Fokus auf Humankapitalentwicklung und Aufbau einer starken Unternehmenskultur. Formuliert und implementiert die HR-Strategie, baut effektive Systeme für Rekrutierung, Entwicklung und Bindung von Mitarbeitern auf und fördert das Mitarbeiterengagement sowie die Erreichung der strategischen Unternehmensziele.",
    },
    image: "/Team/Мукаддас Юлдашбаевна HR.jpg",
  },
  {
    id: 23,
    name: "Саидова Нигора Азизхановна",
    nameLatin: "Saidova Nigora Azizkhanovna",
    position: {
      en: "Product Manager",
      uz: "Mahsulotlar bo'yicha menejer",
      ru: "Менеджер по продуктам",
      de: "Produktmanager",
    },
    description: {
      en: "Product management expert focused on development, implementation, and promotion of company products. Responsible for strategic planning of product line, market analysis, product lifecycle management, ensuring compliance with customer needs and quality standards.",
      uz: "Kompaniya mahsulotlarini ishlab chiqish, joriy etish va ilgari surishga qaratilgan mahsulot boshqaruvi bo'yicha ekspert. Mahsulot qatorini strategik rejalashtirish, bozor tahlili, mahsulotning hayot aylanishini kuzatib borish va ularning mijozlar ehtiyojlari hamda sifat standartlariga muvofiqligini ta'minlashga javobgar.",
      ru: "Эксперт по управлению продуктами с фокусом на разработку, внедрение и продвижение продукции компании. Отвечает за стратегическое планирование продуктовой линейки, анализ рынка, сопровождение жизненного цикла продуктов и обеспечение их соответствия потребностям клиентов и стандартам качества.",
      de: "Experte für Produktmanagement mit Fokus auf Entwicklung, Einführung und Förderung von Unternehmensprodukten. Verantwortlich für die strategische Planung der Produktlinie, Marktanalyse, Begleitung des Produktlebenszyklus und Sicherstellung der Übereinstimmung mit Kundenbedürfnissen und Qualitätsstandards.",
    },
    image: "/Team/Саидова Нигора Азизхановна, Менеджер по продуктам.jpg",
  },

  {
    id: 6,
    name: "Мавланов Самад Хайитбоевич",
    nameLatin: "Mavlanov Samad Hayitboyevich",
    position: {
      en: "Legal Consultant",
      uz: "Huquqiy maslahatchi",
      ru: "Юрисконсульт",
      de: "Rechtsberater",
    },
    description: {
      en: "Experienced specialist in corporate and civil law. Provides legal support for company activities, monitors compliance with legislation, prepares and reviews contracts, manages legal risks, and facilitates safe business conduct.",
      uz: "Korporativ va fuqarolik huquqi sohasida tajribali mutaxassis. Kompaniya faoliyatini huquqiy qo'llab-quvvatlaydi, qonunchilikka rioya etilishini nazorat qiladi, shartnomalarni tayyorlaydi va tekshiradi, huquqiy xatarlarni tartibga soladi va biznesni xavfsiz yuritishga ko'maklashadi.",
      ru: "Опытный специалист в области корпоративного и гражданского права. Обеспечивает правовую поддержку деятельности компании, контролирует соблюдение законодательства, подготавливает и проверяет договоры, регулирует юридические риски и содействует безопасному ведению бизнеса.",
      de: "Erfahrener Spezialist im Gesellschafts- und Zivilrecht. Leistet rechtliche Unterstützung für die Unternehmenstätigkeit, überwacht die Einhaltung von Gesetzen, bereitet Verträge vor und prüft diese, reguliert rechtliche Risiken und trägt zur sicheren Geschäftsführung bei.",
    },
    image: "/Team/МавлановСамадХайитбоевичюристконкусльт.jpg",
  },
  {
    id: 7,
    name: "Умаров Зафар Рашидович",
    nameLatin: "Umarov Zafar Rashidovich",
    position: {
      en: "Head of foreign economic relations department",
      uz: "Tashqi iqtisodiy faoliyat bo'limi boshlig'i",
      ru: "Начальник отдела ВЭД",
      de: "Leiter der Abteilung für Außenwirtschaft",
    },
    description: {
      en: "Professional in foreign economic activity with experience in organizing international supplies and cooperation with foreign partners. Responsible for coordinating foreign trade operations, compliance with regulatory requirements, logistics, and effective interaction with international counterparties.",
      uz: "Xalqaro etkazib berishlarni tashkil etish va xorijiy hamkorlar bilan hamkorlik qilish tajribasiga ega tashqi iqtisodiy faoliyat bo'yicha professional. Tashqi savdo operatsiyalarini muvofiqlashtirish, me'yoriy talablarga rioya qilish, logistika va xalqaro kontragentlar bilan samarali hamkorlik qilishga javobgar.",
      ru: "Профессионал в области внешнеэкономической деятельности с опытом организации международных поставок и сотрудничества с зарубежными партнёрами. Отвечает за координацию внешнеторговых операций, соблюдение нормативных требований, логистику и эффективное взаимодействие с международными контрагентами.",
      de: "Profi im Bereich Außenwirtschaft mit Erfahrung in der Organisation internationaler Lieferungen und Zusammenarbeit mit ausländischen Partnern. Verantwortlich für die Koordination von Außenhandelsgeschäften, Einhaltung regulatorischer Anforderungen, Logistik und effektive Interaktion mit internationalen Geschäftspartnern.",
    },
    image: "/Team/ZAFARUMAROV.png",
  },
  {
    id: 8,
    name: "Якубходжаев Саидкамол Саидакбарович",
    nameLatin: "Yakubkhojaev Saidkamol Saidakbarovich",
    position: {
      en: "Warehouse Manager",
      uz: "Ombor mudiri",
      ru: "Зав. склада",
      de: "Lagerleiter",
    },
    description: {
      en: "Specialist in warehouse operations management focusing on efficiency, accuracy, and inventory control. Responsible for organizing receipt, storage, and issuance of products, maintaining warehouse records, and ensuring uninterrupted logistics within the company.",
      uz: "Samaradorlik, aniqlik va zaxiralarni nazorat qilishga urg'u beruvchi ombor operatsiyalarini boshqarish bo'yicha mutaxassis. Mahsulotlarni qabul qilish, saqlash va berishni tashkil etish, ombor hisobini yuritish va kompaniya ichida uzluksiz logistikani ta'minlashga javobgar.",
      ru: "Специалист по управлению складскими операциями с акцентом на эффективность, точность и контроль запасов. Отвечает за организацию приёмки, хранения и выдачи продукции, ведение складского учёта и обеспечение бесперебойной логистики внутри компании.",
      de: "Spezialist für Lagerverwaltungsoperationen mit Schwerpunkt auf Effizienz, Genauigkeit und Bestandskontrolle. Verantwortlich für die Organisation von Annahme, Lagerung und Ausgabe von Produkten, Lagerbuchhaltung und Sicherstellung einer reibungslosen Logistik innerhalb des Unternehmens.",
    },
    image: "/Team/ЯкубходжаевСаидкамолСаидакбаровичЗавсклада.jpg",
  },
  {
    id: 9,
    name: "Алибаев Камолиддин Абдузокирович",
    nameLatin: "Alibaev Kamoliddin Abduzoqirovich",
    position: {
      en: "HDM",
      uz: "HDM",
      ru: "HDM",
      de: "HDM",
    },
    description: {
      en: "Specialist in managing business processes and developing territorial divisions of the company. Responsible for coordinating work, implementing effective procedures, and ensuring key performance indicators are met, contributing to sustainable growth and business development.",
      uz: "Biznes jarayonlarini boshqarish va kompaniyaning hududiy bo'linmalarini rivojlantirish bo'yicha mutaxassis. Ishlarni muvofiqlashtirish, samarali tartib-qoidalarni joriy etish va asosiy ko'rsatkichlarga erishishni ta'minlashga javobgar bo'lib, biznesning barqaror o'sishi va rivojlanishiga hissa qo'shadi.",
      ru: "Специалист по управлению деловыми процессами и развитием территориальных подразделений компании. Отвечает за координацию работы, внедрение эффективных процедур и обеспечение достижения ключевых показателей, способствуя устойчивому росту и развитию бизнеса.",
      de: "Spezialist für die Steuerung von Geschäftsprozessen und die Entwicklung territorialer Unternehmenseinheiten. Verantwortlich für die Arbeitskoordination, Einführung effektiver Verfahren und Sicherstellung der Erreichung von Leistungskennzahlen, was zu nachhaltigem Wachstum und Geschäftsentwicklung beiträgt.",
    },
    image: "/Team/Алибаев Камолиддин Абдузокирович  HDM.jpg",
  },
  {
    id: 10,
    name: "Абдурахмонов Акмалжон Абдуллажонович",
    nameLatin: "Abdurakhmonov Akmaljon Abdullajonovich",
    position: {
      en: "HDM",
      uz: "HDM",
      ru: "HDM",
      de: "HDM",
    },
    description: {
      en: "Specialist in managing business processes and developing regional divisions. Responsible for coordinating activities, implementing effective procedures, and ensuring stable functioning of divisions, contributing to the achievement of the company's strategic goals.",
      uz: "Biznes jarayonlarini boshqarish va mintaqaviy bo'linmalarni rivojlantirish bo'yicha mutaxassis. Faoliyatni muvofiqlashtirish, samarali tartib-qoidalarni joriy etish va bo'linmalarning barqaror ishlashini ta'minlashga javobgar bo'lib, kompaniyaning strategik maqsadlariga erishishga hissa qo'shadi.",
      ru: "Специалист по управлению деловыми процессами и развитием региональных подразделений. Отвечает за координацию деятельности, внедрение эффективных процедур и обеспечение стабильного функционирования подразделений, способствуя достижению стратегических целей компании.",
      de: "Spezialist für die Steuerung von Geschäftsprozessen und die Entwicklung regionaler Einheiten. Verantwortlich für die Koordination von Aktivitäten, Einführung effektiver Verfahren und Sicherstellung des stabilen Funktionierens von Abteilungen, was zur Erreichung der strategischen Unternehmensziele beiträgt.",
    },
    image: "/Team/Абдурахмонов Акмалжон Абдуллажонович .jpg",
  },
  {
    id: 11,
    name: "Полвонова Парвина Рахматуллаевна",
    nameLatin: "Polvonova Parvina Rahmatullayevna",
    position: {
      en: "Regional Manager for Tashkent",
      uz: "Toshkent shahri bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по г. Ташкенту",
      de: "Regionalmanagerin für Taschkent",
    },
    description: {
      en: "Professional in regional sales and client relationship management. Responsible for market development in Tashkent, maintaining long-term partnerships, meeting sales targets, and ensuring high-quality customer service.",
      uz: "Mintaqaviy savdo va mijozlar bilan munosabatlarni boshqarish sohasida professional. Toshkent shahrida bozor rivojlanishi, uzoq muddatli hamkorlik aloqalarini saqlash, savdo rejalarini bajarish va mijozlarga yuqori darajadagi xizmat ko'rsatishni ta'minlashga javobgar.",
      ru: "Профессионал в области региональных продаж и управления клиентскими отношениями. Отвечает за развитие рынка в г. Ташкент, поддержание долгосрочных партнёрских связей, выполнение планов продаж и обеспечение высокого уровня обслуживания клиентов.",
      de: "Profi im Bereich regionaler Vertrieb und Kundenbeziehungsmanagement. Verantwortlich für die Marktentwicklung in Taschkent, Pflege langfristiger Partnerschaften, Erfüllung von Verkaufszielen und Sicherstellung eines hochwertigen Kundenservice.",
    },
    image:
      "/Team/ПолвоноваПарвинаРахматуллаевнаРегиональныйменеджерпогТашкента.jpg",
  },
  {
    id: 12,
    name: "Уразалиев Орзубек Данабой ўғли",
    nameLatin: "Urazaliyev Orzubek Danaboy oʻgʻli",
    position: {
      en: "Regional Manager for Samarkand Region",
      uz: "Samarqand viloyati bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Самаркандской области",
      de: "Regionalmanager für die Region Samarkand",
    },
    description: {
      en: "Experienced specialist in regional sales and market development. Responsible for managing client relationships, meeting sales targets, and strengthening the company's position within the Samarkand region, ensuring high service levels and long-term partnerships.",
      uz: "Mintaqaviy savdo va bozorni rivojlantirish sohasida tajribali mutaxassis. Mijozlar bilan munosabatlarni boshqarish, savdo rejalarini bajarish va Samarqand viloyati hududida kompaniya mavqeini mustahkamlash, yuqori darajadagi xizmat va uzoq muddatli hamkorlik aloqalarini ta'minlashga javobgar.",
      ru: "Опытный специалист в области региональных продаж и развития рынка. Отвечает за управление клиентскими отношениями, выполнение планов продаж и укрепление позиций компании на территории Самаркандской области, обеспечивая высокий уровень обслуживания и долгосрочные партнёрские связи.",
      de: "Erfahrener Spezialist im Bereich regionaler Vertrieb und Marktentwicklung. Verantwortlich für Kundenbeziehungsmanagement, Erfüllung von Verkaufszielen und Stärkung der Unternehmensposition in der Region Samarkand, Gewährleistung eines hohen Serviceniveaus und langfristiger Partnerschaften.",
    },
    image:
      "/Team/Уразалиев Орзубек Данабой ўғли  Региональный менеджер по Самаркандской области.jpg",
  },
  {
    id: 13,
    name: "Юлдошева Гулмира Жонимкуловна",
    nameLatin: "Yuldosheva Gulmira Jonimqulovna",
    position: {
      en: "Regional Manager for Kashkadarya Region",
      uz: "Qashqadaryo viloyati bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Кашкадарьинской области",
      de: "Regionalmanagerin für die Region Qashqadarya",
    },
    description: {
      en: "Specialist in regional sales development and client relationship management. Responsible for strengthening company positions, meeting sales targets, and maintaining long-term partnerships in the Kashkadarya region, ensuring high customer service levels.",
      uz: "Mintaqaviy savdoni rivojlantirish va mijozlar bilan munosabatlarni boshqarish bo'yicha mutaxassis. Qashqadaryo viloyati hududida kompaniya mavqeini mustahkamlash, savdo rejalarini bajarish va uzoq muddatli hamkorlik aloqalarini saqlash, mijozlarga yuqori darajadagi xizmat ko'rsatishni ta'minlashga javobgar.",
      ru: "Специалист по развитию региональных продаж и управлению клиентскими отношениями. Отвечает за укрепление позиций компании, выполнение планов продаж и поддержание долгосрочных партнёрских связей на территории Кашкадарьинской области, обеспечивая высокий уровень обслуживания клиентов.",
      de: "Spezialistin für regionale Vertriebsentwicklung und Kundenbeziehungsmanagement. Verantwortlich für die Stärkung der Unternehmensposition, Erfüllung von Verkaufszielen und Pflege langfristiger Partnerschaften in der Region Qashqadarya sowie Sicherstellung eines hohen Kundenserviceniveaus.",
    },
    image:
      "/Team/Юлдошева Гулмира Жонимкуловна  Региональный менеджер по Кашкадарьинской области.jpg",
  },
  {
    id: 14,
    name: "Санақулова Малика Умаровна",
    nameLatin: "Sanaqulova Malika Umarovna",
    position: {
      en: "Regional Manager for Navoi Region",
      uz: "Navoiy viloyati bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Навоийской области",
      de: "Regionalmanagerin für die Region Navoiy",
    },
    description: {
      en: "Specialist in regional sales development and client relationship management. Responsible for meeting sales targets, strengthening company positions, and maintaining long-term partnerships in the Navoi region, ensuring high customer service levels.",
      uz: "Mintaqaviy savdoni rivojlantirish va mijozlar bilan munosabatlarni boshqarish bo'yicha mutaxassis. Navoiy viloyati hududida savdo rejalarini bajarish, kompaniya mavqeini mustahkamlash va uzoq muddatli hamkorlik aloqalarini saqlash, mijozlarga yuqori darajadagi xizmat ko'rsatishni ta'minlashga javobgar.",
      ru: "Специалист по развитию региональных продаж и управлению клиентскими отношениями. Отвечает за выполнение планов продаж, укрепление позиций компании и поддержание долгосрочных партнёрских связей на территории Навоийской области, обеспечивая высокий уровень обслуживания клиентов.",
      de: "Spezialistin für regionale Vertriebsentwicklung und Kundenbeziehungsmanagement. Verantwortlich für die Erfüllung von Verkaufszielen, Stärkung der Unternehmensposition und Pflege langfristiger Partnerschaften in der Region Navoiy sowie Sicherstellung eines hohen Kundenserviceniveaus.",
    },
    image:
      "/Team/Санақулова Малика Умаровна  Региональный менеджер по Навоийской области.jpg",
  },
  {
    id: 15,
    name: "Шодманов Бунёд Хамдамович",
    nameLatin: "Shodmanov Bunyod Khamdamovich",
    position: {
      en: "Regional Manager for Surkhandarya Region",
      uz: "Surxondaryo viloyati bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Сурхандарьинской области",
      de: "Regionalmanager für die Region Surxondaryo",
    },
    description: {
      en: "Specialist in regional sales and client relationship development. Responsible for meeting sales targets, strengthening company positions, and maintaining long-term partnerships in the Surkhandarya region, ensuring high customer service levels.",
      uz: "Mintaqaviy savdo va mijozlar bilan munosabatlarni rivojlantirish bo'yicha mutaxassis. Surxondaryo viloyati hududida savdo rejalarini bajarish, kompaniya mavqeini mustahkamlash va uzoq muddatli hamkorlik aloqalarini saqlash, mijozlarga yuqori darajadagi xizmat ko'rsatishni ta'minlashga javobgar.",
      ru: "Специалист по региональным продажам и развитию клиентских отношений. Отвечает за выполнение планов продаж, укрепление позиций компании и поддержание долгосрочных партнёрских связей на территории Сурхандарьинской области, обеспечивая высокий уровень обслуживания клиентов.",
      de: "Spezialist für regionalen Vertrieb und Kundenbeziehungsentwicklung. Verantwortlich für die Erfüllung von Verkaufszielen, Stärkung der Unternehmensposition und Pflege langfristiger Partnerschaften in der Region Surxondaryo sowie Sicherstellung eines hohen Kundenserviceniveaus.",
    },
    image:
      "/Team/Шодманов Бунёд Хамдамович  Региональный менеджер по Сурхандарьинской области.jpg",
  },
  {
    id: 16,
    name: "Абдулазизова Нозима Машрабовна",
    nameLatin: "Abdulazizova Nozima Mashrabovna",
    position: {
      en: "Regional Manager for Namangan Region",
      uz: "Namangan viloyati bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Наманганской области",
      de: "Regionalmanagerin für die Region Namangan",
    },
    description: {
      en: "Specialist in regional sales and client relationship development. Responsible for meeting sales targets, strengthening company positions, and maintaining long-term partnerships in the Namangan region, ensuring high customer service levels.",
      uz: "Mintaqaviy savdo va mijozlar bilan munosabatlarni rivojlantirish bo'yicha mutaxassis. Namangan viloyati hududida savdo rejalarini bajarish, kompaniya mavqeini mustahkamlash va uzoq muddatli hamkorlik aloqalarini saqlash, mijozlarga yuqori darajadagi xizmat ko'rsatishni ta'minlashga javobgar.",
      ru: "Специалист по региональным продажам и развитию клиентских отношений. Отвечает за выполнение планов продаж, укрепление позиций компании и поддержание долгосрочных партнёрских связей на территории Наманганской области, обеспечивая высокий уровень обслуживания клиентов.",
      de: "Spezialistin für regionalen Vertrieb und Kundenbeziehungsentwicklung. Verantwortlich für die Erfüllung von Verkaufszielen, Stärkung der Unternehmensposition und Pflege langfristiger Partnerschaften in der Region Namangan sowie Sicherstellung eines hohen Kundenserviceniveaus.",
    },
    image: "/Team/АбдулазизоваНозимаМашрабовна.jpg",
  },
  {
    id: 17,
    name: "Хожимуродов Акмал Абдумаликович",
    nameLatin: "Khojimurodov Akmal Abdumalikovich",
    position: {
      en: "Regional Manager for Tashkent Region",
      uz: "Toshkent viloyati bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Тошкентской области",
      de: "Regionalmanager für die Region Taschkent",
    },
    description: {
      en: "Specialist in regional sales development and client relationship management. Responsible for meeting sales targets, strengthening company positions, and maintaining long-term partnerships in the Tashkent region, ensuring high customer service levels.",
      uz: "Mintaqaviy savdoni rivojlantirish va mijozlar bilan munosabatlarni boshqarish bo'yicha mutaxassis. Toshkent viloyati hududida savdo rejalarini bajarish, kompaniya mavqeini mustahkamlash va uzoq muddatli hamkorlik aloqalarini saqlash, mijozlarga yuqori darajadagi xizmat ko'rsatishni ta'minlashga javobgar.",
      ru: "Специалист по развитию региональных продаж и управлению клиентскими отношениями. Отвечает за выполнение планов продаж, укрепление позиций компании и поддержание долгосрочных партнёрских связей на территории Тошкентской области, обеспечивая высокий уровень обслуживания клиентов.",
      de: "Spezialist für regionale Vertriebsentwicklung und Kundenbeziehungsmanagement. Verantwortlich für die Erfüllung von Verkaufszielen, Stärkung der Unternehmensposition und Pflege langfristiger Partnerschaften in der Region Taschkent sowie Sicherstellung eines hohen Kundenserviceniveaus.",
    },
    image:
      "/Team/Хожимуродов Акмал Абдумаликович  Региональный менеджер по Тошкентской области.jpg",
  },
  {
    id: 18,
    name: "Усманов Баходир Шамсиевич",
    nameLatin: "Usmonov Bahodir Shamsiyevich",
    position: {
      en: "Regional Manager for Khorezm Region",
      uz: "Xorazm viloyati bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Хорезмской области",
      de: "Regionalmanager für die Region Xorazm",
    },
    description: {
      en: "Specialist in regional sales and client relationship development. Responsible for meeting sales targets, strengthening company positions, and maintaining long-term partnerships in the Khorezm region, ensuring high customer service levels.",
      uz: "Mintaqaviy savdo va mijozlar bilan munosabatlarni rivojlantirish bo'yicha mutaxassis. Xorazm viloyati hududida savdo rejalarini bajarish, kompaniya mavqeini mustahkamlash va uzoq muddatli hamkorlik aloqalarini saqlash, mijozlarga yuqori darajadagi xizmat ko'rsatishni ta'minlashga javobgar.",
      ru: "Специалист по региональным продажам и развитию клиентских отношений. Отвечает за выполнение планов продаж, укрепление позиций компании и поддержание долгосрочных партнёрских связей на территории Хорезмской области, обеспечивая высокий уровень обслуживания клиентов.",
      de: "Spezialist für regionalen Vertrieb und Kundenbeziehungsentwicklung. Verantwortlich für die Erfüllung von Verkaufszielen, Stärkung der Unternehmensposition und Pflege langfristiger Partnerschaften in der Region Xorazm sowie Sicherstellung eines hohen Kundenserviceniveaus.",
    },
    image: "/Team/Баходир Усманов Шамсиевич Бухоро РМ.jpg",
  },
  {
    id: 24,
    name: "Ибрагимов Сарваржон Ражаббой угли",
    nameLatin: "IBRAGIMOV SARVARBEK RAJABBOY O'G'LI",
    position: {
      en: "Regional Manager for Khorezm Region",
      uz: "Xorazm viloyati bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Хорезмской области",
      de: "Regionalmanager für die Region Khorezm",
    },
    description: {
      en: "Specialist in regional sales and client relationship development. Responsible for meeting sales targets, strengthening company positions, and maintaining long-term partnerships in the Bukhara region, ensuring high customer service levels.",
      uz: "Mintaqaviy savdo va mijozlar bilan munosabatlarni rivojlantirish bo'yicha mutaxassis. Buxoro viloyati hududida savdo rejalarini bajarish, kompaniya mavqeini mustahkamlash va uzoq muddatli hamkorlik aloqalarini saqlash, mijozlarga yuqori darajadagi xizmat ko'rsatishni ta'minlashga javobgar.",
      ru: "Специалист по региональным продажам и развитию клиентских отношений. Отвечает за выполнение планов продаж, укрепление позиций компании и поддержание долгосрочных партнёрских связей на территории Бухарской области, обеспечивая высокий уровень обслуживания клиентов.",
      de: "Spezialist für regionalen Vertrieb und Kundenbeziehungsentwicklung. Verantwortlich für die Erfüllung von Verkaufszielen, Stärkung der Unternehmensposition und Pflege langfristiger Partnerschaften in der Region Buchara sowie Sicherstellung eines hohen Kundenserviceniveaus.",
    },
    image: "/Team/Сарвар.png",
  },
  {
    id: 25,
    name: "Жакшибаева Махлийохон Хусниддиновна",
    nameLatin: "Jakshibaeva Mahliyoxon Husniddinovna",
    position: {
      en: "Regional Manager for Andijan Region",
      uz: "Andijon viloyati bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Андижанской области",
      de: "Regionalmanager für die Region Andijan",
    },
    description: {
      en: "Specialist in regional sales and client relationship development. Responsible for meeting sales targets, strengthening company positions, and maintaining long-term partnerships in the Andijan region, ensuring high customer service levels.",
      uz: "Mintaqaviy savdo va mijozlar bilan munosabatlarni rivojlantirish bo'yicha mutaxassis. Andijon viloyati hududida savdo rejalarini bajarish, kompaniya mavqeini mustahkamlash va uzoq muddatli hamkorlik aloqalarini saqlash, mijozlarga yuqori darajadagi xizmat ko'rsatishni ta'minlashga javobgar.",
      ru: "Специалист по региональным продажам и развитию клиентских отношений. Отвечает за выполнение планов продаж, укрепление позиций компании и поддержание долгосрочных партнёрских связей на территории Андижанской области, обеспечивая высокий уровень обслуживания клиентов.",
      de: "Spezialist für regionalen Vertrieb und Kundenbeziehungsentwicklung. Verantwortlich für die Erfüllung von Verkaufszielen, Stärkung der Unternehmensposition und Pflege langfristiger Partnerschaften in der Region Andijan sowie Sicherstellung eines hohen Kundenserviceniveaus.",
    },
    image: "/Team/Maxliyo.jpg",
  },
  {
    id: 19,
    name: "Ачилов Толмас Тоштемирович",
    nameLatin: "Achilov Tolmas Toshtemirovich",
    position: {
      en: "Regional Manager for Jizzakh Region",
      uz: "Jizzax viloyati bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Джизакской области",
      de: "Regionalmanager für die Region Jizzakh",
    },
    description: {
      en: "Specialist in regional sales and client relationship development. Responsible for meeting sales targets, strengthening company positions, and maintaining long-term partnerships in the Jizzakh region, ensuring high customer service levels.",
      uz: "Mintaqaviy savdo va mijozlar bilan munosabatlarni rivojlantirish bo'yicha mutaxassis. Jizzax viloyati hududida savdo rejalarini bajarish, kompaniya mavqeini mustahkamlash va uzoq muddatli hamkorlik aloqalarini saqlash, mijozlarga yuqori darajadagi xizmat ko'rsatishni ta'minlashga javobgar.",
      ru: "Специалист по региональным продажам и развитию клиентских отношений. Отвечает за выполнение планов продаж, укрепление позиций компании и поддержание долгосрочных партнёрских связей на территории Джизакской области, обеспечивая высокий уровень обслуживания клиентов.",
      de: "Spezialist für regionalen Vertrieb und Kundenbeziehungsentwicklung. Verantwortlich für die Erfüllung von Verkaufszielen, Stärkung der Unternehmensposition und Pflege langfristiger Partnerschaften in der Region Jizzakh sowie Sicherstellung eines hohen Kundenserviceniveaus.",
    },
    image:
      "/Team/АчиловТолмасТоштемирович.jpg",
  },
  {
    id: 20,
    name: "Сайдуллаев Абдулхай Абдишукир угли",
    nameLatin: "Saydullaev Abdulxay Abdishukur oʻgʻli",
    position: {
      en: "Pharmacovigilance Specialist",
      uz: "Farmakonazor bo'yicha mutaxassis",
      ru: "Специалист по фармаконадзору",
      de: "Fachkraft für Pharmakovigilanz",
    },
    description: {
      en: "Expert in drug safety monitoring due to side effect information gathering and analysis. Responsible for collection, analysis, and evaluation of adverse event information, regulatory compliance, and maintaining high product quality and safety levels.",
      uz: "Dori vositalarining xavfsizligini monitoring qilish sohasidagi ekspert. Nojo'ya ta'sirlar haqidagi ma'lumotlarni to'plash, tahlil qilish va baholash, me'yoriy talablarga rioya qilish hamda kompaniya mahsulotlarining yuqori sifati va xavfsizligini ta'minlashga javobgar.",
      ru: "Эксперт в области мониторинга безопасности лекарственных средств. Отвечает за сбор, анализ и оценку информации о побочных эффектах, соблюдение нормативных требований и поддержание высокого уровня качества и безопасности продукции компании.",
      de: "Experte für Arzneimittelsicherheit und Überwachung. Verantwortlich für die Sammlung, Analyse und Bewertung von Informationen über Nebenwirkungen, Einhaltung regulatorischer Anforderungen sowie Aufrechterhaltung eines hohen Qualitäts- und Sicherheitsniveaus der Unternehmensprodukte.",
    },
    image:
      "/Team/СайдуллаевАбдулхайАбдишукир.jpg",
  },
  {
    id: 21,
    name: "Курбонова Мухтабар Рахмжоновна",
    nameLatin: "Kurbonova Mukhtabar Rakhmjonovna",
    position: {
      en: "Assistant to Chief Accountant",
      uz: "Bosh hisobchining yordamchisi",
      ru: "Помощник главного бухгалтера",
      de: "Assistentin des Chefbuchhalters",
    },
    description: {
      en: "Specialist supporting company financial processes. Responsible for bookkeeping, preparing financial documents and reports, and ensuring accuracy and timeliness of financial information processing.",
      uz: "Kompaniyaning moliyaviy jarayonlarini qo'llab-quvvatlash bo'yicha mutaxassis. Buxgalteriya hisobini yuritish, moliyaviy hujjatlar va hisobotlarni tayyorlash, shuningdek, moliyaviy ma'lumotlarni qayta ishlashning aniqligi va o'z vaqtidaligini ta'minlashga javobgar.",
      ru: "Специалист по поддержке финансовых процессов компании. Отвечает за ведение бухгалтерского учёта, подготовку финансовых документов и отчётности, а также за обеспечение точности и своевременности обработки финансовой информации.",
      de: "Spezialistin zur Unterstützung finanzieller Unternehmensprozesse. Verantwortlich für Buchhaltung, Erstellung von Finanzdokumenten und Berichten sowie Sicherstellung der Genauigkeit und Pünktlichkeit bei der Verarbeitung von Finanzinformationen.",
    },
    image: "/Team/Курбонова Мухтабар Рахмжоновна  помощник гл.бухгалтера.jpg",
  },
  {
    id: 22,
    name: "Махкамова Умида Закировна",
    nameLatin: "Makhkamova Umida Zakirovna",
    position: {
      en: "Assistant to Warehouse Manager",
      uz: "Ombor mudirining yordamchisi",
      ru: "Помощник зав. склада",
      de: "Assistentin des Lagerleiters",
    },
    description: {
      en: "Specialist supporting warehouse operations. Responsible for product receipt, storage, and issuance, maintaining records and documentation, and ensuring uninterrupted warehouse functioning in accordance with internal company standards.",
      uz: "Ombor operatsiyalarini qo'llab-quvvatlash bo'yicha mutaxassis. Mahsulotlarni qabul qilish, saqlash va berish, hisob va hujjatlarni yuritish, shuningdek, kompaniyaning ichki standartlariga muvofiq omborning uzluksiz ishlashini ta'minlashga javobgar.",
      ru: "Специалист по поддержке складских операций. Отвечает за приёмку, хранение и выдачу продукции, ведение учёта и документации, а также обеспечение бесперебойного функционирования склада в соответствии с внутренними стандартами компании.",
      de: "Spezialistin zur Unterstützung von Lageroperationen. Verantwortlich für Warenannahme, Lagerung und Ausgabe, Führung von Aufzeichnungen und Dokumentation sowie Sicherstellung des reibungslosen Lagerbetriebs gemäß internen Unternehmensstandards.",
    },
    image: "/Team/Махкамова Умида Закировна  помощник зав.склада.jpg",
  },
];
export default function TeamGallery() {
  const { language, t } = useLanguage();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showAll, setShowAll] = useState(false);

  const initialDisplayCount = 8;

  const displayedMembers = showAll
    ? teamMembers
    : teamMembers.slice(0, initialDisplayCount);

  const handleOpenModal = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  const handlePrevious = () => {
    if (!selectedMember) return;
    const currentIndex = teamMembers.findIndex(
      (member) => member.id === selectedMember.id
    );
    const previousIndex =
      (currentIndex - 1 + teamMembers.length) % teamMembers.length;
    setSelectedMember(teamMembers[previousIndex]);
  };

  const handleNext = () => {
    if (!selectedMember) return;
    const currentIndex = teamMembers.findIndex(
      (member) => member.id === selectedMember.id
    );
    const nextIndex = (currentIndex + 1) % teamMembers.length;
    setSelectedMember(teamMembers[nextIndex]);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const getDisplayName = (member: TeamMember) => {
    return language === "ru" ? member.name : member.nameLatin;
  };

  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
        {t("team.gallery.title")}
      </h3>

      {/* First 2 Rows - Static Important Members */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mb-12">
        {teamMembers.slice(0, initialDisplayCount).map((member, index) => (
          <motion.div
            key={member.id}
            className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -8, scale: 1.03 }}
            onClick={() => handleOpenModal(member)}
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

              {/* Hover Icon */}
              <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-0 rotate-180">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>

            {/* Info - Always Visible */}
            <div className="p-4 bg-card">
              <h4 className="font-bold text-foreground text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                {getDisplayName(member)}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {member.position[language as keyof typeof member.position]}
              </p>
              {/* Decorative Line */}
              <div className="mt-2 h-0.5 w-8 bg-primary/30 group-hover:w-full group-hover:bg-primary transition-all duration-300 rounded-full"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Remaining Members - Continuous Scrolling (only if not showing all) */}
      {!showAll && teamMembers.length > initialDisplayCount && (
        <div className="relative overflow-hidden mb-12">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10"></div>

          {/* Scrolling Container */}
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -2000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {/* Duplicate remaining members for infinite scroll */}
            {[
              ...teamMembers.slice(initialDisplayCount),
              ...teamMembers.slice(initialDisplayCount),
              ...teamMembers.slice(initialDisplayCount),
            ].map((member, index) => (
              <motion.div
                key={`scroll-${member.id}-${index}`}
                className="relative group cursor-pointer flex-shrink-0 w-[280px]"
                whileHover={{ scale: 1.05, zIndex: 20 }}
                onClick={() => handleOpenModal(member)}
              >
                <div className="relative bg-card rounded-2xl overflow-hidden shadow-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl">
                  {/* Image Section */}
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                    {/* Hover Icon */}
                    <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-0 rotate-180">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Info Section - Always Visible */}
                  <div className="p-5 bg-card">
                    <h4 className="font-bold text-foreground text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {getDisplayName(member)}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {member.position[language as keyof typeof member.position]}
                    </p>

                    {/* Decorative Line */}
                    <div className="mt-3 h-1 w-12 bg-primary/30 group-hover:w-full group-hover:bg-primary transition-all duration-300 rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Static Grid for All Members (when Show All is clicked) */}
      {showAll && teamMembers.length > initialDisplayCount && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {teamMembers.slice(initialDisplayCount).map((member, index) => (
            <motion.div
              key={member.id}
              className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.03 }}
              onClick={() => handleOpenModal(member)}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                {/* Hover Icon */}
                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-0 rotate-180">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>

              {/* Info - Always Visible */}
              <div className="p-4 bg-card">
                <h4 className="font-bold text-foreground text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {getDisplayName(member)}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {member.position[language as keyof typeof member.position]}
                </p>
                {/* Decorative Line */}
                <div className="mt-2 h-0.5 w-8 bg-primary/30 group-hover:w-full group-hover:bg-primary transition-all duration-300 rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {teamMembers.length > initialDisplayCount && (
        <div className="mt-8 flex justify-center">
          <Button onClick={toggleShowAll} variant="outline" className="px-8">
            {showAll ? t("team.gallery.showLess") : t("team.gallery.showMore")}
          </Button>
        </div>
      )}

      <Dialog
        open={!!selectedMember}
        onOpenChange={(open) => !open && handleCloseModal()}
      >
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white dark:bg-gray-900 ">
          <DialogTitle className="sr-only">
            {selectedMember
              ? `Profile details for ${getDisplayName(selectedMember)}`
              : "Team member details"}
          </DialogTitle>
          <div className="relative ">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 z-10 rounded-full bg-black/20 hover:bg-black/40 text-white "
              onClick={handleCloseModal}
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="flex flex-col md:flex-row">
              <div className="relative h-98 w-full md:w-1/2 aspect-square md:aspect-auto">
                {selectedMember && (
                  <Image
                    src={selectedMember.image || "/placeholder.svg"}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="p-16 w-full  flex flex-col justify-center">
                {selectedMember && (
                  <>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {getDisplayName(selectedMember)}
                    </h3>
                    <p className="text-lg text-primary mb-4">
                      {
                        selectedMember.position[
                        language as keyof typeof selectedMember.position
                        ]
                      }
                    </p>
                    <p className="text-muted-foreground">
                      {
                        selectedMember.description[
                        language as keyof typeof selectedMember.description
                        ]
                      }
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex space-x-2 p-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/20 hover:bg-black/40 text-white"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>

            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 flex space-x-2 p-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/20 hover:bg-black/40 text-white"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
