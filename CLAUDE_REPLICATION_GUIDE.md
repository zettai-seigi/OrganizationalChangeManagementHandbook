# Organizational Change Management Handbook - Claude CLI Replication Guide

This document contains everything needed to replicate this handbook creation process using Claude CLI.

## Project Overview

**Project:** Organizational Change Management Handbook - A Comprehensive Guide to ITIL/ITSM OCM Best Practices
**Format:** GitHub Pages site with Jekyll (Just the Docs theme)
**Chapters:** 19 chapters organized into 6 parts
**URL:** https://zettai-seigi.github.io/OrganizationalChangeManagementHandbook/

---

## Part 1: Initial Project Setup

### Directory Structure
```
OrganizationalChangeManagementHandbook/
├── docs/                          # GitHub Pages content
│   ├── _config.yml               # Jekyll configuration
│   ├── index.md                  # Home page
│   ├── chapters/                 # All 19 chapter markdown files
│   │   ├── 01-introduction.md
│   │   ├── 02-core-concepts.md
│   │   ├── ... (chapters 03-18)
│   │   └── 19-moving-forward.md
│   └── assets/images/            # Diagrams and visuals
├── README.md                     # Repository documentation
├── LICENSE                       # MIT License
├── .gitignore                    # Git ignore rules
└── CLAUDE.md                     # Claude instructions
```

### Prerequisites
- GitHub account
- Repository created with GitHub Pages enabled
- Claude CLI installed and configured

---

## Part 2: Core Prompts Used

### Prompt 1: Initial Book Structure Creation

```
Create a comprehensive Organizational Change Management Handbook following ITIL/ITSM best practices.
The handbook should be organized for GitHub Pages using Jekyll with the "Just the Docs" theme.

Structure the book into 6 parts with 19 chapters:

Part I: Foundations (Chapters 1-3)
- Chapter 1: Introduction to Organizational Change Management
- Chapter 2: Core Concepts and Definitions
- Chapter 3: Strategic Framework and Critical Success Factors

Part II: Assessment and Planning (Chapters 4-7)
- Chapter 4: Change Readiness Assessment
- Chapter 5: Stakeholder Analysis and Engagement
- Chapter 6: Change Impact Assessment
- Chapter 7: OCM Strategy and Planning

Part III: Execution (Chapters 8-11)
- Chapter 8: Communication Planning and Execution
- Chapter 9: Training and Capability Building
- Chapter 10: Sponsorship and Leadership Engagement
- Chapter 11: Resistance Management

Part IV: Adoption and Sustainability (Chapters 12-14)
- Chapter 12: Adoption Monitoring and Measurement
- Chapter 13: Reinforcement and Sustainability
- Chapter 14: Maturity Model and Assessment

Part V: Governance and Controls (Chapters 15-16)
- Chapter 15: Governance Framework
- Chapter 16: Policies, Standards, and Compliance

Part VI: Implementation Guide (Chapters 17-19)
- Chapter 17: Implementation Roadmap
- Chapter 18: Best Practices and Common Pitfalls
- Chapter 19: Moving Forward with Continuous Improvement

Key framework elements to cover:
- ADKAR Model (Awareness, Desire, Knowledge, Ability, Reinforcement)
- 8 Critical Success Factors
- 6 Key Performance Indicators
- 5 Maturity Levels
- Stakeholder engagement levels
- Resistance management strategies
```

### Prompt 2: Chapter Content Generation

```
Write Chapter [X]: [Chapter Title] for the Organizational Change Management Handbook.

Requirements:
1. Start with YAML frontmatter for Jekyll:
   ---
   layout: default
   title: "Chapter X: [Title]"
   nav_order: [X+1]
   ---

2. Include these sections:
   - Learning Objectives
   - Main content with clear headings (##, ###)
   - Tables for structured information
   - Practical examples
   - Key Takeaways as bullet points
   - Summary paragraph
   - Chapter Navigation links at the bottom

3. Cross-reference other chapters where relevant
4. Use consistent ADKAR terminology
5. Maintain professional, instructional tone
6. Target length: 2000-4000 words per chapter
```

### Prompt 3: Critical Success Factors Definition

