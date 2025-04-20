"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { LinkedinIcon as LinkedIn, Twitter, Mail, Phone } from "lucide-react"

// Define team member types
interface TeamMember {
  id: string
  name: string
  position: string
  image: string
  bio: string
  contact?: {
    email?: string
    phone?: string
    linkedin?: string
    twitter?: string
  }
}

export default function TeamSection() {
  const { t } = useLanguage()
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  // Management team members data
  const managementTeam: TeamMember[] = [
    {
      id: "director",
      name: "Жахонгир Хужаев",
      position: t("team.director"),
      image: "/placeholder.svg?height=200&width=200",
      bio: "Руководитель компании с обширным опытом в сфере здравоохранения.",
      contact: {
        email: "director@neuesleben.com",
        phone: "+998 71 123 4500",
        linkedin: "https://linkedin.com/in/director",
      },
    },
    {
      id: "finance",
      name: "Зафар Рашидов",
      position: t("team.chiefAccountant"),
      image: "/placeholder.svg?height=200&width=200",
      bio: "Опытный финансист, отвечающий за финансовую стратегию компании.",
    },
    {
      id: "marketing",
      name: "Зафар Умаров",
      position: t("team.marketingSpecialist"),
      image: "/placeholder.svg?height=200&width=200",
      bio: "Специалист по маркетингу с креативным подходом к решению задач.",
    },
    {
      id: "legal",
      name: "Самад Маиланов",
      position: t("team.legalConsultant"),
      image: "/placeholder.svg?height=200&width=200",
      bio: "Юридический консультант с большим опытом в корпоративном праве.",
    },
    {
      id: "product",
      name: "Мирзиёшер Исламов",
      position: t("team.productManager"),
      image: "/placeholder.svg?height=200&width=200",
      bio: "Менеджер по продукту с инновационным мышлением.",
    },
  ]

  // Core team members data (sample data, replace with real team members)
  const coreTeam: TeamMember[] = [
    {
      id: "medical-director",
      name: "Парвина Тошпулатова",
      position: t("team.medicalDirector"),
      image: "/placeholder.svg?height=200&width=200",
      bio: "Опытный медицинский директор, обеспечивающий высокие стандарты.",
    },
    {
      id: "research",
      name: "Ахмаджон Абдурахманов",
      position: t("team.researchDirector"),
      image: "/placeholder.svg?height=200&width=200",
      bio: "Руководит исследовательскими инициативами и обеспечивает актуальность информации.",
    },
    {
      id: "communications",
      name: "Малика Санакулова",
      position: t("team.communicationsManager"),
      image: "/placeholder.svg?height=200&width=200",
      bio: "Обеспечивает доступность и понятность медицинской информации для всех аудиторий.",
    },
  ]

  const openMemberDialog = (member: TeamMember) => {
    setSelectedMember(member)
  }

  return (
    <section id="team" className="w-full py-12 md:py-24 lg:py-32 bg-primary-50 dark:bg-primary-950/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-800 dark:text-primary-400">
              {t("team.title")}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("team.description")}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl py-10">
          <Tabs defaultValue="management" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="management">{t("team.management")}</TabsTrigger>
              <TabsTrigger value="organization">{t("team.organization")}</TabsTrigger>
            </TabsList>

            <TabsContent value="management" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {managementTeam.map((member) => (
                  <Card key={member.id} className="flex flex-col overflow-hidden">
                    <CardHeader className="p-4">
                      <div className="flex justify-center">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          width={200}
                          height={200}
                          alt={member.name}
                          className="rounded-full object-cover h-40 w-40"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 text-center">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-primary dark:text-primary-400">{member.position}</p>
                    </CardContent>
                    <CardFooter className="flex justify-center p-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => openMemberDialog(member)}>
                            {t("team.viewProfile")}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>{member.name}</DialogTitle>
                          </DialogHeader>
                          <div className="flex flex-col items-center gap-4 py-4">
                            <Image
                              src={member.image || "/placeholder.svg"}
                              width={150}
                              height={150}
                              alt={member.name}
                              className="rounded-full object-cover"
                            />
                            <div>
                              <h4 className="text-lg font-semibold text-primary dark:text-primary-400">
                                {member.position}
                              </h4>
                              <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                            </div>

                            {member.contact && (
                              <div className="flex gap-2 mt-4">
                                {member.contact.email && (
                                  <Button variant="ghost" size="icon" className="rounded-full" asChild>
                                    <a href={`mailto:${member.contact.email}`} aria-label="Email">
                                      <Mail className="h-5 w-5" />
                                    </a>
                                  </Button>
                                )}
                                {member.contact.phone && (
                                  <Button variant="ghost" size="icon" className="rounded-full" asChild>
                                    <a href={`tel:${member.contact.phone}`} aria-label="Phone">
                                      <Phone className="h-5 w-5" />
                                    </a>
                                  </Button>
                                )}
                                {member.contact.linkedin && (
                                  <Button variant="ghost" size="icon" className="rounded-full" asChild>
                                    <a
                                      href={member.contact.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      aria-label="LinkedIn"
                                    >
                                      <LinkedIn className="h-5 w-5" />
                                    </a>
                                  </Button>
                                )}
                                {member.contact.twitter && (
                                  <Button variant="ghost" size="icon" className="rounded-full" asChild>
                                    <a
                                      href={member.contact.twitter}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      aria-label="Twitter"
                                    >
                                      <Twitter className="h-5 w-5" />
                                    </a>
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {coreTeam.map((member) => (
                  <Card key={member.id} className="flex flex-col overflow-hidden">
                    <CardHeader className="p-4">
                      <div className="flex justify-center">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          width={200}
                          height={200}
                          alt={member.name}
                          className="rounded-full object-cover h-40 w-40"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 text-center">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-primary dark:text-primary-400">{member.position}</p>
                    </CardContent>
                    <CardFooter className="flex justify-center p-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => openMemberDialog(member)}>
                            {t("team.viewProfile")}
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="organization">
              <div className="flex flex-col items-center space-y-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/2">
                    <Image
                      src="/images/team-structure.png"
                      width={600}
                      height={600}
                      alt="Team Structure"
                      className="rounded-lg shadow-lg w-full h-auto"
                    />
                  </div>
                  <div className="w-full md:w-1/2 space-y-4">
                    <Image
                      src="/images/management-team.png"
                      width={600}
                      height={400}
                      alt="Management Team"
                      className="rounded-lg shadow-lg w-full h-auto"
                    />
                    <Image
                      src="/images/organizational-chart.png"
                      width={600}
                      height={400}
                      alt="Organizational Chart"
                      className="rounded-lg shadow-lg w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
