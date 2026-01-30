export interface Testimonial {
  id: string;
  name: string;
  title: {
    en: string;
    uz: string;
    ru: string;
    de: string;
  };
  company: {
    en: string;
    uz: string;
    ru: string;
    de: string;
  };
  content: {
    en: string;
    uz: string;
    ru: string;
    de: string;
  };
  avatar: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    title: {
      en: "Chief Medical Officer",
      uz: "Bosh tibbiy direktor",
      ru: "Главный врач",
      de: "Chefärztin",
    },
    company: {
      en: "City General Hospital",
      uz: "Shahar umumiy kasalxonasi",
      ru: "Городская больница",
      de: "Städtisches Krankenhaus",
    },
    content: {
      en: "NEUES LEBEN has consistently delivered high-quality pharmaceutical products. Their commitment to excellence and timely delivery has made them our preferred partner.",
      uz: "NEUES LEBEN doimiy ravishda yuqori sifatli farmatsevtika mahsulotlarini yetkazib beradi. Ularning mukammallikka intilishi va o'z vaqtida yetkazib berish bizning afzal hamkorimizga aylantirdi.",
      ru: "NEUES LEBEN постоянно поставляет высококачественные фармацевтические продукты. Их стремление к совершенству и своевременная доставка сделали их нашим предпочтительным партнером.",
      de: "NEUES LEBEN liefert konsequent hochwertige pharmazeutische Produkte. Ihr Engagement für Exzellenz und pünktliche Lieferung hat sie zu unserem bevorzugten Partner gemacht.",
    },
    avatar: "",
    rating: 5,
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    title: {
      en: "Director of Pharmacy",
      uz: "Dorixona direktori",
      ru: "Директор аптеки",
      de: "Apothekendirektor",
    },
    company: {
      en: "National Medical Center",
      uz: "Milliy tibbiyot markazi",
      ru: "Национальный медицинский центр",
      de: "Nationales medizinisches Zentrum",
    },
    content: {
      en: "Working with NEUES LEBEN has been exceptional. Their product range is comprehensive and their customer service is outstanding. Highly recommended!",
      uz: "NEUES LEBEN bilan ishlash ajoyib bo'ldi. Ularning mahsulot assortimenti keng va mijozlarga xizmati a'lo darajada. Tavsiya qilamiz!",
      ru: "Работа с NEUES LEBEN была исключительной. Их ассортимент продукции всеобъемлющий, а обслуживание клиентов выдающееся. Настоятельно рекомендую!",
      de: "Die Zusammenarbeit mit NEUES LEBEN war außergewöhnlich. Ihr Produktsortiment ist umfassend und ihr Kundenservice hervorragend. Sehr empfehlenswert!",
    },
    avatar: "",
    rating: 5,
  },
  {
    id: "3",
    name: "Dr. Elena Petrova",
    title: {
      en: "Head of Cardiology",
      uz: "Kardiologiya bo'limi boshlig'i",
      ru: "Заведующая кардиологией",
      de: "Leiterin der Kardiologie",
    },
    company: {
      en: "Regional Heart Institute",
      uz: "Mintaqaviy yurak instituti",
      ru: "Региональный институт сердца",
      de: "Regionales Herzinstitut",
    },
    content: {
      en: "The cardiovascular medications from NEUES LEBEN have shown remarkable efficacy in our patients. Their quality control is impeccable.",
      uz: "NEUES LEBEN ning yurak-qon tomir dorilar bemorlarda ajoyib samaradorlikni ko'rsatdi. Ularning sifat nazorati benuqson.",
      ru: "Сердечно-сосудистые препараты от NEUES LEBEN показали замечательную эффективность у наших пациентов. Их контроль качества безупречен.",
      de: "Die kardiovaskulären Medikamente von NEUES LEBEN haben bei unseren Patienten bemerkenswerte Wirksamkeit gezeigt. Ihre Qualitätskontrolle ist tadellos.",
    },
    avatar: "",
    rating: 5,
  },
  {
    id: "4",
    name: "Dr. Ahmed Hassan",
    title: {
      en: "Clinical Pharmacist",
      uz: "Klinik farmatsevt",
      ru: "Клинический фармацевт",
      de: "Klinischer Apotheker",
    },
    company: {
      en: "University Medical Complex",
      uz: "Universitet tibbiyot majmuasi",
      ru: "Университетский медицинский комплекс",
      de: "Universitätsmedizinischer Komplex",
    },
    content: {
      en: "NEUES LEBEN's dedication to pharmaceutical excellence is evident in every product. They are a trusted name in healthcare.",
      uz: "NEUES LEBEN ning farmatsevtika mukammalligiga sadoqati har bir mahsulotda yaqqol ko'rinadi. Ular sog'liqni saqlashda ishonchli nom.",
      ru: "Преданность NEUES LEBEN фармацевтическому совершенству очевидна в каждом продукте. Они являются надежным именем в здравоохранении.",
      de: "Das Engagement von NEUES LEBEN für pharmazeutische Exzellenz ist in jedem Produkt offensichtlich. Sie sind ein vertrauenswürdiger Name im Gesundheitswesen.",
    },
    avatar: "",
    rating: 5,
  },
  {
    id: "5",
    name: "Dr. Maria Rodriguez",
    title: {
      en: "Pulmonology Specialist",
      uz: "Pulmonologiya mutaxassisi",
      ru: "Специалист по пульмонологии",
      de: "Pneumologie-Spezialistin",
    },
    company: {
      en: "Respiratory Care Center",
      uz: "Nafas olish tizimi parvarishi markazi",
      ru: "Центр респираторной помощи",
      de: "Atemwegspflegezentrum",
    },
    content: {
      en: "Our patients have benefited greatly from NEUES LEBEN's respiratory care products. The quality and effectiveness are unmatched.",
      uz: "Bizning bemorlarimiz NEUES LEBEN ning nafas olish tizimi parvarishi mahsulotlaridan katta foyda ko'rdi. Sifat va samaradorlik tengsiz.",
      ru: "Наши пациенты значительно выиграли от продуктов респираторной помощи NEUES LEBEN. Качество и эффективность не имеют себе равных.",
      de: "Unsere Patienten haben stark von den Atemwegspflegeprodukten von NEUES LEBEN profitiert. Qualität und Wirksamkeit sind unübertroffen.",
    },
    avatar: "",
    rating: 5,
  },
  {
    id: "6",
    name: "Dr. James Wilson",
    title: {
      en: "Hospital Administrator",
      uz: "Kasalxona ma'muri",
      ru: "Администратор больницы",
      de: "Krankenhausverwalter",
    },
    company: {
      en: "Metropolitan Health System",
      uz: "Metropolitan sog'liqni saqlash tizimi",
      ru: "Столичная система здравоохранения",
      de: "Metropolitanes Gesundheitssystem",
    },
    content: {
      en: "NEUES LEBEN has been a reliable partner for our healthcare system. Their professionalism and product quality exceed expectations.",
      uz: "NEUES LEBEN bizning sog'liqni saqlash tizimimiz uchun ishonchli hamkor bo'ldi. Ularning professionallik va mahsulot sifati kutilganidan oshadi.",
      ru: "NEUES LEBEN был надежным партнером для нашей системы здравоохранения. Их профессионализм и качество продукции превосходят ожидания.",
      de: "NEUES LEBEN war ein zuverlässiger Partner für unser Gesundheitssystem. Ihre Professionalität und Produktqualität übertreffen die Erwartungen.",
    },
    avatar: "",
    rating: 5,
  },
];
