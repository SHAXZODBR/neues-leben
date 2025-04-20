"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ContactSection() {
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
    // Reset form
    setFormData({ name: "", email: "", message: "" })
    // Show success message
    alert("Thank you for your message. We'll get back to you soon!")
  }

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-800 dark:text-primary-400">
              {t("contact.title")}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("contact.description")}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("contact.info.title")}</CardTitle>
                <CardDescription>{t("contact.info.description")}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="flex items-center gap-4">
                  <MapPin className="h-6 w-6 text-primary dark:text-primary-400" />
                  <div>
                    <h3 className="font-semibold">{t("contact.address.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("contact.address.value")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-primary dark:text-primary-400" />
                  <div>
                    <h3 className="font-semibold">{t("contact.phone.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("contact.phone.value")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-primary dark:text-primary-400" />
                  <div>
                    <h3 className="font-semibold">{t("contact.email.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("contact.email.value")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("contact.hours.title")}</CardTitle>
                <CardDescription>{t("contact.hours.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{t("contact.hours.weekdays")}</span>
                    <span>{t("contact.hours.weekdays.time")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">{t("contact.hours.saturday")}</span>
                    <span>{t("contact.hours.saturday.time")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">{t("contact.hours.sunday")}</span>
                    <span>{t("contact.hours.sunday.time")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t("contact.message.title")}</CardTitle>
              <CardDescription>{t("contact.message.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">{t("contact.form.name")}</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t("contact.form.name.placeholder")}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">{t("contact.form.email")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("contact.form.email.placeholder")}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">{t("contact.form.message")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t("contact.form.message.placeholder")}
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[150px]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {t("contact.form.submit")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
