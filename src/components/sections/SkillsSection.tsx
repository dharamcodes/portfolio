"use client";

import { useState } from "react";
import styles from "./SkillsSection.module.css";

interface SkillsSectionProps {
  skills: Record<string, string[]>;
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [selectedSkillCat, setSelectedSkillCat] = useState("All");

  return (
    <div className="container slide-inner" style={{ width: "100%" }} aria-label="Technical Skills">
      <h2 className="section-title">
        Technical <span className="gradient-text">Arsenal</span>
        <span className="scroll-hint-badge">Swipe ↔</span>
      </h2>

      {/* Category Filter Tabs */}
      <div className={styles['skills-filter-bar']} role="tablist" aria-label="Skills filter categories">
        {["All", ...Object.keys(skills)].map((cat) => (
          <button
            key={cat}
            className={`${styles['skills-filter-btn']}${selectedSkillCat === cat ? ` ${styles.active}` : ""}`}
            onClick={() => setSelectedSkillCat(cat)}
            role="tab"
            aria-selected={selectedSkillCat === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Unified Skills Grid */}
      <div className={`scrollable-content ${styles['skills-unified-grid']}`}>
        {Object.entries(skills).flatMap(([category, skillList]) =>
          skillList.map((skill) => {
            const isHidden = selectedSkillCat !== "All" && selectedSkillCat !== category;
            return (
              <div
                key={skill}
                className={`${styles['skill-badge-card']} glass ${isHidden ? styles.dimmed : styles.active}`}
                data-category={category}
              >
                <span className={styles['category-dot']} aria-hidden="true" />
                <span className="skill-name">{skill}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
