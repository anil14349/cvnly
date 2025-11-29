# CVnly Architecture Diagram

## Visual Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CVnly Application                          │
│                         (Resume Builder)                            │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        App.tsx (Entry Point)                        │
│                           70 lines only!                            │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                            │ wraps with
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         ResumeProvider                              │
│                    (Context API Provider)                           │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐ │
│   │              State Management Hooks (11)                    │ │
│   ├─────────────────────────────────────────────────────────────┤ │
│   │  • useResumeData      • useSections                         │ │
│   │  • useExperiences     • useEducations                       │ │
│   │  • useProjects        • useCertifications                   │ │
│   │  • useSkills          • useSocialLinks                      │ │
│   │  • useFontOptions     • useTheme                            │ │
│   │  • useSectionTitles                                         │ │
│   └─────────────────────────────────────────────────────────────┘ │
│                                                                     │
│   Provides via Context:                                             │
│   • Resume data (name, title)                                       │
│   • All sections (skills, experience, education, etc.)              │
│   • CRUD operations for each section                                │
│   • Font customization options                                      │
│   • Theme settings (light/dark)                                     │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                            │ consumed by
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Component Layer (UI)                           │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────┐    │
│   │                      AppHeader.tsx                        │    │
│   │  • Application title                                      │    │
│   │  • Download with Payment button                           │    │
│   │  • Preview mode toggle                                    │    │
│   └──────────────────────────────────────────────────────────┘    │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────┐    │
│   │                   ResumeContainer.tsx                     │    │
│   │  • Resume display area                                    │    │
│   │  • A4 ruler with page breaks                              │    │
│   │  • All resume sections:                                   │    │
│   │    - Summary Section                                      │    │
│   │    - Skills Section                                       │    │
│   │    - Experience Section                                   │    │
│   │    - Education Section                                    │    │
│   │    - Projects Section                                     │    │
│   │    - Certifications Section                               │    │
│   │  • Preview mode support                                   │    │
│   └──────────────────────────────────────────────────────────┘    │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────┐    │
│   │                    ResumeSidebar.tsx                      │    │
│   │  • ATS Score Widget                                       │    │
│   │  • Font Control Panel                                     │    │
│   │  • Line Break Tool                                        │    │
│   │  • Resume Sections Widget                                 │    │
│   └──────────────────────────────────────────────────────────┘    │
│                                                                     │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                            │ uses
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   Business Logic Layer (Services)                   │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────┐    │
│   │                   paymentService.ts                       │    │
│   │  • processPayment()      - Process payments               │    │
│   │  • verifyPayment()       - Verify transactions            │    │
│   │  • getPaymentHistory()   - Get user payments              │    │
│   └──────────────────────────────────────────────────────────┘    │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────┐    │
│   │                     atsService.ts                         │    │
│   │  • analyzeResume()       - Calculate ATS score            │    │
│   │  • saveATSScore()        - Save score to DB               │    │
│   │  • getATSScoreHistory()  - Get score history              │    │
│   │  • compareWithHistory()  - Compare scores                 │    │
│   └──────────────────────────────────────────────────────────┘    │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────┐    │
│   │                      pdfService.ts                        │    │
│   │  • trackDownload()           - Track PDF downloads        │    │
│   │  • getDownloadCount()        - Get download count         │    │
│   │  • incrementDownloadCount()  - Increment counter          │    │
│   │  • isDownloadValid()         - Check validity             │    │
│   └──────────────────────────────────────────────────────────┘    │
│                                                                     │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                            │ interacts with
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Data Layer (Database)                          │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────┐    │
│   │                    Supabase Client                        │    │
│   │                  (supabaseClient.ts)                      │    │
│   └──────────────────┬───────────────────────────────────────┘    │
│                      │                                             │
│        ┌─────────────┼─────────────┬─────────────┐                │
│        ▼             ▼             ▼             ▼                │
│   ┌────────┐   ┌────────┐   ┌──────────┐   ┌────────┐           │
│   │payments│   │downloads   │ats_scores│   │  users │           │
│   │ table  │   │ table  │   │  table   │   │  table │           │
│   └────────┘   └────────┘   └──────────┘   └────────┘           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

