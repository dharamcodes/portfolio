import Image from "next/image";
import resumeData from "../data/resume.json";
import { ThemeToggle } from "../components/ThemeToggle";

export default function Home() {
  const { personal, contact, skills, experience, projects, education, blogs } = resumeData;

  return (
    <>
      <div className="bg-blob"></div>
      <div className="bg-blob-2"></div>

      <header className="header">
        <div className="container">
          <div className="logo">dharam<span className="gradient-text">.dev</span></div>
          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#blogs">Blogs</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main>
        <section id="about" className="hero container fade-in">
          <div className="hero-content">
            <div className="hero-text">
              <h1>{personal.name.split(' ')[0]} <span className="gradient-text">{personal.name.split(' ').slice(1).join(' ')}</span></h1>
              <p>{personal.summary}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#experience" className="btn btn-primary">View Experience</a>
                <a href="/Resume_Dharmendra.pdf" download="Resume_Dharmendra.pdf" className="btn btn-secondary glass">📄 Resume</a>
                <a href="#contact" className="btn btn-secondary glass">Contact Me</a>
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
                  <a href={project.url} className="btn btn-secondary" style={{width: 'fit-content'}}>GitHub</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="blogs" className="section container">
          <h2 className="section-title">Technical <span className="gradient-text">Publications</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {blogs.map((blog, index) => (
              <a 
                key={index} 
                href={blog.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="education-card"
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{blog.date}</span>
                    <span style={{ padding: '0.2rem 0.6rem', background: 'rgba(99, 102, 241, 0.08)', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-2)' }}>{blog.readingTime}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 700, lineHeight: 1.4 }}>{blog.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>{blog.summary}</p>
                </div>
                <span className="gradient-text" style={{ fontWeight: 600, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  Read on Medium ↗
                </span>
              </a>
            ))}
          </div>
        </section>

        <section id="education" className="section container">
          <h2 className="section-title">Education & <span className="gradient-text">Certifications</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
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
            <a href={`mailto:${contact.email}`} className="btn btn-primary" style={{padding: '1rem 2rem', fontSize: '1.1rem'}}>Email Me</a>
            <a href={contact.linkedin} className="btn btn-secondary glass" style={{padding: '1rem 2rem', fontSize: '1.1rem'}}>LinkedIn</a>
            <a href={contact.github} className="btn btn-secondary glass" style={{padding: '1rem 2rem', fontSize: '1.1rem'}}>GitHub</a>
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
