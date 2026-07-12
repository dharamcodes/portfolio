"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import styles from "./Header.module.css";

interface HeaderProps {
  name: string;
  activeSectionId?: string;
  onNavClick?: (index: number) => void;
}

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "blogs", label: "Blogs" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function Header({ name, activeSectionId, onNavClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    if (onNavClick) {
      e.preventDefault();
      onNavClick(index);
    }
    closeMenu();
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.logo} onClick={closeMenu} style={{ cursor: "pointer" }} aria-label={`${name} portfolio homepage`}>
          dharam<span className="gradient-text">.dev</span>
        </div>

        {/* Desktop Navigation */}
        <nav className={`${styles['nav-links']} ${styles['desktop-nav']}`} aria-label="Desktop navigation">
          {SECTIONS.map((sec, idx) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className={activeSectionId === sec.id ? styles.active : ""}
              onClick={(e) => handleNavClick(e, idx)}
            >
              {sec.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
          onClick={toggleMenu}
          aria-label={isOpen ? "Close main navigation menu" : "Open main navigation menu"}
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Navigation Overlay */}
        <div className={`${styles['mobile-nav-overlay']} ${isOpen ? styles.active : ""}`} aria-hidden={!isOpen}>
          <nav className={styles['mobile-nav-links']} aria-label="Mobile navigation">
            {SECTIONS.map((sec, idx) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={activeSectionId === sec.id ? styles.active : ""}
                onClick={(e) => handleNavClick(e, idx)}
              >
                {sec.label}
              </a>
            ))}
            <div className={styles['mobile-theme-toggle']} onClick={closeMenu}>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