### User Action Flow
```
┌──────────┐
│   User   │
│  Action  │
└────┬─────┘
     │
     ▼
┌─────────────────┐
│   Component     │ (e.g., "Add Experience" button clicked)
│  Event Handler  │
└────┬────────────┘
     │
     ▼
┌────────────────────────┐
│   useResumeContext()   │ (Access context)
└────┬───────────────────┘
     │
     ▼
┌─────────────────────┐
│  Context Action     │ (e.g., addExperience())
│  (from Provider)    │
└────┬────────────────┘
     │
     ▼
┌──────────────────────┐
│   Custom Hook        │ (e.g., useExperiences)
│   Updates State      │
└────┬─────────────────┘
     │
     ▼
┌─────────────────────┐
│   State Change      │ (React state updated)
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│ Context Notifies    │ (All subscribers notified)
│   Subscribers       │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│  Components         │ (Components re-render)
│   Re-render         │
└────┬────────────────┘
     │
     ▼
┌─────────────────────┐
│   UI Updates        │ (User sees changes)
└─────────────────────┘
```

### Service Integration Flow
```
┌──────────────────┐
│    Component     │
└────┬─────────────┘
     │
     │ calls
     ▼
┌──────────────────────┐
│  Service Function    │ (e.g., processPayment())
└────┬─────────────────┘
     │
     ▼
┌─────────────────────────┐
│   Business Logic        │ (Validate, transform data)
│   Execution             │
└────┬────────────────────┘
     │
     ▼
┌─────────────────────────┐
│   Database Operation    │ (Supabase query)
│   (if needed)           │
└────┬────────────────────┘
     │
     ▼
┌─────────────────────────┐
│   Result Returned       │
└────┬────────────────────┘
     │
     ▼
┌─────────────────────────┐
│   Component Handles     │ (Success/Error handling)
│   Response              │
└────┬────────────────────┘
     │
     ▼
┌─────────────────────────┐
│   UI Update             │ (Show result to user)
└─────────────────────────┘
```

## Module Dependencies

```
App.tsx
  │
  ├─── ResumeProvider (contexts/)
  │      │
  │      ├─── useResumeData (hooks/)
  │      ├─── useSections (hooks/)
  │      ├─── useExperiences (hooks/)
  │      ├─── useEducations (hooks/)
  │      ├─── useProjects (hooks/)
  │      ├─── useCertifications (hooks/)
  │      ├─── useSkills (hooks/)
  │      ├─── useSocialLinks (hooks/)
  │      ├─── useFontOptions (hooks/)
  │      ├─── useTheme (hooks/)
  │      └─── useSectionTitles (hooks/)
  │
  ├─── AppHeader (components/resume/)
  │      │
  │      ├─── useResumeContext
  │      └─── DownloadWithPayment (components/payment/)
  │
  ├─── ResumeContainer (components/resume/)
  │      │
  │      ├─── useResumeContext
  │      ├─── ResumeHeader (components/layout/)
  │      ├─── SummarySection (components/sections/)
  │      ├─── SkillsSection (components/sections/)
  │      ├─── ExperienceSection (components/sections/)
  │      ├─── EducationSection (components/sections/)
  │      ├─── ProjectsSection (components/sections/)
  │      └─── CertificationsSection (components/sections/)
  │
  └─── ResumeSidebar (components/resume/)
         │
         ├─── useResumeContext
         ├─── ATSScoreWidget (components/widgets/)
         │      └─── atsService.analyzeResume()
         ├─── FontControlPanel (components/widgets/)
         ├─── LineBreakTool (components/widgets/)
         └─── ResumeSectionsWidget (components/widgets/)
```

## File Size Comparison

### Before Refactoring
```
┌─────────────────────────────────────┐
│          App.tsx                    │
│       833 lines                     │
│  ████████████████████████████████   │
│  All logic in one file!             │
└─────────────────────────────────────┘
```

### After Refactoring
```
App.tsx              ██ 70 lines
ResumeProvider       ██ 75 lines
ResumeContext        ██ 80 lines
AppHeader            ██ 70 lines
ResumeContainer      ████ 150 lines
ResumeSidebar        ██ 50 lines

Hooks (11 files):
useResumeData        █ 30 lines
useSections          ██ 40 lines
useExperiences       ███ 85 lines
useEducations        ██ 60 lines
useProjects          ███ 85 lines
useCertifications    ██ 70 lines
useSkills            █ 15 lines
useSocialLinks       ██ 50 lines
useFontOptions       ████ 120 lines
useTheme             ██ 65 lines
useSectionTitles     ██ 35 lines

Services (3 files):
paymentService       ████ 100 lines
atsService           ███ 90 lines
pdfService           ███ 85 lines
```

**Total: ~1,200 lines spread across 22 modular files!**

## Code Organization Benefits

