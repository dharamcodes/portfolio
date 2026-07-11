import resumeData from "../data/resume.json";
import { FullPageScroller } from "../components/FullPageScroller";
import { HeroSection } from "../components/sections/HeroSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { BlogsSection } from "../components/sections/BlogsSection";
import { EducationSection } from "../components/sections/EducationSection";
import { ContactSection } from "../components/sections/ContactSection";

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
