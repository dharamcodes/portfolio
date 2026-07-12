"use client";
import { useState } from "react";
import { Pagination } from "@/components/ui/Pagination";
import styles from "./Education.module.css";

interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
}

interface EducationProps {
  education: EducationItem[];
}

const EDUCATION_PER_PAGE = 4;

export function Education({ education }: EducationProps) {
  const [educationPage, setEducationPage] = useState(1);

  const totalEducationPages = Math.ceil(education.length / EDUCATION_PER_PAGE);

  return (
    <div className="container slide-inner" style={{ width: "100%" }} aria-label="Education and Certifications">
      <h2 className="section-title">
        Education & <span className="gradient-text">Certifications</span>
      </h2>
      <div className={`scrollable-content ${styles['education-grid']}`} key={educationPage}>
        {education.map((edu, i) => {
          const pageIndex = Math.floor(i / EDUCATION_PER_PAGE) + 1;
          const isVisible = pageIndex === educationPage;
          return (
            <div key={i} className={`${styles['education-card']} education-card ${isVisible ? "" : styles['desktop-hidden']}`} role="article">
              <div className={styles['education-card-header']}>
                <div className={styles['edu-icon-wrapper']} aria-hidden="true">
                  <span className={styles['edu-icon']}>🎓</span>
                </div>
                <div className={styles['edu-content']}>
                  <h3>{edu.degree}</h3>
                  <p>{edu.institution}</p>
                </div>
              </div>
              <div className={styles['edu-footer']}>
                <span className={styles['edu-duration']}>{edu.duration}</span>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination
        currentPage={educationPage}
        totalPages={totalEducationPages}
        onPageChange={setEducationPage}
      />
    </div>
  );
}
