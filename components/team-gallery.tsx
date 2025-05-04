"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type TeamMember = {
  id: number
  name: string
  position: {
    en: string
    uz: string
    ru: string
  }
  image: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Johnson",
    position: {
      en: "CEO",
      uz: "Bosh direktor",
      ru: "Генеральный директор",
    },
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    position: {
      en: "Medical Director",
      uz: "Tibbiyot direktori",
      ru: "Медицинский директор",
    },
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    name: "David Kim",
    position: {
      en: "Head of Sales",
      uz: "Sotish bo'limi boshlig'i",
      ru: "Руководитель отдела продаж",
    },
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 4,
    name: "Elena Petrova",
    position: {
      en: "Marketing Manager",
      uz: "Marketing menejeri",
      ru: "Менеджер по маркетингу",
    },
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 5,
    name: "Akmal Karimov",
    position: {
      en: "Logistics Director",
      uz: "Logistika direktori",
      ru: "Директор по логистике",
    },
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 6,
    name: "Sarah Wilson",
    position: {
      en: "HR Manager",
      uz: "HR menejeri",
      ru: "HR менеджер",
    },
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 7,
    name: "Timur Aliyev",
    position: {
      en: "Regional Manager",
      uz: "Mintaqaviy menejer",
      ru: "Региональный менеджер",
    },
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 8,
    name: "Olga Ivanova",
    position: {
      en: "Quality Control Specialist",
      uz: "Sifat nazorati mutaxassisi",
      ru: "Специалист по контролю качества",
    },
    image: "/placeholder.svg?height=400&width=300",
  },
]

export default function TeamGallery() {
  const { language, t } = useLanguage()
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  const handleOpenModal = (member: TeamMember) => {
    setSelectedMember(member)
  }

  const handleCloseModal = () => {
    setSelectedMember(null)
  }

  const handlePrevious = () => {
    if (!selectedMember) return
    const currentIndex = teamMembers.findIndex((member) => member.id === selectedMember.id)
    const previousIndex = (currentIndex - 1 + teamMembers.length) % teamMembers.length
    setSelectedMember(teamMembers[previousIndex])
  }

  const handleNext = () => {
    if (!selectedMember) return
    const currentIndex = teamMembers.findIndex((member) => member.id === selectedMember.id)
    const nextIndex = (currentIndex + 1) % teamMembers.length
    setSelectedMember(teamMembers[nextIndex])
  }

  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold text-primary-800 dark:text-primary-400 mb-6 text-center">
        {t("team.gallery.title")}
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onClick={() => handleOpenModal(member)}
          >
            <div className="aspect-[3/4] relative">
              <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="text-white">
                  <h4 className="font-bold">{member.name}</h4>
                  <p className="text-sm text-white/90">{member.position[language as keyof typeof member.position]}</p>
                </div>
              </div>
            </div>
            <div className="p-3 text-center">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">{member.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {member.position[language as keyof typeof member.position]}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedMember} onOpenChange={(open) => !open && handleCloseModal()}>
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
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{selectedMember.name}</h3>
                    <p className="text-lg text-primary-600 dark:text-primary-400 mb-4">
                      {selectedMember.position[language as keyof typeof selectedMember.position]}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">{t("team.gallery.memberDescription")}</p>
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
  )
}
