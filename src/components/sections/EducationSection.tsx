"use client";

import { useState, useMemo } from "react";
import { Pagination } from "../Pagination";

interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
}

interface EducationSectionProps {
  education: EducationItem[];
}

const EDUCATION_PER_PAGE = 4;

export function EducationSection({ education }: EducationSectionProps) {
  const [educationPage, setEducationPage] = useState(1);

  const totalEducationPages = Math.ceil(education.length / EDUCATION_PER_PAGE);
  const paginatedEducation = useMemo(() => {
    return education.slice(
      (educationPage - 1) * EDUCATION_PER_PAGE,
      educationPage * EDUCATION_PER_PAGE
    );
  }, [education, educationPage]);

  return (
    <div className="container slide-inner" style={{ width: "100%" }} aria-label="Education and Certifications">
      <h2 className="section-title">
        Education & <span className="gradient-text">Certifications</span>
      </h2>
      <div className="scrollable-content education-grid" key={educationPage}>
        {paginatedEducation.map((edu, i) => (
          <div key={i} className="education-card" role="article">
            <div className="education-card-header">
              <div className="edu-icon-wrapper" aria-hidden="true">
                <span className="edu-icon">🎓</span>
              </div>
              <div className="edu-content">
                <h3>{edu.degree}</h3>
                <p>{edu.institution}</p>
              </div>
            </div>
            <div className="edu-footer">
              <span className="edu-duration">{edu.duration}</span>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={educationPage}
        totalPages={totalEducationPages}
        onPageChange={setEducationPage}
      />
    </div>
  );
}
