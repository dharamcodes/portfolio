import resumeData from "@/data/resume.json";
import { FullPageScroller, MuiMobileApp } from "@/components";
import {
  HeroSection,
  ExperienceSection,
  SkillsSection,
  ProjectsSection,
  BlogsSection,
  EducationSection,
  ContactSection,
} from "@/components/sections";

export default function Home() {
  const { personal, contact, skills, experience, projects, education, blogs } = resumeData;
  
  return (
    <>
      <div className="desktop-only-wrapper">
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
      </div>
      <div className="mobile-only-wrapper">
        <MuiMobileApp
          personalInfo={personal}
          contactInfo={contact}
          experience={experience}
          skills={skills}
          projects={projects}
          blogs={blogs}
          education={education}
        />
      </div>
    </>
  );
}
