"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Header } from "./Header";

const SECTION_IDS = ["about", "experience", "skills", "projects", "blogs", "education", "contact"];
const SECTION_LABELS = ["Home", "Experience", "Skills", "Projects", "Blogs", "Education", "Contact"];

interface FullPageScrollerProps {
  name: string;
  children: React.ReactNode[];
}

export function FullPageScroller({ name, children }: FullPageScrollerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const isTransitioning = useRef(false);
  const touchStart = useRef(0);
  const lastScrollTime = useRef(0);
  const lastDeltaY = useRef(0);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      const idx = SECTION_IDS.indexOf(hash);
      if (idx !== -1 && idx !== activeIndex) {
        setActiveIndex(idx);
      }
    };
    window.addEventListener("hashchange", handleHash);
    handleHash();
    return () => window.removeEventListener("hashchange", handleHash);
  }, [activeIndex]);

  const navigate = useCallback((newIndex: number) => {
    if (isTransitioning.current) return;

    let targetIndex = newIndex;
    if (targetIndex < 0) {
      targetIndex = SECTION_IDS.length - 1;
    } else if (targetIndex >= SECTION_IDS.length) {
      targetIndex = 0;
    }

    isTransitioning.current = true;
    lastScrollTime.current = Date.now();
    setActiveIndex(targetIndex);
    window.location.hash = SECTION_IDS[targetIndex];
    setTimeout(() => {
      isTransitioning.current = false;
    }, 750);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth <= 768) return;

      const target = e.target as HTMLElement;
      const scrollable = target.closest(".scrollable-content") as HTMLElement | null;
      if (scrollable) {
        const isScrollingDown = e.deltaY > 0;
        const isScrollingUp = e.deltaY < 0;
        if (scrollable.scrollHeight > scrollable.clientHeight) {
          if (isScrollingDown && scrollable.scrollHeight - scrollable.scrollTop > scrollable.clientHeight + 10) return;
          if (isScrollingUp && scrollable.scrollTop > 10) return;
        }
      }
      
      e.preventDefault();

      const now = Date.now();
      const delta = e.deltaY;
      const absDelta = Math.abs(delta);

      const isDecelerating = absDelta < Math.abs(lastDeltaY.current);
      lastDeltaY.current = delta;

      if (isTransitioning.current || now - lastScrollTime.current < 800) {
        return;
      }

      if (absDelta < 35 || isDecelerating) {
        return;
      }

      if (delta > 0) {
        navigate(activeIndex + 1);
      } else {
        navigate(activeIndex - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex, navigate]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (window.innerWidth <= 768) return;

      const target = e.target as HTMLElement;
      const scrollable = target.closest(".scrollable-content") as HTMLElement | null;
      if (scrollable && scrollable.scrollHeight > scrollable.clientHeight) return;
      const diff = touchStart.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) navigate(diff > 0 ? activeIndex + 1 : activeIndex - 1);
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeIndex, navigate]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (window.innerWidth > 768) return;
      if (isTransitioning.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const idx = SECTION_IDS.indexOf(id);
          if (idx !== -1) {
            setActiveIndex(idx);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "-25% 0px -45% 0px",
      threshold: 0,
    });

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const getSlideClass = (index: number) => {
    if (index === activeIndex) return "slide-active";
    
    let diff = index - activeIndex;
    const len = SECTION_IDS.length;
    const half = len / 2;
    
    if (diff > half) {
      diff -= len;
    } else if (diff < -half) {
      diff += len;
    }
    
    return diff < 0 ? "slide-left" : "slide-right";
  };

  return (
    <>
      <div className="bg-blob" />
      <div className="bg-blob-2" />
      <Header
        name={name}
        activeSectionId={SECTION_IDS[activeIndex]}
        onNavClick={navigate}
      />

      <nav className="slide-dots" aria-label="Page navigation">
        {SECTION_IDS.map((id, i) => (
          <button
            key={id}
            className={`slide-dot${i === activeIndex ? " active" : ""}`}
            onClick={() => navigate(i)}
            aria-label={`Go to ${SECTION_LABELS[i]}`}
            title={SECTION_LABELS[i]}
          />
        ))}
      </nav>

      <div
        className="slide-progress-bar"
        style={{ width: `${((activeIndex + 1) / SECTION_IDS.length) * 100}%` }}
      />

      <main className="fullpage-container" itemScope itemType="https://schema.org/Person">
        <meta itemProp="name" content="Dharmendra Awasthi" />
        <meta itemProp="jobTitle" content="Lead Engineer / Senior Software Engineer" />
        <meta itemProp="email" content="er.dharamk@gmail.com" />
        <meta itemProp="url" content="https://dharam.dev" />
        <span
          itemProp="address"
          itemScope
          itemType="https://schema.org/PostalAddress"
          style={{ display: "none" }}
        >
          <meta itemProp="addressLocality" content="Bengaluru" />
          <meta itemProp="addressCountry" content="IN" />
        </span>

        {React.Children.map(children, (child, index) => {
          // If the child is HeroSection, it needs `.hero` class.
          const extraClass = index === 0 ? "hero" : "";
          return (
            <section id={SECTION_IDS[index]} className={`fullpage-slide ${getSlideClass(index)} ${extraClass}`}>
              {child}
            </section>
          );
        })}
      </main>

      <footer className="footer" suppressHydrationWarning>
        <div className="container" style={{ justifyContent: "center" }}>
          <p className="footer-text" style={{ margin: 0 }}>
            © {new Date().getFullYear()} {name} ·{" "}
            <a href="/privacy" className="footer-link">
              Privacy Policy
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
