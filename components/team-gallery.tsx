"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type TeamMember = {
  id: number;
  name: string;
  position: {
    en: string;
    uz: string;
    ru: string;
  };
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Ахтамов Озот Азимбоевич ",
    position: {
      en: "CEO",
      uz: "Bosh direktor",
      ru: "Директор",
    },
    image: "/Team/Ахтамов Озот Азимбоевич  Директор.jpg",
  },
  {
    id: 2,
    name: "Равшанов Зафар Зойир угли",
    position: {
      en: "Chief Accountant",
      uz: "Bosh hisobchi",
      ru: "Гл. Бухгалтер",
    },
    image: "/Team/Равшанов Зафар Зойир угли  Гл. Бухгалтер.jpg",
  },
  {
    id: 3,
    name: "Шатемирова Дилфуза Каюмовна",
    position: {
      en: "Quality Control Manager",
      uz: "Sifat nazorati menejeri",
      ru: "менеджер по контролю качества",
    },
    image: "/Team/Шатемирова Дилфуза Каюмовна  менеджер по контролю кач.jpg",
  },
  {
    id: 4,
    name: "Мавланов Самад Хайитбоевич  ",
    position: {
      en: "Legal Consultant",
      uz: "Huquqiy maslahatchi",
      ru: "юрист конкусльтант",
    },
    image: "/Team/Мавланов Самад Хайитбоевич  юристконкусльт.jpg",
  },
  {
    id: 5,
    name: "Умаров Зафар Рашидович",
    position: {
      en: "Head of Foreign Economic Activity",
      uz: "Tashqi iqtisodiy faoliyat bo'limi boshlig'i",
      ru: "Начальник отдела ВЭД",
    },
    image: "/Team/Умаров Зафар Рашидович  Начальник отдела ВЭД.jpg",
  },
  {
    id: 6,
    name: "Якубходжаев Саидкамол Саидакбарович",
    position: {
      en: "Warehouse Manager",
      uz: "Ombor mudiri",
      ru: "Зав. склада",
    },
    image: "/Team/Якубходжаев Саидкамол Саидакбарович  Зав. склада.jpg",
  },
  {
    id: 7,
    name: "Полвонова Парвина Рахматуллаевна  ",
    position: {
      en: "Regional Manager for Tashkent",
      uz: "Toshkent shahri bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по г. Ташкента",
    },
    image:
      "/Team/Полвонова Парвина Рахматуллаевна  Региональный менеджер по г. Ташкента.jpg",
  },
  {
    id: 8,
    name: "Сайдуллаев Абдулхай Абдишукир угли  ",
    position: {
      en: "Pharmacovigilance Specialist",
      uz: "Farmakonazor bo'yicha mutaxassis",
      ru: "Специалист по фармаконадзора",
    },
    image:
      "/Team/Сайдуллаев Абдулхай Абдишукир угли  Специалист по фармаконадзора.jpg",
  },
  {
    id: 9,
    name: "Мукаддас Юлдашбаевна ",
    position: {
      en: "HR",
      uz: "HR",
      ru: "HR",
    },
    image: "/Team/Мукаддас Юлдашбаевна HR.jpg",
  },

  {
    id: 10,
    name: "Санақулова Малика Умаровна  ",
    position: {
      en: "Regional Manager for Navoi Region",
      uz: "Navoiy viloyati bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Навоийской области",
    },
    image:
      "/Team/Санақулова Малика Умаровна  Региональный менеджер по Навоийской области.jpg",
  },
  {
    id: 11,
    name: "Юлдошева Гулмира Жонимкуловна  ",
    position: {
      en: "Regional Manager for Kashkadarya Region",
      uz: "Qashqadaryo viloyati bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Кашкадарьинской области",
    },
    image:
      "/Team/Юлдошева Гулмира Жонимкуловна  Региональный менеджер по Кашкадарьинской области.jpg",
  },
  {
    id: 12,
    name: "Абдулазизова Нозима Машрабовна  ",
    position: {
      en: "Regional Manager for Namangan Region",
      uz: "Namangan viloyati bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Наманганской области",
    },
    image: "/Team/Абдулазизова Нозима Машрабовна.jpg",
  },
  {
    id: 13,
    name: "Уразалиев Орзубек Данабой ўғли  ",
    position: {
      en: "Regional Manager for Samarkand Region",
      uz: "Samarqand viloyati bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Самаркандской области",
    },
    image:
      "/Team/Уразалиев Орзубек Данабой ўғли  Региональный менеджер по Самаркандской области.jpg",
  },
  {
    id: 14,
    name: "Алибаев Камолиддин Абдузокирович  ",
    position: {
      en: "HDM",
      uz: "HDM",
      ru: "HDM",
    },
    image: "/Team/Алибаев Камолиддин Абдузокирович  HDM.jpg",
  },
  {
    id: 15,
    name: "Шодманов Бунёд Хамдамович    ",
    position: {
      en: "Regional Manager for Surkhandarya Region",
      uz: "Surxondaryo viloyati bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Сурхандарьинской области",
    },
    image:
      "/Team/Шодманов Бунёд Хамдамович  Региональный менеджер по Сурхандарьинской области.jpg",
  },
  {
    id: 16,
    name: "Хожимуродов Акмал Абдумаликович    ",
    position: {
      en: "Regional Manager for Tashkent Region",
      uz: "Toshkent viloyati bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Тошкентской области",
    },
    image:
      "/Team/Хожимуродов Акмал Абдумаликович  Региональный менеджер по Тошкентской области.jpg",
  },
  {
    id: 17,
    name: "Абдурахмонов Акмалжон Абдуллажонович     ",
    position: {
      en: "Regional Manager for Fergana and Andijan Regions",
      uz: "Farg'ona va Andijon viloyatlari bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Ферганской и Андижанской области",
    },
    image: "/Team/Абдурахмонов Акмалжон Абдуллажонович .jpg",
  },
  {
    id: 18,
    name: "Курбонова Мухтабар Рахмжоновна      ",
    position: {
      en: "Assistant to Chief Accountant",
      uz: "Bosh hisobchining yordamchisi",
      ru: "помощник гл.бухгалтера",
    },
    image: "/Team/Курбонова Мухтабар Рахмжоновна  помощник гл.бухгалтера.jpg",
  },
  {
    id: 19,
    name: "Махкамова Умида Закировна    ",
    position: {
      en: "Assistant to Warehouse Manager",
      uz: "Ombor mudirining yordamchisi",
      ru: "помощник зав.склада ",
    },
    image: "/Team/Махкамова Умида Закировна  помощник зав.склада.jpg",
  },
  {
    id: 20,
    name: "Баходир Усманов Шамсиевич ",
    position: {
      en: "Bukhara PM",
      uz: "Buxoro PM",
      ru: "Бухоро РМ",
    },
    image: "/Team/Баходир Усманов Шамсиевич Бухоро РМ.jpg",
  },
  {
    id: 21,
    name: "Ачилов Толмас Тоштемирович  ",
    position: {
      en: "Regional Manager for Jizzakh Region",
      uz: "Jizzax viloyati bo'yicha mintaqaviy menejer",
      ru: "Региональный менеджер по Джизакской области",
    },
    image:
      "/Team/Ачилов Толмас Тоштемирович  Региональный менеджер по Джизакской области.jpg",
  },
];

