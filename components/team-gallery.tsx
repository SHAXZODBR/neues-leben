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
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 5,
    name: "Хўжаев Жаҳонгир",
    nameLatin: "Xo’jayev Jahongir",
    position: {
      en: "Founder",
      uz: "Asoschi",
      ru: "Основатель",
      de: "Gründer",
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
    image: "/Team/Ахтамов Озот Азимбоевич  Директор.jpg",
  },
  {
    id: 3,
    name: "Шатемирова Дилфуза Каюмовна",
    nameLatin: "Shatemirova Dilfuza Kayumovna",
    position: {
      en: "Quality Control Manager",
      uz: "Sifat nazorati menejeri",
      ru: "менеджер по качеству продукции",
      de: "Produktqualitätsmanager",
    },
    image: "/Team/Шатемирова Дилфуза Каюмовна  менеджер по контролю кач.jpg",
  },
  {
    id: 4,
    name: "Юсупова Мукаддас Юлдашбаевна",
    nameLatin: "Yusupova Mukaddas Yuldashboyevna",
    position: {
      en: "HR",
      uz: "HR",
      ru: "HR",
      de: "HR (Personalwesen)",
    },
    image: "/Team/Мукаддас Юлдашбаевна HR.jpg",
  },
  {
    id: 23,
    name: "Саидова Нигора Азизхановна",
    nameLatin: "Saidova Nigora Azizkhanovna",
    position: {
      en: "Product Manager",
      uz: "Mahsulotlar bo‘yicha menejer",
      ru: "Менеджер по продуктам",
      de: "Produktmanager",
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
    image: "/Team/Мавланов Самад Хайитбоевич  юристконкусльт.jpg",
  },
  {
    id: 7,
    name: "Умаров Зафар Рашидович",
    nameLatin: "Umarov Zafar Rashidovich",
    position: {
      en: "Head of foreign econimic relations department",
      uz: "Tashqi iqtisodiy faoliyat bo'limi boshlig'i",
      ru: "Начальник отдела ВЭД",
      de: "Leiter der Abteilung für Außenwirtschaft",
    },
    image: "/Team/Умаров Зафар Рашидович  Начальник отдела ВЭД.jpg",
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
    image: "/Team/Якубходжаев Саидкамол Саидакбарович  Зав. склада.jpg",
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
    image: "/Team/Абдурахмонов Акмалжон Абдуллажонович .jpg",
  },
  {
    id: 11,
    name: "Полвонова Парвина Рахматуллаевна",
    nameLatin: "Polvonova Parvina Rahmatullayevna",
    position: {
      en: "Regional Manager for Tashkent",
      uz: "Toshkent shahri bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по г. Ташкента",
      de: "Regionalmanagerin für Taschkent",
    },
    image:
      "/Team/Полвонова Парвина Рахматуллаевна  Региональный менеджер по г. Ташкента.jpg",
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
    image: "/Team/Абдулазизова Нозима Машрабовна.jpg",
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
    image:
      "/Team/Хожимуродов Акмал Абдумаликович  Региональный менеджер по Тошкентской области.jpg",
  },
  {
    id: 18,
    name: "Усманов Баходир Шамсиевич",
    nameLatin: "Usmonov Bahodir Shamsiyevich",
    position: {
      en: "Regional Manager for Bukhara Region",
      uz: "Buxoro viloyati bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Бухарской области",
      de: "Regionalmanager für die Region Buchara",
    },
    image: "/Team/Баходир Усманов Шамсиевич Бухоро РМ.jpg",
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
    image:
      "/Team/Ачилов Толмас Тоштемирович  Региональный менеджер по Джизакской области.jpg",
  },
  {
    id: 20,
    name: "Сайдуллаев Абдулхай Абдишукир угли",
    nameLatin: "Saydullaev Abdulxay Abdishukur oʻgʻli",
    position: {
      en: "Pharmacovigilance Specialist",
      uz: "Farmakonazor bo'yicha mutaxassis",
      ru: "Специалист по фармаконадзора",
      de: "Fachkraft für Pharmakovigilanz",
    },
    image:
      "/Team/Сайдуллаев Абдулхай Абдишукир угли  Специалист по фармаконадзора.jpg",
  },
  {
    id: 21,
    name: "Курбонова Мухтабар Рахмжоновна",
    nameLatin: "Kurbonova Mukhtabar Rakhmjonovna",
    position: {
      en: "Assistant to Chief Accountant",
      uz: "Bosh hisobchining yordamchisi",
      ru: "помощник гл.бухгалтера",
      de: "Assistentin des Chefbuchhalters",
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
      ru: "помощник зав.склада ",
      de: "Assistentin des Lagerleiters",
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
                      {t("team.gallery.memberDescription")}
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
