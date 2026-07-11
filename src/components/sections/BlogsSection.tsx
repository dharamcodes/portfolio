"use client";

import { useState, useMemo } from "react";
import { Pagination } from "../Pagination";

interface BlogItem {
  title: string;
  summary: string;
  url: string;
  date: string;
  readingTime: string;
}

interface BlogsSectionProps {
  blogs: BlogItem[];
}

const BLOGS_PER_PAGE = 6;

export function BlogsSection({ blogs }: BlogsSectionProps) {
  const [blogsPage, setBlogsPage] = useState(1);

  const totalBlogsPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);
  const paginatedBlogs = useMemo(() => {
    return blogs.slice(
      (blogsPage - 1) * BLOGS_PER_PAGE,
      blogsPage * BLOGS_PER_PAGE
    );
  }, [blogs, blogsPage]);

  return (
    <div className="container slide-inner" style={{ width: "100%" }} aria-label="Technical Blog Publications">
      <h2 className="section-title">
        Technical <span className="gradient-text">Publications</span>
        <span className="scroll-hint-badge">Swipe ↔</span>
      </h2>
      <div className="scrollable-content blogs-grid-container" key={blogsPage}>
        {paginatedBlogs.map((blog, i) => (
          <a
            key={i}
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-card glass"
            role="article"
            aria-label={`Blog post: ${blog.title}`}
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
              Read on Medium{" "}
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </span>
          </a>
        ))}
      </div>
      <Pagination
        currentPage={blogsPage}
        totalPages={totalBlogsPages}
        onPageChange={setBlogsPage}
      />
    </div>
  );
}
