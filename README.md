# CVnly - Professional Resume Builder

A modern, ATS-optimized resume builder with real-time scoring, multiple professional templates, and advanced customization options.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to start building your resume!

## ✨ Key Features

- **📊 Real-time ATS Score** - Get instant feedback on your resume's ATS compatibility
- **🎨 6 Professional Templates** - Classic, Modern, Two-Column, Minimal, Creative, Executive
- **✏️ Live Editing** - Edit directly on the resume with instant preview
- **🎯 Quick Wins** - Actionable suggestions to improve your ATS score
- **📈 Progress Tracker** - Track completion of essential resume sections
- **🎨 Full Customization** - Fonts, colors, layouts, and section ordering
- **📄 PDF Export** - Download professional, print-ready PDFs
- **💡 Smart Tips** - Context-aware advice based on your resume content

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Detailed setup instructions
- **[Features Showcase](FEATURES_SHOWCASE.md)** - Complete feature walkthrough
- **[Implementation Details](IMPLEMENTATION_SUMMARY.md)** - Technical implementation
- **[Quick Reference](QUICK_REFERENCE.md)** - Common tasks and shortcuts

### Technical Documentation

- [Code Architecture](docs/CODE_ARCHITECTURE.md) - Project structure and patterns
- [Architecture Diagram](docs/ARCHITECTURE_DIAGRAM.md) - Visual system overview
- [Payment Integration](docs/PAYMENT_INTEGRATION.md) - Payment system setup
- [Database Setup](docs/DATABASE_SETUP.md) - Supabase configuration

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context API + Custom Hooks
- **Backend:** Supabase (Database + Auth)
- **PDF Generation:** Puppeteer / html2pdf.js
- **Drag & Drop:** @hello-pangea/dnd

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── common/         # Shared components
│   ├── layout/         # Layout components
│   ├── resume/         # Resume-specific components
│   ├── sections/       # Resume sections
│   ├── templates/      # Resume templates
│   └── widgets/        # Sidebar widgets
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── services/           # Business logic services
├── styles/             # CSS files
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🎯 Available Templates

1. **📄 Classic** - Traditional single-column with centered header
2. **✨ Modern** - 70/30 two-column with gradient header
3. **📊 Two-Column Pro** - Dark left sidebar (35/65 split)
4. **⚪ Minimal** - Clean with maximum whitespace
5. **🎨 Creative** - Colorful gradient header
6. **👔 Executive** - Premium with decorative borders

## 🔧 Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📦 Build Output

Production builds are output to the `dist/` directory and are optimized for:
- Fast loading times
- SEO optimization
- Cross-browser compatibility
- Print-friendly PDFs

## 🤝 Contributing

This project uses a modular architecture with:
- **Custom hooks** for state management
- **Context API** for global state
- **Service layer** for business logic
- **Component-based design** for reusability

See [Code Architecture](docs/CODE_ARCHITECTURE.md) for detailed guidelines.

## 📝 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

Built with modern web technologies and best practices for professional resume building.

---

**Need help?** Check out the [Quick Start Guide](QUICKSTART.md) or [Features Showcase](FEATURES_SHOWCASE.md)!

