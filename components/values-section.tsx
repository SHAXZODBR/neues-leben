"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Heart, Scale, Target, Users2, ClipboardCheck, GraduationCap } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ValuesSection() {
  const { t } = useLanguage()

  return (
    <section id="values" className="w-full py-12 md:py-24 lg:py-32 bg-primary-50 dark:bg-primary-950/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-800 dark:text-primary-400">
              {t("values.title")}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("values.description")}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Users className="h-8 w-8 text-primary dark:text-primary-400" />
              <CardTitle className="text-xl">{t("values.people")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t("values.people.description")}</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Heart className="h-8 w-8 text-primary dark:text-primary-400" />
              <CardTitle className="text-xl">{t("values.openness")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t("values.openness.description")}</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Scale className="h-8 w-8 text-primary dark:text-primary-400" />
              <CardTitle className="text-xl">{t("values.fairness")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t("values.fairness.description")}</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Target className="h-8 w-8 text-primary dark:text-primary-400" />
              <CardTitle className="text-xl">{t("values.ambition")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t("values.ambition.description")}</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Users2 className="h-8 w-8 text-primary dark:text-primary-400" />
              <CardTitle className="text-xl">{t("values.teamwork")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t("values.teamwork.description")}</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <ClipboardCheck className="h-8 w-8 text-primary dark:text-primary-400" />
              <CardTitle className="text-xl">{t("values.responsibility")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t("values.responsibility.description")}</CardDescription>
            </CardContent>
          </Card>
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <GraduationCap className="h-8 w-8 text-primary dark:text-primary-400" />
              <CardTitle className="text-xl">{t("values.improvement")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t("values.improvement.description")}</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
