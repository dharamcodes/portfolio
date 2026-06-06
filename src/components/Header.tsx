"use client";

import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  name: string;
}

export function Header({ name }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
      <div className="container">
        <div className="logo" onClick={closeMenu} style={{ cursor: "pointer" }} aria-label={`${name} portfolio homepage`}>
          dharam<span className="gradient-text">.dev</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="nav-links desktop-nav">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#blogs">Blogs</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
          <ThemeToggle />
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          className={`hamburger ${isOpen ? "open" : ""}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Navigation Overlay */}
        <div className={`mobile-nav-overlay ${isOpen ? "active" : ""}`}>
          <nav className="mobile-nav-links">
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#experience" onClick={closeMenu}>Experience</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href="#blogs" onClick={closeMenu}>Blogs</a>
            <a href="#education" onClick={closeMenu}>Education</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
            <div className="mobile-theme-toggle" onClick={closeMenu}>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
