"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import resumeData from "../data/resume.json";
import { Header } from "../components/Header";

const SECTION_IDS = ["about", "experience", "skills", "projects", "blogs", "education", "contact"];

export default function Home() {
  const { personal, contact, skills, experience, projects, education, blogs } = resumeData;
  const [activeIndex, setActiveIndex] = useState(0);
  const isTransitioning = useRef(false);
  const touchStart = useRef(0);

  // Synchronize state with URL hash updates
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      const idx = SECTION_IDS.indexOf(hash);
      if (idx !== -1 && idx !== activeIndex) {
        setActiveIndex(idx);
      }
    };

    window.addEventListener("hashchange", handleHash);
    handleHash(); // Run on mount

    return () => window.removeEventListener("hashchange", handleHash);
  }, [activeIndex]);

  const navigate = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= SECTION_IDS.length || isTransitioning.current) return;
    isTransitioning.current = true;
    setActiveIndex(newIndex);
    
    // Update hash which updates history
    window.location.hash = SECTION_IDS[newIndex];
    
    setTimeout(() => {
      isTransitioning.current = false;
    }, 900); // matches the 0.9s transition in CSS
  };

  // Intercept scroll wheel events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const scrollable = target.closest(".scrollable-content") as HTMLElement | null;

      if (scrollable) {
        const isScrollingDown = e.deltaY > 0;
        const isScrollingUp = e.deltaY < 0;
        const isScrollable = scrollable.scrollHeight > scrollable.clientHeight;

        if (isScrollable) {
          // If scrolling down and content remains below
          if (isScrollingDown && scrollable.scrollHeight - scrollable.scrollTop > scrollable.clientHeight + 10) {
            return; // Let native scroll happen
          }
          // If scrolling up and content remains above
          if (isScrollingUp && scrollable.scrollTop > 10) {
            return; // Let native scroll happen
          }
        }
      }

      e.preventDefault();
      if (e.deltaY > 30) {
        navigate(activeIndex + 1);
      } else if (e.deltaY < -30) {
        navigate(activeIndex - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex]);

  // Intercept touch swipe events (for mobile)
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const scrollable = target.closest(".scrollable-content") as HTMLElement | null;

      if (scrollable) {
        const isScrollable = scrollable.scrollHeight > scrollable.clientHeight;
        if (isScrollable) {
          // Let mobile users scroll native scrollable areas
          return;
        }
      }

      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStart.current - touchEnd;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          navigate(activeIndex + 1);
        } else {
          navigate(activeIndex - 1);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeIndex]);

  // Helper to resolve CSS sliding layout classes
  const getSlideClass = (index: number) => {
    if (index === activeIndex) return "active";
    return index < activeIndex ? "slide-left" : "slide-right";
  };

  return (
    <>
      <div className="bg-blob"></div>
      <div className="bg-blob-2"></div>

      <Header name={personal.name} />

      <main className="fullpage-container" itemScope itemType="https://schema.org/Person">
        {/* Hidden SEO meta content for crawlers */}
        <meta itemProp="name" content="Dharmendra Awasthi" />
        <meta itemProp="jobTitle" content="Lead Engineer / Senior Software Engineer" />
        <meta itemProp="email" content="er.dharamk@gmail.com" />
        <meta itemProp="telephone" content="+91-9454318045" />
        <meta itemProp="url" content="https://dharam.dev" />
        <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress" style={{ display: 'none' }}>
          <meta itemProp="addressLocality" content="Bengaluru" />
          <meta itemProp="addressRegion" content="Karnataka" />
          <meta itemProp="addressCountry" content="IN" />
        </span>

        {/* SECTION 1: ABOUT (HERO) */}
        <section id="about" className={`fullpage-slide ${getSlideClass(0)} hero container`} aria-label={`About ${personal.name}`}>
          <div className="scrollable-content hero-content">
            <div className="hero-text">
              <h1>{personal.name.split(' ')[0]} <span className="gradient-text">{personal.name.split(' ').slice(1).join(' ')}</span></h1>
              <p className="hero-role">
                ( Lead Engineer ) 
              </p>
              <p>{personal.summary}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#experience" className="btn btn-primary">View Experience</a>
                <a href="/Resume_Dharmendra.pdf" download="Resume_Dharmendra.pdf" className="btn btn-resume">
                  <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Resume
                </a>
                <a href="#contact" className="btn btn-contact">
                  <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Contact Me
                </a>
              </div>
            </div>
            <div className="hero-image-wrapper">
              <div className="hero-image-glow"></div>
              <Image 
                src="/profile-light.png" 
                alt={`${personal.name} Profile Picture (Light Theme)`} 
                width={400} 
                height={400} 
                className="hero-image glass show-light"
                priority
              />
              <Image 
                src={personal.profileImage} 
                alt={`${personal.name} Profile Picture (Dark Theme)`} 
                width={400} 
                height={400} 
                className="hero-image glass show-dark"
                priority
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: EXPERIENCE */}
        <section id="experience" className={`fullpage-slide ${getSlideClass(1)} section container`} aria-label="Professional Experience">
          <div className="scrollable-content">
            <h2 className="section-title">Professional <span className="gradient-text">Experience</span></h2>
            <div className="experience-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {experience.map((exp, index) => (
                <div key={index} className="experience-card glass" itemScope itemType="https://schema.org/WorkExperience">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.4rem', margin: 0, fontWeight: 700 }}>{exp.role} <span className="gradient-text">@ {exp.company}</span></h3>
                      <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>{exp.location}</p>
                    </div>
                    <span style={{ color: 'var(--accent-2)', fontWeight: 600, fontSize: '0.95rem' }}>{exp.duration}</span>
                  </div>
                  <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, paddingLeft: '1.2rem', margin: 0 }}>
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} style={{ marginBottom: '0.6rem' }}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: SKILLS */}
        <section id="skills" className={`fullpage-slide ${getSlideClass(2)} section container`} aria-label="Technical Skills">
          <div className="scrollable-content">
            <h2 className="section-title">Technical <span className="gradient-text">Arsenal</span></h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {Object.entries(skills).map(([category, skillList], index) => (
                <div key={index}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-1)', fontWeight: 600 }}>{category}</h3>
                  <div className="skills-grid" style={{ justifyContent: 'flex-start' }}>
                    {skillList.map(skill => (
                      <div key={skill} className="skill-tag">{skill}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: PROJECTS */}
        <section id="projects" className={`fullpage-slide ${getSlideClass(3)} section container`} aria-label="Featured Projects">
          <div className="scrollable-content">
            <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <a key={index} href={project.url} target="_blank" rel="noopener noreferrer" className="project-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="project-img-wrapper">
                    <div className="project-img-overlay">
                      <span className="project-img-overlay-text">
                        Explore Code
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </span>
                    </div>
                    <Image src={project.image} alt={project.title} width={600} height={400} className="project-img" />
                  </div>
                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                    <div className="project-tech">
                      {project.tags.map(tag => (
                        <span key={tag} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                    <span className="project-link">
                      <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      View on GitHub
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: BLOGS */}
        <section id="blogs" className={`fullpage-slide ${getSlideClass(4)} section container`} aria-label="Technical Blog Publications">
          <div className="scrollable-content">
            <h2 className="section-title">Technical <span className="gradient-text">Publications</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
              {blogs.map((blog, index) => (
                <a 
                  key={index} 
                  href={blog.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="blog-card"
                >
                  <div>
                    <div className="blog-card-meta">
                      <span className="blog-card-date">{blog.date}</span>
                      <span className="blog-card-time">{blog.readingTime}</span>
                    </div>
                    <h3 className="blog-card-title">{blog.title}</h3>
                    <p className="blog-card-desc">{blog.summary}</p>
                  </div>
                  <span className="blog-card-link">
                    Read on Medium <span className="arrow">↗</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: EDUCATION */}
        <section id="education" className={`fullpage-slide ${getSlideClass(5)} section container`} aria-label="Education and Certifications">
          <div className="scrollable-content">
            <h2 className="section-title">Education & <span className="gradient-text">Certifications</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {education.map((edu, index) => (
                <div key={index} className="education-card">
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>{edu.degree}</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1, lineHeight: 1.5 }}>{edu.institution}</p>
                  <span style={{ color: 'var(--accent-2)', fontWeight: 600, fontSize: '0.9rem' }}>{edu.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: CONTACT */}
        <section id="contact" className={`fullpage-slide ${getSlideClass(6)} section container`} style={{ maxWidth: '600px', margin: '0 auto' }} aria-label="Contact Information">
          <div className="scrollable-content" style={{ textAlign: 'center', width: '100%' }}>
            <h2 className="section-title">Let&apos;s <span className="gradient-text">Connect</span></h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.2rem', lineHeight: '1.6' }}>
              I&apos;m currently open for new opportunities to build scalable backend systems and distributed platforms. Feel free to reach out via email or LinkedIn!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <a href={`mailto:${contact.email}`} className="btn btn-contact">
                <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Email Me
              </a>
              <a href={contact.linkedin} className="btn btn-linkedin" target="_blank" rel="noopener noreferrer">
                <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
              <a href={contact.github} className="btn btn-github-social" target="_blank" rel="noopener noreferrer">
                <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                GitHub
              </a>
            </div>

            <footer className="footer" style={{ borderTop: 'none', background: 'transparent', padding: '1rem 0 0 0' }}>
              <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
                <p style={{ margin: 0 }}>© {new Date().getFullYear()} {personal.name}.</p>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', fontSize: '0.85rem' }}>
                  <a href="/privacy">Privacy Policy</a>
                </div>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
