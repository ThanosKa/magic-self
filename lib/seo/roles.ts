export interface RoleData {
  slug: string;
  title: string;
  headline: string;
  description: string;
  intro: string;
  mustHaveSections: { section: string; why: string }[];
  exampleSkills: string[];
  tips: string[];
  faqs: { q: string; a: string }[];
  keywords: string[];
}

export const roles: RoleData[] = [
  {
    slug: "software-engineer",
    title: "Software Engineer",
    headline: "Software Engineer Portfolio Website — Free Template & Examples (2026)",
    description:
      "See what a great software engineer portfolio includes. Build yours free from your resume PDF at magic-self.dev. Showcase projects, skills, and experience in 2 clicks.",
    intro:
      "A strong software engineer portfolio does more than list your jobs — it proves you can build things. The best engineer portfolios combine a clear technical skills breakdown, real project outcomes with measurable impact, and a career narrative that shows growth. Magic Self generates this automatically from your existing resume PDF, giving you a live portfolio at magic-self.dev/yourname without writing a single line of HTML.",
    mustHaveSections: [
      {
        section: "Technical Skills Matrix",
        why: "Recruiters and hiring managers spend 10–15 seconds scanning a resume. A well-organized skills section with languages, frameworks, databases, and tools lets them immediately qualify your technical fit.",
      },
      {
        section: "Projects with Outcomes",
        why: "Projects are the proof of your abilities. Each project entry should describe the problem, your technical approach, and a measurable outcome — not just a list of technologies used.",
      },
      {
        section: "Professional Experience Timeline",
        why: "Hiring managers want to see career progression. A clear timeline of roles with accomplishment-based bullets (not job description bullets) demonstrates scope of work and growth.",
      },
      {
        section: "Education and Certifications",
        why: "Degrees, bootcamps, and certifications like AWS, Google Cloud, or Microsoft Azure credentials establish foundational credibility, especially for mid-career engineers.",
      },
      {
        section: "Open Source and GitHub Contributions",
        why: "Links to public repositories, open source contributions, or significant GitHub activity demonstrate that you code beyond work hours — a strong positive signal to engineering managers.",
      },
      {
        section: "Contact and Professional Links",
        why: "Make it effortless for recruiters to reach you. Include a professional email, LinkedIn URL, GitHub profile, and any relevant portfolio links in a prominent location.",
      },
    ],
    exampleSkills: [
      "JavaScript / TypeScript",
      "React / Next.js",
      "Node.js / Express",
      "Python / Django",
      "PostgreSQL / MongoDB",
      "AWS / GCP / Azure",
      "Docker / Kubernetes",
      "CI/CD / GitHub Actions",
      "GraphQL / REST APIs",
      "System Design",
    ],
    tips: [
      "Quantify everything you can. 'Reduced API response time by 40%' is more compelling than 'improved performance'. Hiring managers remember numbers.",
      "Keep your skills list honest and current. List tools you can discuss in an interview confidently — not every tool you touched once three years ago.",
      "Lead each experience bullet with a strong action verb: built, designed, optimized, shipped, reduced, scaled, migrated, automated.",
      "Include a brief professional summary at the top that says who you are, what you specialize in, and what kind of role you are looking for — in two sentences.",
      "Link to your GitHub profile prominently. Even a handful of public repos with good READMEs signals that you take engineering seriously.",
    ],
    faqs: [
      {
        q: "What should a software engineer portfolio include in 2026?",
        a: "A great software engineer portfolio in 2026 should include a technical skills matrix, project descriptions with measurable outcomes, a professional experience timeline, education and certifications, links to GitHub or open source work, and clear contact information.",
      },
      {
        q: "How do I create a software engineer portfolio for free?",
        a: "Upload your existing resume PDF to Magic Self at magic-self.dev and your engineer portfolio is generated automatically in seconds — completely free. You get a live URL at magic-self.dev/yourname to share in job applications.",
      },
      {
        q: "Do I need a portfolio website as a software engineer?",
        a: "Increasingly yes. As engineering hiring becomes more competitive, a portfolio website gives recruiters a shareable link to your professional profile, helps you appear in Google searches, and demonstrates digital initiative that most candidates lack.",
      },
      {
        q: "How long should a software engineer portfolio be?",
        a: "Your portfolio should be scannable in under two minutes. Focus on your top 3–5 projects, your most relevant skills, and your last 3–4 roles. Depth beats breadth — fewer, stronger examples are better than an exhaustive history.",
      },
    ],
    keywords: [
      "software engineer portfolio website",
      "free software engineer portfolio",
      "software engineer portfolio examples 2026",
      "how to build software engineer portfolio",
      "engineer portfolio website template",
      "software developer portfolio free",
      "coding portfolio website",
    ],
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    headline: "Product Manager Portfolio Website — Free Template & Examples (2026)",
    description:
      "See what a strong PM portfolio includes. Build yours free from your resume at magic-self.dev. Showcase product wins, roadmaps, and leadership in 2 clicks.",
    intro:
      "Product management portfolios need to communicate three things clearly: the products you have shaped, the outcomes you drove, and how you think about building. The best PM portfolios show a career of increasing scope, demonstrate cross-functional leadership, and use metrics to prove real business impact. Magic Self generates a polished PM portfolio automatically from your resume PDF — no templates to fill, no portfolio site to build.",
    mustHaveSections: [
      {
        section: "Product Wins and Impact Metrics",
        why: "PMs are evaluated on outcomes. Concrete metrics — revenue growth, user retention, conversion improvements, NPS changes — give hiring managers the evidence they need to advance your candidacy.",
      },
      {
        section: "Career Progression Timeline",
        why: "Hiring managers want to see how your scope has grown. A clear timeline from junior PM to lead PM, showing increasing product complexity and team size, demonstrates the career arc they are hiring for.",
      },
      {
        section: "Core PM Skills and Tools",
        why: "Explicitly listing your PM competencies — roadmapping, stakeholder management, data analysis, agile/scrum, A/B testing, SQL, OKRs — makes it easy for ATS systems and human reviewers to qualify you quickly.",
      },
      {
        section: "Product Domains and Industries",
        why: "Showing the product domains you have worked in (consumer, enterprise, fintech, health tech, etc.) helps hiring managers quickly assess your domain fit for their product.",
      },
      {
        section: "Education and PM Certifications",
        why: "Relevant degrees, MBA programs, and certifications like AIPMM or Product School credentials establish credibility, especially for PMs earlier in their career.",
      },
      {
        section: "Links to Case Studies or Product Examples",
        why: "A reference to deeper case study work — in Notion, Google Docs, or a personal blog — gives engaged hiring managers a path to learn more about how you think.",
      },
    ],
    exampleSkills: [
      "Product Roadmapping",
      "OKRs & KPI Definition",
      "A/B Testing & Experimentation",
      "SQL & Data Analysis",
      "Jira / Linear / Asana",
      "Stakeholder Management",
      "User Research & Interviews",
      "Agile / Scrum",
      "Go-to-Market Strategy",
      "Prioritization Frameworks",
    ],
    tips: [
      "Every experience bullet should answer 'so what?'. Shipped a new feature is not enough — tell them what happened after you shipped it.",
      "Use the STAR format for major accomplishments: Situation, Task, Action, Result. This structure makes your impact crystal clear.",
      "Include the scale of the products you owned — monthly active users, revenue influenced, team size, and engineering headcount you partnered with.",
      "Mention cross-functional leadership explicitly. Hiring managers want to know you can align engineering, design, and business stakeholders, not just write PRDs.",
      "If you are newer to PM, emphasize your frameworks, analytical thinking, and any experiments you ran — even in non-PM roles.",
    ],
    faqs: [
      {
        q: "Do product managers need a portfolio in 2026?",
        a: "Yes, increasingly so. As PM roles become more competitive, a portfolio that demonstrates your track record, product thinking, and business impact helps you stand out from candidates who only submit a PDF resume.",
      },
      {
        q: "What makes a strong PM portfolio?",
        a: "A strong PM portfolio clearly shows the products you have owned, the outcomes you drove (with metrics), your cross-functional leadership, and your product thinking process. It should be scannable in 90 seconds and leave a hiring manager wanting to learn more.",
      },
      {
        q: "How do I build a PM portfolio with no case studies?",
        a: "Start by structuring your resume bullets around outcomes, not tasks. Include your PM tools, methodologies, and domain experience prominently. Upload to Magic Self and you will have a professional portfolio page immediately — you can add deeper case studies later.",
      },
      {
        q: "Can I create a PM portfolio for free?",
        a: "Yes. Magic Self is completely free. Upload your PM resume PDF and get a live portfolio at magic-self.dev/yourname in seconds with no subscription required.",
      },
    ],
    keywords: [
      "product manager portfolio website",
      "PM portfolio examples 2026",
      "free product manager portfolio",
      "how to build PM portfolio",
      "product manager portfolio template",
      "product management portfolio website",
      "PM portfolio website free",
    ],
  },
  {
    slug: "ux-designer",
    title: "UX Designer",
    headline: "UX Designer Portfolio Website — Free Template & Examples (2026)",
    description:
      "See what a great UX designer portfolio includes. Build yours free from your resume at magic-self.dev. Showcase your process, research, and case studies in 2 clicks.",
    intro:
      "UX design hiring managers hire for process, not just polish. The best UX portfolios demonstrate how you research, define problems, ideate, prototype, test, and iterate — not just what the final screens look like. Magic Self creates a professional UX portfolio page from your resume in seconds, giving you a strong online presence that you can supplement with Figma links, case study documents, and usability test results.",
    mustHaveSections: [
      {
        section: "UX Process and Methodology",
        why: "Hiring managers want to see how you work, not just what you made. Explicitly describing your research methods, design thinking approach, and usability testing process sets you apart from visual designers.",
      },
      {
        section: "Tools and Software Proficiency",
        why: "UX tools evolve quickly. A clear tools section covering Figma, prototyping tools, research platforms, and analytics tools shows you are current and can work within the team's existing tech stack.",
      },
      {
        section: "Case Study Links and Project Outcomes",
        why: "Linking to detailed case studies gives hiring managers a path to evaluate your depth of thinking. Even linking to a Notion doc or Figma prototype demonstrates commitment to your work.",
      },
      {
        section: "Career Experience Timeline",
        why: "A clear timeline of your UX roles — with company types, team sizes, and product domains — helps managers assess whether you have relevant industry experience.",
      },
      {
        section: "Accessibility and Inclusive Design Skills",
        why: "WCAG compliance and accessible design are increasingly required competencies. Mentioning these in your portfolio differentiates you from UX designers who focus only on aesthetics.",
      },
      {
        section: "Education, Bootcamp, and Certifications",
        why: "UX degrees, Nielsen Norman Group certifications, Google UX Design Certificate, and bootcamp credentials establish your foundational training and signal ongoing professional development.",
      },
    ],
    exampleSkills: [
      "Figma / Sketch / Adobe XD",
      "User Research & Interviews",
      "Usability Testing",
      "Information Architecture",
      "Wireframing & Prototyping",
      "Interaction Design",
      "Accessibility (WCAG 2.2)",
      "Design Systems",
      "Miro / FigJam",
      "Maze / UserTesting",
    ],
    tips: [
      "Lead with your process, not your deliverables. Hiring managers want to see how you think, not just the final Figma screens.",
      "Include the business context for each project. Why did this problem matter? What was the business goal? How did your design solution move the needle?",
      "Mention specific research methods you have used — contextual inquiry, card sorting, tree testing, think-aloud protocols — not just generic 'user research'.",
      "Show iterations. One polished final design tells a less compelling story than a series of explorations that led to a validated solution.",
      "Quantify UX impact where possible: task completion rate improvements, SUS score changes, reduction in support tickets, or time-on-task improvements from usability tests.",
    ],
    faqs: [
      {
        q: "What should a UX designer portfolio include in 2026?",
        a: "A strong UX portfolio in 2026 should include detailed case studies showing your process (research, ideation, testing, iteration), a tools and skills section, links to Figma prototypes or live products, and measurable business outcomes from your design work.",
      },
      {
        q: "How many case studies should a UX portfolio have?",
        a: "Three to five high-quality, in-depth case studies are better than ten shallow ones. Each case study should walk through the problem, your process, key decisions, and the outcome. Depth demonstrates thinking; breadth alone does not.",
      },
      {
        q: "How do I create a UX portfolio for free?",
        a: "Upload your UX resume to Magic Self at magic-self.dev for a free portfolio page at magic-self.dev/yourname. For case studies, use free tools like Notion, Google Slides, or Figma's public share feature and link to them from your resume.",
      },
      {
        q: "What is the difference between a UX portfolio and a graphic design portfolio?",
        a: "A UX portfolio focuses on your design process, research methods, and measurable user and business outcomes. A graphic design portfolio focuses primarily on the visual quality of finished deliverables. Hiring managers for UX roles specifically look for evidence of process and problem-solving.",
      },
    ],
    keywords: [
      "UX designer portfolio website",
      "UX portfolio examples 2026",
      "free UX designer portfolio",
      "how to build UX portfolio",
      "UX portfolio template free",
      "user experience portfolio website",
      "UX design portfolio 2026",
    ],
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    headline: "Data Scientist Portfolio Website — Free Template & Examples (2026)",
    description:
      "See what a great data science portfolio includes. Build yours free from your resume at magic-self.dev. Showcase models, analysis, and publications in 2 clicks.",
    intro:
      "Data science portfolios need to balance technical depth with clear business communication. The best data scientist portfolios demonstrate statistical rigor, show real-world model outcomes, and prove you can translate analytical findings into decisions that matter. Magic Self generates a professional data science portfolio from your resume PDF automatically, surfacing your technical stack, research work, and career accomplishments in a clean, shareable format.",
    mustHaveSections: [
      {
        section: "Technical Skills and Tools Stack",
        why: "Data science roles are highly specific about required tools. A clear breakdown of languages (Python, R, SQL), ML frameworks (TensorFlow, PyTorch, scikit-learn), and data platforms (Spark, Snowflake, BigQuery) shows immediate technical fit.",
      },
      {
        section: "Project Portfolio with Model Performance",
        why: "Describing models you have built with concrete performance metrics — accuracy, F1 score, AUC-ROC, RMSE — demonstrates that you understand evaluation rigor and can defend your methodological choices.",
      },
      {
        section: "Business Impact and Stakeholder Outcomes",
        why: "Data science hiring managers want data scientists who can influence decisions, not just build models. Describing the business outcomes of your analytical work is as important as the technical methodology.",
      },
      {
        section: "Research and Publications",
        why: "Academic publications, conference papers (NeurIPS, ICML, KDD), and technical blog posts establish domain credibility and signal that you contribute to the broader data science community.",
      },
      {
        section: "Education and Advanced Degrees",
        why: "MS and PhD credentials in statistics, computer science, mathematics, or domain sciences are strong signals in data science hiring. Education should be prominently displayed.",
      },
      {
        section: "Domain Expertise and Industry Experience",
        why: "Data scientists who specialize in fintech, healthcare, NLP, computer vision, or recommendation systems have domain knowledge that generalist data scientists lack — make this explicit.",
      },
    ],
    exampleSkills: [
      "Python (pandas, NumPy, scikit-learn)",
      "R / RStudio",
      "TensorFlow / PyTorch",
      "SQL / NoSQL",
      "Apache Spark / Databricks",
      "Statistical Modeling & Inference",
      "A/B Testing & Experimentation",
      "Natural Language Processing",
      "Data Visualization (Tableau, Power BI)",
      "MLflow / Kubeflow",
    ],
    tips: [
      "For every model you mention, state the business problem it solved and the measurable improvement it achieved. Model accuracy alone is meaningless without context.",
      "Include links to Kaggle competition results, GitHub repositories, or published papers where possible. Verifiable external evidence is more compelling than self-reported skills.",
      "Clearly separate your applied industry work from academic research. Both are valuable but serve different purposes in job applications.",
      "If you write a technical blog or maintain a Substack, link to it prominently. Writing that explains complex concepts clearly is a rare and valued skill in data science.",
      "Highlight any experience deploying models to production, not just building them in notebooks. MLOps skills are increasingly expected for senior data scientist roles.",
    ],
    faqs: [
      {
        q: "What should a data scientist portfolio include?",
        a: "A strong data science portfolio includes a technical skills stack, project descriptions with model performance metrics and business outcomes, any publications or research contributions, education credentials, and links to GitHub repositories or Kaggle profiles.",
      },
      {
        q: "How do I build a data science portfolio with no industry experience?",
        a: "Use Kaggle competitions, personal projects analyzing publicly available datasets, and academic research work as your project base. Focus on describing your methodology, findings, and what you learned — the project quality matters more than its source.",
      },
      {
        q: "Should I include my Kaggle rank in my data science portfolio?",
        a: "Yes, if you have a notable Kaggle rank or medal-winning competition results, include them. Kaggle rankings are an objective, verifiable measure of your analytical and ML skills that hiring managers recognize.",
      },
      {
        q: "How do I create a data science portfolio website for free?",
        a: "Upload your data science resume to Magic Self at magic-self.dev. Your portfolio is generated automatically at magic-self.dev/yourname — completely free, no coding required.",
      },
    ],
    keywords: [
      "data scientist portfolio website",
      "data science portfolio examples 2026",
      "free data scientist portfolio",
      "how to build data science portfolio",
      "data science portfolio template",
      "machine learning portfolio website",
      "data scientist personal website",
    ],
  },
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    headline: "Frontend Developer Portfolio Website — Free Template & Examples (2026)",
    description:
      "See what a great frontend developer portfolio includes. Build yours free from your resume at magic-self.dev. Showcase your UI skills and projects in 2 clicks.",
    intro:
      "Frontend developers live or die by the quality of what they ship to users — and your portfolio should prove you understand performance, accessibility, and modern development practices, not just that you know React. The best frontend portfolios combine a clear technical skills breakdown with project examples that demonstrate real product quality. Magic Self generates this from your resume automatically, giving you a live portfolio URL in seconds.",
    mustHaveSections: [
      {
        section: "Frontend Tech Stack",
        why: "Recruiters filter by specific frameworks. Clearly listing React, Vue, Angular, Next.js, TypeScript, and your styling tools (Tailwind, CSS Modules, styled-components) ensures you appear in the right searches.",
      },
      {
        section: "Live Project Links and Demos",
        why: "Nothing proves frontend skills like a live, working product. Include URLs to live sites, CodeSandbox demos, or GitHub repositories so hiring managers can see your work firsthand.",
      },
      {
        section: "Performance and Accessibility Work",
        why: "Mentioning Core Web Vitals optimization, Lighthouse scores, WCAG compliance, or a11y improvements immediately separates you from developers who only focus on functionality.",
      },
      {
        section: "Professional Experience with Product Context",
        why: "Describe the products you built — user counts, business context, technical challenges — to help hiring managers understand the scale and complexity of your frontend work.",
      },
      {
        section: "Education and Self-Learning",
        why: "Frontend development evolves fast. Listing relevant courses, certifications (Google Web Developer, Meta Frontend), or bootcamps shows you stay current with the ecosystem.",
      },
    ],
    exampleSkills: [
      "React / Next.js",
      "TypeScript / JavaScript",
      "HTML5 / CSS3 / Tailwind CSS",
      "Vue.js / Nuxt",
      "GraphQL / REST APIs",
      "Webpack / Vite",
      "Jest / Testing Library / Cypress",
      "Web Performance Optimization",
      "Accessibility (WCAG)",
      "Git / GitHub",
    ],
    tips: [
      "If your portfolio page itself demonstrates excellent frontend quality — fast load time, good accessibility, clean code — it becomes a living example of your skills.",
      "Include before/after metrics for any performance work: 'Improved Lighthouse performance score from 61 to 94' is immediately compelling to frontend-savvy hiring managers.",
      "Keep your skills list focused on your genuine strengths. It is better to list five frameworks you know deeply than fifteen you have touched once.",
      "Link to at least two or three live examples of your work. Screenshots are weak evidence; live links let hiring managers experience your UI directly.",
      "Mention cross-browser and cross-device testing experience if you have it. Compatibility skills are often undervalued by developers but prized by teams who have suffered from ignoring them.",
    ],
    faqs: [
      {
        q: "What should a frontend developer portfolio include?",
        a: "A frontend developer portfolio should include your tech stack and tools, live links to projects you have built, notable performance or accessibility wins, professional experience with product context, and contact or GitHub links.",
      },
      {
        q: "How important is a portfolio for a frontend developer?",
        a: "Very important. Frontend is a visual, output-focused discipline. Hiring managers want to see working products, not just a list of technologies. A portfolio with live project links is often more persuasive than any resume.",
      },
      {
        q: "What is the best free way to create a frontend developer portfolio?",
        a: "Upload your resume to Magic Self at magic-self.dev for an instant free portfolio at magic-self.dev/yourname. You can supplement this with GitHub repositories and live project links referenced in your resume.",
      },
      {
        q: "How do I make my frontend portfolio stand out?",
        a: "Lead with live demos rather than descriptions. Include measurable performance improvements. Show that you care about accessibility. And make sure the portfolio page itself is fast, responsive, and well-designed — it is your best frontend demo.",
      },
    ],
    keywords: [
      "frontend developer portfolio website",
      "frontend portfolio examples 2026",
      "free frontend developer portfolio",
      "how to build frontend portfolio",
      "React developer portfolio",
      "frontend developer personal website",
      "web developer portfolio free",
    ],
  },
  {
    slug: "backend-developer",
    title: "Backend Developer",
    headline: "Backend Developer Portfolio Website — Free Template & Examples (2026)",
    description:
      "See what a great backend developer portfolio includes. Build yours free from your resume at magic-self.dev. Showcase your APIs, architecture, and skills in 2 clicks.",
    intro:
      "Backend development portfolios need to communicate systems thinking, scalability experience, and engineering reliability — not just the languages you write in. The best backend portfolios describe architectures you have designed, problems you have solved at scale, and the engineering discipline you bring to code quality and observability. Magic Self generates this from your resume automatically in seconds.",
    mustHaveSections: [
      {
        section: "Backend Tech Stack and Languages",
        why: "Be explicit about languages (Python, Go, Java, Node.js, Ruby), frameworks (Django, FastAPI, Spring Boot, Express), databases (PostgreSQL, MongoDB, Redis), and infrastructure (AWS, Docker, Kubernetes).",
      },
      {
        section: "System Design and Architecture",
        why: "Describing systems you have designed — microservices, event-driven architectures, distributed systems, API gateways — demonstrates the senior engineering thinking that differentiates backend developers.",
      },
      {
        section: "Scale and Performance Achievements",
        why: "Quantifying the scale you have operated at — requests per second, database record counts, uptime SLAs, latency reductions — proves you can handle production-grade engineering challenges.",
      },
      {
        section: "API Design and Integration Work",
        why: "Backend developers who have designed and documented public or internal APIs, or built complex third-party integrations, have a valuable skill set that should be explicitly highlighted.",
      },
      {
        section: "Testing, Observability, and DevOps",
        why: "Mentioning your approach to unit and integration testing, logging, monitoring (Datadog, Prometheus, Grafana), and CI/CD shows engineering maturity beyond just writing code that works.",
      },
    ],
    exampleSkills: [
      "Python / Go / Java / Node.js",
      "PostgreSQL / MySQL / MongoDB",
      "Redis / Elasticsearch",
      "REST APIs / GraphQL / gRPC",
      "Docker / Kubernetes",
      "AWS / GCP / Azure",
      "Kafka / RabbitMQ",
      "Microservices Architecture",
      "CI/CD Pipelines",
      "Test-Driven Development",
    ],
    tips: [
      "Describe systems by their scale, not just their technology. 'Built a REST API' is weak; 'Designed a REST API serving 50M requests/day with 99.99% uptime' is compelling.",
      "Include the engineering trade-offs you made. Hiring managers value engineers who understand why certain architectural decisions were made, not just engineers who implemented them.",
      "Mention your experience with observability and incident response. Senior engineers who have been paged at 2 AM and fixed production issues are valued highly.",
      "Link to any public technical documentation, RFC documents, or ADRs (architecture decision records) you have written — these demonstrate engineering leadership.",
      "Include testing philosophy and coverage numbers if you are proud of them. Strong testing culture is a differentiator on teams that have learned quality lessons the hard way.",
    ],
    faqs: [
      {
        q: "What should a backend developer portfolio include?",
        a: "A backend developer portfolio should include your full tech stack, system design examples with scale context, API design experience, performance and reliability achievements, and your approach to testing and observability.",
      },
      {
        q: "How do backend developers show their work in a portfolio?",
        a: "Backend work is less visual than frontend, but you can describe systems architecture, share GitHub repositories with good READMEs, link to technical blog posts, and use metrics to quantify the scale and impact of your work.",
      },
      {
        q: "Is a portfolio important for backend developers?",
        a: "Yes. While backend work is less visually demonstrable than frontend, a portfolio that describes your architectural thinking, scale experience, and engineering craft is a powerful differentiator in competitive technical hiring.",
      },
      {
        q: "How do I build a backend developer portfolio for free?",
        a: "Upload your backend resume to Magic Self at magic-self.dev for a free portfolio at magic-self.dev/yourname. Supplement it with GitHub repos showcasing your architectural work and any public technical writing.",
      },
    ],
    keywords: [
      "backend developer portfolio website",
      "backend portfolio examples 2026",
      "free backend developer portfolio",
      "Node.js developer portfolio",
      "Python backend developer portfolio",
      "server-side developer portfolio",
      "backend engineer personal website",
    ],
  },
  {
    slug: "full-stack-developer",
    title: "Full-Stack Developer",
    headline: "Full-Stack Developer Portfolio Website — Free Template & Examples (2026)",
    description:
      "See what a great full-stack portfolio includes. Build yours free from your resume at magic-self.dev. Showcase end-to-end projects and skills in 2 clicks.",
    intro:
      "Full-stack developer portfolios need to prove depth across the entire product lifecycle — from database design to pixel-perfect UI. The most effective full-stack portfolios demonstrate complete project ownership, from architecture decisions to deployment, and show that the developer can ship production-quality products independently. Magic Self builds this portfolio from your resume in seconds.",
    mustHaveSections: [
      {
        section: "Full-Stack Technology Breakdown",
        why: "Organize your tech stack into frontend, backend, database, and DevOps categories to help hiring managers quickly understand the full breadth of your technical coverage.",
      },
      {
        section: "End-to-End Project Examples",
        why: "Full-stack developers should showcase complete products they have built — showing the full stack from database schema to deployed UI is the clearest proof of full-stack capability.",
      },
      {
        section: "Architecture and System Design Decisions",
        why: "Describing your database schema choices, API design, authentication approach, and deployment strategy shows the systems thinking that separates strong full-stack developers from developers who only implement features.",
      },
      {
        section: "Performance and Scalability Work",
        why: "Full-stack developers who understand both frontend performance (Core Web Vitals, bundle optimization) and backend performance (query optimization, caching) are increasingly rare and valuable.",
      },
      {
        section: "DevOps and Deployment Experience",
        why: "Full-stack developers who own their own deployment pipeline — CI/CD, containerization, infrastructure-as-code — are independently productive and require less operational support.",
      },
    ],
    exampleSkills: [
      "React / Next.js / Vue.js",
      "Node.js / Python / Go",
      "PostgreSQL / MongoDB / Redis",
      "TypeScript / JavaScript",
      "REST APIs / GraphQL",
      "Docker / AWS / Vercel",
      "Tailwind CSS / CSS Modules",
      "Prisma / Drizzle / Sequelize",
      "CI/CD / GitHub Actions",
      "Authentication / OAuth / JWT",
    ],
    tips: [
      "For each project, describe your specific architectural decisions and why you made them. 'I chose PostgreSQL over MongoDB because...' shows engineering maturity.",
      "Include the deployment and hosting approach for each project. Hiring managers for full-stack roles care that you can ship independently, not just build locally.",
      "Emphasize projects where you owned the full lifecycle: from initial design through production deployment and ongoing maintenance.",
      "Quantify both frontend and backend metrics where possible — page load times, API response times, database query performance, user counts.",
      "Show your ability to work across the stack by describing how frontend and backend decisions affected each other in your projects.",
    ],
    faqs: [
      {
        q: "What makes a great full-stack developer portfolio?",
        a: "The best full-stack portfolios include complete end-to-end projects with live links, clear descriptions of architectural decisions across the entire stack, and evidence of independent product ownership from design through deployment.",
      },
      {
        q: "How many projects should a full-stack portfolio have?",
        a: "Two to four complete, production-quality projects are better than many unfinished demos. Each project should have a live URL, a clear description of the problem solved, and your full-stack technical decisions.",
      },
      {
        q: "How do I create a full-stack developer portfolio for free?",
        a: "Upload your resume to Magic Self at magic-self.dev for an instant free portfolio at magic-self.dev/yourname. The AI extracts your full-stack skills, projects, and experience automatically.",
      },
      {
        q: "Should full-stack developers have separate frontend and backend portfolio sections?",
        a: "Yes. Organizing your skills and work by frontend, backend, database, and DevOps helps hiring managers quickly see the breadth of your capability. It also makes your profile more findable in role-specific searches.",
      },
    ],
    keywords: [
      "full-stack developer portfolio website",
      "full stack portfolio examples 2026",
      "free full-stack developer portfolio",
      "full-stack web developer portfolio",
      "MERN stack portfolio",
      "full-stack developer personal website",
      "full stack developer portfolio template",
    ],
  },
  {
    slug: "marketing-manager",
    title: "Marketing Manager",
    headline: "Marketing Manager Portfolio Website — Free Template & Examples (2026)",
    description:
      "See what a great marketing manager portfolio includes. Build yours free from your resume at magic-self.dev. Showcase campaigns, metrics, and leadership in 2 clicks.",
    intro:
      "Marketing manager portfolios need to do what good marketing does — communicate value quickly and memorably. The best marketing portfolios lead with campaign results, demonstrate channel expertise, and show cross-functional leadership. Magic Self generates a professional marketing portfolio from your resume in seconds, surfacing your wins and skills in a format that resonates with CMOs and VP Marketing hiring for their next marketing leader.",
    mustHaveSections: [
      {
        section: "Campaign Results and ROI",
        why: "Marketing managers are hired to drive results. Lead with your best numbers — ROAS, CAC, MQL volumes, email conversion rates, organic traffic growth — to immediately establish your track record.",
      },
      {
        section: "Channel Expertise",
        why: "Be specific about which channels you own and at what scale. SEO, paid social, email marketing, content marketing, events, PR, and ABM are all distinct competencies with different hiring requirements.",
      },
      {
        section: "Team Leadership and Budget Management",
        why: "Marketing manager roles require leadership. Mentioning team size managed, budgets owned, and agency relationships demonstrates the management scope that differentiates managers from individual contributors.",
      },
      {
        section: "Marketing Tools and Technology Stack",
        why: "HubSpot, Salesforce, Marketo, Google Analytics, Meta Ads Manager, Semrush, and your full martech stack show that you can operate the tools that modern marketing teams depend on.",
      },
      {
        section: "Industry and Product Domain Experience",
        why: "B2B, B2C, SaaS, e-commerce, fintech — your domain experience matters enormously in marketing hiring. Be explicit about the industries and business models you have marketed for.",
      },
    ],
    exampleSkills: [
      "Performance Marketing (Paid Social, PPC)",
      "SEO & Content Strategy",
      "Email Marketing & Automation",
      "Marketing Analytics & Attribution",
      "HubSpot / Marketo / Pardot",
      "Google Analytics / Looker Studio",
      "Campaign Planning & Execution",
      "Brand Strategy",
      "Budget Management",
      "Team Leadership",
    ],
    tips: [
      "Always attach numbers to campaigns. 'Ran a paid acquisition campaign' is forgettable; 'Ran a paid acquisition campaign that achieved 3.2x ROAS and reduced CAC by 22%' is memorable.",
      "Show the breadth of your channel ownership — hiring managers for marketing manager roles want to know you can coordinate across multiple channels, not just execute one.",
      "Mention any marketing technology implementations you led. Migrating a CRM, implementing marketing automation, or building an attribution model are high-value initiatives that demonstrate leadership.",
      "Include the business context for your role — company stage (seed, Series B, public), team size, and market segment help hiring managers quickly assess your experience relevance.",
      "If you have won any marketing awards, been featured in industry publications, or spoken at events, include these prominently as social proof.",
    ],
    faqs: [
      {
        q: "What should a marketing manager portfolio include?",
        a: "A strong marketing manager portfolio includes campaign results with ROI metrics, channel expertise breakdown, team leadership experience, marketing technology proficiency, and industry domain experience.",
      },
      {
        q: "Do marketing managers need a portfolio?",
        a: "A portfolio or professional online presence is valuable for any marketing professional. Given that marketing is a demonstrable field, showing your actual results and work is far more compelling than describing them on a resume alone.",
      },
      {
        q: "How do I showcase marketing campaign work in my portfolio?",
        a: "Describe campaigns with business context, your specific role, the channels used, and measurable outcomes. For detailed case studies, link to supporting documents. Magic Self will surface your campaign descriptions and any links from your resume.",
      },
      {
        q: "How do I build a marketing manager portfolio for free?",
        a: "Upload your marketing resume to Magic Self at magic-self.dev for a free professional portfolio at magic-self.dev/yourname. No subscription, no credit card, no design skills required.",
      },
    ],
    keywords: [
      "marketing manager portfolio website",
      "marketing portfolio examples 2026",
      "free marketing manager portfolio",
      "digital marketing portfolio",
      "marketing manager personal website",
      "CMO portfolio website",
      "marketing director portfolio",
    ],
  },
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    headline: "Graphic Designer Portfolio Website — Free Template & Examples (2026)",
    description:
      "See what a great graphic designer portfolio includes. Build yours free from your resume at magic-self.dev. Showcase your design skills and client work in 2 clicks.",
    intro:
      "Graphic design portfolios are your most important sales tool — and the quality of how your work is presented matters almost as much as the work itself. The best graphic designer portfolios combine a strong visual identity, a curated selection of client work, and clear communication of your creative capabilities. Magic Self builds a professional portfolio page from your resume instantly, giving you a clean professional overview alongside your deeper portfolio work.",
    mustHaveSections: [
      {
        section: "Design Tools and Software Proficiency",
        why: "Studios and agencies filter candidates by software proficiency. Explicitly list Adobe Creative Suite (Illustrator, Photoshop, InDesign), Figma, and any 3D or motion tools to pass initial screening.",
      },
      {
        section: "Client Work and Project Descriptions",
        why: "Client names, project types (brand identity, packaging, campaign), and your specific contribution help hiring managers understand the range and quality of your professional experience.",
      },
      {
        section: "Design Specializations",
        why: "Brand identity, print, packaging, digital advertising, editorial, motion graphics, and illustration are all distinct specializations. Being explicit about yours helps you be matched to the right roles.",
      },
      {
        section: "Links to Portfolio Platforms",
        why: "Links to your Behance, Dribbble, or custom portfolio website transform your text portfolio into a gateway to your actual work. Include these prominently in your resume and Magic Self will surface them.",
      },
      {
        section: "Education and Professional Development",
        why: "Design degrees, continuing education courses, and participation in design communities demonstrate commitment to craft and ongoing development beyond daily client work.",
      },
    ],
    exampleSkills: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe InDesign",
      "Figma",
      "Brand Identity Design",
      "Typography & Layout",
      "Print Production",
      "Motion Graphics (After Effects)",
      "Packaging Design",
      "Color Theory",
    ],
    tips: [
      "Curate ruthlessly. Show your top eight to twelve pieces, not everything you have ever made. Hiring managers judge you by your weakest work, not your average work.",
      "Include brief project context for each piece in your portfolio — the brief, the challenge, and your creative solution. Context makes work more memorable.",
      "Always have a live portfolio link ready (Behance, Dribbble, or personal site). Include these links in your resume so Magic Self surfaces them on your portfolio page.",
      "Organize your portfolio by project type or industry to make it easy for hiring managers to quickly find work relevant to their studio's needs.",
      "Include any awards, publication features, or recognition for your design work. Third-party validation is powerful social proof in creative hiring.",
    ],
    faqs: [
      {
        q: "What should a graphic designer portfolio include?",
        a: "A graphic designer portfolio should include curated client work across your specializations, clear project descriptions with context, design tool proficiency, links to Behance or Dribbble, and your professional experience timeline.",
      },
      {
        q: "How many pieces should a graphic design portfolio have?",
        a: "Eight to twelve strong pieces are the standard for most graphic design portfolios. Each piece should be something you are genuinely proud of and can discuss in depth during an interview.",
      },
      {
        q: "Do graphic designers need a website or is Behance enough?",
        a: "Behance is an excellent portfolio platform, but having your own professional website URL (like magic-self.dev/yourname) gives you a credible presence that links to your Behance work. Many designers use both in combination.",
      },
      {
        q: "How do I create a free graphic designer portfolio website?",
        a: "Upload your design resume to Magic Self at magic-self.dev for an instant free portfolio page. Include your Behance and Dribbble links in your resume and Magic Self will make them prominent on your portfolio.",
      },
    ],
    keywords: [
      "graphic designer portfolio website",
      "graphic design portfolio examples 2026",
      "free graphic designer portfolio",
      "graphic designer personal website",
      "design portfolio website template",
      "creative portfolio website free",
      "visual designer portfolio",
    ],
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    headline: "Project Manager Portfolio Website — Free Template & Examples (2026)",
    description:
      "See what a great project manager portfolio includes. Build yours free from your resume at magic-self.dev. Showcase your delivery track record and skills in 2 clicks.",
    intro:
      "Project management portfolios need to communicate one thing above all else: you deliver. The best PM portfolios show a consistent track record of on-time, on-budget project delivery, demonstrate cross-functional leadership, and prove you can manage complexity and stakeholder expectations. Magic Self generates a professional project manager portfolio from your resume PDF automatically, surfacing your delivery record and credentials in a clean, compelling format.",
    mustHaveSections: [
      {
        section: "Project Delivery Track Record",
        why: "List your most significant projects with scope, budget, team size, and delivery outcome. On-time, under-budget delivery with specific numbers is the most compelling evidence of PM competency.",
      },
      {
        section: "Project Management Methodologies",
        why: "Agile, Scrum, Kanban, PMP, PRINCE2, Waterfall — explicitly listing your methodology expertise ensures you match job requirements and pass ATS screening.",
      },
      {
        section: "Certifications and Credentials",
        why: "PMP, CAPM, PMI-ACP, PRINCE2, Scrum Master, and SAFe certifications are gatekeeper credentials for many PM roles. Display these prominently.",
      },
      {
        section: "Project Tools and Software",
        why: "Jira, Confluence, Microsoft Project, Asana, Monday.com, Smartsheet — being specific about your tools shows practical readiness to contribute from day one.",
      },
      {
        section: "Budget and Resource Management",
        why: "Mentioning the budget sizes you have managed ($500K to $10M+ range) and the team sizes you have coordinated establishes the scope of PM experience you bring.",
      },
      {
        section: "Stakeholder and Executive Communication",
        why: "Describing your experience presenting to C-suite executives, managing difficult stakeholders, and leading steering committees differentiates senior PMs from those with only tactical delivery experience.",
      },
    ],
    exampleSkills: [
      "PMP Certified",
      "Agile / Scrum / Kanban",
      "Jira / Confluence",
      "Microsoft Project",
      "Risk Management",
      "Budget Management",
      "Stakeholder Management",
      "Resource Planning",
      "Executive Communication",
      "Change Management",
    ],
    tips: [
      "Always include project scale: team size, budget managed, timeline, and number of stakeholders. These numbers immediately communicate the scope of your PM experience.",
      "Describe risk management and problem-solving examples. Hiring managers want to know how you handle when projects go off-track — not just when they go smoothly.",
      "List your certifications prominently at the top of your portfolio. PMP and PRINCE2 are often gatekeeper requirements that hiring managers check first.",
      "Include examples of projects you rescued or turned around. Project recovery is a high-value PM skill that most candidates fail to highlight.",
      "Mention the industries and project types you have managed — IT, construction, product development, organizational change — to help hiring managers assess your domain fit.",
    ],
    faqs: [
      {
        q: "What should a project manager portfolio include?",
        a: "A project manager portfolio should include major project deliveries with scope and outcome metrics, methodology certifications, project management tools proficiency, budget and team management experience, and stakeholder communication examples.",
      },
      {
        q: "Do project managers need a portfolio?",
        a: "A professional online presence that summarizes your delivery track record and credentials is valuable for any PM, especially when applying for senior or specialized roles where proof of delivery track record matters most.",
      },
      {
        q: "How do project managers prove their experience in a portfolio?",
        a: "Use concrete project metrics: budget managed, team size, project duration, and delivery outcome. A table of completed projects with these dimensions tells a powerful story about your PM experience.",
      },
      {
        q: "How do I build a project manager portfolio for free?",
        a: "Upload your PM resume to Magic Self at magic-self.dev for an instant free portfolio at magic-self.dev/yourname. Your credentials, experience, and certifications are extracted automatically.",
      },
    ],
    keywords: [
      "project manager portfolio website",
      "PM portfolio examples 2026",
      "free project manager portfolio",
      "PMP portfolio website",
      "project manager personal website",
      "agile project manager portfolio",
      "project management portfolio template",
    ],
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    headline: "DevOps Engineer Portfolio Website — Free Template & Examples (2026)",
    description:
      "See what a great DevOps portfolio includes. Build yours free from your resume at magic-self.dev. Showcase your infrastructure, CI/CD, and reliability work in 2 clicks.",
    intro:
      "DevOps engineering portfolios need to demonstrate that you can build and operate reliable, scalable infrastructure — and that you approach automation, monitoring, and reliability as engineering problems, not operational tasks. The best DevOps portfolios quantify system reliability, describe infrastructure architectures, and show a clear command of the modern cloud-native toolchain. Magic Self builds this from your resume in seconds.",
    mustHaveSections: [
      {
        section: "Cloud and Infrastructure Stack",
        why: "AWS, GCP, Azure expertise plus IaC tools (Terraform, Pulumi, CloudFormation) are table stakes for most DevOps roles. Be specific about your cloud platforms and the services you have experience with.",
      },
      {
        section: "CI/CD Pipeline Experience",
        why: "Describe the CI/CD systems you have built or maintained — GitHub Actions, Jenkins, GitLab CI, CircleCI, ArgoCD — and the deployment strategies you have implemented.",
      },
      {
        section: "Reliability and Uptime Achievements",
        why: "SLAs you have maintained, incident response time improvements, uptime improvements, and MTTR reductions are the core metrics that prove DevOps engineering impact.",
      },
      {
        section: "Containerization and Orchestration",
        why: "Docker and Kubernetes are now near-universal requirements for senior DevOps roles. Describe the complexity of the container workloads you have managed and any Kubernetes operators or custom controllers you have written.",
      },
      {
        section: "Observability and Monitoring",
        why: "Describing your monitoring and alerting setup — Prometheus, Grafana, Datadog, PagerDuty, ELK stack — shows engineering maturity and a proactive approach to operational reliability.",
      },
    ],
    exampleSkills: [
      "AWS / GCP / Azure",
      "Terraform / Pulumi",
      "Kubernetes / Helm",
      "Docker",
      "GitHub Actions / Jenkins",
      "Prometheus / Grafana / Datadog",
      "Linux / Bash / Python",
      "GitOps / ArgoCD / Flux",
      "Service Mesh (Istio / Linkerd)",
      "Security & Compliance (SOC 2)",
    ],
    tips: [
      "Quantify reliability. '99.99% uptime over 18 months' is immediately compelling. 'Responsible for uptime' is not.",
      "Describe the scale of infrastructure you have managed: number of services, request volumes, data volumes, and geographic distribution tell the scope of your DevOps experience.",
      "Include security and compliance experience if you have it. SOC 2, HIPAA, and ISO 27001 compliance work is rare and valuable, especially in enterprise DevOps roles.",
      "Mention on-call and incident response experience. Hiring managers for DevOps roles want engineers who have experienced and learned from production incidents.",
      "Highlight automation initiatives and their impact: 'Automated deployment pipeline that reduced release time from 3 days to 45 minutes' is exactly the kind of result that gets DevOps engineers hired.",
    ],
    faqs: [
      {
        q: "What should a DevOps engineer portfolio include?",
        a: "A DevOps portfolio should include your cloud and infrastructure stack, CI/CD experience, reliability and uptime achievements, containerization and orchestration work, and monitoring and observability setup.",
      },
      {
        q: "How do DevOps engineers demonstrate their work in a portfolio?",
        a: "Use metrics: uptime percentages, deployment frequency improvements, MTTR reductions, cost savings from optimization. Link to open source infrastructure tools or configurations you have contributed to. Describe the scale and complexity of the systems you have operated.",
      },
      {
        q: "Is a portfolio important for DevOps engineers?",
        a: "Yes, increasingly so. As DevOps and SRE roles command premium salaries, candidates who can clearly articulate their infrastructure experience and reliability track record stand out significantly from those who only list technologies.",
      },
      {
        q: "How do I create a DevOps engineer portfolio for free?",
        a: "Upload your DevOps resume to Magic Self at magic-self.dev for a free portfolio at magic-self.dev/yourname. Your cloud skills, certifications, and experience are extracted automatically.",
      },
    ],
    keywords: [
      "DevOps engineer portfolio website",
      "DevOps portfolio examples 2026",
      "free DevOps engineer portfolio",
      "SRE portfolio website",
      "cloud engineer portfolio",
      "infrastructure engineer portfolio",
      "DevOps personal website",
    ],
  },
  {
    slug: "mobile-developer",
    title: "Mobile Developer",
    headline: "Mobile Developer Portfolio Website — Free Template & Examples (2026)",
    description:
      "See what a great mobile developer portfolio includes. Build yours free from your resume at magic-self.dev. Showcase your iOS, Android, and app projects in 2 clicks.",
    intro:
      "Mobile development portfolios live and die by one thing: the quality of your shipped apps. The best mobile developer portfolios lead with App Store and Play Store links to live apps, describe architecture decisions for performance-constrained environments, and show depth in platform-specific development. Magic Self generates a professional portfolio from your resume automatically, giving you a clean starting point that links to your real app work.",
    mustHaveSections: [
      {
        section: "Platform and Technology Stack",
        why: "iOS (Swift, SwiftUI), Android (Kotlin, Jetpack Compose), or cross-platform (React Native, Flutter) — being explicit about your platform focus and frameworks ensures you match the right job requirements.",
      },
      {
        section: "Published App Portfolio",
        why: "App Store or Play Store links to live apps are the ultimate mobile portfolio proof. Include app names, download counts or ratings if notable, and your specific development contribution.",
      },
      {
        section: "Architecture and Performance",
        why: "Mobile developers who understand memory management, battery optimization, offline-first architecture, and smooth UI performance at 60fps are in a different league from those who only implement features.",
      },
      {
        section: "API Integration and Backend Work",
        why: "Mobile developers who can design and consume REST and GraphQL APIs, handle offline sync, and implement real-time features (push notifications, websockets) are more independently valuable.",
      },
      {
        section: "Testing and Quality Assurance",
        why: "Unit testing, UI testing (XCTest, Espresso), and crash reporting experience (Firebase Crashlytics, Sentry) demonstrates the quality engineering discipline that separates senior mobile developers.",
      },
    ],
    exampleSkills: [
      "Swift / SwiftUI",
      "Kotlin / Jetpack Compose",
      "React Native / Expo",
      "Flutter / Dart",
      "Xcode / Android Studio",
      "Core Data / Room Database",
      "Firebase / Supabase",
      "App Store / Play Store Deployment",
      "REST APIs / GraphQL",
      "XCTest / Espresso Testing",
    ],
    tips: [
      "Always link to your App Store and Play Store apps. Being able to download and test your apps is the strongest possible portfolio evidence for mobile roles.",
      "Include user count or ratings for any published apps. Even modest numbers (5,000 downloads, 4.2 star rating) are legitimate achievements worth mentioning.",
      "Describe platform-specific technical challenges you have solved: memory pressure on older devices, background processing limitations, push notification infrastructure.",
      "Mention App Store review experience. Developers who have navigated Apple's review guidelines and optimization process have practical knowledge that academic developers lack.",
      "Include any cross-platform experience you have alongside native development. React Native and Flutter skills alongside native iOS or Android makes you significantly more versatile.",
    ],
    faqs: [
      {
        q: "What should a mobile developer portfolio include?",
        a: "A mobile developer portfolio should include links to published App Store or Play Store apps, your platform and framework stack, architecture and performance examples, API integration work, and testing and quality engineering experience.",
      },
      {
        q: "How important are published apps for a mobile developer portfolio?",
        a: "Extremely important. A published app that users can download is the clearest possible evidence of mobile development capability. If you have a published app, it should be the first thing on your portfolio.",
      },
      {
        q: "Should mobile developers specialize in iOS or Android?",
        a: "Specialization generally leads to better job opportunities and higher compensation in mobile. However, React Native and Flutter skills are valuable additions to native expertise. Include all relevant platforms in your portfolio.",
      },
      {
        q: "How do I create a mobile developer portfolio for free?",
        a: "Upload your mobile dev resume to Magic Self at magic-self.dev for a free portfolio at magic-self.dev/yourname. Include App Store and Play Store links in your resume and they will appear on your portfolio page.",
      },
    ],
    keywords: [
      "mobile developer portfolio website",
      "iOS developer portfolio",
      "Android developer portfolio",
      "free mobile developer portfolio",
      "React Native developer portfolio",
      "Flutter developer portfolio",
      "mobile app developer personal website",
    ],
  },
  {
    slug: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    headline: "Machine Learning Engineer Portfolio Website — Free Template & Examples (2026)",
    description:
      "See what a great ML engineer portfolio includes. Build yours free from your resume at magic-self.dev. Showcase your models, systems, and publications in 2 clicks.",
    intro:
      "Machine learning engineering portfolios need to bridge the gap between research rigour and production engineering discipline. The best ML engineer portfolios demonstrate model building and evaluation expertise alongside MLOps capabilities — showing that you can take a model from experiment to production-grade, scalable deployment. Magic Self builds a professional ML portfolio from your resume in seconds.",
    mustHaveSections: [
      {
        section: "ML Frameworks and Technical Stack",
        why: "PyTorch, TensorFlow, JAX, Hugging Face, scikit-learn, Ray, and your full ML toolchain should be explicitly listed — technical hiring managers for ML roles screen for specific framework expertise.",
      },
      {
        section: "Model Types and Domain Expertise",
        why: "NLP, computer vision, recommendation systems, time-series forecasting, reinforcement learning, generative AI — your ML domain specialization is often the primary hiring criterion for specialized ML roles.",
      },
      {
        section: "MLOps and Production Deployment",
        why: "ML engineers who have taken models to production with proper monitoring, versioning (MLflow, W&B), serving infrastructure (TorchServe, BentoML, SageMaker), and A/B testing frameworks are far more valuable than research-only profiles.",
      },
      {
        section: "Research Contributions and Publications",
        why: "Papers, arXiv preprints, conference presentations (NeurIPS, ICML, ICLR, ACL), and research blog posts establish your contribution to the ML community and signal research depth.",
      },
      {
        section: "Benchmark Performance and Evaluation",
        why: "Describing your model's performance on standard benchmarks — GLUE, ImageNet, MS COCO — alongside custom evaluation metrics gives technical hiring managers a rigorous basis for assessing your work.",
      },
    ],
    exampleSkills: [
      "PyTorch / TensorFlow / JAX",
      "Hugging Face Transformers",
      "Large Language Models (LLMs)",
      "Python (NumPy, pandas, SciPy)",
      "MLflow / Weights & Biases",
      "Kubernetes / Docker",
      "Feature Engineering & Selection",
      "Distributed Training (DeepSpeed, FSDP)",
      "Model Quantization & Optimization",
      "A/B Testing & Experimentation",
    ],
    tips: [
      "Describe not just what your model does, but why your architectural choices were right for the problem. Explaining the design space you considered and why you made specific decisions demonstrates genuine expertise.",
      "Include the full ML pipeline for your key projects: data collection, preprocessing, training, evaluation, and deployment. End-to-end ownership is highly valued.",
      "If you have fine-tuned or worked with large language models, describe the scale: model size (parameters), compute resources, and downstream task performance.",
      "Link to GitHub repositories with model training code where possible. Well-documented, reproducible training code is powerful portfolio evidence.",
      "Mention any data labeling, data quality, or dataset creation work. Data quality is the largest determinant of model quality, and engineers who understand this are valued for their pragmatism.",
    ],
    faqs: [
      {
        q: "What should an ML engineer portfolio include?",
        a: "An ML engineer portfolio should include your ML framework stack, domain specializations (NLP, CV, etc.), production MLOps experience, research contributions, and model performance benchmarks with business impact.",
      },
      {
        q: "How is an ML engineer portfolio different from a data scientist portfolio?",
        a: "ML engineer portfolios emphasize production systems, scalable model serving, and MLOps infrastructure — the engineering of ML systems. Data scientist portfolios emphasize analytical methods, business insight, and statistical rigor. In practice, there is significant overlap.",
      },
      {
        q: "How do I showcase LLM and generative AI work in my ML portfolio?",
        a: "Describe the specific models you have worked with, the fine-tuning or prompting strategies you used, the evaluation methodology, and the production system you deployed. For proprietary work, describe the approach and results without disclosing confidential information.",
      },
      {
        q: "How do I create an ML engineer portfolio for free?",
        a: "Upload your ML resume to Magic Self at magic-self.dev for a free portfolio at magic-self.dev/yourname. Your technical stack, research experience, and publications are extracted automatically.",
      },
    ],
    keywords: [
      "machine learning engineer portfolio",
      "ML engineer portfolio examples 2026",
      "free machine learning portfolio",
      "AI engineer portfolio website",
      "deep learning engineer portfolio",
      "LLM engineer portfolio",
      "MLOps portfolio website",
    ],
  },
  {
    slug: "business-analyst",
    title: "Business Analyst",
    headline: "Business Analyst Portfolio Website — Free Template & Examples (2026)",
    description:
      "See what a great business analyst portfolio includes. Build yours free from your resume at magic-self.dev. Showcase your analysis, requirements, and impact in 2 clicks.",
    intro:
      "Business analyst portfolios need to demonstrate that you can bridge the gap between business needs and technical solutions. The best BA portfolios show a track record of process improvements, requirements gathering expertise, stakeholder management, and measurable business outcomes. Magic Self generates a professional BA portfolio from your resume PDF automatically, giving you a clear, credible online presence for your next opportunity.",
    mustHaveSections: [
      {
        section: "Business Impact and Process Improvements",
        why: "Business analysts are hired to improve outcomes. Describing process efficiency gains, cost savings, revenue impacts, and error rate reductions gives hiring managers the ROI evidence they need to justify your hire.",
      },
      {
        section: "Requirements Gathering and Documentation",
        why: "BRDs, user stories, use cases, process maps — being explicit about your requirements documentation experience shows hiring managers that you can capture and communicate complex business needs accurately.",
      },
      {
        section: "Analytical Tools and Data Skills",
        why: "SQL, Excel, Tableau, Power BI, Python — being specific about your analytical toolset shows the depth of your data analysis capability, which is increasingly a differentiator for business analyst roles.",
      },
      {
        section: "Industry and Domain Experience",
        why: "Financial services, healthcare, retail, insurance, logistics — domain expertise is often a gatekeeper in BA hiring. Be explicit about the industries you have analyzed and the regulatory or operational contexts you understand.",
      },
      {
        section: "Methodologies and Frameworks",
        why: "Agile BA practices, BABOK knowledge areas, BPMN process modeling, SWOT and stakeholder analysis — demonstrating methodology fluency shows analytical maturity and structured thinking.",
      },
    ],
    exampleSkills: [
      "Requirements Analysis & Documentation",
      "SQL & Data Analysis",
      "Excel / Google Sheets (Advanced)",
      "Tableau / Power BI",
      "BPMN Process Modeling",
      "User Stories & Acceptance Criteria",
      "Stakeholder Management",
      "Agile / Scrum",
      "Jira / Confluence",
      "SWOT & Gap Analysis",
    ],
    tips: [
      "Quantify your business impact in every role. Cost savings, efficiency gains, error rate reductions, and processing time improvements are all compelling metrics for business analyst roles.",
      "Describe the most complex stakeholder environments you have navigated — number of stakeholders, conflicting priorities, and how you drove alignment.",
      "Include process improvement case examples with before/after comparisons. 'Redesigned claims processing workflow reducing processing time from 14 days to 3 days' is the kind of result that wins interviews.",
      "Mention any experience translating between business and technical teams. The ability to speak both languages fluently is the core value proposition of an excellent business analyst.",
      "List industry certifications prominently — CBAP, CCBA, PMI-PBA — these are recognized credentials that accelerate your candidacy for senior BA roles.",
    ],
    faqs: [
      {
        q: "What should a business analyst portfolio include?",
        a: "A business analyst portfolio should include business impact metrics, requirements documentation experience, analytical tools proficiency, industry domain expertise, and methodology credentials like CBAP or BABOK.",
      },
      {
        q: "Do business analysts need a portfolio?",
        a: "A professional portfolio is valuable for any BA, particularly for those targeting senior roles, consulting positions, or industry transitions. It lets you demonstrate your analytical methodology and impact track record more compellingly than a PDF resume alone.",
      },
      {
        q: "How do I show business analysis work in a portfolio without violating confidentiality?",
        a: "Describe the type of analysis (e.g., process optimization, requirements elicitation, gap analysis), the scale of the project, and the measurable outcome — without disclosing client names or proprietary details. This framing is standard and fully ethical.",
      },
      {
        q: "How do I create a business analyst portfolio for free?",
        a: "Upload your BA resume to Magic Self at magic-self.dev for a free portfolio at magic-self.dev/yourname. Your skills, domain experience, and career history are extracted automatically.",
      },
    ],
    keywords: [
      "business analyst portfolio website",
      "BA portfolio examples 2026",
      "free business analyst portfolio",
      "business analyst personal website",
      "CBAP portfolio website",
      "business systems analyst portfolio",
      "data analyst portfolio website",
    ],
  },
  {
    slug: "content-writer",
    title: "Content Writer",
    headline: "Content Writer Portfolio Website — Free Template & Examples (2026)",
    description:
      "See what a great content writer portfolio includes. Build yours free from your resume at magic-self.dev. Showcase your writing, niches, and publication links in 2 clicks.",
    intro:
      "Content writing portfolios are your most important professional asset — because your writing is literally what you are selling. The best content writer portfolios combine a clear niche and specialty statement, links to published work, and demonstrated command of the content formats that matter most to your target clients or employers. Magic Self builds a professional content writer portfolio from your resume in seconds, giving you a central professional hub that links to your best published work.",
    mustHaveSections: [
      {
        section: "Content Specializations and Niches",
        why: "Content writers who specialize in specific industries (fintech, SaaS, healthcare) or content types (long-form SEO, email sequences, technical documentation) command higher rates and get more qualified inquiries.",
      },
      {
        section: "Published Work Links and Clips",
        why: "Links to published articles, case studies, email campaigns, or white papers are the only proof that matters in content writing. Include your best clips prominently in your resume so Magic Self surfaces them on your portfolio.",
      },
      {
        section: "Content Types and Format Expertise",
        why: "Blog posts, landing pages, email marketing, white papers, video scripts, technical documentation, social media — being specific about the formats you write best helps clients and employers find the right match.",
      },
      {
        section: "SEO and Digital Marketing Knowledge",
        why: "Content writers who understand SEO fundamentals — keyword research, search intent, on-page optimization, content strategy — are significantly more valuable to digital marketing teams and agencies.",
      },
      {
        section: "Notable Clients and Publications",
        why: "Writing credits in recognizable publications (Forbes, TechCrunch, HBR) or for well-known brands serve as powerful social proof. Include any notable bylines or brand work in your resume.",
      },
    ],
    exampleSkills: [
      "Long-Form SEO Content",
      "Blog Posts & Articles",
      "Email Copywriting",
      "Technical Writing",
      "White Papers & Case Studies",
      "Landing Page Copy",
      "Content Strategy",
      "Ahrefs / Semrush",
      "WordPress / CMS Platforms",
      "AP Style / Chicago Manual",
    ],
    tips: [
      "Lead with your best published clips, not descriptions of your writing. A link to a great published article is worth ten lines of describing what you write.",
      "State your content specialization clearly. 'B2B SaaS content writer' or 'healthcare content strategist' is more compelling than 'experienced content writer'.",
      "Include metrics for any content performance you can share: organic traffic growth, email open rates, content downloads, or lead generation attributed to specific pieces.",
      "Mention any CMS platforms, SEO tools, and editorial tools you are proficient with. Being ready to work in a team's existing workflow is a practical differentiator.",
      "If you have ghostwritten for executive thought leaders or major brands, describe this experience (without disclosing NDA-protected client names) — ghostwriting experience signals trust and professionalism.",
    ],
    faqs: [
      {
        q: "What should a content writer portfolio include?",
        a: "A content writer portfolio should include published writing samples and clip links, content specializations and niches, content format expertise, SEO and content marketing knowledge, and any notable bylines or brand clients.",
      },
      {
        q: "How many writing samples should a content portfolio have?",
        a: "Six to ten strong samples covering your core specializations are ideal. Choose pieces that demonstrate range, depth, and the specific content types relevant to your target clients or employers.",
      },
      {
        q: "Can I create a content writing portfolio if I am just starting out?",
        a: "Yes. Start by writing spec pieces, contributing to industry blogs, creating a personal blog, or writing for nonprofit organizations. Even a handful of quality samples on any platform gives you clips to include in your portfolio.",
      },
      {
        q: "How do I create a content writer portfolio for free?",
        a: "Upload your writing resume to Magic Self at magic-self.dev for a free portfolio at magic-self.dev/yourname. Include links to your best published work in your resume and Magic Self will surface them on your portfolio page.",
      },
    ],
    keywords: [
      "content writer portfolio website",
      "writing portfolio examples 2026",
      "free content writer portfolio",
      "freelance writer portfolio website",
      "content writer personal website",
      "copywriter portfolio free",
      "blog writer portfolio site",
    ],
  },
];

export function getRole(slug: string): RoleData | undefined {
  return roles.find((r) => r.slug === slug);
}

export function getAllRoleSlugs(): string[] {
  return roles.map((r) => r.slug);
}
