"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useTheme as useNextTheme } from "next-themes";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Container,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import CodeIcon from "@mui/icons-material/Code";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface PersonalInfo {
  name: string;
  role: string;
  summary: string;
  profileImage: string;
}

interface Job {
  company: string;
  role: string;
  duration: string;
  location: string;
  bullets: string[];
}

interface Project {
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
}

interface Blog {
  title: string;
  summary: string;
  url: string;
  date: string;
  readingTime: string;
}

interface Education {
  degree: string;
  institution: string;
  duration: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
}

interface MuiMobileAppProps {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  experience: Job[];
  skills: Record<string, string[]>;
  projects: Project[];
  blogs: Blog[];
  education: Education[];
}

export function MuiMobileApp({
  personalInfo,
  contactInfo,
  experience,
  skills,
  projects,
  blogs,
  education,
}: MuiMobileAppProps) {
  const { resolvedTheme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    let active = true;
    requestAnimationFrame(() => {
      if (active) {
        setMounted(true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const mode = mounted && resolvedTheme === "light" ? "light" : "dark";

  const muiTheme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: {
          main: mode === "dark" ? "#38bdf8" : "#0284c7",
        },
        background: {
          default: mode === "dark" ? "#09090b" : "#f8fafc",
          paper: mode === "dark" ? "#18181b" : "#ffffff",
        },
      },
      typography: {
        fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif",
      },
      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 16,
              backgroundImage: "none",
              border: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.05)",
              boxShadow: "none",
            },
          },
        },
        MuiAccordion: {
          styleOverrides: {
            root: {
              borderRadius: 12,
              backgroundImage: "none",
              border: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.05)",
              boxShadow: "none",
              "&:before": {
                display: "none",
              },
              "&.Mui-expanded": {
                margin: "8px 0",
              },
            },
          },
        },
      },
    });
  }, [mode]);

  const toggleTheme = () => {
    setTheme(mode === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ pb: 8, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        
        {/* Top Header App Bar */}
        <AppBar position="sticky" color="inherit" elevation={0} sx={{
          borderBottom: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(10px)",
          backgroundColor: mode === "dark" ? "rgba(9, 9, 11, 0.8)" : "rgba(248, 250, 252, 0.8)",
        }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-0.03em" }}>
              DHARMENDRA <span style={{ color: muiTheme.palette.primary.main }}>K.</span>
            </Typography>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Tab Page Contents */}
        <Container sx={{ py: 2, flexGrow: 1, overflow: "hidden" }}>
          
          {/* PROFILE TAB */}
          {activeTab === 0 && (
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: "72vh",
              gap: 3,
            }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", py: 2 }}>
                <Avatar
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  sx={{ width: 110, height: 110, mb: 2, boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}
                />
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
                  {personalInfo.name}
                </Typography>
                <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
                  {personalInfo.role}
                </Typography>
                
                {/* Hero Button row */}
                <Box sx={{ display: "flex", gap: 1.5, width: "100%", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    size="medium"
                    href={`mailto:${contactInfo.email}`}
                    startIcon={<EmailIcon />}
                    sx={{ borderRadius: 99, px: 3, py: 1, textTransform: "none", fontWeight: 700 }}
                  >
                    Email
                  </Button>
                  <Button
                    variant="outlined"
                    size="medium"
                    href={contactInfo.linkedin}
                    target="_blank"
                    startIcon={<LinkedInIcon />}
                    sx={{ borderRadius: 99, px: 3, py: 1, textTransform: "none", fontWeight: 700 }}
                  >
                    LinkedIn
                  </Button>
                </Box>
              </Box>

              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, textTransform: "uppercase", fontSize: "0.95rem", letterSpacing: "0.05em" }} color="primary">
                    About Me
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.7, color: "text.secondary" }}>
                    {personalInfo.summary}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === 1 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, textTransform: "uppercase", fontSize: "0.95rem", letterSpacing: "0.05em" }} color="primary">
                Work Experience
              </Typography>
              {experience.map((job, idx) => (
                <Accordion key={idx} defaultExpanded={idx === 0}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                        {job.role}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {job.company} • {job.duration}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="caption" color="primary" sx={{ display: "block", mb: 1.5, fontWeight: 700 }}>
                      📍 {job.location}
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                      {job.bullets.map((bullet, bIdx) => (
                        <Box component="li" key={bIdx} sx={{ fontSize: "0.85rem", color: "text.secondary", lineHeight: 1.6 }}>
                          {bullet}
                        </Box>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}

          {/* SKILLS TAB */}
          {activeTab === 2 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, textTransform: "uppercase", fontSize: "0.95rem", letterSpacing: "0.05em" }} color="primary">
                Technical Skills
              </Typography>
              {Object.entries(skills).map(([category, names]) => (
                <Card key={category}>
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                      <CodeIcon color="primary" fontSize="small" />
                      {category}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {names.map((name) => (
                        <Chip
                          key={name}
                          label={name}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            backgroundColor: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 3 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, textTransform: "uppercase", fontSize: "0.95rem", letterSpacing: "0.05em" }} color="primary">
                Featured Projects
              </Typography>
              {projects.map((project, idx) => (
                <Card key={idx}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={project.image}
                    alt={project.title}
                  />
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 2 }}>
                      {project.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ fontSize: "0.68rem", fontWeight: 700 }}
                        />
                      ))}
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      href={project.url}
                      target="_blank"
                      startIcon={<GitHubIcon />}
                      sx={{ textTransform: "none", fontWeight: 700, borderRadius: 8 }}
                    >
                      View on GitHub
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {/* MORE TAB (Publications, Education, Contact) */}
          {activeTab === 4 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
              
              {/* Publications Section */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, textTransform: "uppercase", fontSize: "0.95rem", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 1 }} color="primary">
                  <BookIcon fontSize="small" />
                  Publications
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {blogs.map((blog, idx) => (
                    <Card key={idx}>
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {blog.date}
                          </Typography>
                          <Typography variant="caption" color="primary" sx={{ fontWeight: 700 }}>
                            {blog.readingTime}
                          </Typography>
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.4 }}>
                          {blog.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                          {blog.summary}
                        </Typography>
                        <Button
                          variant="outlined"
                          fullWidth
                          href={blog.url}
                          target="_blank"
                          sx={{ textTransform: "none", fontWeight: 700, borderRadius: 8 }}
                        >
                          Read on Medium
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>

              {/* Education Section */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, textTransform: "uppercase", fontSize: "0.95rem", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 1 }} color="primary">
                  <SchoolIcon fontSize="small" />
                  Education
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {education.map((edu, idx) => (
                    <Card key={idx}>
                      <CardContent sx={{ p: 2, display: "flex", gap: 1.5 }}>
                        <Box sx={{
                          backgroundColor: mode === "dark" ? "rgba(56, 189, 248, 0.08)" : "rgba(2, 132, 199, 0.06)",
                          borderRadius: "50%",
                          width: 44,
                          height: 44,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}>
                          <SchoolIcon color="primary" />
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                            {edu.degree}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            {edu.institution}
                          </Typography>
                          <Typography variant="caption" color="primary" sx={{ fontWeight: 700 }}>
                            {edu.duration}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>

              {/* Privacy Policy Section */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    mb: 1.5,
                    textTransform: "uppercase",
                    fontSize: "0.95rem",
                    letterSpacing: "0.05em",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                  color="primary"
                >
                  <PrivacyTipIcon fontSize="small" />
                  Privacy Policy
                </Typography>
                <Card>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
                      This site uses privacy-friendly, cookie-less analytics (Vercel Analytics) and does not collect, sell, or share any personal data. Direct communications via email are used solely to respond to professional inquiries. Compliant with GDPR, DPDPA 2023, and CCPA.
                    </Typography>
                    <Button
                      variant="outlined"
                      fullWidth
                      href="/privacy"
                      endIcon={<OpenInNewIcon />}
                      sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: 8,
                        justifyContent: "space-between",
                      }}
                    >
                      Read Full Privacy Policy
                    </Button>
                  </CardContent>
                </Card>
              </Box>

              <Divider sx={{ opacity: 0.4 }} />

              {/* Contact / Social Footer (Restored to More page) */}
              <Box sx={{ py: 2, textAlign: "center" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>
                  Let&apos;s Connect
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                  <IconButton href={`mailto:${contactInfo.email}`} color="primary">
                    <EmailIcon />
                  </IconButton>
                  <IconButton href={contactInfo.linkedin} target="_blank" color="primary">
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton href={contactInfo.github} target="_blank" color="primary">
                    <GitHubIcon />
                  </IconButton>
                </Box>
              </Box>

            </Box>
          )}

        </Container>

        {/* Persistent Bottom Tab Navigation */}
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}
          elevation={4}
        >
          <BottomNavigation
            showLabels
            value={activeTab}
            onChange={(event, newValue) => {
              setActiveTab(newValue);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            sx={{
              borderTop: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.05)",
              backgroundColor: mode === "dark" ? "rgba(24, 24, 27, 0.95)" : "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
            }}
          >
            <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
            <BottomNavigationAction label="Work" icon={<WorkHistoryIcon />} />
            <BottomNavigationAction label="Skills" icon={<CodeIcon />} />
            <BottomNavigationAction label="Projects" icon={<FolderSpecialIcon />} />
            <BottomNavigationAction label="More" icon={<MoreHorizIcon />} />
          </BottomNavigation>
        </Paper>

      </Box>
    </ThemeProvider>
  );
}
