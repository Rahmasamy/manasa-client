# Manasa Client

An educational platform frontend built with **Next.js** and **React**, providing courses, articles, academic resources, and professional services to learners.

---

## 🎯 Overview

Manasa is a comprehensive e-learning and knowledge-sharing platform that offers:

- 🎓 **Online Courses** - Structured lessons with progression tracking
- 📖 **Articles & Blog** - Educational content and tutorials
- 📚 **Electronic Library** - Digital resource repository
- 🏆 **Certifications** - Course completion certificates
- 👨‍🏫 **Trainer Profiles** - Expert instructors and educational consultants
- 🛠️ **Services** - Professional support and consulting
- 📊 **Dashboard** - Admin & instructor content management
- 🔐 **Authentication** - Secure user accounts with profiles

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/Rahmasamy/manasa-client.git
cd manasa-client

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## 📋 Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 16.0+ with App Router
- **UI Library:** [React](https://react.dev) 19.2
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Icons:** [Lucide React](https://lucide.dev)
- **Charts:** [Recharts](https://recharts.org)
- **Data Management:** 
  - [React Query](https://tanstack.com/query/latest) - Server state
  - [Zustand](https://github.com/pmndrs/zustand) - Client state
- **HTTP Client:** [Axios](https://axios-http.com)
- **UI Components:** [Radix UI](https://www.radix-ui.com)
- **Carousel:** [Embla Carousel](https://www.embla-carousel.com)
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app)
- **RTL Support:** [tailwindcss-rtl](https://github.com/20lives/tailwindcss-rtl)

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (root)/                   # Public pages (home, courses, articles, etc.)
│   │   ├── page.tsx               # Homepage
│   │   ├── about/                 # About us
│   │   ├── courses/               # Courses listing & details
│   │   ├── single-course/         # Individual course view
│   │   ├── articles/              # Blog articles
│   │   ├── academic/              # Academic resources
│   │   ├── electronic-library/    # Digital library
│   │   ├── certificate/           # Certificates
│   │   ├── profile/               # User profiles
│   │   └── auth/                  # Login/Register
│   ├── (dashboard)/              # Admin/Instructor routes
│   │   ├── layout.tsx
│   │   └── dashboard/             # Dashboard home
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
│
├── components/                   # Reusable React Components
│   ├── ui/                       # Atomic UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── input-otp.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── SideBar.tsx
│   │   └── DashboardNavbar.tsx
│   ├── layout/                   # Layout components
│   │   ├── About-us/
│   │   ├── Articles/
│   │   ├── CoursePage/
│   │   ├── auth/
│   │   └── ...
│   ├── dashboard/                # Dashboard-specific components
│   │   ├── DataTable.tsx          # Reusable data table
│   │   ├── AddCourseModal.tsx
│   │   ├── AddArticleModal.tsx
│   │   ├── AddLessonModal.tsx
│   │   ├── FileUpload.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── LineChart.tsx
│   │   └── ...
│   ├── domain/                   # Feature-specific components
│   │   ├── CourseCardComponent/
│   │   ├── ArticleContent/
│   │   ├── QuestionComponent/
│   │   ├── TrainerCard/
│   │   ├── ServiceComponent/
│   │   └── ...
│   └── providers/                # Context providers
│
├── contexts/                     # React Contexts
│   ├── AuthContext.tsx           # Authentication state
│   └── ...
│
├── hooks/                        # Custom React Hooks
│   └── ...
│
├── infrastructure/               # External services & APIs
│   ├── api/                      # API client configuration
│   └── prisma/                   # Database schema & migrations
│
├── domain/                       # Business logic (clean architecture)
│   ├── models/                   # Data models/interfaces
│   ├── repositories/             # Data access layer
│   └── usecases/                 # Business use cases
│
├── lib/                          # Utilities & Helpers
│   ├── config/                   # Configuration
│   ├── consts/                   # Constants
│   └── utils/                    # Helper functions
│
├── types/                        # TypeScript type definitions
│   ├── courses/
│   ├── dashboard/
│   ├── services/
│   └── ...
│
├── styles/                       # CSS modules & additional styles
│   └── ...
│
└── utils/                        # General utility functions

components.json                   # Shadcn/ui configuration
tailwind.config.cjs              # Tailwind CSS config
tsconfig.json                    # TypeScript config
next.config.ts                   # Next.js config
postcss.config.cjs               # PostCSS config
```

---

## 🎨 Key Features

### Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/courses` | Browse all courses |
| `/single-course/[id]` | Individual course details & lessons |
| `/articles` | Blog & articles section |
| `/academic` | Academic guides & resources |
| `/electronic-library` | Digital resource library |
| `/certificate` | View certificates |
| `/profile` | User profile page |
| `/auth` | Authentication (login/register) |
| `/dashboard` | Admin/Instructor dashboard |

### Components Highlights

- **DataTable** - Reusable table for managing content
- **Modals** - Add course, article, lesson, library items, sections, services
- **File/Image Upload** - Content media management
- **Charts & Analytics** - Dashboard analytics visualization
- **Sidebar & Navigation** - Responsive navigation menu
- **Search & Filter** - Course and content filtering

---

## 🔐 Authentication & Security

- User authentication via `/auth` routes
- Protected dashboard routes via `(dashboard)` route group
- Auth context for state management
- Authorization checks for sensitive operations

---

## 🌍 Internationalization

The project supports **multiple languages** using **next-intl** and includes **RTL (Right-to-Left) support** for Arabic and other RTL languages via **tailwindcss-rtl**.

---

## 📱 Responsive Design

Built with **Tailwind CSS** for a fully responsive design that adapts to:
- Desktop devices
- Tablets
- Mobile phones

---

## 🛠️ Development Workflow

### Creating New Features

1. **Create page/component** in appropriate directory
2. **Define TypeScript types** in `src/types/`
3. **Add API calls** using Axios in `src/infrastructure/api/`
4. **Manage state** with Zustand or React Query
5. **Build UI components** using Tailwind + Radix UI
6. **Test in dev server** (`npm run dev`)

### File Naming Conventions

- **Pages:** `page.tsx`
- **Components:** PascalCase (e.g., `CourseCard.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useCourses.ts`)
- **Utils:** camelCase (e.g., `formatDate.ts`)
- **Types:** PascalCase (e.g., `CourseType.ts`)

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub, connect Vercel
# Auto-deploys on push to main branch
```

### Manual Deployment

```bash
npm run build
npm start
```

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

---

## 📝 License

ISC License - See LICENSE file for details

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

## 📧 Support

For issues and inquiries, visit the [GitHub Issues page](https://github.com/Rahmasamy/manasa-client/issues)

---

**Made with ❤️ by the Manasa Team**
│   └── domain/              # Domain-specific UI
│
├── features/                # Feature-based modules
│   ├── auth/
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── types.ts
│   ├── assessments/
│   │   ├── components/
│   │   ├── services/
│   │   └── model.ts
│   └── index.ts
│
├── domain/                  # Core business logic (entities, interfaces)
│   ├── models/              # Pure data models (no Next.js or React)
│   ├── repositories/        # Abstract interfaces for data sources
│   └── usecases/            # Business rules (pure functions)
│
├── infrastructure/          # Data access & external integrations
│   ├── api/                 # Axios/fetch clients, backend adapters
│   ├── prisma/              # Prisma setup (if using)
│   └── repositories/        # Implementations of domain repositories
│
├── hooks/                   # Global custom hooks
├── lib/                     # Utilities, helpers, constants
├── styles/                  # Global CSS / Tailwind
├── types/                   # Shared TypeScript types
└── utils/                   # Formatting, validation, etc.
