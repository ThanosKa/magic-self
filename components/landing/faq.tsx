import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "Is it really free?",
        answer: "Yes, the core features are 100% free and open source. You can create your resume website and share it without any cost.",
    },
    {
        question: "How does the PDF import work?",
        answer: "We use advanced parsing technology to read the structure of your LinkedIn PDF export or standard resume PDF. We then map this data to our website templates automatically.",
    },
    {
        question: "Can I customize the design?",
        answer: "Absolutely. We offer several premium templates and you can customize colors, fonts, and layout options to match your personal brand.",
    },
    {
        question: "Is my data secure?",
        answer: "Your privacy is our top priority. We do not sell your data. Your resume information is used solely to generate your website.",
    },
    {
        question: "Can I use my own domain?",
        answer: "Currently, we provide a free subdomain (e.g., yourname.resumebuilder.com). Custom domain support is on our roadmap.",
    },
];

export function FAQ() {
    return (
        <section className="py-20 md:py-32">
            <div className="container max-w-3xl">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Got questions? We've got answers.
                    </p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger className="text-left text-lg">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
