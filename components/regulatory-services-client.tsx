"use client";

import { useLanguage } from "@/contexts/language-context";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
    FileCheck,
    Pill,
    Stethoscope,
    Apple,
    FlaskConical,
    ShieldCheck,
    CheckCircle2,
    Send,
    Loader2,
    AlertCircle,
    Building2,
    Globe,
    Clock,
    Users,
    FileText,
    ClipboardCheck,
    MessageSquare,
    Sparkles,
    ArrowRight,
    Zap,
} from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";

// Floating particles component - smoother animation
const FloatingParticles = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
                    initial={{
                        x: `${Math.random() * 100}%`,
                        y: `${Math.random() * 100}%`,
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        y: [null, "-10%", "110%"],
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: 20 + Math.random() * 10,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

// Animated gradient orb - smoother
const GradientOrb = ({ className, delay = 0 }: { className: string; delay?: number }) => (
    <motion.div
        className={`absolute rounded-full blur-3xl ${className}`}
        animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
            duration: 12,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
        }}
    />
);

// Smooth fade-in animation variants
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, ease: "easeOut" }
    }
};

export default function RegulatoryServicesClient() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        country: "",
        productType: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const response = await fetch("/api/regulatory-inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", company: "", country: "", productType: "", message: "" });
                setTimeout(() => setStatus("idle"), 3000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 3000);
            }
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const stats = [
        { value: "200+", label: t("regulatory.stats.registrations"), icon: FileCheck, color: "from-blue-500 to-cyan-500" },
        { value: "15+", label: t("regulatory.stats.countries"), icon: Globe, color: "from-emerald-500 to-teal-500" },
        { value: "6+", label: t("regulatory.stats.experience"), icon: Clock, color: "from-violet-500 to-purple-500" },
        { value: "50+", label: t("regulatory.stats.clients"), icon: Users, color: "from-orange-500 to-rose-500" },
    ];

    const categories = [
        { label: t("regulatory.categories.pharma"), icon: Pill, gradient: "from-blue-600 via-blue-500 to-cyan-400" },
        { label: t("regulatory.categories.devices"), icon: Stethoscope, gradient: "from-emerald-600 via-emerald-500 to-teal-400" },
        { label: t("regulatory.categories.supplements"), icon: Apple, gradient: "from-orange-600 via-orange-500 to-amber-400" },
    ];

    const services = [
        {
            number: 1,
            title: t("regulatory.service1.title"),
            icon: Pill,
            items: [t("regulatory.service1.item1"), t("regulatory.service1.item2"), t("regulatory.service1.item3"), t("regulatory.service1.item4"), t("regulatory.service1.item5")],
            gradient: "from-blue-500 to-cyan-500",
            iconBg: "bg-blue-500",
        },
        {
            number: 2,
            title: t("regulatory.service2.title"),
            icon: Stethoscope,
            items: [t("regulatory.service2.item1"), t("regulatory.service2.item2"), t("regulatory.service2.item3"), t("regulatory.service2.item4"), t("regulatory.service2.item5")],
            gradient: "from-emerald-500 to-teal-500",
            iconBg: "bg-emerald-500",
        },
        {
            number: 3,
            title: t("regulatory.service3.title"),
            icon: Apple,
            items: [t("regulatory.service3.item1"), t("regulatory.service3.item2"), t("regulatory.service3.item3"), t("regulatory.service3.item4")],
            gradient: "from-orange-500 to-amber-500",
            iconBg: "bg-orange-500",
        },
        {
            number: 4,
            title: t("regulatory.service4.title"),
            icon: FlaskConical,
            description: t("regulatory.service4.description"),
            items: [t("regulatory.service4.item1"), t("regulatory.service4.item2"), t("regulatory.service4.item3"), t("regulatory.service4.item4"), t("regulatory.service4.item5")],
            gradient: "from-violet-500 to-purple-500",
            iconBg: "bg-violet-500",
        },
        {
            number: 5,
            title: t("regulatory.service5.title"),
            icon: ShieldCheck,
            description: t("regulatory.service5.description"),
            items: [t("regulatory.service5.item1"), t("regulatory.service5.item2"), t("regulatory.service5.item3"), t("regulatory.service5.item4"), t("regulatory.service5.item5")],
            gradient: "from-rose-500 to-pink-500",
            iconBg: "bg-rose-500",
        },
    ];

    const processSteps = [
        { step: 1, title: t("regulatory.process.step1.title"), description: t("regulatory.process.step1.desc"), icon: MessageSquare, color: "from-blue-500 to-cyan-500" },
        { step: 2, title: t("regulatory.process.step2.title"), description: t("regulatory.process.step2.desc"), icon: FileText, color: "from-emerald-500 to-teal-500" },
        { step: 3, title: t("regulatory.process.step3.title"), description: t("regulatory.process.step3.desc"), icon: ClipboardCheck, color: "from-violet-500 to-purple-500" },
        { step: 4, title: t("regulatory.process.step4.title"), description: t("regulatory.process.step4.desc"), icon: CheckCircle2, color: "from-orange-500 to-rose-500" },
    ];

    return (
        <div ref={containerRef} className="flex flex-col min-h-screen overflow-x-hidden">
            {/* Hero Section - No wave at bottom */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />



                    <GradientOrb className="w-[500px] h-[500px] -top-32 -left-32 bg-gradient-to-r from-primary/30 to-blue-600/20" />
                    <GradientOrb className="w-[400px] h-[400px] top-1/3 -right-20 bg-gradient-to-r from-emerald-500/20 to-cyan-500/15" delay={4} />
                    <GradientOrb className="w-[350px] h-[350px] bottom-20 left-1/4 bg-gradient-to-r from-violet-500/20 to-pink-500/15" delay={8} />

                    <FloatingParticles />
                </div>

                <div className="container mx-auto px-6 lg:px-8 relative z-10 py-20">
                    <motion.div
                        className="flex flex-col items-center text-center space-y-10 max-w-5xl mx-auto"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        {/* Badge */}
                        <motion.div variants={fadeInUp} className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-cyan-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                            <div className="relative inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-6 py-3 text-sm font-medium text-white shadow-2xl">
                                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                                {t("regulatory.hero.badge")}
                                <span className="ml-2 h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                            </div>
                        </motion.div>

                        {/* Main Title */}
                        <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                                {t("regulatory.hero.title").split(" ").slice(0, -2).join(" ")}
                            </span>{" "}
                            <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                {t("regulatory.hero.title").split(" ").slice(-2).join(" ")}
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p variants={fadeInUp} className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-3xl">
                            {t("regulatory.hero.subtitle")}
                        </motion.p>

                        {/* Category Pills */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                            {categories.map((cat, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className={`group relative flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r ${cat.gradient} text-white font-medium shadow-xl cursor-pointer overflow-hidden`}
                                >
                                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-300" />
                                    <cat.icon className="h-5 w-5 relative z-10" />
                                    <span className="relative z-10">{cat.label}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div variants={fadeInUp} className="pt-4">
                            <Link href="#contact">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    className="group relative inline-flex items-center gap-3 px-10 py-5 text-lg font-semibold text-white rounded-2xl overflow-hidden shadow-2xl"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-cyan-500" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative z-10">{t("regulatory.hero.cta")}</span>
                                    <ArrowRight className="relative z-10 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Smooth wave transition */}
                <div className="absolute -bottom-1 left-0 right-0">
                    <svg viewBox="0 0 1440 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
                        <path d="M0 150L60 135C120 120 240 90 360 75C480 60 600 60 720 67.5C840 75 960 90 1080 97.5C1200 105 1320 105 1380 105L1440 105V150H1380C1320 150 1200 150 1080 150C960 150 840 150 720 150C600 150 480 150 360 150C240 150 120 150 60 150H0Z" className="fill-background" />
                    </svg>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-24 lg:py-32 bg-background relative">
                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                                whileHover={{ y: -5 }}
                                className="group"
                            >
                                <div className="relative flex flex-col items-center text-center p-8 rounded-3xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                                    <motion.div
                                        className={`flex items-center justify-center w-16 h-16 mb-5 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}
                                        whileHover={{ rotate: 5, scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <stat.icon className="h-8 w-8 text-white" />
                                    </motion.div>
                                    <div className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-muted-foreground font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About & Mission Section - Fixed equal height */}
            <section className="py-20 lg:py-28 bg-muted/30 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                { title: t("regulatory.about.title"), desc: t("regulatory.about.description"), icon: Building2, gradient: "from-primary to-blue-600", bg: "from-primary/10 to-blue-500/5" },
                                { title: t("regulatory.mission.title"), desc: t("regulatory.mission.description"), icon: ShieldCheck, gradient: "from-emerald-500 to-teal-600", bg: "from-emerald-500/10 to-teal-500/5" },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                                    whileHover={{ y: -4 }}
                                    className="h-full"
                                >
                                    <div className={`relative bg-gradient-to-br ${item.bg} rounded-3xl p-8 lg:p-10 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col`}>
                                        <div className="flex items-center gap-4 mb-6">
                                            <motion.div
                                                className={`p-4 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`}
                                                whileHover={{ rotate: 5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <item.icon className="h-6 w-6 text-white" />
                                            </motion.div>
                                            <h2 className="text-2xl lg:text-3xl font-bold">{item.title}</h2>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed text-base lg:text-lg flex-1">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Services Section - Redesigned */}
            <section className="py-24 lg:py-32 bg-gradient-to-b from-background via-background to-muted/20 relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-blue-500/20 text-primary text-sm font-semibold mb-6 border border-primary/20"
                        >
                            <Zap className="h-4 w-4" />
                            {t("regulatory.services.subtitle")}
                        </motion.div>
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            {t("regulatory.services.title")}
                        </h2>
                    </motion.div>

                    <div className="space-y-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                            >
                                <Card className="group overflow-hidden border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
                                    <CardContent className="p-0">
                                        <div className="flex flex-col lg:flex-row">
                                            {/* Left side - Number and Icon */}
                                            <div className={`lg:w-48 flex-shrink-0 bg-gradient-to-br ${service.gradient} p-6 lg:p-8 flex lg:flex-col items-center lg:justify-center gap-4`}>
                                                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-2xl">
                                                    {service.number}
                                                </div>
                                                <service.icon className="h-8 w-8 text-white/90" />
                                            </div>

                                            {/* Right side - Content */}
                                            <div className="flex-1 p-6 lg:p-8">
                                                <h3 className="text-xl lg:text-2xl font-bold mb-4">{service.title}</h3>
                                                {service.description && (
                                                    <p className="text-muted-foreground mb-4 text-sm lg:text-base">{service.description}</p>
                                                )}
                                                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                                                    {service.items.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-2.5 text-sm lg:text-base">
                                                            <CheckCircle2 className={`h-5 w-5 mt-0.5 flex-shrink-0 text-primary`} />
                                                            <span className="text-foreground/80">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section - Fixed equal size boxes */}
            <section className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                            {t("regulatory.process.title")}
                        </h2>
                    </motion.div>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Connection Line */}
                        <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-blue-500 via-emerald-500 via-violet-500 to-orange-500 -translate-y-1/2 rounded-full opacity-30" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {processSteps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
                                    whileHover={{ y: -5 }}
                                    className="relative group h-full"
                                >
                                    <div className="relative bg-card p-6 lg:p-8 rounded-3xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full flex flex-col">
                                        {/* Step Number */}
                                        <motion.div
                                            className={`w-16 h-16 mx-auto mb-5 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                                            whileHover={{ scale: 1.05, rotate: 3 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            {step.step}
                                        </motion.div>
                                        <div className="p-3 bg-muted rounded-xl w-fit mx-auto mb-4">
                                            <step.icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                                        <p className="text-sm text-muted-foreground flex-1">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
                    <GradientOrb className="w-[400px] h-[400px] -top-20 -right-20 bg-gradient-to-r from-primary/25 to-blue-600/15" />
                    <GradientOrb className="w-[350px] h-[350px] bottom-10 left-10 bg-gradient-to-r from-emerald-500/15 to-cyan-500/10" delay={5} />
                    <FloatingParticles />
                </div>

                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                            {t("regulatory.contact.title")}
                        </h2>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto">
                            {t("regulatory.contact.subtitle")}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-20" />
                            <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 lg:p-10 border border-white/10 shadow-2xl">
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        {[
                                            { id: "name", label: t("contact.form.name"), placeholder: t("contact.form.namePlaceholder"), type: "text" },
                                            { id: "email", label: t("contact.form.email"), placeholder: t("contact.form.emailPlaceholder"), type: "email" },
                                            { id: "company", label: t("regulatory.contact.form.company"), placeholder: t("regulatory.contact.form.companyPlaceholder"), type: "text" },
                                            { id: "country", label: t("regulatory.contact.form.country"), placeholder: t("regulatory.contact.form.countryPlaceholder"), type: "text" },
                                        ].map((field) => (
                                            <div key={field.id} className="space-y-2">
                                                <label htmlFor={field.id} className="text-sm font-medium text-white/80">
                                                    {field.label}
                                                </label>
                                                <Input
                                                    id={field.id}
                                                    type={field.type}
                                                    placeholder={field.placeholder}
                                                    value={formData[field.id as keyof typeof formData]}
                                                    onChange={handleChange}
                                                    required
                                                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary/50 focus:ring-primary/30 transition-colors"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="productType" className="text-sm font-medium text-white/80">
                                            {t("regulatory.contact.form.productType")}
                                        </label>
                                        <Input
                                            id="productType"
                                            placeholder={t("regulatory.contact.form.productTypePlaceholder")}
                                            value={formData.productType}
                                            onChange={handleChange}
                                            required
                                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary/50 focus:ring-primary/30 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-white/80">
                                            {t("contact.form.message")}
                                        </label>
                                        <Textarea
                                            id="message"
                                            placeholder={t("contact.form.messagePlaceholder")}
                                            className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary/50 focus:ring-primary/30 transition-colors"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    >
                                        <Button
                                            type="submit"
                                            className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary via-blue-500 to-cyan-500 hover:opacity-90 shadow-xl transition-opacity"
                                            disabled={status === "sending"}
                                        >
                                            {status === "sending" ? (
                                                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                                            ) : status === "success" ? (
                                                <><CheckCircle2 className="mr-2 h-5 w-5" /> {t("contact.form.success")}</>
                                            ) : status === "error" ? (
                                                <><AlertCircle className="mr-2 h-5 w-5" /> {t("contact.form.error")}</>
                                            ) : (
                                                <><Send className="mr-2 h-5 w-5" /> {t("regulatory.contact.form.submit")}</>
                                            )}
                                        </Button>
                                    </motion.div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
