"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import resumeData from "@/data/resume.json";
import {
  HeroSection,
  ExperienceSection,
  SkillsSection,
  ProjectsSection,
  BlogsSection,
  EducationSection,
  ContactSection,
} from "@/components/sections";

// Dynamic imports with ssr: false to split chunks
const FullPageScroller = dynamic(
  () => import("@/components/layout/FullPageScroller").then((mod) => mod.FullPageScroller),
  { ssr: false }
);

const MuiMobileApp = dynamic(
  () => import("@/components/layout/MuiMobileApp").then((mod) => mod.MuiMobileApp),
  { ssr: false }
);

export default function Home() {
  const { personal, contact, skills, experience, projects, education, blogs } = resumeData;
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile === null) {
    // Static SSR Fallback: Render structural skeleton for SEO search indexing 
    // and to avoid initial hydration flickers on page load.
    return (
      <div className="desktop-only-wrapper" style={{ opacity: 0.1 }}>
        <div className="container" style={{ paddingTop: "120px" }}>
          <HeroSection personal={personal} />
        </div>
      </div>
    );
  }

  return isMobile ? (
    <MuiMobileApp
      personalInfo={personal}
      contactInfo={contact}
      experience={experience}
      skills={skills}
      projects={projects}
      blogs={blogs}
      education={education}
    />
  ) : (
    <FullPageScroller name={personal.name}>
      {/* ── ABOUT ── */}
      <HeroSection personal={personal} />

      {/* ── EXPERIENCE ── */}
      <ExperienceSection experience={experience} />

      {/* ── SKILLS ── */}
      <SkillsSection skills={skills} />

      {/* ── PROJECTS ── */}
      <ProjectsSection projects={projects} />

      {/* ── BLOGS ── */}
      <BlogsSection blogs={blogs} />

      {/* ── EDUCATION ── */}
      <EducationSection education={education} />

      {/* ── CONTACT ── */}
      <ContactSection contact={contact} />
    </FullPageScroller>
  );
}