export default function TeamGallery() {
  const { language, t } = useLanguage();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Number of team members to show initially
  const initialDisplayCount = 8;

  // Calculate which members to display based on showAll state
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

  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold text-primary-800 dark:text-primary-400 mb-6 text-center">
        {t("team.gallery.title")}
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {displayedMembers.map((member) => (
          <motion.div
            key={member.id}
            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onClick={() => handleOpenModal(member)}
          >
            <div className="aspect-[3/4] relative">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="text-white">
                  <h4 className="font-bold">{member.name}</h4>
                  <p className="text-sm text-white/90">
                    {member.position[language as keyof typeof member.position]}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-3 text-center">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                {member.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {member.position[language as keyof typeof member.position]}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

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
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white dark:bg-gray-900">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 rounded-full bg-black/20 hover:bg-black/40 text-white"
              onClick={handleCloseModal}
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto">
                {selectedMember && (
                  <Image
                    src={selectedMember.image || "/placeholder.svg"}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="p-6 w-full md:w-1/2 flex flex-col justify-center">
                {selectedMember && (
                  <>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                      {selectedMember.name}
                    </h3>
                    <p className="text-lg text-primary-600 dark:text-primary-400 mb-4">
                      {
                        selectedMember.position[
                          language as keyof typeof selectedMember.position
                        ]
                      }
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
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
