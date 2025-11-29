# Quick Reference Guide - CVnly Refactored Codebase

## Directory Structure Quick View

```
src/
├── App.tsx                          # Main app (70 lines)
├── components/
│   ├── resume/                      # [NEW] Main layout components
│   │   ├── AppHeader.tsx           # Header with download/preview
│   │   ├── ResumeContainer.tsx     # Resume display
│   │   └── ResumeSidebar.tsx       # Widgets sidebar
│   ├── payment/                     # Payment components
│   ├── widgets/                     # Widget components
│   └── sections/                    # Resume sections
├── contexts/                        # [NEW] Global state
│   ├── ResumeContext.tsx           # Context definition
│   └── ResumeProvider.tsx          # Provider implementation
├── hooks/                           # [NEW] Custom hooks
│   ├── useCertifications.ts
│   ├── useEducations.ts
│   ├── useExperiences.ts
│   ├── useFontOptions.ts
│   ├── useProjects.ts
│   ├── useResumeData.ts
│   ├── useSections.ts
│   ├── useSectionTitles.ts
│   ├── useSkills.ts
│   ├── useSocialLinks.ts
│   ├── useTheme.ts
│   └── index.ts                     # Exports all hooks
├── services/                        # [NEW] Business logic
│   ├── atsService.ts               # ATS scoring
│   ├── paymentService.ts           # Payments
│   ├── pdfService.ts               # PDF operations
│   └── index.ts                     # Exports all services
├── types/                           # Type definitions
└── utils/                           # Utilities
```

## Common Tasks

### 1. Access Resume Data

```typescript
import { useResumeContext } from '../contexts/ResumeContext';

const MyComponent = () => {
  const { resumeData, experiences, skills } = useResumeContext();
  // Use the data
};
```

### 2. Update Resume Data

```typescript
const { setResumeData, addExperience, updateExperience } = useResumeContext();

// Update name/title
setResumeData({ name: 'John Doe', title: 'Developer' });

// Add experience
addExperience();

// Update experience
updateExperience(id, updatedData);
```

### 3. Use Services

```typescript
import { processPayment, analyzeResume, trackDownload } from '../services';

// Process payment
const result = await processPayment(params);

// Get ATS score
const score = analyzeResume(resumeData);

// Track download
await trackDownload(email, transactionId, resumeData);
```

### 4. Create a New Component

```typescript
import { useResumeContext } from '../contexts/ResumeContext';

const MyNewComponent = () => {
  const { /* what you need */ } = useResumeContext();
  
  return (
    <div>
      {/* Your UI */}
    </div>
  );
};

export default MyNewComponent;
```

### 5. Add Custom Hook

```typescript
// src/hooks/useMyFeature.ts
import { useState } from 'react';

export const useMyFeature = () => {
  const [state, setState] = useState(initialValue);
  
  const doSomething = () => {
    // Logic
  };
  
  return { state, doSomething };
};
```

## Available Context Data

```typescript
interface ResumeContextType {
  // Resume Data
  resumeData: { name: string; title: string };
  setResumeData: (data) => void;
  
  // Sections
  sections: ResumeSection[];
  moveSection: (index, direction) => void;
  deleteSection: (index) => void;
  updateSection: (index, section) => void;
  
  // Section Titles
  sectionTitles: Record<string, string>;
  updateSectionTitle: (sections, index, title) => void;
  
  // Skills
  skills: Skill[];
  setSkills: (skills) => void;
  
  // Experiences
  experiences: Experience[];
  addExperience: () => void;
  deleteExperience: (id) => void;
  updateExperience: (id, data) => void;
  
  // Education
  educations: Education[];
  addEducation: () => void;
  deleteEducation: (id) => void;
  
  // Projects
  projects: Project[];
  addProject: () => void;
  deleteProject: (id) => void;
  updateProject: (id, data) => void;
  
  // Certifications
  certifications: Certification[];
  addCertification: () => void;
  deleteCertification: (id) => void;
  updateCertification: (id, field, value) => void;
  
  // Social Links
  socialLinks: SocialLink[];
  addSocialLink: (type) => void;
  updateSocialLink: (id, value) => void;
  deleteSocialLink: (id) => void;
  
  // Font Options
  fontOptions: FontOptions;
  updateFontOption: (option, value) => void;
  
  // Theme
  activeTheme: 'light' | 'dark';
  applyTheme: (theme) => void;
}
```

