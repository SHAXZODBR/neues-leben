"use client";

import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    GraduationCap,
    Users,
    BookOpen,
    ChevronRight,
    CheckCircle2,
    Award,
    Briefcase,
    UserCheck,
    TrendingUp,
    Clock,
    Building2,
    FileCheck,
} from "lucide-react";
import Link from "next/link";

export default function TrainingPage() {
    const { t } = useLanguage();

    const curriculumModules = [
        {
            title: t("training.curriculum.module1"),
            icon: BookOpen,
        },
        {
            title: t("training.curriculum.module2"),
            icon: CheckCircle2,
        },
        {
            title: t("training.curriculum.module3"),
            icon: Users,
        },
        {
            title: t("training.curriculum.module4"),
            icon: GraduationCap,
        },
    ];

    const stats = [
        { value: "500+", label: t("training.stats.trainees"), icon: UserCheck },
        { value: "95%", label: t("training.stats.rate"), icon: TrendingUp },
        { value: "25+", label: t("training.stats.partners"), icon: Building2 },
        { value: "6+", label: t("training.stats.years"), icon: Clock },
    ];

    const benefits = [
        {
            title: t("training.benefits.mentorship"),
            description: t("training.benefits.mentorshipDesc"),
            icon: Users
        },
        {
            title: t("training.benefits.practical"),
            description: t("training.benefits.practicalDesc"),
            icon: BookOpen
        },
        {
            title: t("training.benefits.certification"),
            description: t("training.benefits.certificationDesc"),
            icon: Award
        },
        {
            title: t("training.benefits.placement"),
            description: t("training.benefits.placementDesc"),
            icon: Briefcase
        },
    ];

    const processSteps = [
        {
            step: 1,
            title: t("training.process.step1.title"),
            description: t("training.process.step1.desc"),
            icon: FileCheck
        },
        {
            step: 2,
            title: t("training.process.step2.title"),
            description: t("training.process.step2.desc"),
            icon: UserCheck
        },
        {
            step: 3,
            title: t("training.process.step3.title"),
            description: t("training.process.step3.desc"),
            icon: GraduationCap
        },
        {
            step: 4,
            title: t("training.process.step4.title"),
            description: t("training.process.step4.desc"),
            icon: Briefcase
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm font-medium text-primary backdrop-blur-sm"
                        >
                            <GraduationCap className="mr-2 h-4 w-4" />
                            {t("nav.training")}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight"
                        >
                            {t("training.hero.title")}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-2xl"
                        >
                            {t("training.hero.subtitle")}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="pt-4"
                        >
                            <Link href="/#contact">
                                <Button size="lg" className="h-14 px-10 text-base shadow-lg hover:shadow-xl transition-all">
                                    {t("training.cta.button")}
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 lg:py-20 bg-card border-y border-border/50">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="flex items-center justify-center w-16 h-16 mb-4 bg-primary/10 rounded-2xl">
                                    <stat.icon className="h-8 w-8 text-primary" />
                                </div>
                                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm lg:text-base text-muted-foreground">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Program Overview */}
            <section className="py-20 lg:py-28 bg-background">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
                                {t("training.overview.title")}
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
                                {t("training.overview.description")}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 lg:p-10 border border-primary/20"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-xl">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-xl mb-3">
                                        {t("training.forWho.title")}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {t("training.forWho.description")}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 lg:py-28 bg-muted/30">
                <div className="container mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                            {t("training.benefits.title")}
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative p-6 lg:p-8 bg-card hover:bg-card/80 border border-border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="p-4 bg-primary/10 rounded-2xl group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                                        <benefit.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-lg">{benefit.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Training Process / Journey */}
            <section className="py-20 lg:py-28 bg-background">
                <div className="container mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                            {t("training.process.title")}
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="relative"
                            >
                                {/* Connector Line (desktop only) */}
                                {index < processSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-0 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 -translate-y-1/2" />
                                )}

                                {/* Content Card */}
                                <div className="bg-card p-6 lg:p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow h-full">
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        {/* Step Number */}
                                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg">
                                            {step.step}
                                        </div>

                                        <div className="p-3 bg-primary/10 rounded-xl">
                                            <step.icon className="h-6 w-6 text-primary" />
                                        </div>

                                        <h3 className="font-semibold text-lg">{step.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Curriculum */}
            <section className="py-20 lg:py-28 bg-muted/30">
                <div className="container mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                            {t("training.curriculum.title")}
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
                        {curriculumModules.map((module, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group p-6 lg:p-8 bg-card hover:bg-card/50 border border-border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="p-4 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                        <module.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-base lg:text-lg leading-snug">{module.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/10 via-background to-primary/5 relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl mx-auto space-y-8"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                            {t("training.cta.title")}
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            {t("training.hero.subtitle")}
                        </p>
                        <div className="pt-4">
                            <Link href="/#contact">
                                <Button size="lg" className="h-14 px-12 text-base shadow-lg hover:shadow-xl transition-all">
                                    {t("training.cta.button")}
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Background decorations */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20">
                    <div className="absolute top-10 right-10 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
                </div>
            </section>
        </div>
    );
}
