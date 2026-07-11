import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import resumeData from "@/data/resume.json";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dharam.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${resumeData.personal.name} | ${resumeData.personal.role} & Senior Software Engineer – Software Developer`,
    template: `%s | ${resumeData.personal.name}`,
  },
  description: resumeData.personal.summary,
  keywords: [
    resumeData.personal.name,
    resumeData.personal.role,
    "Lead Engineer",
    "Senior Software Engineer",
    "Software Developer",
    "Backend Developer",
    "Java Developer",
    "Java",
    "Spring Boot",
    "Kafka",
    "AWS",
    "Microservices",
    "Distributed Systems",
    "System Design",
    "dharamcodes",
    "LLM",
    "Deep Learning",
    "Machine Learning",
    "AI/ML",
    "Artificial Intelligence",
    "NLP",
    "Transformers",
  ],
  authors: [{ name: resumeData.personal.name, url: BASE_URL }],
  creator: resumeData.personal.name,
  publisher: resumeData.personal.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: BASE_URL,
    siteName: `${resumeData.personal.name} – Portfolio`,
    title: `${resumeData.personal.name} | ${resumeData.personal.role} & Senior Software Engineer`,
    description: resumeData.personal.summary,
    images: [
      {
        url: `${BASE_URL}${resumeData.personal.profileImage}`,
        width: 800,
        height: 800,
        alt: `${resumeData.personal.name} – ${resumeData.personal.role}`,
      },
    ],
    firstName: resumeData.personal.name.split(" ")[0],
    lastName: resumeData.personal.name.split(" ").slice(1).join(" "),
    username: "dharamcodes",
    gender: "male",
  },
  twitter: {
    card: "summary_large_image",
    title: `${resumeData.personal.name} | ${resumeData.personal.role} & Senior Software Engineer`,
    description: resumeData.personal.summary,
    images: [`${BASE_URL}${resumeData.personal.profileImage}`],
    creator: "@dharamcodes",
  },
  category: "technology",
  classification: "Software Engineering Portfolio",
  other: {
    "profile:first_name": resumeData.personal.name.split(" ")[0],
    "profile:last_name": resumeData.personal.name.split(" ").slice(1).join(" "),
    "profile:username": "dharamcodes",
  },
};

// Compile Skills list for knowsAbout
const allSkills = Object.values(resumeData.skills).flat();

// Dynamic Schema.org Graph Payload (optimized for Google Rich Results and LLM ingestion)
const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      "name": resumeData.personal.name,
      "alternateName": ["dharamcodes", "Dharmendra Awasthi"],
      "url": BASE_URL,
      "image": `${BASE_URL}${resumeData.personal.profileImage}`,
      "email": resumeData.contact.email,
      "telephone": resumeData.contact.phone,
      "jobTitle": resumeData.personal.role,
      "description": resumeData.personal.summary,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "addressCountry": "IN",
      },
      "sameAs": [
        resumeData.contact.linkedin,
        resumeData.contact.github,
        "https://medium.com/@dharam.codes",
      ],
      "alumniOf": resumeData.education.map((edu) => ({
        "@type": "EducationalOrganization",
        "name": edu.institution,
      })),
      "knowsAbout": allSkills,
      "hasOccupation": resumeData.experience.map((exp) => ({
        "@type": "Occupation",
        "name": exp.role,
        "skills": exp.bullets.join(" "),
        "occupationLocation": {
          "@type": "City",
          "name": exp.location,
        },
      })),
      "worksFor": {
        "@type": "Organization",
        "name": resumeData.experience[0]?.company || "Luxoft",
      },
    },
    // Map individual projects
    ...resumeData.projects.map((proj) => ({
      "@type": "SoftwareSourceCode",
      "@id": `${BASE_URL}/#project-${proj.title.toLowerCase()}`,
      "name": proj.title,
      "description": proj.description,
      "codeRepository": proj.url,
      "programmingLanguage": proj.tags,
      "author": { "@id": `${BASE_URL}/#person` },
    })),
    // Map blog publications
    ...resumeData.blogs.map((blog, idx) => ({
      "@type": "BlogPosting",
      "@id": `${BASE_URL}/#blog-${idx}`,
      "headline": blog.title,
      "url": blog.url,
      "datePublished": new Date(blog.date).toISOString().split("T")[0],
      "description": blog.summary,
      "author": { "@id": `${BASE_URL}/#person` },
    })),
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f0f1a" />
        <meta name="msapplication-TileColor" content="#0f0f1a" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bengaluru, Karnataka, India" />
        <meta name="ICBM" content="12.9716, 77.5946" />
        <meta name="rating" content="general" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <link rel="canonical" href={BASE_URL} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-friendly Resume Summary" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="Full LLM CV" />
      </head>
      <body>
        <Script
          id="profile-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
          strategy="beforeInteractive"
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