## Available Services

### Payment Service
```typescript
// Process payment
processPayment(params: ProcessPaymentParams): Promise<PaymentResult>

// Verify payment
verifyPayment(transactionId: string): Promise<boolean>

// Get payment history
getPaymentHistory(userEmail: string): Promise<Payment[]>
```

### ATS Service
```typescript
// Analyze resume
analyzeResume(resumeData: ResumeAnalysisData): ATSScore

// Save score
saveATSScore(userEmail, score, resumeData): Promise<boolean>

// Get score history
getATSScoreHistory(userEmail: string): Promise<ATSScore[]>

// Compare with history
compareWithHistory(userEmail, currentScore): Promise<Comparison>
```

### PDF Service
```typescript
// Track download
trackDownload(userEmail, transactionId, resumeData): Promise<boolean>

// Get download count
getDownloadCount(transactionId: string): Promise<number>

// Increment count
incrementDownloadCount(transactionId: string): Promise<boolean>

// Check validity
isDownloadValid(transactionId: string): Promise<boolean>
```

## File Locations Quick Reference

| What | Where |
|------|-------|
| Main app | `src/App.tsx` |
| Context | `src/contexts/ResumeContext.tsx` |
| Provider | `src/contexts/ResumeProvider.tsx` |
| Custom hooks | `src/hooks/` |
| Services | `src/services/` |
| Components | `src/components/` |
| Types | `src/types/` |
| Utils | `src/utils/` |

## Import Patterns

```typescript
// Context
import { useResumeContext } from '../contexts/ResumeContext';

// Hooks (individual)
import { useExperiences } from '../hooks/useExperiences';

// Hooks (all)
import { useExperiences, useEducations } from '../hooks';

// Services (individual)
import { processPayment } from '../services/paymentService';

// Services (all)
import { processPayment, analyzeResume } from '../services';

// Components
import AppHeader from '../components/resume/AppHeader';

// Types
import { Experience } from '../types/experience';
```

## Development Workflow

### 1. Start Development
```bash
npm run dev
```

### 2. Build
```bash
npm run build
```

### 3. Preview Build
```bash
npm run preview
```

## Testing Checklist

- [ ] Build completes without errors
- [ ] App runs in dev mode
- [ ] Resume sections can be edited
- [ ] ATS score updates
- [ ] Payment modal opens
- [ ] PDF downloads
- [ ] Theme switching works
- [ ] Preview mode works

## Common Patterns

### Pattern 1: Using Context in Component
```typescript
import { useResumeContext } from '../contexts/ResumeContext';

const Component = () => {
  const { data, action } = useResumeContext();
  return <div onClick={action}>{data}</div>;
};
```

### Pattern 2: Calling Service
```typescript
import { serviceFn } from '../services';

const Component = () => {
  const handleAction = async () => {
    const result = await serviceFn(params);
    if (result.success) { /* success */ }
  };
  
  return <button onClick={handleAction}>Action</button>;
};
```

### Pattern 3: Creating Custom Hook
```typescript
import { useState, useEffect } from 'react';

export const useCustom = (deps) => {
  const [state, setState] = useState(initial);
  
  useEffect(() => {
    // Side effects
  }, [deps]);
  
  return { state, actions };
};
```

## Troubleshooting

### Build Errors
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Context Errors
- Ensure component is wrapped in `<ResumeProvider>`
- Check import path is correct
- Verify context is not undefined

### Service Errors
- Check Supabase client is configured
- Verify environment variables
- Check error logs in console

## Additional Resources

- **Full Architecture**: See `CODE_ARCHITECTURE.md`
- **Refactoring Summary**: See `REFACTORING_SUMMARY.md`
- **Original Code**: Backed up in `src/App.original.tsx`

---

**Quick Start**: Read this file → Review `CODE_ARCHITECTURE.md` → Start coding!

