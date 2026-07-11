"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Pagination } from "../Pagination";

interface ProjectItem {
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
}

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

const PROJECTS_PER_PAGE = 3;

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [projectsPage, setProjectsPage] = useState(1);

  const totalProjectsPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    return projects.slice(
      (projectsPage - 1) * PROJECTS_PER_PAGE,
      projectsPage * PROJECTS_PER_PAGE
    );
  }, [projects, projectsPage]);

  return (
    <div className="container slide-inner" style={{ width: "100%" }} aria-label="Featured Projects">
      <h2 className="section-title">
        Featured <span className="gradient-text">Projects</span>
      </h2>
      <div className="scrollable-content projects-grid" key={projectsPage}>
        {paginatedProjects.map((project, i) => (
          <a
            key={i}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            style={{ textDecoration: "none", color: "inherit" }}
            role="article"
            aria-label={`Project: ${project.title}`}
          >
            <div className="project-img-wrapper">
              <div className="project-img-overlay">
                <span className="project-img-overlay-text">
                  Explore Code
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                width={600}
                height={400}
                className="project-img"
              />
            </div>
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tech">
                {project.tags.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="project-link">
                <svg
                  className="btn-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                View on GitHub
              </span>
            </div>
          </a>
        ))}
      </div>
      <Pagination
        currentPage={projectsPage}
        totalPages={totalProjectsPages}
        onPageChange={setProjectsPage}
      />
    </div>
  );
}
