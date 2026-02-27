export interface Competitor {
  slug: string;
  name: string;
  description: string;
  pricing: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  url: string;
}

export const competitors: Record<string, Competitor> = {
  linkedin: {
    slug: "linkedin",
    name: "LinkedIn Profile",
    description:
      "The world's largest professional network with 1 billion+ members. Your LinkedIn profile is often the first thing recruiters see.",
    pricing: "Free basic, Premium from $29.99/month",
    pros: [
      "1 billion+ member network",
      "Recruiter visibility built-in",
      "InMail messaging",
      "Job board integration",
      "Endorsements and recommendations",
    ],
    cons: [
      "You don't own your URL fully",
      "Algorithm controls your visibility",
      "No custom design",
      "Content controlled by LinkedIn",
      "Privacy concerns",
      "Not indexed well by Google for personal name searches",
    ],
    bestFor:
      "Networking, job applications through LinkedIn, connecting with industry peers",
    url: "https://linkedin.com",
  },
  "about-me": {
    slug: "about-me",
    name: "About.me",
    description:
      "A simple personal page builder focused on creating a single-page online presence with social links.",
    pricing: "Free basic, Pro from $6.99/month",
    pros: [
      "Simple setup",
      "Clean design",
      "Social link aggregation",
      "Mobile responsive",
    ],
    cons: [
      "Very limited customization on free plan",
      "No AI-powered content generation",
      "Generic templates",
      "No resume parsing",
      "Branding on free tier",
      "Limited SEO optimization",
    ],
    bestFor: "Simple link-in-bio style pages, social media profiles",
    url: "https://about.me",
  },
  carrd: {
    slug: "carrd",
    name: "Carrd",
    description:
      "A lightweight one-page website builder popular for personal sites, landing pages, and portfolios.",
    pricing: "Free (3 sites with limitations), Pro from $9/year",
    pros: [
      "Extremely affordable Pro plan",
      "Clean minimal design",
      "Custom domain support",
      "Good performance",
    ],
    cons: [
      "Manual data entry required",
      "No AI content generation",
      "Limited to 1 page on free",
      "No resume parsing",
      "Requires design skill",
      "No structured career data",
    ],
    bestFor: "Simple landing pages, link aggregators, minimal personal sites",
    url: "https://carrd.co",
  },
  "read-cv": {
    slug: "read-cv",
    name: "Read.cv",
    description:
      "A professional portfolio platform focused on clean, minimal CV presentation for creators and professionals.",
    pricing: "Free",
    pros: [
      "Beautiful minimal design",
      "Community discovery",
      "Clean URL structure",
      "Good for creatives",
    ],
    cons: [
      "Manual data entry",
      "No AI parsing",
      "Limited customization",
      "Less SEO-focused",
      "Smaller network than LinkedIn",
    ],
    bestFor: "Designers, creatives, people who value minimal aesthetic",
    url: "https://read.cv",
  },
  notion: {
    slug: "notion",
    name: "Notion Portfolio",
    description:
      "Using Notion's public pages feature to create a portfolio or personal site with the Notion workspace.",
    pricing: "Free with Notion account",
    pros: [
      "Flexible content blocks",
      "Easy to edit",
      "Free with existing Notion",
      "Can be very detailed",
    ],
    cons: [
      "Not designed for portfolios",
      "No custom domain on free",
      "Notion branding visible",
      "No AI resume parsing",
      "Poor SEO out of the box",
      "Slow load times",
      "Not professional-looking by default",
    ],
    bestFor: "Existing Notion users who want a quick internal-style page",
    url: "https://notion.so",
  },
};
