import re

with open('src/app/globals.css', 'r') as f:
    lines = f.readlines()

def extract(start_pattern, end_pattern):
    global lines
    start = -1
    end = -1
    for i, line in enumerate(lines):
        if line is None: continue
        if re.search(start_pattern, line) and start == -1:
            start = i
        if re.search(end_pattern, line) and start != -1 and end == -1:
            end = i
    
    if start != -1 and end != -1:
        chunk = "".join([l for l in lines[start:end] if l is not None])
        for i in range(start, end):
            lines[i] = None
        return chunk
    return ""

def write_module(name, desktop_chunks, mobile_chunks):
    content = desktop_chunks
    if mobile_chunks.strip():
        content += "\n@media (max-width: 768px) {\n"
        for line in mobile_chunks.split('\n'):
            if line:
                content += f"  {line}\n"
        content += "}\n"
    with open(f"src/components/sections/{name}.module.css", 'w') as f:
        f.write(content)

# Experience
exp_desktop = extract(r"/\* Experience Cards refinement \*/", r"/\* Skills \*/")
exp_desktop += extract(r"/\* ─── Experience Tab Switcher ─── \*/", r"\.skills-filter-bar")
exp_mobile = extract(r"/\* ── EXPERIENCE ── \*/", r"/\* ── TECHNICAL ARSENAL — mobile overrides ── \*/")
write_module("ExperienceSection", exp_desktop, exp_mobile)

# Skills
skills_desktop = extract(r"/\* Skills \*/", r"/\* Projects \*/")
skills_desktop += extract(r"\.skills-filter-bar", r"/\* Category dot colors & glows \*/")
skills_desktop += extract(r"/\* Category dot colors & glows \*/", r"/\* ─── Blogs grid ─── \*/")
skills_mobile = extract(r"/\* ── TECHNICAL ARSENAL — mobile overrides ── \*/", r"/\* ── PROJECTS — single column ── \*/")
write_module("SkillsSection", skills_desktop, skills_mobile)

# Projects
proj_desktop = extract(r"/\* Projects \*/", r"/\* Education Card \*/")
proj_mobile = extract(r"/\* ── PROJECTS — single column ── \*/", r"/\* ── EDUCATION ── \*/")
write_module("ProjectsSection", proj_desktop, proj_mobile)

# Blogs
blogs_desktop = extract(r"/\* Blog/Technical Publications Card \*/", r"/\* Media Queries for Maximum Mobile Friendliness \*/")
blogs_desktop += extract(r"/\* ─── Blogs grid ─── \*/", r"/\* ─── Education grid ─── \*/")
blogs_mobile = ""
write_module("BlogsSection", blogs_desktop, blogs_mobile)

# Education
edu_desktop = extract(r"/\* Education Card \*/", r"/\* Blog/Technical Publications Card \*/")
edu_desktop += extract(r"/\* ─── Education grid ─── \*/", r"/\* ─── Contact section ─── \*/")
edu_mobile = extract(r"/\* ── EDUCATION ── \*/", r"/\* ── CONTACT ── \*/")
write_module("EducationSection", edu_desktop, edu_mobile)

# Contact
contact_desktop = extract(r"/\* ─── Contact section ─── \*/", r"/\* ─── Fancy Pagination ─── \*/")
contact_mobile = extract(r"/\* ── CONTACT ── \*/", r"/\* ── GLOBAL FOOTER ── \*/")
write_module("ContactSection", contact_desktop, contact_mobile)

# Write remaining to globals.css
with open('src/app/globals.css', 'w') as f:
    f.write("".join([l for l in lines if l is not None]))

print("CSS extraction complete")
