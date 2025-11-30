# Font Usage Guide

This document explains where the **Header Font**, **Subheader Font**, and **Body Font** from the Appearance panel are applied throughout the resume.

## 🎨 Font Options in Appearance Panel

The Appearance panel has three font family selectors:
1. **Header Font** - Used for main headings and titles
2. **Subheader Font** - Used for section headers and skill categories
3. **Body Font** - Used for all body text and descriptions

---

## 📍 Header Font Usage

**Location in Appearance Panel:** Typography Tab → "Header Font"

### Where It's Applied:

#### 1. **Resume Header - Your Name** 
- **Component:** `ResumeHeaderName.tsx`
- **Element:** `<h1>` - The large name at the top of your resume
- **CSS Class:** `font-header-{headerFont.toLowerCase()}`
- **Example:** "John Doe" at the top

#### 2. **Education - School Names**
- **Component:** `EducationSection.tsx`
- **Elements:** School/University names in education entries
- **CSS Class:** `font-header-{headerFont.toLowerCase()}`
- **Example:** "Harvard University", "MIT"

#### 3. **Work Experience - Company Names** (if applicable)
- Some template variants may use header font for company names

---

## 📍 Subheader Font Usage

**Location in Appearance Panel:** Typography Tab → "Subheader Font"

### Where It's Applied:

#### 1. **Resume Header - Job Title/Subtitle**
- **Component:** `ResumeHeaderTitle.tsx`
- **Element:** The subtitle below your name
- **CSS Class:** `font-header-{subheaderFont.toLowerCase()}`
- **Example:** "Senior Software Engineer", "Product Manager"

#### 2. **Section Headers**
- **Component:** `SectionHeaderLine.tsx`
- **Elements:** All major section titles (Work Experience, Education, Skills, etc.)
- **CSS Class:** `font-header-{sectionHeaderFont.toLowerCase()}`
- **Example:** "WORK EXPERIENCE", "EDUCATION", "SKILLS"

#### 3. **Skills Section - Category Names**
- **Component:** `SkillCategory.tsx`, `SkillCategoryParts.tsx`, `CategoryHeader.tsx`
- **Elements:** Skill category headers
- **CSS Class:** `font-header-{subheaderFont.toLowerCase()}`
- **Example:** "Programming Languages", "Frameworks", "Tools"

---

## 📍 Body Font Usage

**Location in Appearance Panel:** Typography Tab → "Body Font"

### Where It's Applied:

#### 1. **Education Section - Details**
- **Component:** `EducationSection.tsx`
- **Elements:**
  - Degree names
  - Field of study
  - GPA
  - Dates
  - Descriptions
- **CSS Class:** `font-body-{bodyFont.toLowerCase()}`
- **Example:** "Bachelor of Science in Computer Science"

#### 2. **Work Experience - Content**
- **Component:** `WorkExperienceSection.tsx`
- **Elements:**
  - Job descriptions
  - Responsibilities
  - Achievements
  - Bullet points
- **CSS Class:** `font-body-{bodyFont.toLowerCase()}`

#### 3. **Skills Section - Skill Items**
- **Component:** `SkillCategory.tsx`
- **Elements:**
  - Individual skills in all layouts (bullets, pills, classic)
  - Skill input fields
- **CSS Class:** `font-body-{bodyFont.toLowerCase()}`
- **Example:** "JavaScript", "React", "Node.js"

#### 4. **Projects Section - Descriptions**
- **Component:** `ProjectsSection.tsx`
- **Elements:**
  - Project descriptions
  - Technologies used
  - Details
- **CSS Class:** `font-body-{bodyFont.toLowerCase()}`

#### 5. **Contact Information - Social Links**
- **Component:** `ResumeSocialLinks.tsx`
- **Elements:**
  - Email addresses
  - Phone numbers
  - LinkedIn URLs
  - GitHub profiles
- **CSS Class:** `font-body-{bodyFont.toLowerCase()}`

#### 6. **Summary/About Section**
- **Component:** `SummarySection.tsx`
- **Elements:**
  - Professional summary text
  - Bio descriptions
