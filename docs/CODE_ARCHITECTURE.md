# CVnly - Code Architecture Documentation

## Overview
This document describes the refactored, modular architecture of the CVnly resume builder application.

## Architecture Pattern
The codebase follows a **Component-Based Architecture** with **Context API** for state management, organized into clear layers:

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (React Components, UI)                 │
├─────────────────────────────────────────┤
│         State Management Layer          │
│  (Context API, Custom Hooks)            │
├─────────────────────────────────────────┤
│         Business Logic Layer            │
│  (Services)                             │
├─────────────────────────────────────────┤
│         Data Layer                      │
│  (Supabase, Types)                      │
└─────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── components/              # React components
│   ├── common/             # Shared/reusable components
│   ├── layout/             # Layout components (Header, Footer)
│   ├── payment/            # Payment-related components
│   ├── resume/             # Resume-specific components
│   │   ├── AppHeader.tsx           # Application header
│   │   ├── ResumeContainer.tsx     # Main resume display
│   │   └── ResumeSidebar.tsx       # Sidebar with widgets
│   ├── sections/           # Resume section components
│   └── widgets/            # Widget components (ATS, Font Control)
│
├── contexts/               # React Context providers
│   ├── ResumeContext.tsx           # Context definition
│   └── ResumeProvider.tsx          # Context provider implementation
│
├── hooks/                  # Custom React hooks
│   ├── useCertifications.ts        # Certifications state management
│   ├── useEducations.ts            # Education state management
│   ├── useExperiences.ts           # Experience state management
│   ├── useFontOptions.ts           # Font customization
│   ├── usePdfGeneration.ts         # PDF generation logic
│   ├── useProjects.ts              # Projects state management
│   ├── useResumeData.ts            # Resume header data
│   ├── useResumeStats.ts           # Resume statistics
│   ├── useSections.ts              # Section management
│   ├── useSectionTitles.ts         # Section title management
│   ├── useSkills.ts                # Skills state management
│   ├── useSocialLinks.ts           # Social links management
│   └── useTheme.ts                 # Theme (light/dark mode)
│
├── services/               # Business logic layer
│   ├── atsService.ts               # ATS scoring logic
│   ├── paymentService.ts           # Payment processing
│   ├── pdfService.ts               # PDF generation & tracking
│   └── index.ts                    # Service exports
│
├── types/                  # TypeScript type definitions
│   ├── achievement.ts
│   ├── certification.ts
│   ├── common.ts
│   ├── education.ts
│   ├── experience.ts
│   ├── hobby.ts
│   ├── payment.ts
│   ├── project.ts
│   └── skill.ts
│
├── utils/                  # Utility functions
│   ├── atsScoreCalculator.ts       # ATS score calculation
│   ├── fontUtils.ts                # Font utilities
│   ├── getThemeClasses.ts          # Theme class helpers
│   ├── iconUtils.ts                # Icon utilities
│   └── supabaseClient.ts           # Supabase client
│
├── styles/                 # CSS stylesheets
│   ├── components/                 # Component-specific styles
│   ├── themes/                     # Theme styles
│   └── index.css                   # Main styles
│
└── App.tsx                 # Main application component (refactored)
```

## Key Design Principles

### 1. Separation of Concerns
- **Components**: Pure UI presentation, minimal logic
- **Hooks**: Encapsulated state management and side effects
- **Services**: Business logic isolated from UI
- **Types**: Strong typing throughout the application

### 2. Single Responsibility
Each module has a single, well-defined purpose:
- `useExperiences` manages only experience-related state
- `paymentService` handles only payment processing
- `ResumeContainer` renders only the resume content

### 3. Dependency Inversion
- Components depend on abstractions (hooks, context)
- Services can be swapped without affecting components
- Database layer abstracted through services

### 4. DRY (Don't Repeat Yourself)
- Repeated logic extracted into custom hooks
- Common UI patterns in shared components
- Type definitions prevent duplication

## Core Modules

### 1. Context Layer (`contexts/`)

**ResumeContext.tsx**
- Defines the shape of the global state
- Type-safe context interface
- Used by all components needing resume data

**ResumeProvider.tsx**
- Implements the context provider
- Orchestrates all custom hooks
- Provides state and actions to child components

**Usage:**
```typescript
import { useResumeContext } from '../contexts/ResumeContext';

