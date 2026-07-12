"use client";
import { useState } from "react";
import { Pagination } from "@/components/ui/Pagination";
import styles from "./Blogs.module.css";

interface BlogItem {
  title: string;
  summary: string;
  url: string;
  date: string;
  readingTime: string;
}

interface BlogsProps {
  blogs: BlogItem[];
}

const BLOGS_PER_PAGE = 6;

export function Blogs({ blogs }: BlogsProps) {
  const [blogsPage, setBlogsPage] = useState(1);

  const totalBlogsPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);

  return (
    <div className="container slide-inner" style={{ width: "100%" }} aria-label="Technical Blog Publications">
      <h2 className="section-title">
        Technical <span className="gradient-text">Publications</span>
        <span className="scroll-hint-badge">Swipe ↔</span>
      </h2>
      <div className={`scrollable-content ${styles['blogs-grid-container']}`} key={blogsPage}>
        {blogs.map((blog, i) => {
          const pageIndex = Math.floor(i / BLOGS_PER_PAGE) + 1;
          const isVisible = pageIndex === blogsPage;
          return (
            <a
              key={i}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles['blog-card']} blog-card glass ${isVisible ? "" : styles['desktop-hidden']}`}
              role="article"
              aria-label={`Blog post: ${blog.title}`}
            >
              <div>
                <div className={styles['blog-card-meta']}>
                  <span className={styles['blog-card-date']}>{blog.date}</span>
                  <span className={styles['blog-card-time']}>{blog.readingTime}</span>
                </div>
                <h3 className={styles['blog-card-title']}>{blog.title}</h3>
                <p className={styles['blog-card-desc']}>{blog.summary}</p>
              </div>
              <span className={styles['blog-card-link']}>
                Read on Medium{" "}
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </span>
            </a>
          );
        })}
      </div>
      <Pagination
        currentPage={blogsPage}
        totalPages={totalBlogsPages}
        onPageChange={setBlogsPage}
      />
    </div>
  );
}
