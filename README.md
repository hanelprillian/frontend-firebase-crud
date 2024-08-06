# Next.js Firebase CRUD

This project is a Next.js application that demonstrates CRUD (Create, Read, Update, Delete) operations using Firebase as the backend.


## Folder Structure

```
frontend-firebase-crud/
├── public/
├── src/
│   ├── app/
│   │   ├── (api)/
│   │   │   └── api/
│   │   │       └── issues/
│   │   ├── (components)/
│   │   ├── (issues)/
│   │   │   ├── (components)/
│   │   │   └── (hooks)/
│   │   └── layout.tsx
│   └── lib/
│       └── services/
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## Tech Stack

### Frontend
- Next.js
- Firebase
- Tailwind CSS
- TypeScript
- Framer Motion

### Backend
- Firebase (Firestore for database, Storage for file uploads)

## Features

- Create, Read, Update, and Delete issues
- Image upload for issues
- Filtering and sorting of issues
- Server-side rendering with Next.js
- API routes for backend operations
- Framer Motion for animations
- Responsive design
- Framer Motion for animations


## How to Run
1. Clone the repository
2. Install the dependencies
   ```
   npm install
   ```
3. Run the development server
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## API Documentation

### GET /api/issues

- Response: Array of Issue objects

### POST /api/issues

- Request body: Issue object (without id)
- Response: Issue object (with id)


### GET /api/issues/[id]
- Retrieves a specific issue by ID
- Response: Issue object


### PUT /api/issues/[id]

- Request body: Partial<Issue>
- Response: { message: string }


## Issue Object Structure

```typescript
type Issue = {
  id: string;
  imageUri: string;
  title: string;
  issueNumber: string;
  issueDate: string;
};
```

## Demo URL

[Demo URL not provided in the given information]

Note: To run this project, you'll need to set up your own Firebase project and add the necessary environment variables for Firebase configuration.