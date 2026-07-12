"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import Link from "next/link";
import styles from "./FullPageScroller.module.css";

const SECTION_IDS = ["about", "experience", "skills", "projects", "blogs", "education", "contact"];
const SECTION_LABELS = ["Home", "Experience", "Skills", "Projects", "Blogs", "Education", "Contact"];

interface FullPageScrollerProps {
  name: string;
  children: React.ReactNode[];
}

export function FullPageScroller({ name, children }: FullPageScrollerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const isTransitioning = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const lastScrollTime = useRef(0);
  const lastDeltaY = useRef(0);

  const activeIndexRef = useRef(activeIndex);
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      const idx = SECTION_IDS.indexOf(hash);
      if (idx !== -1 && idx !== activeIndexRef.current) {
        setActiveIndex(idx);
      }
    };
    window.addEventListener("hashchange", handleHash);
    handleHash();
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

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
    }, 700);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (isTransitioning.current || now - lastScrollTime.current < 700) {
        e.preventDefault();
        return;
      }

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

      const delta = e.deltaY;
      const absDelta = Math.abs(delta);

      const isDecelerating = absDelta < Math.abs(lastDeltaY.current);
      lastDeltaY.current = delta;

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
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const diffX = touchStartX.current - e.changedTouches[0].clientX;
      const diffY = touchStartY.current - e.changedTouches[0].clientY;

      const scrollable = target.closest(".scrollable-content") as HTMLElement | null;

      // 1. Horizontal swipe gesture (tab change feel)
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        navigate(diffX > 0 ? activeIndex + 1 : activeIndex - 1);
      }
      // 2. Vertical swipe gesture (scroll boundary safe)
      else if (Math.abs(diffY) > 50) {
        if (scrollable) {
          if (scrollable.scrollHeight > scrollable.clientHeight) {
            // Allow vertical scroll inside scrollable list card
            if (diffY > 0 && scrollable.scrollHeight - scrollable.scrollTop > scrollable.clientHeight + 10) return;
            if (diffY < 0 && scrollable.scrollTop > 10) return;
          }
        }
        navigate(diffY > 0 ? activeIndex + 1 : activeIndex - 1);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeIndex, navigate]);

  const getSlideClass = (index: number) => {
    if (index === activeIndex) return styles.slideActive;
    
    let diff = index - activeIndex;
    const len = SECTION_IDS.length;
    const half = len / 2;
    
    if (diff > half) {
      diff -= len;
    } else if (diff < -half) {
      diff += len;
    }
    
    return diff < 0 ? styles.slideLeft : styles.slideRight;
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

      <nav className={styles.slideDots} aria-label="Page navigation">
        {SECTION_IDS.map((id, i) => (
          <button
            key={id}
            className={`${styles.slideDot}${i === activeIndex ? " " + styles.active : ""}`}
            onClick={() => navigate(i)}
            aria-label={`Go to ${SECTION_LABELS[i]}`}
            title={SECTION_LABELS[i]}
          />
        ))}
      </nav>

      <div
        className={styles.slideProgressBar}
        style={{ width: `${((activeIndex + 1) / SECTION_IDS.length) * 100}%` }}
      />

      <main className={styles.fullpageContainer} itemScope itemType="https://schema.org/Person">
        <meta itemProp="name" content={name} />
        <meta itemProp="jobTitle" content="Lead Engineer / Senior Software Engineer" />
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
          const extraClass = index === 0 ? styles.hero : "";
          return (
            <section id={SECTION_IDS[index]} className={`${styles.fullpageSlide} fullpage-slide ${getSlideClass(index)} ${index === activeIndex ? "slide-active" : ""} ${extraClass}`}>
              {child}
            </section>
          );
        })}
      </main>

      <footer className="footer" suppressHydrationWarning>
        <div className="container" style={{ justifyContent: "center" }}>
          <p className="footer-text" style={{ margin: 0 }}>
            © {new Date().getFullYear()} {name} ·{" "}
            <Link href="/privacy" className="footer-link">
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
