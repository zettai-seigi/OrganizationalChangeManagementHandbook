# Claude Code Project Instructions

## Project Overview

This is the **Organizational Change Management Handbook** - a comprehensive ITIL/ITSM guide published on GitHub Pages.

- **URL:** https://zettai-seigi.github.io/OrganizationalChangeManagementHandbook/
- **Repository:** https://github.com/zettai-seigi/OrganizationalChangeManagementHandbook
- **Theme:** Jekyll with Just the Docs
- **License:** MIT

## Project Structure

```
OrganizationalChangeManagementHandbook/
├── docs/                    # GitHub Pages content (MAIN CONTENT)
│   ├── _config.yml         # Jekyll configuration
│   ├── index.md            # Home page
│   ├── chapters/           # All 19 chapters
│   └── assets/images/      # Published images
├── README.md               # Repository documentation
├── LICENSE                 # MIT License
├── .gitignore              # Git ignore rules
├── CLAUDE.md               # This file
└── CLAUDE_REPLICATION_GUIDE.md  # Full replication documentation
```

## Key Framework Elements

### The ADKAR Model
- **A**wareness - Understanding why change is needed
- **D**esire - Personal motivation to support change
- **K**nowledge - Understanding how to change
- **A**bility - Skills and behaviors to implement change
- **R**einforcement - Sustaining change over time

### 8 Critical Success Factors (CSFs)
1. Executive Sponsorship and Commitment (Leadership)
2. Clear Vision and Case for Change (Foundation)
3. Stakeholder Engagement and Involvement (People)
4. Effective Communication (Communication)
5. Training and Capability Building (Enablement)
6. Change Agent Network (Structure)
7. Resistance Management (Risk)
8. Measurement and Reinforcement (Sustainability)

### 6 Key Performance Indicators (KPIs)
1. Awareness Level (target: 100%)
2. Adoption Rate (target: ≥85%)
3. Proficiency Level (target: ≥80%)
4. Resistance Level (target: ≤10%)
5. Sponsor Engagement Score
6. Sustainment Rate (target: ≥90%)

### 5 Maturity Levels
1. Ad-hoc (Initial)
2. Emerging (Basic)
3. Defined (Standardized)
4. Managed (Metrics-driven)
5. Optimized (Change-ready culture)

## Content Guidelines

### Chapter Structure
Each chapter should include:
1. YAML frontmatter with layout, title, nav_order
2. Learning Objectives section
3. Main content with ## and ### headings
4. Tables for structured data
5. Practical examples
6. Key Takeaways (bullet points)
7. Summary paragraph
8. Chapter Navigation links

### Writing Style
- Professional, instructional tone
- Consistent ITIL terminology
- Cross-reference other chapters where relevant
- Use real-world examples
- Target 2000-4000 words per chapter

### Image Placeholders
When images are needed but not yet created, use:
```
**Figure X.X:** [Title]
*Caption:* [Description]
*Position:* [Placement guidance]
```

## Common Tasks

### Editing Chapters
- Chapter files are in `docs/chapters/`
- Use Edit tool for precise changes
- Maintain consistent formatting

### Adding Images
- Place in `docs/assets/images/`
- Reference with `../assets/images/filename.png`

### Git Operations
```bash
git add .
git commit -m "Description"
git push origin main
```

## Important Notes

- Always maintain ADKAR model consistency across chapters
- The book is for GitHub Pages - don't create files that break Jekyll
- When editing, verify cross-references remain accurate
- CSF numbering should be consistent (1-8)
- KPI definitions must match across chapters