```
┌──────────────────────────────────────────────────────────────┐
│                    BEFORE (Monolithic)                       │
├──────────────────────────────────────────────────────────────┤
│  ❌ Hard to find specific functionality                      │
│  ❌ Difficult to test                                        │
│  ❌ Merge conflicts common                                   │
│  ❌ Cannot reuse logic                                       │
│  ❌ High coupling                                            │
│  ❌ Poor scalability                                         │
└──────────────────────────────────────────────────────────────┘

                         ▼ REFACTORED ▼

┌──────────────────────────────────────────────────────────────┐
│                     AFTER (Modular)                          │
├──────────────────────────────────────────────────────────────┤
│  ✅ Easy to locate any feature                               │
│  ✅ Each module testable independently                       │
│  ✅ Multiple devs work simultaneously                        │
│  ✅ Hooks and services reusable                              │
│  ✅ Low coupling, high cohesion                              │
│  ✅ Scales easily with new features                          │
└──────────────────────────────────────────────────────────────┘
```

## Key Principles Applied

```
┌─────────────────────────────────────────────────────────────┐
│  1. Separation of Concerns                                  │
│     • UI in components                                      │
│     • State in hooks                                        │
│     • Logic in services                                     │
│     • Types separate                                        │
├─────────────────────────────────────────────────────────────┤
│  2. Single Responsibility                                   │
│     • Each file does ONE thing                              │
│     • Clear, focused purpose                                │
│     • Easy to understand                                    │
├─────────────────────────────────────────────────────────────┤
│  3. DRY (Don't Repeat Yourself)                            │
│     • Logic extracted to hooks                              │
│     • Services prevent duplication                          │
│     • Types defined once                                    │
├─────────────────────────────────────────────────────────────┤
│  4. Dependency Inversion                                    │
│     • Components depend on abstractions                     │
│     • Context provides interface                            │
│     • Easy to swap implementations                          │
├─────────────────────────────────────────────────────────────┤
│  5. Open/Closed Principle                                   │
│     • Open for extension                                    │
│     • Closed for modification                               │
│     • Add features without changing core                    │
└─────────────────────────────────────────────────────────────┘
```

## Directory Tree Visualization

```
src/
│
├── App.tsx ⭐ [70 lines - Entry point]
│
├── contexts/ 🔄 [Global State Management]
│   ├── ResumeContext.tsx      [Context definition]
│   └── ResumeProvider.tsx     [Provider implementation]
│
├── hooks/ 🎣 [State Management Hooks]
│   ├── useCertifications.ts   [Certifications CRUD]
│   ├── useEducations.ts       [Education CRUD]
│   ├── useExperiences.ts      [Experience CRUD]
│   ├── useFontOptions.ts      [Font customization]
│   ├── usePdfGeneration.ts    [PDF generation]
│   ├── useProjects.ts         [Projects CRUD]
│   ├── useResumeData.ts       [Header data]
│   ├── useResumeStats.ts      [Statistics]
│   ├── useSections.ts         [Section management]
│   ├── useSectionTitles.ts    [Title customization]
│   ├── useSkills.ts           [Skills management]
│   ├── useSocialLinks.ts      [Social links CRUD]
│   ├── useTheme.ts            [Theme management]
│   └── index.ts               [Exports]
│
├── services/ 💼 [Business Logic]
│   ├── atsService.ts          [ATS scoring]
│   ├── paymentService.ts      [Payment processing]
│   ├── pdfService.ts          [PDF operations]
│   └── index.ts               [Exports]
│
├── components/ 🎨 [UI Components]
│   ├── resume/ [Main Layout Components]
│   │   ├── AppHeader.tsx      [App header]
│   │   ├── ResumeContainer.tsx [Resume display]
│   │   └── ResumeSidebar.tsx  [Sidebar]
│   ├── payment/ [Payment Components]
│   ├── widgets/ [Widget Components]
│   ├── sections/ [Resume Sections]
│   ├── layout/ [Layout Components]
│   └── common/ [Shared Components]
│
├── types/ 📝 [TypeScript Types]
│   ├── common.ts
│   ├── experience.ts
│   ├── education.ts
│   ├── project.ts
│   ├── skill.ts
│   ├── certification.ts
│   └── payment.ts
│
├── utils/ 🔧 [Utilities]
│   ├── atsScoreCalculator.ts
│   ├── fontUtils.ts
│   ├── supabaseClient.ts
│   └── ...
│
└── styles/ 💅 [CSS Stylesheets]
    ├── components/
    ├── themes/
    └── index.css
```

---

**This architecture provides a scalable, maintainable, and professional codebase!** 🚀

