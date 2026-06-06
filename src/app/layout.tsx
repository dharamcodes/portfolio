import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://dharamcodes.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Dharmendra Awasthi | Lead Engineer & Senior Software Engineer – Software Developer",
    template: "%s | Dharmendra Awasthi",
  },
  description:
    "Dharmendra Awasthi is a Lead Engineer, Senior Software Engineer, and Software Developer with 9+ years of experience building large-scale distributed systems, backend Java platforms, and cloud-native microservices. Expert in Java, Spring Boot, Kafka, AWS, Kubernetes, and Microservices Architecture. Open to Lead Engineer, Staff Engineer, and Senior Developer roles.",
  keywords: [
    // Core identity keywords
    "Dharmendra",
    "Dharmendra Awasthi",
    "Awasthi",
    "dharamcodes",
    "Lead Engineer",
    "Software Developer",
    "Senior Software Engineer",
    "Backend Developer",
    "Tech Lead",
    "Backend Engineer",
    "Full Stack Engineer",
    // Technologies (primary)
    "Java",
    "Spring Boot",
    "Spring Cloud",
    "Kafka",
    "AWS",
    "Microservices",
    "Distributed Systems",
    "Cloud Native",
    "REST API",
    "gRPC",
    // Technologies (secondary)
    "Kubernetes",
    "Docker",
    "Redis",
    "PostgreSQL",
    "MongoDB",
    "Elasticsearch",
    "Hibernate",
    "JUnit",
    "Terraform",
    "Jenkins",
    "CI/CD",
    "DevOps",
    // Architecture
    "Event-Driven Architecture",
    "CQRS",
    "Saga Pattern",
    "Domain-Driven Design",
    "System Design",
    "HLD",
    "LLD",
    "High Level Design",
    "Low Level Design",
    // Observability
    "Prometheus",
    "Grafana",
    "ELK Stack",
    "Splunk",
    "Distributed Tracing",
    "Zipkin",
    // Domains
    "Telecom Software Engineer",
    "Fintech Engineer",
    "Retail Tech",
    "Gaming Backend Engineer",
    // Role targets (HR/Recruiter searches)
    "Lead Engineer India",
    "Software Developer Bengaluru",
    "Senior Software Engineer India",
    "Senior Java Developer Bengaluru",
    "Backend Engineer Bangalore",
    "Java Spring Boot Developer",
    "Microservices Engineer",
    "Kafka Engineer",
    "AWS Solutions Architect",
    "Tech Lead Backend",
    "Engineering Manager",
    "Staff Engineer",
    // Companies worked
    "Luxoft",
    "Ness Digital Engineering",
    "Airtel Africa",
    "Aristocrat Technologies",
    "Oracle",
    "CSG International",
    "Amdocs",
    "Tesco",
  ],
  authors: [{ name: "Dharmendra Awasthi", url: BASE_URL }],
  creator: "Dharmendra Awasthi",
  publisher: "Dharmendra Awasthi",
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
    siteName: "Dharmendra Awasthi – Portfolio",
    title: "Dharmendra Awasthi | Lead Engineer & Senior Software Engineer – Software Developer",
    description:
      "9+ years building high-throughput distributed systems and cloud-native microservices. Expert in Java, Spring Boot, Kafka, AWS, Kubernetes. Lead Engineer & Software Developer. Currently a Tech Lead @ Luxoft (client: Tesco).",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 800,
        alt: "Dharmendra Awasthi – Lead Engineer & Senior Software Engineer",
      },
    ],
    firstName: "Dharmendra",
    lastName: "Awasthi",
    username: "dharamcodes",
    gender: "male",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dharmendra Awasthi | Lead Engineer & Senior Software Engineer",
    description:
      "9+ years building high-throughput distributed systems. Tech Lead @ Luxoft (Tesco). Expert: Java, Spring Boot, Kafka, AWS, Kubernetes, Microservices.",
    images: ["/profile.png"],
    creator: "@dharamcodes",
  },
  category: "technology",
  classification: "Software Engineering Portfolio",
  other: {
    "profile:first_name": "Dharmendra",
    "profile:last_name": "Awasthi",
    "profile:username": "dharamcodes",
  },
};

// JSON-LD structured data (Google Rich Results & LLM indexing)
const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "url": BASE_URL,
  "mainEntity": {
    "@type": "Person",
    "name": "Dharmendra Awasthi",
    "alternateName": ["Dharmendra", "Awasthi", "dharamcodes"],
    "url": BASE_URL,
    "image": `${BASE_URL}/profile.png`,
    "email": "er.dharamk@gmail.com",
    "telephone": "+91-9454318045",
    "jobTitle": "Lead Engineer / Senior Software Engineer",
    "description":
      "Lead Engineer, Senior Software Engineer, and Software Developer with 9+ years of experience in Java, Spring Boot, Kafka, AWS, and large-scale distributed microservices architecture.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "addressCountry": "IN",
    },
    "sameAs": [
      "https://www.linkedin.com/in/dharamcodes/",
      "https://github.com/dharamcodes",
      "https://medium.com/@dharam.codes",
    ],
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "National Institute of Technology (NIT) Nagpur",
      },
      {
        "@type": "EducationalOrganization",
        "name": "CDAC Hyderabad",
      },
    ],
    "knowsAbout": [
      "Software Development",
      "Software Engineering",
      "System Design",
      "Java",
      "Spring Boot",
      "Spring Cloud",
      "Apache Kafka",
      "AWS",
      "Microservices Architecture",
      "Distributed Systems",
      "Kubernetes",
      "Docker",
      "Redis",
      "PostgreSQL",
      "MongoDB",
      "Event-Driven Architecture",
      "CQRS",
      "Domain-Driven Design",
      "CI/CD",
      "DevOps",
      "gRPC",
      "REST APIs",
    ],
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Lead Engineer",
        "occupationLocation": {
          "@type": "City",
          "name": "Bengaluru, India",
        },
        "skills":
          "Java, Spring Boot, Kafka, AWS, Kubernetes, Microservices, Distributed Systems, System Design, Team Leadership",
      },
      {
        "@type": "Occupation",
        "name": "Senior Software Engineer",
        "occupationLocation": {
          "@type": "City",
          "name": "Bengaluru, India",
        },
        "skills":
          "Java, Spring Boot, Kafka, AWS, Kubernetes, Microservices, Distributed Systems, System Design",
      },
      {
        "@type": "Occupation",
        "name": "Software Developer",
        "occupationLocation": {
          "@type": "City",
          "name": "Bengaluru, India",
        },
        "skills":
          "Java, Spring Boot, Kafka, AWS, Kubernetes, Microservices, Distributed Systems, System Design",
      }
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Luxoft",
    },
  }
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
      </head>
      <body>
        <Script
          id="profile-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
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

