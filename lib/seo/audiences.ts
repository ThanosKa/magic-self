export interface AudienceData {
  slug: string;
  title: string;
  displayName: string;
  headline: string;
  description: string;
  intro: string;
  benefits: { title: string; description: string }[];
  useCases: string[];
  testimonialContext: string;
  faqs: { q: string; a: string }[];
  keywords: string[];
}

export const audiences: AudienceData[] = [
  {
    slug: "developers",
    title: "developers",
    displayName: "Software Developers",
    headline: "The Free Portfolio Website Builder for Software Developers",
    description:
      "Turn your developer resume into a live portfolio website in 2 clicks. Showcase your GitHub projects, skills, and experience at magic-self.dev/yourname. 100% free.",
    intro:
      "As a software developer, your online presence is your second resume — and recruiters check it before they call you back. Magic Self converts your existing PDF resume or LinkedIn export into a polished, live developer portfolio at magic-self.dev/yourname in under 60 seconds. No design skills, no coding required, and no credit card — just upload and share.",
    benefits: [
      {
        title: "Launch in Under 60 Seconds",
        description:
          "Upload your PDF resume or LinkedIn export and your developer portfolio is live immediately. No form-filling, no template choosing, no drag-and-drop editor.",
      },
      {
        title: "Skills & Tech Stack Section",
        description:
          "Magic Self automatically extracts your programming languages, frameworks, and tools from your resume and displays them as clean skill badges that recruiters scan in seconds.",
      },
      {
        title: "Project Showcase Built In",
        description:
          "Your projects, roles, and contributions are pulled from your resume and laid out in a clear, scannable format that highlights your real-world impact.",
      },
      {
        title: "Shareable magic-self.dev/yourname URL",
        description:
          "Get a permanent, branded URL at magic-self.dev/yourname that you can drop into job applications, your GitHub profile README, and LinkedIn bio.",
      },
      {
        title: "Open Source & Privacy-First",
        description:
          "Magic Self is 100% open source under Apache 2.0. Your resume data is used only to generate your site — never sold or shared with third parties.",
      },
      {
        title: "Zero Maintenance",
        description:
          "Re-upload an updated PDF any time to refresh your portfolio. No manual edits needed — the AI re-parses your latest resume and updates everything automatically.",
      },
    ],
    useCases: [
      "Add your magic-self.dev URL to every job application instead of attaching a PDF",
      "Pin your portfolio link in your GitHub profile README for open-source visibility",
      "Share your live portfolio link in LinkedIn connection requests to stand out",
      "Use your portfolio URL in cold emails to engineering managers at target companies",
      "Replace a stale personal website with an always-up-to-date AI-generated portfolio",
    ],
    testimonialContext:
      "I was applying to senior engineering roles and needed a portfolio fast. I uploaded my resume PDF at 9 PM and had a live site by 9:01 PM. Three recruiters commented on it that week.",
    faqs: [
      {
        q: "Can I show my GitHub projects on my Magic Self portfolio?",
        a: "Yes. Magic Self extracts project descriptions and links from your resume PDF. To make sure your GitHub projects appear, include them in the Projects section of your resume before uploading.",
      },
      {
        q: "Does Magic Self work with developer-format resumes?",
        a: "Absolutely. Magic Self handles technical resumes with multi-column layouts, skill tables, code snippets in descriptions, and dense formatting that trips up other parsers.",
      },
      {
        q: "Is the portfolio website URL permanent?",
        a: "Yes. Once you claim magic-self.dev/yourusername, that URL is yours for as long as your account is active. You can update the content at any time by re-uploading a new PDF.",
      },
      {
        q: "Can I use Magic Self as a free alternative to a personal website?",
        a: "Many developers use Magic Self as their primary online presence instead of maintaining a hand-coded portfolio site. It is faster to set up, always looks professional, and updates in seconds.",
      },
    ],
    keywords: [
      "developer portfolio website free",
      "software developer portfolio builder",
      "free portfolio website for developers",
      "developer resume to website",
      "programmer portfolio generator",
      "coding portfolio builder",
      "GitHub portfolio website",
      "developer personal website",
    ],
  },
  {
    slug: "designers",
    title: "designers",
    displayName: "Designers",
    headline: "Free Portfolio Website for Designers — Built from Your Resume in 2 Clicks",
    description:
      "Convert your designer resume into a beautiful portfolio site at magic-self.dev/yourname instantly. Showcase your skills and experience without building anything. 100% free.",
    intro:
      "Designers know better than anyone that first impressions are everything — and a clunky, outdated portfolio can cost you the interview. Magic Self turns your existing resume PDF into a clean, professional portfolio website in seconds. Stop spending weekends rebuilding your portfolio site; upload once and share your work instantly.",
    benefits: [
      {
        title: "Professional Look, Zero Design Work",
        description:
          "Magic Self generates a clean, typographically strong portfolio page from your resume. The output looks intentional and polished — not like a template everyone else is using.",
      },
      {
        title: "Skills & Tools Extracted Automatically",
        description:
          "Your design tools — Figma, Adobe XD, Illustrator, Photoshop, Sketch — are pulled from your resume and displayed as visual skill badges without any manual input.",
      },
      {
        title: "Work History Presented as a Story",
        description:
          "Your experience is formatted as a clear timeline with company, role, duration, and key accomplishments — the narrative that design hiring managers want to read.",
      },
      {
        title: "Instant Shareable URL",
        description:
          "Get magic-self.dev/yourname to drop into Behance descriptions, Dribbble bios, job applications, and cold emails to creative directors.",
      },
      {
        title: "100% Free, No Hidden Costs",
        description:
          "No subscription, no watermark, no premium tier. Magic Self is completely free and open source. Build your portfolio without spending money on hosting or builders.",
      },
      {
        title: "Fast Updates When Your Work Changes",
        description:
          "Land a new role or complete a major project? Re-upload your updated resume and your portfolio refreshes automatically — no manual edits or CMS logins required.",
      },
    ],
    useCases: [
      "Attach your live portfolio URL to job applications instead of sending a PDF attachment",
      "Add your magic-self.dev link to your Behance and Dribbble profile bios",
      "Share your portfolio with potential clients when pitching freelance projects",
      "Use your portfolio URL in LinkedIn DMs when reaching out to creative recruiters",
      "Replace an outdated Squarespace or Cargo site while you build your real portfolio",
    ],
    testimonialContext:
      "I was between jobs and needed something live immediately. I uploaded my resume and had a portfolio link to include in applications by the same evening. It got the job done while I worked on my full case study site.",
    faqs: [
      {
        q: "Can I link to my Behance or Dribbble work from my Magic Self portfolio?",
        a: "Yes. Include links to your portfolio platforms in your resume PDF and Magic Self will extract and display them as clickable links on your portfolio page.",
      },
      {
        q: "Will the portfolio look good enough to send to design studios?",
        a: "Magic Self produces a clean, minimal, professional layout that works well as a digital resume. It is not a replacement for a full case study portfolio, but it is a strong complement that gives you a shareable URL immediately.",
      },
      {
        q: "Does it support UX and product designers, not just visual designers?",
        a: "Yes. Magic Self handles all design disciplines including UX, UI, product design, motion design, brand design, and graphic design. The AI extracts skills and experience relevant to your specific role.",
      },
      {
        q: "Is there a limit to how many times I can update my portfolio?",
        a: "No limits. You can re-upload an updated PDF resume as many times as you want and your portfolio will refresh each time.",
      },
    ],
    keywords: [
      "designer portfolio website free",
      "graphic designer portfolio builder",
      "UX designer portfolio website",
      "free portfolio site for designers",
      "designer resume to portfolio",
      "design portfolio generator",
      "creative portfolio website free",
      "designer personal website builder",
    ],
  },
  {
    slug: "students",
    title: "students",
    displayName: "Students",
    headline: "Free Portfolio Website for Students — Stand Out in Your First Job Search",
    description:
      "Turn your student resume into a live portfolio website at magic-self.dev/yourname in 2 clicks. Free, no coding needed. Perfect for internship and entry-level job applications.",
    intro:
      "As a student, you might not have years of experience — but you have projects, coursework, skills, and internships that hiring managers want to see. Magic Self turns your resume PDF into a professional portfolio website in seconds, giving you a shareable link that makes you look serious and prepared before you even walk into the interview. It is completely free and takes less than two minutes to set up.",
    benefits: [
      {
        title: "Stand Out from Other Applicants",
        description:
          "Most students send a plain PDF. A live portfolio link at magic-self.dev/yourname signals professionalism and initiative that hiring managers notice immediately.",
      },
      {
        title: "Showcase Projects and Coursework",
        description:
          "Magic Self extracts your academic projects, capstone work, hackathon entries, and relevant coursework from your resume and displays them prominently.",
      },
      {
        title: "No Work Experience? No Problem",
        description:
          "The AI surfaces your education, skills, extracurriculars, volunteer work, and certifications to build a complete picture of who you are — not just where you have worked.",
      },
      {
        title: "Ready in Under 2 Minutes",
        description:
          "Upload your student resume PDF and your portfolio is live in seconds. Perfect for last-minute applications when you do not have time to build something from scratch.",
      },
      {
        title: "Completely Free — No Student Credit Card Required",
        description:
          "Magic Self is 100% free with no subscription, no trial period, and no credit card required. Built specifically with budget-conscious students in mind.",
      },
      {
        title: "Great for Internship Applications",
        description:
          "Include your magic-self.dev link in internship applications, LinkedIn connection requests to professionals in your field, and emails to professors for references.",
      },
    ],
    useCases: [
      "Include your live portfolio link in every internship and entry-level job application",
      "Add your magic-self.dev URL to your LinkedIn profile while it is still sparse",
      "Share your portfolio link at career fairs instead of handing out paper resumes",
      "Use your portfolio URL when cold-emailing professionals for informational interviews",
      "Submit your portfolio link alongside university project submissions for class credit",
    ],
    testimonialContext:
      "I was applying for internships as a junior with barely any work experience. Having a live portfolio link instead of just a PDF made me look way more prepared. I got three callbacks that week.",
    faqs: [
      {
        q: "I am a student with very little work experience. Will my portfolio look empty?",
        a: "Not at all. Magic Self extracts your education, GPA, relevant coursework, academic projects, skills, certifications, and extracurriculars from your resume. Students with limited work history often have richer academic credentials than they realize.",
      },
      {
        q: "Can I use Magic Self for internship applications?",
        a: "Absolutely — many students use their magic-self.dev portfolio link in internship applications. It is a simple way to show initiative and give recruiters a quick way to learn more about you beyond the PDF.",
      },
      {
        q: "Is Magic Self really free for students?",
        a: "Yes, completely free. No credit card, no trial, no student discount needed because there is no cost at all. Magic Self is open source and free for everyone.",
      },
      {
        q: "What if I do not have a polished resume yet?",
        a: "Start with whatever resume you have — even a rough draft works. Magic Self will extract what is there and display it professionally. You can re-upload an improved version any time as your resume gets better.",
      },
    ],
    keywords: [
      "student portfolio website free",
      "college student portfolio builder",
      "free portfolio site for students",
      "student resume to website",
      "internship portfolio website",
      "entry level portfolio builder",
      "student personal website free",
      "graduate student portfolio",
    ],
  },
  {
    slug: "job-seekers",
    title: "job-seekers",
    displayName: "Job Seekers",
    headline: "Free Portfolio Website for Job Seekers — Get More Interviews in 2026",
    description:
      "Stand out in your job search with a live portfolio at magic-self.dev/yourname. Convert your PDF resume in 2 clicks, 100% free. Trusted by thousands of job seekers.",
    intro:
      "The job market is competitive and PDF resumes alone no longer cut it. A live portfolio website at your own URL gives hiring managers something memorable to share with the team — and it shows up when they Google your name. Magic Self converts your existing resume into a polished personal website in seconds, so you can spend more time applying and less time building.",
    benefits: [
      {
        title: "Get Found When Recruiters Google You",
        description:
          "Your magic-self.dev/yourname portfolio is indexed by Google, giving you a professional result at the top of your name search so recruiters see your best work first.",
      },
      {
        title: "One Link to Share Everywhere",
        description:
          "One URL covers your entire professional story — experience, skills, education, and contact info. Add it to your email signature, LinkedIn, and every job application.",
      },
      {
        title: "Look More Prepared Than Other Candidates",
        description:
          "Most applicants send a PDF. Sending a live portfolio link signals that you are proactive, digitally savvy, and serious about the opportunity — qualities every hiring manager wants.",
      },
      {
        title: "No Design or Tech Skills Required",
        description:
          "Upload your existing resume PDF and Magic Self handles everything else. You do not need to know HTML, CSS, or design tools to have a professional online portfolio.",
      },
      {
        title: "Always Up to Date",
        description:
          "When your experience changes, upload a new PDF and your portfolio updates instantly. No stale information, no version confusion — your site always reflects your latest resume.",
      },
      {
        title: "Supports Any Industry or Role",
        description:
          "Whether you are a nurse, accountant, teacher, marketer, or engineer, Magic Self builds a professional portfolio from any resume format in any industry.",
      },
    ],
    useCases: [
      "Add your live portfolio URL to your email signature for every application you send",
      "Include your magic-self.dev link in LinkedIn messages to recruiters as a soft pitch",
      "Use your portfolio URL on job boards like LinkedIn, Indeed, and Wellfound",
      "Send your portfolio link when following up after submitting a job application",
      "Share your portfolio at networking events instead of carrying physical business cards",
    ],
    testimonialContext:
      "I was job searching for three months with just a PDF resume. After creating my Magic Self portfolio, a recruiter told me that seeing my live page made me feel like a real candidate before we even spoke.",
    faqs: [
      {
        q: "How does a portfolio website help me get more job interviews?",
        a: "A live portfolio gives recruiters an easy-to-share link to your professional profile. It gets indexed by Google, making you findable. And it demonstrates digital confidence — a trait most employers value regardless of role.",
      },
      {
        q: "Do I need to be in tech to benefit from Magic Self?",
        a: "Not at all. Magic Self works for job seekers in any industry. Whether you are in finance, healthcare, education, law, or the arts, having a live online portfolio helps you stand out from other applicants.",
      },
      {
        q: "What if I am currently unemployed and have a gap in my resume?",
        a: "Your magic-self.dev portfolio will show exactly what you put in your resume. You can frame gaps positively in your resume before uploading, and the AI will present your experience honestly and professionally.",
      },
      {
        q: "Can I use Magic Self if I am changing careers?",
        a: "Yes. Career changers often benefit most from a clear, structured portfolio that highlights transferable skills. Update your resume to emphasize relevant skills and projects, then upload to Magic Self for an instant professional presence.",
      },
    ],
    keywords: [
      "job seeker portfolio website",
      "free portfolio for job hunters",
      "resume to website job search",
      "personal website for job applications",
      "professional portfolio free job seeker",
      "live portfolio website job search",
      "best free portfolio builder job seekers",
      "online resume for job applications",
    ],
  },
  {
    slug: "engineers",
    title: "engineers",
    displayName: "Engineers",
    headline: "Free Portfolio Website for Engineers — Built from Your Resume Instantly",
    description:
      "Convert your engineering resume into a professional portfolio site at magic-self.dev/yourname in 2 clicks. Showcase your technical projects and skills. 100% free.",
    intro:
      "Engineering roles are competitive and technical recruiters increasingly look beyond the PDF to evaluate candidates. Magic Self creates a clean, professional portfolio website directly from your engineering resume, surfacing your technical skills, certifications, and project work in a format that both recruiters and hiring managers can quickly digest. Setup takes under 60 seconds and costs nothing.",
    benefits: [
      {
        title: "Technical Skills Front and Center",
        description:
          "Magic Self extracts your technical competencies — CAD tools, programming languages, engineering software, methodologies, and certifications — and displays them as a clear skills matrix.",
      },
      {
        title: "Project and Achievement Highlights",
        description:
          "Your engineering projects, system designs, cost savings, and performance improvements are pulled from your resume and presented in a results-focused format that impresses technical interviewers.",
      },
      {
        title: "Certifications and Licenses Displayed Prominently",
        description:
          "PE licenses, PMP certifications, safety credentials, and domain-specific qualifications are automatically extracted and displayed with appropriate prominence on your portfolio page.",
      },
      {
        title: "Works for All Engineering Disciplines",
        description:
          "Whether you are a civil, mechanical, electrical, chemical, aerospace, or software engineer, Magic Self parses your resume accurately and builds an appropriate portfolio layout.",
      },
      {
        title: "Professional URL for Recruiter Outreach",
        description:
          "Share magic-self.dev/yourname in cold emails to engineering firms, LinkedIn InMail messages, and on your professional registration profiles.",
      },
      {
        title: "Free and Open Source — No Vendor Lock-In",
        description:
          "Unlike proprietary portfolio builders, Magic Self is open source. Your data is yours. The tool is free forever with no subscription required.",
      },
    ],
    useCases: [
      "Include your portfolio link in applications to engineering firms and consultancies",
      "Add your magic-self.dev URL to your PE registration profile and professional association pages",
      "Share your portfolio with engineering recruiters on LinkedIn as an alternative to PDF attachments",
      "Use your portfolio link when submitting proposals for freelance engineering contracts",
      "Display your portfolio URL on your engineering conference name badge or business card",
    ],
    testimonialContext:
      "As a mechanical engineer transitioning to a senior role, I needed a way to show the breadth of my project experience quickly. Magic Self gave me a clean portfolio link that I could send alongside my application — the hiring manager said it helped me stand out.",
    faqs: [
      {
        q: "Will Magic Self correctly parse a technical engineering resume?",
        a: "Yes. Magic Self uses AI parsing that handles dense, technical resumes including those with tables, multi-column layouts, technical acronyms, and industry-specific terminology common in engineering CVs.",
      },
      {
        q: "Can I include engineering drawings or project images?",
        a: "Magic Self works with text-based resume content. For visual project examples, include URLs to your project documentation or portfolio files in your resume and Magic Self will extract them as clickable links.",
      },
      {
        q: "Is Magic Self suitable for senior and principal engineers?",
        a: "Absolutely. Magic Self works equally well for fresh graduates and 20-year veterans. Senior engineers often find it especially useful because their long experience history is formatted clearly and professionally without the clutter of a multi-page PDF.",
      },
      {
        q: "Can I use Magic Self for my engineering consulting practice?",
        a: "Yes. Many independent engineering consultants use Magic Self to create a professional online presence that they can link from proposals, contracts, and professional directories.",
      },
    ],
    keywords: [
      "engineer portfolio website free",
      "engineering resume to website",
      "free portfolio for engineers",
      "mechanical engineer portfolio",
      "software engineer portfolio website",
      "civil engineer personal website",
      "electrical engineer portfolio builder",
      "engineering professional website free",
    ],
  },
  {
    slug: "product-managers",
    title: "product-managers",
    displayName: "Product Managers",
    headline: "Free Portfolio Website for Product Managers — Show Your Impact in 2 Clicks",
    description:
      "Turn your PM resume into a live portfolio at magic-self.dev/yourname instantly. Highlight your product wins, roadmaps, and metrics. Free, no coding required.",
    intro:
      "Product management is a storytelling role — and your portfolio should tell a clear story of the products you have shaped, the metrics you have moved, and the teams you have led. Magic Self builds a professional PM portfolio directly from your resume PDF, highlighting your key achievements, skills, and career arc in a format that resonates with CPOs, VPs of Product, and technical co-founders evaluating your candidacy.",
    benefits: [
      {
        title: "Metrics and Outcomes Front and Center",
        description:
          "Magic Self surfaces the numbers that matter — conversion rate improvements, revenue impact, user growth, and retention wins — from your resume bullets and displays them prominently.",
      },
      {
        title: "Skills Matrix for PM Competencies",
        description:
          "Your PM skills — roadmapping, Jira, data analysis, A/B testing, SQL, OKRs, agile methodologies — are extracted and displayed as a competency profile that hiring managers can scan quickly.",
      },
      {
        title: "Career Narrative That Makes Sense",
        description:
          "Magic Self presents your PM career as a clear progression timeline, helping hiring managers understand how your background prepares you for the next role.",
      },
      {
        title: "Ready in Seconds for Urgent Applications",
        description:
          "When a great PM role appears, apply immediately with your live portfolio URL. No scrambling to update a website or format a portfolio document — just upload and share.",
      },
      {
        title: "Shareable Across Every Channel",
        description:
          "One URL to share in LinkedIn DMs to recruiters, product networking events, PM Slack communities, and job applications at early-stage startups.",
      },
      {
        title: "Free to Use, Always",
        description:
          "No Notion pay walls, no Coda templates to subscribe to. Magic Self is completely free to use with no premium tier for basic portfolio features.",
      },
    ],
    useCases: [
      "Add your portfolio link to your PM resume as a live supplement that hiring managers can explore",
      "Share your magic-self.dev URL in PM Slack communities like Lenny's or Product School",
      "Use your portfolio link when pitching yourself for advisory board or fractional PM roles",
      "Include your portfolio URL when applying to PM roles at startups via AngelList or Wellfound",
      "Send your portfolio link to a headhunter or executive recruiter as a quick introduction",
    ],
    testimonialContext:
      "I was in stealth job search mode and needed something shareable that was not my LinkedIn profile. Magic Self gave me a clean URL to share without tipping off my current employer. I landed three interviews in two weeks.",
    faqs: [
      {
        q: "Is a portfolio important for product managers?",
        a: "Increasingly, yes. As PM roles become more competitive, a portfolio that demonstrates your impact, thinking process, and breadth of experience helps you stand out from other candidates who only submit a PDF resume.",
      },
      {
        q: "Can Magic Self showcase my product case studies?",
        a: "Magic Self extracts text-based content from your resume. For detailed case studies, include brief descriptions and links to external documents like Google Docs or Notion pages in your resume, and Magic Self will surface those links on your portfolio.",
      },
      {
        q: "I am transitioning into PM from engineering or design. Will Magic Self help?",
        a: "Yes. Magic Self will surface your technical or design background as a genuine strength. Career-changers often have unique advantages as PMs, and your portfolio will clearly show the cross-functional skills that make you a compelling candidate.",
      },
      {
        q: "How do I keep my PM portfolio confidential during a stealth job search?",
        a: "You can keep your portfolio in draft mode until you are ready to share it. In draft mode, your site is not publicly accessible or indexed by search engines — only people with the direct link can view it.",
      },
    ],
    keywords: [
      "product manager portfolio website",
      "PM portfolio website free",
      "product manager personal website",
      "free portfolio builder product managers",
      "PM resume to website",
      "product manager online portfolio",
      "product manager portfolio examples 2026",
      "best portfolio website for PMs",
    ],
  },
  {
    slug: "marketers",
    title: "marketers",
    displayName: "Marketers",
    headline: "Free Portfolio Website for Marketers — Turn Your Resume into a Live Profile",
    description:
      "Convert your marketing resume into a portfolio site at magic-self.dev/yourname in 2 clicks. Showcase campaigns, metrics, and skills. 100% free, no design skills needed.",
    intro:
      "Marketing is a results-driven field, and your portfolio should prove that. Magic Self converts your marketing resume into a live, professional portfolio page that highlights your campaign wins, channel expertise, and measurable impact — giving hiring managers and CMOs everything they need to decide you deserve an interview. Set up takes 60 seconds and is completely free.",
    benefits: [
      {
        title: "Campaign Results and Metrics Highlighted",
        description:
          "Magic Self pulls your marketing wins — email open rates, ROAS improvements, traffic growth, lead generation numbers — from your resume and displays them in a results-first format.",
      },
      {
        title: "Channel Expertise Displayed as Skills",
        description:
          "Your expertise across SEO, paid social, email marketing, content strategy, Google Ads, Meta Ads, and analytics tools is extracted and shown as a clear channel skill profile.",
      },
      {
        title: "Brand Story That Resonates",
        description:
          "As a marketer, your online presence is a demonstration of your personal brand skills. A clean, professional portfolio page at magic-self.dev/yourname shows you practice what you pitch.",
      },
      {
        title: "Perfect for Agency and In-House Applications",
        description:
          "Whether you are applying to a boutique digital agency or a Fortune 500 marketing team, your portfolio gives decision-makers a quick, professional overview of your experience.",
      },
      {
        title: "No Design Budget Required",
        description:
          "You do not need to hire a designer or subscribe to a website builder to have a professional portfolio. Magic Self is free and produces a polished result automatically.",
      },
      {
        title: "Always Current as Your Career Grows",
        description:
          "Launch a new campaign that crushes targets? Update your resume, re-upload to Magic Self, and your portfolio reflects your latest wins within seconds.",
      },
    ],
    useCases: [
      "Include your live portfolio URL in job applications to marketing agencies and brands",
      "Add your magic-self.dev link to your Twitter/X bio and LinkedIn profile",
      "Share your portfolio when pitching freelance content or social media management services",
      "Use your portfolio link in networking emails to marketing executives at target companies",
      "Include your portfolio URL in marketing conference speaker bios and proposals",
    ],
    testimonialContext:
      "As a marketer, I knew I needed a strong online presence. Magic Self let me go from resume PDF to live portfolio in under a minute. I sent it to three hiring managers that same afternoon.",
    faqs: [
      {
        q: "Can I showcase marketing campaign examples on my Magic Self portfolio?",
        a: "Magic Self surfaces whatever is in your resume. For campaign examples, include concise descriptions and links to campaign reports, creative samples, or case studies in your resume before uploading.",
      },
      {
        q: "Is Magic Self good for freelance marketers looking for clients?",
        a: "Yes. A clean, professional portfolio link is often the difference between a potential client following up or not. Magic Self gives you a shareable URL to include in proposals and client pitches at no cost.",
      },
      {
        q: "What marketing skills does Magic Self extract automatically?",
        a: "Magic Self extracts any skills mentioned in your resume including SEO, SEM, PPC, email marketing, content marketing, social media marketing, marketing automation, CRM tools, and analytics platforms.",
      },
      {
        q: "Can I use Magic Self alongside a full portfolio site like a personal blog?",
        a: "Absolutely. Many marketers use Magic Self as a professional overview page and link to their blog, portfolio site, or case study documents from within their resume. Magic Self will surface those links on your portfolio.",
      },
    ],
    keywords: [
      "marketing portfolio website free",
      "marketer portfolio builder",
      "digital marketer personal website",
      "free portfolio for marketers",
      "marketing resume to website",
      "content marketer portfolio",
      "marketing manager portfolio site",
      "SEO marketer portfolio website",
    ],
  },
  {
    slug: "data-scientists",
    title: "data-scientists",
    displayName: "Data Scientists",
    headline: "Free Portfolio Website for Data Scientists — Built from Your Resume in Seconds",
    description:
      "Turn your data science resume into a live portfolio at magic-self.dev/yourname. Showcase models, skills, and publications. 100% free, no coding required for setup.",
    intro:
      "Data science hiring is technical and competitive. Recruiters and hiring managers look beyond the resume to evaluate your real skills — and a professional online portfolio with your methodologies, tools, and project outcomes is increasingly expected. Magic Self generates a polished data science portfolio from your resume PDF in seconds, giving you a credible online presence without hours of setup work.",
    benefits: [
      {
        title: "Technical Stack and Tools Displayed Clearly",
        description:
          "Python, R, TensorFlow, PyTorch, scikit-learn, SQL, Spark, and your full data toolchain are extracted from your resume and displayed as a clear technical skills profile.",
      },
      {
        title: "Research and Publications Section",
        description:
          "Academic publications, conference papers, and research contributions mentioned in your resume are surfaced prominently — critical for data scientists transitioning from academia to industry.",
      },
      {
        title: "Model Performance and Business Impact",
        description:
          "Your model accuracy improvements, cost savings, prediction accuracy rates, and business outcomes are extracted from resume bullets and displayed as concrete achievements.",
      },
      {
        title: "Credible Online Presence for Technical Interviews",
        description:
          "Many data science hiring processes include a portfolio review phase. Having a live, professional page at magic-self.dev/yourname gives you something credible to submit instantly.",
      },
      {
        title: "Education and Certifications Highlighted",
        description:
          "Your advanced degrees, Kaggle competition results, Coursera specializations, and professional certifications are all extracted and shown with appropriate prominence.",
      },
      {
        title: "Free for Individual Data Scientists",
        description:
          "Magic Self is completely free. No Kaggle profile subscription, no paid GitHub hosting — just a clean portfolio URL generated from your existing resume at no cost.",
      },
    ],
    useCases: [
      "Include your portfolio URL in applications to data science roles at tech companies and research labs",
      "Add your magic-self.dev link to your Kaggle profile bio for community visibility",
      "Share your portfolio when submitting to data science job boards and talent marketplaces",
      "Use your portfolio link when applying to PhD programs or research positions",
      "Include your portfolio URL in academic paper author bios and conference submissions",
    ],
    testimonialContext:
      "I was applying for senior data scientist roles and had a strong resume but no personal website. Magic Self gave me a professional portfolio link in under two minutes that I could include on applications. It helped bridge the gap while I built a proper Jupyter-based portfolio.",
    faqs: [
      {
        q: "Can I show my machine learning projects on my Magic Self portfolio?",
        a: "Magic Self extracts project descriptions and any links you include in your resume. For ML projects, include a brief description of the problem, approach, and results along with a GitHub or Kaggle link, and these will appear on your portfolio.",
      },
      {
        q: "Is Magic Self suitable for academic data scientists transitioning to industry?",
        a: "Yes, and it is particularly helpful for academics making this transition. Magic Self can surface your research publications, teaching experience, and domain expertise in a format that industry recruiters can easily digest.",
      },
      {
        q: "How does Magic Self handle a data science resume with many technical terms?",
        a: "Magic Self uses AI parsing designed to handle dense, technical resumes with acronyms, statistical methods, and tool names common in data science CVs. Technical terms are preserved accurately.",
      },
      {
        q: "Can I keep my Magic Self portfolio private until I am ready to share it?",
        a: "Yes. New portfolios are created in draft mode by default. You choose when to make your portfolio public and shareable. Until then, only you can see it.",
      },
    ],
    keywords: [
      "data scientist portfolio website free",
      "data science portfolio builder",
      "machine learning portfolio website",
      "free portfolio for data scientists",
      "data scientist personal website",
      "data science resume to website",
      "AI portfolio builder data scientists",
      "data scientist online profile",
    ],
  },
  {
    slug: "ux-designers",
    title: "ux-designers",
    displayName: "UX Designers",
    headline: "Free Portfolio Website for UX Designers — Go Live from Your Resume in 2 Clicks",
    description:
      "Convert your UX designer resume into a professional portfolio at magic-self.dev/yourname instantly. Highlight your process, skills, and case studies. 100% free.",
    intro:
      "UX design hiring managers want to see your process, not just your deliverables — and a professional portfolio page that clearly communicates your research approach, tools, and outcomes gives you a significant edge. Magic Self converts your UX resume into a live portfolio website in seconds, providing a clean, professional online presence that you can supplement with Figma links, case study documents, and research reports.",
    benefits: [
      {
        title: "UX Skills and Methodologies Extracted",
        description:
          "User research, wireframing, prototyping, usability testing, information architecture, accessibility, and your specific UX tools are all pulled from your resume and displayed as a skills profile.",
      },
      {
        title: "Tools and Software Displayed as Badges",
        description:
          "Figma, Sketch, Adobe XD, InVision, Miro, Maze, Hotjar, and every design and research tool in your stack is extracted automatically and shown as visual skill badges.",
      },
      {
        title: "Case Study Links Surfaced Prominently",
        description:
          "Include links to your Figma files, Notion case studies, or Behance projects in your resume and Magic Self will make them clickable and prominent on your portfolio page.",
      },
      {
        title: "Career Story Told Clearly",
        description:
          "Your progression from junior to senior UX roles, domain switches, and key design wins are displayed as a narrative timeline that hiring managers can quickly follow.",
      },
      {
        title: "Ideal as a Pre-Interview Portfolio Supplement",
        description:
          "Share your magic-self.dev link alongside your Figma portfolio URL so hiring managers have both your professional background and your design work in one go.",
      },
      {
        title: "Free, No Figma Premium Required",
        description:
          "Magic Self costs nothing. Use it alongside your existing free Figma or Behance portfolio to create a complete professional online presence without paying for additional tools.",
      },
    ],
    useCases: [
      "Include your portfolio link alongside your Figma case studies in job applications",
      "Add your magic-self.dev URL to your Behance, Dribbble, and LinkedIn profiles",
      "Share your portfolio link in UX design Slack communities and Discord servers",
      "Use your portfolio URL in outreach messages to UX recruiters at top tech companies",
      "Submit your portfolio link for speaking opportunities at UX conferences and meetups",
    ],
    testimonialContext:
      "My Figma case studies were strong but I needed a professional overview page that showed my full background. Magic Self filled that gap perfectly — I went from zero to a live portfolio link in about 90 seconds.",
    faqs: [
      {
        q: "Does Magic Self work for entry-level UX designers without much work experience?",
        a: "Yes. Magic Self surfaces your education, bootcamp training, personal UX projects, volunteer design work, and relevant coursework. Entry-level UX designers often have more to showcase than they realize once everything is organized on one page.",
      },
      {
        q: "Can I link to my Figma prototypes from my Magic Self portfolio?",
        a: "Yes. Include Figma share links, Behance project URLs, or Notion case study links in your resume before uploading, and Magic Self will extract and display them as clickable links on your portfolio page.",
      },
      {
        q: "Is Magic Self a replacement for a UX case study portfolio?",
        a: "No — Magic Self is a complement to your case study portfolio, not a replacement. Use it as a professional overview page that links to your deeper case study work. Together, they give hiring managers a complete picture of your skills and process.",
      },
      {
        q: "How does the portfolio look on mobile devices?",
        a: "Magic Self portfolios are fully responsive and look great on mobile, tablet, and desktop. Since hiring managers often review candidates on phones, mobile performance matters and Magic Self handles it automatically.",
      },
    ],
    keywords: [
      "UX designer portfolio website free",
      "UX portfolio builder free",
      "user experience designer portfolio",
      "free portfolio for UX designers",
      "UX resume to website",
      "UX designer personal website",
      "UX designer portfolio examples 2026",
      "best free UX portfolio builder",
    ],
  },
  {
    slug: "freelancers",
    title: "freelancers",
    displayName: "Freelancers",
    headline: "Free Portfolio Website for Freelancers — Win More Clients with a Live Profile",
    description:
      "Turn your freelancer resume into a professional client-facing website at magic-self.dev/yourname in 2 clicks. Showcase services, skills, and experience. 100% free.",
    intro:
      "As a freelancer, your website is your storefront — and not having one costs you clients before you even get to pitch. Magic Self converts your resume or LinkedIn export into a clean, professional freelancer portfolio page in seconds, giving you a credible link to send to prospective clients, add to freelance marketplaces, and include in proposals. It is completely free and takes less than two minutes to set up.",
    benefits: [
      {
        title: "Professional Client-Facing Profile Instantly",
        description:
          "Stop sending clients a PDF of your resume. A live portfolio at magic-self.dev/yourname is the professional first impression that wins client trust and gets you shortlisted.",
      },
      {
        title: "Services and Expertise Highlighted",
        description:
          "Magic Self extracts your freelance services, specialist skills, and industry experience from your resume and displays them in a clear, client-readable format.",
      },
      {
        title: "Client Work and Projects Showcased",
        description:
          "Notable client engagements, project outcomes, and freelance achievements described in your resume are surfaced and presented as a strong track record.",
      },
      {
        title: "Shareable Across Freelance Platforms",
        description:
          "Add your magic-self.dev URL to your Upwork, Toptal, Freelancer.com, Fiverr Pro, and Contra profiles to drive inbound inquiries from prospective clients.",
      },
      {
        title: "Zero Hosting Costs",
        description:
          "Unlike Squarespace, Wix, or Webflow, Magic Self is completely free. No monthly hosting fees, no domain registration — just a clean professional URL at no cost.",
      },
      {
        title: "Update When You Land New Work",
        description:
          "Finish a notable project? Add it to your resume, re-upload to Magic Self, and your portfolio page updates in seconds. Always show your most impressive recent work.",
      },
    ],
    useCases: [
      "Include your portfolio link in every freelance proposal and project pitch document",
      "Add your magic-self.dev URL to your Upwork and Toptal profiles to increase visibility",
      "Share your portfolio when cold-emailing potential clients in your target niche",
      "Use your portfolio URL as your primary professional link in Twitter and LinkedIn bios",
      "Include your portfolio link in your freelance contractor agreements as a credentials reference",
    ],
    testimonialContext:
      "I was getting Upwork proposals rejected without even a look. After adding my Magic Self portfolio link to my profile, my response rate improved significantly. Clients could see my full background before we even spoke.",
    faqs: [
      {
        q: "Is Magic Self better than a Linktree for freelancers?",
        a: "Magic Self is fundamentally different from Linktree. Linktree is a simple link aggregator. Magic Self generates a full professional portfolio page from your resume with your actual experience, skills, and background — much more compelling for potential clients.",
      },
      {
        q: "Can I use Magic Self as my primary freelance website?",
        a: "Yes. Many freelancers use their magic-self.dev portfolio as their primary professional website. It is cleaner and more credible than most hand-built freelancer websites and requires zero maintenance.",
      },
      {
        q: "Does Magic Self work for freelancers in non-tech fields?",
        a: "Absolutely. Magic Self works for freelancers in writing, editing, translation, consulting, accounting, legal, design, photography, coaching, and any other field. Any resume in any industry produces a professional result.",
      },
      {
        q: "Can I show my freelance client testimonials on my Magic Self portfolio?",
        a: "Include testimonial quotes in your resume (for example in a summary or dedicated section) and Magic Self will extract and display them on your portfolio page.",
      },
    ],
    keywords: [
      "freelancer portfolio website free",
      "freelance portfolio builder",
      "freelancer personal website free",
      "free portfolio for freelancers",
      "freelance resume to website",
      "contractor portfolio website",
      "independent contractor personal website",
      "best free portfolio site freelancers",
    ],
  },
];

export function getAudience(slug: string): AudienceData | undefined {
  return audiences.find((a) => a.slug === slug);
}

export function getAllAudienceSlugs(): string[] {
  return audiences.map((a) => a.slug);
}