const MyComponent = () => {
  const { resumeData, updateName } = useResumeContext();
  // Use context data and actions
};
```

### 2. Custom Hooks Layer (`hooks/`)

Each hook manages a specific domain of state:

**State Management Hooks:**
- `useResumeData` - Resume header (name, title)
- `useSections` - Section ordering and visibility
- `useSectionTitles` - Section title customization
- `useSkills` - Skills management
- `useExperiences` - Work experience entries
- `useEducations` - Education entries
- `useProjects` - Project entries
- `useCertifications` - Certification entries
- `useSocialLinks` - Contact information

**UI/Configuration Hooks:**
- `useFontOptions` - Font customization
- `useTheme` - Light/dark mode
- `usePdfGeneration` - PDF export logic

**Benefits:**
- ✅ Reusable across components
- ✅ Testable in isolation
- ✅ Encapsulates complex state logic
- ✅ Clear dependencies

### 3. Services Layer (`services/`)

**paymentService.ts**
```typescript
// Process payments through various gateways
processPayment(params: ProcessPaymentParams): Promise<PaymentResult>

// Verify payment status
verifyPayment(transactionId: string): Promise<boolean>

// Get user's payment history
getPaymentHistory(userEmail: string): Promise<Payment[]>
```

**atsService.ts**
```typescript
// Analyze resume and calculate ATS score
analyzeResume(resumeData: ResumeAnalysisData): ATSScore

// Save ATS score to database
saveATSScore(userEmail: string, score: ATSScore): Promise<boolean>

// Get score history
getATSScoreHistory(userEmail: string): Promise<ATSScore[]>

// Compare with historical data
compareWithHistory(userEmail: string, currentScore: number)
```

**pdfService.ts**
```typescript
// Track PDF downloads
trackDownload(userEmail: string, transactionId: string): Promise<boolean>

// Get download count
getDownloadCount(transactionId: string): Promise<number>

// Increment download count
incrementDownloadCount(transactionId: string): Promise<boolean>

// Check download validity (30 days, 5 downloads)
isDownloadValid(transactionId: string): Promise<boolean>
```

**Benefits:**
- ✅ Business logic separate from UI
- ✅ Easy to test
- ✅ Can be used in multiple contexts
- ✅ Database operations abstracted

### 4. Component Layer (`components/`)

**Modular Components:**

**AppHeader.tsx**
- Top navigation bar
- Payment and download buttons
- Preview mode toggle

**ResumeContainer.tsx**
- Renders the actual resume
- Handles all resume sections
- Manages page breaks and rulers
- Preview mode support

**ResumeSidebar.tsx**
- ATS Score Widget
- Font Control Panel
- Line Break Tool
- Resume Sections Widget

**Benefits:**
- ✅ Small, focused components
- ✅ Easy to understand and maintain
- ✅ Reusable across different layouts
- ✅ Clear prop interfaces

## Data Flow

### State Management Flow
```
User Action
    ↓
Component Event Handler
    ↓
Context Action (via useResumeContext)
    ↓
Custom Hook Updates State
    ↓
Context Provider Notifies Subscribers
    ↓
Components Re-render with New Data
```

### Service Integration Flow
```
Component
    ↓
Service Function Call
    ↓
Business Logic Execution
    ↓
Database Operation (Supabase)
    ↓
Result Returned to Component
    ↓
UI Update
```

## Example: Adding a New Feature

Let's say you want to add a "Languages" section:

### Step 1: Define Types
```typescript
// src/types/language.ts
export interface Language {
  id: string;
  name: string;
  proficiency: 'Basic' | 'Intermediate' | 'Advanced' | 'Native';
}
```

### Step 2: Create Custom Hook
```typescript
// src/hooks/useLanguages.ts
export const useLanguages = (sections, updateSection) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  
  const addLanguage = () => { /* ... */ };
  const deleteLanguage = (id: string) => { /* ... */ };
  const updateLanguage = (id: string, data: Language) => { /* ... */ };
  
  return { languages, addLanguage, deleteLanguage, updateLanguage };
};
```

### Step 3: Add to Context
```typescript
// src/contexts/ResumeProvider.tsx
const { languages, addLanguage, deleteLanguage, updateLanguage } = 
  useLanguages(sections, updateSection);

