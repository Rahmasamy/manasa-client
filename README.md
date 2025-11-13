This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## Our Next Project Structure
src/
├── app/                     # Next.js App Router (routes, layouts, pages)
│   ├── (dashboard)/         # Route groups
│   ├── api/                 # API routes (Next.js server functions)
│   └── layout.tsx
│   └── page.tsx
│
├── components/              # UI components (stateless)
│   ├── ui/                  # Shared UI (buttons, inputs, modals)
│   ├── layout/              # Navbar, Sidebar, etc.
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
