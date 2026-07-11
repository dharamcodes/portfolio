import resumeData from "@/data/resume.json";
import { FullPageScroller } from "@/components";
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