- **CSS Class:** `font-body-{bodyFont.toLowerCase()}`

#### 7. **All Editable Text Fields**
- **Component:** `EditableBodyText.tsx`, `FormattedText.tsx`
- **Elements:** Any editable body text throughout the resume
- **CSS Class:** `font-body-{bodyFont.toLowerCase()}`

---

## 📊 Visual Hierarchy

```
┌─────────────────────────────────────┐
│   JOHN DOE                          │ ← Header Font (largest)
│   Senior Software Engineer          │ ← Subheader Font (medium-large)
├─────────────────────────────────────┤
│   WORK EXPERIENCE                   │ ← Subheader Font (section header)
│   ─────────────────────────────     │
│   • Developed features...           │ ← Body Font
│   • Led team of engineers...        │ ← Body Font
│                                     │
│   SKILLS                            │ ← Subheader Font (section header)
│   ─────────────────────────────     │
│   Programming Languages             │ ← Subheader Font (category)
│   JavaScript, Python, Java          │ ← Body Font (skills)
│                                     │
│   EDUCATION                         │ ← Subheader Font (section header)
│   ─────────────────────────────     │
│   Harvard University                │ ← Header Font (school)
│   Bachelor of Science              │ ← Body Font (degree)
│   Computer Science                 │ ← Body Font (field)
└─────────────────────────────────────┘
```

---

## 🎯 Font Selection Tips

### Header Font
**Best for:** Strong, impactful fonts that command attention
- **Recommended:** Playfair Display, Merriweather, Montserrat (Bold)
- **Use when:** You want your name and school names to stand out

### Subheader Font
**Best for:** Semi-bold, clear fonts that organize information
- **Recommended:** Inter, Roboto, Open Sans, Lato
- **Use when:** You want clear section separation and hierarchy

### Body Font
**Best for:** Highly readable fonts for longer text
- **Recommended:** Inter, Roboto, Lato, Source Sans Pro
- **Use when:** Prioritizing readability and professionalism

---

## 💡 Common Font Combinations

### Classic Professional
- **Header:** Playfair Display
- **Subheader:** Inter
- **Body:** Inter

### Modern Clean
- **Header:** Montserrat
- **Subheader:** Lato
- **Body:** Lato

### Traditional
- **Header:** Merriweather
- **Subheader:** Open Sans
- **Body:** Open Sans

### Tech-Forward
- **Header:** Space Grotesk
- **Subheader:** Inter
- **Body:** Roboto

### Minimal Unified
- **Header:** Inter
- **Subheader:** Inter
- **Body:** Inter
*(All same font, different weights)*

---

## 🔧 Technical Implementation

Each font is applied using:

1. **Tailwind CSS Classes**
   ```tsx
   className="font-header-inter"  // Header font
   className="font-body-roboto"   // Body font
   ```

2. **Inline Styles** (for dynamic fonts)
   ```tsx
   style={{ fontFamily: fontOptions.bodyFont }}
   ```

3. **CSS Variables** (for PDF generation)
   ```css
   --header-font: 'Inter';
   --body-font: 'Roboto';
   ```

---

## 📝 Summary Table

| Font Type | Used For | Components | Importance |
|-----------|----------|------------|------------|
| **Header Font** | Name, School names | `ResumeHeaderName`, `EducationSection` | Highest impact |
| **Subheader Font** | Job title, Section headers, Skill categories | `ResumeHeaderTitle`, `SectionHeaderLine`, `SkillCategory` | High hierarchy |
| **Body Font** | All descriptions, Skills, Details | All content sections | Most text content |

---

## 🎨 Finding Your Perfect Font Combo

1. **Open Appearance Panel** → Click the palette icon in the floating toolbar
2. **Go to Typography Tab** → See the three font selectors
3. **Experiment!** → Try different combinations
4. **Watch the preview** → Changes apply in real-time

**Pro Tip:** For ATS compatibility, stick with common web-safe fonts like Inter, Roboto, or Open Sans!

---

**Last Updated:** November 30, 2025

