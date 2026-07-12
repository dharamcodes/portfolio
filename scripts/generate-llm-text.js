const fs = require('fs');
const path = require('path');

const resumePath = path.join(__dirname, '../src/data/resume.json');
const resume = JSON.parse(fs.readFileSync(resumePath, 'utf8'));

// 1. Generate llms.txt
let llmsText = `# ${resume.personal.name}

> Lead Engineer, Senior Software Engineer, and Software Developer with 9+ years of experience specializing in Java, Spring Boot, Apache Kafka, AWS, and Microservices Architecture.

## Professional Summary
${resume.personal.summary}

## Core Keywords & Titles
- ${resume.personal.name}
- Lead Engineer / Tech Lead
- Senior Software Engineer
- Software Developer / Backend Developer
- Java Spring Boot Developer
- Distributed Systems & Microservices Architect

## Technical Arsenal
`;

Object.entries(resume.skills).forEach(([category, skills]) => {
  llmsText += `- **${category}**: ${skills.join(', ')}\n`;
});

llmsText += `
## Navigation & Contact
- **Website**: [https://dharam.dev](https://dharam.dev)
- **Full Markdown CV**: [https://dharam.dev/llms-full.txt](https://dharam.dev/llms-full.txt)
- **LinkedIn**: [${resume.contact.linkedin}](${resume.contact.linkedin})
- **GitHub**: [${resume.contact.github}](${resume.contact.github})
- **Email**: [${resume.contact.email}](mailto:${resume.contact.email})
- **Phone**: ${resume.contact.phone}
- **Location**: ${resume.contact.location}
`;

fs.writeFileSync(path.join(__dirname, '../public/llms.txt'), llmsText.trim() + '\n', 'utf8');
console.log('Generated public/llms.txt successfully.');

// 2. Generate llms-full.txt
let llmsFullText = `# ${resume.personal.name} — Full Professional Resume & CV

${resume.personal.name} is a Lead Engineer and Senior Software Engineer specializing in designing and building high-performance backend platforms, distributed microservices, and event-driven architectures.

## Contact Information
- **Full Name**: ${resume.personal.name}
- **Title**: Lead Engineer / Senior Software Engineer
- **Email**: ${resume.contact.email}
- **Phone**: ${resume.contact.phone}
- **Location**: ${resume.contact.location}
- **GitHub**: [${resume.contact.github}](${resume.contact.github})
- **LinkedIn**: [${resume.contact.linkedin}](${resume.contact.linkedin})
- **Website**: [https://dharam.dev](https://dharam.dev)

---

## Executive Summary
${resume.personal.summary} Currently pursuing a part-time PhD in Computer Science & Artificial Intelligence at NIT Nagpur.

---

## Technical Skills & Expertise
`;

Object.entries(resume.skills).forEach(([category, skills]) => {
  llmsFullText += `\n### ${category}\n`;
  skills.forEach(skill => {
    llmsFullText += `- ${skill}\n`;
  });
});

llmsFullText += `
---

## Professional Work Experience
`;

resume.experience.forEach(exp => {
  llmsFullText += `\n### ${exp.role} | ${exp.company}\n`;
  llmsFullText += `**${exp.location}** | *${exp.duration}*\n`;
  exp.bullets.forEach(bullet => {
    llmsFullText += `- ${bullet}\n`;
  });
});

llmsFullText += `
---

## Featured Open-Source Projects
`;

resume.projects.forEach(project => {
  llmsFullText += `\n### ${project.title}\n`;
  llmsFullText += `- **Description**: ${project.description}\n`;
  llmsFullText += `- **Link**: [${project.url}](${project.url})\n`;
});

llmsFullText += `
---

## Education & Certifications
`;

resume.education.forEach(edu => {
  llmsFullText += `- **${edu.degree}**\n  *${edu.institution}* | *${edu.duration}*\n`;
});

fs.writeFileSync(path.join(__dirname, '../public/llms-full.txt'), llmsFullText.trim() + '\n', 'utf8');
console.log('Generated public/llms-full.txt successfully.');