```
Define the 8 Critical Success Factors (CSFs) for Organizational Change Management:

CSF 1: Executive Sponsorship and Commitment (Leadership)
CSF 2: Clear Vision and Case for Change (Foundation)
CSF 3: Stakeholder Engagement and Involvement (People)
CSF 4: Effective Communication (Communication)
CSF 5: Training and Capability Building (Enablement)
CSF 6: Change Agent Network (Structure)
CSF 7: Resistance Management (Risk)
CSF 8: Measurement and Reinforcement (Sustainability)

For each CSF include:
- Definition and explanation
- Why it matters
- Success indicators
- Implementation guidance
- Connection to ADKAR model
- Metrics for measurement
```

---

## Part 3: Jekyll Configuration

### _config.yml
```yaml
title: Organizational Change Management Handbook
description: A Comprehensive Guide to ITIL/ITSM OCM Best Practices
baseurl: "/OrganizationalChangeManagementHandbook"
url: "https://zettai-seigi.github.io"

theme: just-the-docs

color_scheme: light

search_enabled: true
search.heading_level: 3
search.previews: 3

heading_anchors: true

nav_sort: case_insensitive

back_to_top: true
back_to_top_text: "Back to top"

footer_content: "Organizational Change Management Handbook - MIT License"

plugins:
  - jekyll-seo-tag
```

### Chapter Frontmatter Template
```yaml
---
layout: default
title: "Chapter X: Chapter Title"
nav_order: X
---
```

---

## Part 4: Key Framework Elements

### The ADKAR Model

| Element | Description | OCM Activities |
|---------|-------------|----------------|
| Awareness | Why change is needed | Communication |
| Desire | Personal motivation | Engagement, WIIFM |
| Knowledge | How to change | Training |
| Ability | Skills to implement | Coaching, practice |
| Reinforcement | Sustaining change | Recognition, accountability |

### The 8 Critical Success Factors (CSFs)

| CSF # | Name | Category |
|-------|------|----------|
| 1 | Executive Sponsorship and Commitment | Leadership |
| 2 | Clear Vision and Case for Change | Foundation |
| 3 | Stakeholder Engagement and Involvement | People |
| 4 | Effective Communication | Communication |
| 5 | Training and Capability Building | Enablement |
| 6 | Change Agent Network | Structure |
| 7 | Resistance Management | Risk |
| 8 | Measurement and Reinforcement | Sustainability |

### The 6 Key Performance Indicators (KPIs)

1. **Awareness Level** - % of stakeholders aware of change (target: 100%)
2. **Adoption Rate** - % of users actively using new processes (target: ≥85%)
3. **Proficiency Level** - % meeting competency standards (target: ≥80%)
4. **Resistance Level** - % showing active resistance (target: ≤10%)
5. **Sponsor Engagement Score** - Leadership participation metrics
6. **Sustainment Rate** - Maintained adoption after 6 months (target: ≥90%)

### The 5 Maturity Levels

1. **Level 1: Ad-hoc** - No formal OCM process
2. **Level 2: Emerging** - Basic OCM on some projects
3. **Level 3: Defined** - Standardized methodology
4. **Level 4: Managed** - Metrics-driven OCM
5. **Level 5: Optimized** - Change-ready culture

---

## Part 5: Quality Checklist

Before publishing, verify:

- [ ] All 19 chapters complete with consistent structure
- [ ] YAML frontmatter correct on all chapters
- [ ] Cross-references accurate between chapters
- [ ] ADKAR model consistent throughout
- [ ] CSF numbering consistent (1-8)
- [ ] KPI definitions match across chapters
- [ ] Maturity levels consistent
- [ ] Tables formatted correctly
- [ ] Chapter navigation links working
- [ ] Jekyll config correct for GitHub Pages
- [ ] README.md complete and accurate
- [ ] LICENSE file present (MIT)
- [ ] .gitignore properly configured

---

## Part 6: Useful Claude CLI Commands

```bash
# Start Claude CLI in the project directory
cd /path/to/OrganizationalChangeManagementHandbook
claude

# Common operations during session:
# - Read a chapter: Read tool with file path
# - Edit content: Edit tool for precise changes
# - Search across chapters: Grep tool
# - Find files: Glob tool
# - Git operations: Bash tool

# Push to GitHub
git add .
git commit -m "Description of changes"
git push origin main
```

---

## License

MIT License - See LICENSE file for details.

---

*This replication guide was created to enable reproduction of the Organizational Change Management Handbook project using Claude CLI.*
