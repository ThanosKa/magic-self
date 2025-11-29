"use client";

import { FileText, Sparkles, Share2, LayoutTemplate, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: FileText,
        title: "PDF Import",
        description: "Simply drag and drop your LinkedIn PDF export or existing resume. We handle the parsing instantly.",
    },
    {
        icon: Sparkles,
        title: "AI Enhancement",
        description: "Our advanced AI analyzes your experience and suggests improvements to make your profile stand out.",
    },
    {
        icon: LayoutTemplate,
        title: "Premium Templates",
        description: "Choose from a collection of clean, professional templates designed to impress recruiters.",
    },
    {
        icon: Share2,
        title: "Instant Sharing",
        description: "Get a unique URL (yourname.com) to share your professional portfolio anywhere.",
    },
    {
        icon: ShieldCheck,
        title: "Privacy First",
        description: "Your data is yours. We don't sell your information. You have full control over your visibility.",
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Built on modern tech for instant load times and a smooth experience on any device.",
    },
];

export function Features() {
    return (
        <section id="features" className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        Everything you need to showcase your career
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Powerful features to help you build a professional presence in minutes.
                    </p>
                </motion.div>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.15,
                            },
                        },
                    }}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center"
                >
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5 }}
                            className="group relative overflow-hidden rounded-2xl border bg-background p-8 transition-all hover:shadow-lg"
                        >
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
