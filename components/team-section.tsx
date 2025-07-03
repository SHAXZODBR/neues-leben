"use client";

import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Users,
  UserPlus,
  Briefcase,
  BarChartIcon as ChartBar,
  FileText,
  UserCog,
  Truck,
  FileCheck,
  Building,
} from "lucide-react";
import TeamGallery from "./team-gallery";

export default function TeamSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const departments = [
    {
      name: t("team.departments.admin"),
      icon: <Building className="h-4 w-4" />,
    },
    { name: t("team.departments.hr"), icon: <UserCog className="h-4 w-4" /> },
    {
      name: t("team.departments.legal"),
      icon: <FileText className="h-4 w-4" />,
    },
    {
      name: t("team.departments.sales"),
      icon: <ChartBar className="h-4 w-4" />,
    },
    {
      name: t("team.departments.medical"),
      icon: <Users className="h-4 w-4" />,
    },
    {
      name: t("team.departments.foreign"),
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      name: t("team.departments.registration"),
      icon: <FileCheck className="h-4 w-4" />,
    },
    {
      name: t("team.departments.logistics"),
      icon: <Truck className="h-4 w-4" />,
    },
    {
      name: t("team.departments.customs"),
      icon: <UserPlus className="h-4 w-4" />,
    },
  ];

  return (
    <section id="team" className="w-full py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-800 dark:text-primary-400">
              {t("team.title")}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
              <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
                {t("team.companyPrefix")}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                NEUES LEBEN
              </span>
              <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
                {t("team.employeeCount")}
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">
                135
              </span>
              <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
                {t("team.employeeSuffix")}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary-100 to-primary-300 dark:from-primary-900 dark:to-primary-700">
              <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
                <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-3 w-full max-w-2xl">
                  {departments.map((dept, index) => (
                    <motion.div
                      key={index}
                      className="bg-white dark:bg-gray-800 p-1 sm:p-2 rounded-md shadow-sm flex flex-col items-center text-center min-h-[60px] sm:min-h-[70px]"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      <div className="p-1 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-1 flex-shrink-0">
                        {dept.icon}
                      </div>
                      <p className="text-[10px] sm:text-xs lg:text-sm text-gray-700 dark:text-gray-300 leading-tight text-center">
                        {dept.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6 lg:space-y-8 order-1 lg:order-2"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-primary-800 dark:text-primary-400 mb-6">
                {t("team.departmentsTitle")}
              </h3>

              <ul className="space-y-3 sm:space-y-4">
                {departments.map((department, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="h-2 w-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {department.name}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/30 p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-primary">
              <p className="text-base sm:text-lg font-medium text-primary-800 dark:text-primary-300 leading-relaxed">
                {t("team.teamSpirit")}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <TeamGallery />
        </motion.div>
      </div>
    </section>
  );
}
