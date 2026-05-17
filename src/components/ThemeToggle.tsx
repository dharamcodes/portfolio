"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <button className="btn btn-secondary glass" style={{ padding: "0.5rem 1rem", minWidth: "90px", fontSize: "0.9rem" }} aria-label="Toggle theme">&nbsp;</button>;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="btn btn-secondary glass"
      style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
