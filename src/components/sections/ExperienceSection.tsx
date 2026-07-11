"use client";

import { useState } from "react";

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  duration: string;
  bullets: string[];
}

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export function ExperienceSection({
  experience,
}: ExperienceSectionProps) {
  const [activeExpIndex, setActiveExpIndex] = useState(0);

  return (
    <div className="container slide-inner" style={{ width: "100%" }} aria-label="Professional Experience">
      <h2 className="section-title">
        Professional <span className="gradient-text">Experience</span>
      </h2>
      <div className="experience-tab-container">
        <div className="experience-tabs" role="tablist" aria-label="Experience tabs">
          {experience.map((exp, i) => (
            <button
              key={i}
              className={`experience-tab-btn${i === activeExpIndex ? " active" : ""}`}
              onClick={() => setActiveExpIndex(i)}
              role="tab"
              aria-selected={i === activeExpIndex}
              aria-controls={`exp-details-${i}`}
              id={`exp-tab-${i}`}
            >
              <span className="exp-tab-company">{exp.company.split(" ")[0]}</span>
              <span className="exp-tab-period">{exp.duration.split(" – ")[1] ?? exp.duration}</span>
            </button>
          ))}
        </div>

        <div className="scrollable-content experience-details-wrapper glass">
          {experience.map((exp, i) => {
            const isActive = i === activeExpIndex;
            return (
              <div
                key={i}
                id={`exp-details-${i}`}
                className={`experience-tab-details ${isActive ? "active" : "inactive"}`}
                itemScope
                itemType="https://schema.org/WorkExperience"
                role="tabpanel"
                aria-labelledby={`exp-tab-${i}`}
                aria-hidden={!isActive}
              >
                <div className="exp-detail-header">
                  <div>
                    <h3 className="exp-detail-role">
                      {exp.role}{" "}
                      <span className="gradient-text">@ {exp.company}</span>
                    </h3>
                    <p className="exp-detail-location">{exp.location}</p>
                  </div>
                  <span className="exp-detail-duration">{exp.duration}</span>
                </div>
                <ul className="experience-bullets">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
