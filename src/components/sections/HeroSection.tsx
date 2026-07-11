import Image from "next/image";

interface HeroSectionProps {
  personal: {
    name: string;
    role: string;
    summary: string;
    profileImage: string;
  };
}

export function HeroSection({ personal }: HeroSectionProps) {
  return (
    <div className="container hero-content slide-inner" aria-label={`About ${personal.name}`}>
      <div className="hero-text">
        <div className="hero-badge">Available for new roles</div>
        <h1>
          {personal.name.split(" ")[0]}{" "}
          <span className="gradient-text">{personal.name.split(" ").slice(1).join(" ")}</span>
        </h1>
        <p className="hero-role">Lead Engineer · Backend Systems · Distributed Architecture</p>
        <p>{personal.summary}</p>
        <div className="hero-cta-row" suppressHydrationWarning>
          <a href="#experience" className="btn btn-primary">View Experience</a>
          <a href="/Resume_Dharmendra.pdf" download="Resume_Dharmendra.pdf" className="btn btn-resume">
            <svg className="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </a>
          <a href="#contact" className="btn btn-contact">
            <svg className="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Contact Me
          </a>
        </div>
      </div>
      <div className="hero-image-wrapper">
        <div className="hero-image-glow" />
        <Image src="/profile-light.png" alt={`${personal.name} Profile`} width={400} height={400} className="hero-image glass show-light" priority />
        <Image src={personal.profileImage} alt={`${personal.name} Profile`} width={400} height={400} className="hero-image glass show-dark" priority />
      </div>
    </div>
  );
}
