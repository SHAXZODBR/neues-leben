"use client";

import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "@/components/logo";

export default function ContactSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="w-full py-16 sm:py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
              {t("contact.title")}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              {t("contact.subtitle")}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">
                  {t("contact.form.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4 sm:space-y-6"
                  action="mailto:info@neuesleben.uz"
                  method="post"
                  encType="text/plain"
                >
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {t("contact.form.name")}
                    </label>
                    <Input
                      id="name"
                      placeholder={t("contact.form.namePlaceholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {t("contact.form.email")}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("contact.form.emailPlaceholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {t("contact.form.message")}
                    </label>
                    <Textarea
                      id="message"
                      placeholder={t("contact.form.messagePlaceholder")}
                      className="min-h-[100px] sm:min-h-[120px]"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {t("contact.form.submit")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">
                  {t("contact.info.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {t("contact.info.address.title")}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t("contact.info.address.value")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {t("contact.info.phone.title")}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">+998 90 903 03 31</p>
                      <p className="text-muted-foreground">+998 97 769 64 80</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {t("contact.info.email.title")}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">
                        info@neuesleben.uz
                      </p>
                      <p className="text-muted-foreground">hr@neuesleben.uz</p>
                      <p className="text-muted-foreground">
                        import@neuesleben.uz
                      </p>
                      <p className="text-muted-foreground">
                        sales@neuesleben.uz
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center p-4 sm:p-8 bg-card rounded-xl shadow-sm border border-border">
              <Logo
                size="large"
                className="h-12 w-12 sm:h-16 sm:w-16 text-primary"
              />
              <div className="ml-4 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  NEUES LEBEN
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {t("contact.info.tagline")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
