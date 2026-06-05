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
    default: "Dharmendra Awasthi | Senior Software Engineer – Java, Spring Boot, Kafka, AWS",
    template: "%s | Dharmendra Awasthi",
  },
  description:
    "Dharmendra Awasthi is a Senior Software Engineer and Tech Lead with 9+ years of experience building large-scale distributed systems, cloud-native microservices, and high-throughput backend platforms. Expert in Java, Spring Boot, Kafka, AWS, Kubernetes, and Microservices Architecture. Open to Senior Engineer, Staff Engineer, and Tech Lead roles.",
  keywords: [
    // Core identity
    "Dharmendra Awasthi",
    "dharamcodes",
    "Senior Software Engineer",
    "Tech Lead",
    "Backend Engineer",
    "Software Developer",
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
    title: "Dharmendra Awasthi | Senior Software Engineer – Java, Spring Boot, Kafka, AWS",
    description:
      "9+ years building high-throughput distributed systems and cloud-native microservices. Expert in Java, Spring Boot, Kafka, AWS, Kubernetes. Currently a Tech Lead at Luxoft (client: Tesco). Open to Senior/Staff Engineer and Tech Lead opportunities.",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 800,
        alt: "Dharmendra Awasthi – Senior Software Engineer & Tech Lead",
      },
    ],
    firstName: "Dharmendra",
    lastName: "Awasthi",
    username: "dharamcodes",
    gender: "male",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dharmendra Awasthi | Senior Software Engineer – Java, Kafka, AWS",
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

// JSON-LD structured data (Google Rich Results)
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dharmendra Awasthi",
  alternateName: "dharamcodes",
  url: BASE_URL,
  image: `${BASE_URL}/profile.png`,
  email: "er.dharamk@gmail.com",
  telephone: "+91-9454318045",
  jobTitle: "Senior Software Engineer / Tech Lead",
  description:
    "Senior Software Engineer and Tech Lead with 9+ years of experience in Java, Spring Boot, Kafka, AWS, and large-scale distributed microservices architecture.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/in/dharamcodes",
    "https://github.com/dharamcodes",
    "https://medium.com/@dharam.codes",
  ],
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "National Institute of Technology (NIT) Nagpur",
    },
    {
      "@type": "EducationalOrganization",
      name: "CDAC Hyderabad",
    },
  ],
  knowsAbout: [
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
    "System Design",
    "Event-Driven Architecture",
    "CQRS",
    "Domain-Driven Design",
    "CI/CD",
    "DevOps",
    "gRPC",
    "REST APIs",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Senior Software Engineer",
    occupationLocation: {
      "@type": "City",
      name: "Bengaluru, India",
    },
    estimatedSalary: {
      "@type": "MonetaryAmountDistribution",
      name: "base",
      currency: "INR",
      duration: "P1Y",
      percentile10: "2400000",
      percentile50: "3600000",
      percentile90: "5000000",
    },
    skills:
      "Java, Spring Boot, Kafka, AWS, Kubernetes, Microservices, Distributed Systems, System Design",
  },
  worksFor: {
    "@type": "Organization",
    name: "Luxoft",
  },
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
          id="person-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
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