// Add to contextValue
```

### Step 4: Create Component
```typescript
// src/components/sections/LanguagesSection/LanguagesSection.tsx
const LanguagesSection = ({ languages, addLanguage, ... }) => {
  // Render languages
};
```

### Step 5: Use in ResumeContainer
```typescript
case 'languages':
  return <LanguagesSection {...props} />;
```

## State Management Strategy

### Global State (Context)
Used for:
- Resume data (name, title, sections)
- Skills, experiences, education, projects, certifications
- Social links
- Font options
- Theme preferences

### Local State
Used for:
- UI-specific state (modals, dropdowns)
- Form inputs
- Temporary values

### Server State
Managed through services:
- Payment records
- ATS scores
- Download tracking

## Performance Optimizations

1. **Lazy Loading**: Components loaded as needed
2. **Memoization**: Expensive calculations cached
3. **Context Splitting**: Could split into multiple contexts if needed
4. **Ref Usage**: Direct DOM access for PDF generation
5. **Event Delegation**: Efficient event handling

## Testing Strategy

### Unit Tests
- Test hooks in isolation
- Test service functions
- Test utility functions

### Integration Tests
- Test component + hook integration
- Test service + database integration

### E2E Tests
- Test complete user flows
- Test payment process
- Test PDF generation

## Migration Guide

### From Old to New Architecture

**Before (Old App.tsx):**
```typescript
// 833 lines of code
// All state management in one file
// Mixed UI and business logic
```

**After (Refactored):**
```typescript
// App.tsx: ~70 lines (clean entry point)
// Logic split across:
//   - 11 custom hooks
//   - 3 service modules
//   - 3 container components
```

### Benefits of Migration

1. **Maintainability**: Easier to find and fix bugs
2. **Scalability**: Easy to add new features
3. **Testability**: Each module can be tested independently
4. **Readability**: Clear separation of concerns
5. **Reusability**: Hooks and services can be reused
6. **Team Collaboration**: Multiple developers can work simultaneously

## Best Practices

### When to Create a New Hook
- Logic is reused in multiple components
- State management becomes complex
- Side effects need to be encapsulated

### When to Create a New Service
- Business logic doesn't depend on React
- Multiple components need the same logic
- Database operations need abstraction

### When to Create a New Component
- A component exceeds 200 lines
- A piece of UI is reused
- Logic can be separated

## Common Patterns

### Custom Hook Pattern
```typescript
export const useFeature = (dependencies) => {
  const [state, setState] = useState(initialState);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  const action = () => {
    // Logic
  };
  
  return { state, action };
};
```

### Service Pattern
```typescript
export const serviceFunction = async (params) => {
  try {
    // Business logic
    const result = await database.operation();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error };
  }
};
```

### Context Provider Pattern
```typescript
export const FeatureProvider = ({ children }) => {
  // Use hooks
  const hookData = useHook();
  
  // Compose context value
  const contextValue = { ...hookData };
  
  return (
    <FeatureContext.Provider value={contextValue}>
      {children}
    </FeatureContext.Provider>
  );
};
```

## Future Improvements

1. **State Management**: Consider Redux or Zustand for very complex state
2. **API Layer**: Add API client abstraction
3. **Error Boundary**: Add error boundaries for better error handling
4. **Loading States**: Global loading state management
5. **Caching**: Implement request caching
6. **Optimistic Updates**: Update UI before server confirmation
7. **Offline Support**: Add service worker for offline functionality

## Conclusion

The refactored architecture provides:
- ✅ Clear separation of concerns
- ✅ Maintainable and scalable codebase
- ✅ Easy to test and debug
- ✅ Better developer experience
- ✅ Prepared for future growth

The codebase is now **production-ready** and **team-friendly**!

---

**Last Updated**: November 29, 2025  
**Version**: 2.0 (Refactored)

