import Image from "next/image";
import resumeData from "../data/resume.json";
import { Header } from "../components/Header";

export default function Home() {
  const { personal, contact, skills, experience, projects, education, blogs } = resumeData;

  return (
    <>
      <div className="bg-blob"></div>
      <div className="bg-blob-2"></div>

      <Header name={personal.name} />

      <main>
        <section id="about" className="hero container fade-in">
          <div className="hero-content">
            <div className="hero-text">
              <h1>{personal.name.split(' ')[0]} <span className="gradient-text">{personal.name.split(' ').slice(1).join(' ')}</span></h1>
              <p>{personal.summary}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#experience" className="btn btn-primary">View Experience</a>
                <a href="/Resume_Dharmendra.pdf" download="Resume_Dharmendra.pdf" className="btn btn-resume">
                  <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Resume
                </a>
                <a href="#contact" className="btn btn-contact">
                  <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
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

        <section id="experience" className="section container">
          <h2 className="section-title">Professional <span className="gradient-text">Experience</span></h2>
          <div className="experience-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {experience.map((exp, index) => (
              <div key={index} className="experience-card glass">
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
        </section>

        <section id="skills" className="section container">
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
        </section>

        <section id="projects" className="section container">
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
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
                  <a href={project.url} className="project-link" target="_blank" rel="noopener noreferrer">
                    <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem' }}>
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="blogs" className="section container">
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
        </section>

        <section id="education" className="section container">
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
        </section>

        <section id="contact" className="section container" style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto'}}>
          <h2 className="section-title">Let's <span className="gradient-text">Connect</span></h2>
          <p style={{color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.2rem', lineHeight: '1.6'}}>
            I'm currently open for new opportunities to build scalable backend systems and distributed platforms. Feel free to reach out via email or LinkedIn!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`mailto:${contact.email}`} className="btn btn-contact">
              <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Email Me
            </a>
            <a href={contact.linkedin} className="btn btn-linkedin" target="_blank" rel="noopener noreferrer">
              <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
            <a href={contact.github} className="btn btn-github-social" target="_blank" rel="noopener noreferrer">
              <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} {personal.name}. Built with Next.js.</p>
        </div>
      </footer>
    </>
  );
}
