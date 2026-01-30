"use client";

import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    GraduationCap,
    Users,
    BookOpen,
    CheckCircle2,
    Award,
    Briefcase,
    UserCheck,
    TrendingUp,
    Clock,
    Building2,
    FileCheck,
    ArrowRight,

    Star,
    Zap,
    Trophy,
} from "lucide-react";
import Link from "next/link";

export default function TrainingPage() {
    const { t } = useLanguage();

    const stats = [
        { value: "500+", label: t("training.stats.trainees"), icon: UserCheck, gradient: "from-primary to-emerald-600" },
        { value: "94%", label: t("training.stats.rate"), icon: TrendingUp, gradient: "from-emerald-500 to-teal-600" },
        { value: "25+", label: t("training.stats.partners"), icon: Building2, gradient: "from-teal-500 to-cyan-600" },
        { value: "6+", label: t("training.stats.years"), icon: Clock, gradient: "from-cyan-500 to-blue-600" },
    ];

    const benefits = [
        { title: t("training.benefits.mentorship"), description: t("training.benefits.mentorshipDesc"), icon: Users, color: "bg-primary" },
        { title: t("training.benefits.practical"), description: t("training.benefits.practicalDesc"), icon: BookOpen, color: "bg-emerald-500" },
        { title: t("training.benefits.certification"), description: t("training.benefits.certificationDesc"), icon: Award, color: "bg-teal-500" },
        { title: t("training.benefits.placement"), description: t("training.benefits.placementDesc"), icon: Briefcase, color: "bg-orange-500" },
    ];

    const processSteps = [
        { step: 1, title: t("training.process.step1.title"), description: t("training.process.step1.desc"), icon: FileCheck },
        { step: 2, title: t("training.process.step2.title"), description: t("training.process.step2.desc"), icon: UserCheck },
        { step: 3, title: t("training.process.step3.title"), description: t("training.process.step3.desc"), icon: GraduationCap },
        { step: 4, title: t("training.process.step4.title"), description: t("training.process.step4.desc"), icon: Trophy },
    ];

    const curriculumModules = [
        { title: t("training.curriculum.module1"), icon: BookOpen },
        { title: t("training.curriculum.module2"), icon: CheckCircle2 },
        { title: t("training.curriculum.module3"), icon: Users },
        { title: t("training.curriculum.module4"), icon: GraduationCap },
    ];

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            {/* Hero Section - Dark Theme like Regulatory */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Dark Background like Regulatory Page */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
                    {/* Animated gradient orbs */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
                        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />
                    </div>


                </div>


                {/* Floating 3D Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-20 left-[15%] w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl"
                        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <GraduationCap className="h-12 w-12 text-white" />
                    </motion.div>

                    <motion.div
                        className="absolute top-40 right-[10%] w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl"
                        animate={{ y: [0, 25, 0], rotate: [0, -15, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >
                        <Award className="h-10 w-10 text-white" />
                    </motion.div>

                    <motion.div
                        className="absolute bottom-32 left-[20%] w-16 h-16 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl"
                        animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    >
                        <Star className="h-8 w-8 text-white" />
                    </motion.div>

                    <motion.div
                        className="absolute bottom-40 right-[15%] w-28 h-28 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl"
                        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    >
                        <Zap className="h-14 w-14 text-white" />
                    </motion.div>
                </div>

                {/* Hero Content */}
                <div className="container mx-auto px-6 lg:px-8 relative z-10 py-20">
                    <motion.div
                        className="text-center max-w-5xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 mb-10"
                        >
                            <Award className="h-5 w-5 text-yellow-300" />
                            <span className="text-white font-medium">{t("nav.training")}</span>
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        </motion.div>

                        {/* Main Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[1.1] mb-8"
                        >
                            {t("training.hero.title").split(" ").slice(0, -1).join(" ")}
                            <span className="block mt-2 bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent">
                                {t("training.hero.title").split(" ").slice(-1)}
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
                        >
                            {t("training.hero.subtitle")}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            <Link href="/#contact">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group inline-flex items-center gap-3 bg-white text-primary font-bold px-10 py-5 rounded-2xl text-lg shadow-2xl shadow-black/20 hover:shadow-white/20 transition-all"
                                >
                                    {t("training.cta.button")}
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                        </motion.div>


                    </motion.div>
                </div>

                {/* Bottom wave */}
                <div className="absolute -bottom-1 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
                        <path d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" className="fill-background" />
                    </svg>
                </div>
            </section>

            {/* Stats Cards Section */}
            <section className="py-24 lg:py-32 bg-background relative -mt-20">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group"
                            >
                                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${stat.gradient} p-8 text-white shadow-xl`}>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
                                    <stat.icon className="h-12 w-12 mb-6 opacity-80" />
                                    <div className="text-5xl font-bold mb-2">{stat.value}</div>
                                    <div className="text-white/80">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section - Glass Cards */}
            <section className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 text-primary font-semibold mb-4">
                            <GraduationCap className="h-5 w-5" />
                            {t("training.overview.title")}
                        </span>
                        <h2 className="text-4xl lg:text-6xl font-bold">{t("training.overview.title")}</h2>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-primary to-emerald-600 rounded-3xl p-10 text-white relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
                            <GraduationCap className="h-12 w-12 mb-6" />
                            <h3 className="text-2xl font-bold mb-4">{t("training.overview.title")}</h3>
                            <p className="text-white/80 leading-relaxed text-lg">{t("training.overview.description")}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-card rounded-3xl p-10 border border-border shadow-xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
                            <Users className="h-12 w-12 text-primary mb-6" />
                            <h3 className="text-2xl font-bold mb-4">{t("training.forWho.title")}</h3>
                            <p className="text-muted-foreground leading-relaxed text-lg">{t("training.forWho.description")}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits Section - Modern Cards */}
            <section className="py-24 lg:py-32 bg-background">
                <div className="container mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-6xl font-bold">{t("training.benefits.title")}</h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -12, scale: 1.02 }}
                                className="group"
                            >
                                <div className="h-full bg-card rounded-3xl p-8 border border-border shadow-lg hover:shadow-2xl hover:border-primary/30 transition-all relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className={`w-16 h-16 ${benefit.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <benefit.icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section - Stunning Timeline */}
            <section className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl lg:text-6xl font-bold">{t("training.process.title")}</h2>
                    </motion.div>

                    <div className="max-w-4xl mx-auto relative">
                        {/* Vertical line */}
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-emerald-500 to-teal-500 -translate-x-1/2 rounded-full" />

                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className={`flex items-center gap-8 mb-16 last:mb-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                <div className={`flex-1 ${index % 2 === 1 ? 'lg:text-right' : ''}`}>
                                    <div className="bg-card rounded-3xl p-8 border border-border shadow-lg hover:shadow-xl transition-shadow">
                                        <div className={`flex items-center gap-4 mb-4 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                                                {step.step}
                                            </div>
                                            <h3 className="text-xl font-bold">{step.title}</h3>
                                        </div>
                                        <p className="text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>

                                {/* Center dot */}
                                <div className="hidden lg:flex w-6 h-6 rounded-full bg-gradient-to-br from-primary to-emerald-600 shadow-lg shadow-primary/50 flex-shrink-0" />

                                <div className="flex-1 hidden lg:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Curriculum - Gradient Cards */}
            <section className="py-24 lg:py-32 bg-background">
                <div className="container mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-6xl font-bold">{t("training.curriculum.title")}</h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {curriculumModules.map((module, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-emerald-500 to-teal-500 p-8 text-white shadow-xl aspect-square flex flex-col items-center justify-center text-center">
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                    <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <module.icon className="h-10 w-10" />
                                    </div>
                                    <span className="font-bold text-lg leading-snug">{module.title}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">

                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[100px]" />

                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
                            {t("training.cta.title")}
                        </h2>
                        <p className="text-white/70 text-xl mb-12 leading-relaxed">
                            {t("training.hero.subtitle")}
                        </p>
                        <Link href="/#contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-3 bg-white text-primary font-bold px-12 py-6 rounded-2xl text-lg shadow-2xl"
                            >
                                {t("training.cta.button")}
                                <ArrowRight className="h-6 w-6" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
