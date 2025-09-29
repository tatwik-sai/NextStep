# Internship/Industrial Training Platform

## Overview

A centralized digital platform streamlining the entire internship lifecycle for educational institutions. Replaces fragmented manual processes (WhatsApp, emails, spreadsheets) with an automated system benefiting students, placement cells, mentors, and recruiters.

**Problem Statement ID:** SIH25106 | **Category:** Software

---

## Quick Setup & Fix

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Tailwind CSS (if not working properly)

```bash
npm install -D tailwindcss postcss autoprefixer
```

### 3. Set Up Environment Variables

Create `.env.local`:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 4. Run the Development Server

```bash
npm run dev
```

[Visit NextStep](https://next-step-iota-tan.vercel.app/)

---


## Ngrok Setup

1. **Create an account and download Ngrok**
2. Open CMD and run the following commands (Get the credentials from website):

```bash
ngrok config add-authtoken <YOUR_AUTH_TOKEN>
```

3. Choose the Static Domain and run the command:

```bash
ngrok http --url=<YOUR_STATIC_URL> 8747
```

---

## Clerk Setup

1. **Create an account on Clerk**
2. Create a new application with email and Google enabled
3. Copy and store the **PUBLIC** and **SECRET** key
4. Go to **Configure > Webhooks**
5. Add a new endpoint with the Ngrok static URL, subscribe to user events, and create it
6. Copy the **Signing Secret** provided


---
## Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/          # Role-based dashboards
│   ├── internships/        # Internship listings
│   ├── applications/       # Application management
│   └── api/                # API routes
├── components/             # Reusable React components
│   ├── StudentProfile/
│   ├── MentorDashboard/
│   ├── PlacementCell/
│   └── RecruiterPanel/
├── context/                # React context (Auth)
├── lib/                    # Utilities & helpers
│   ├── db.js               # Database connections
│   └── pdf-generator.js    # Certificate generation
├── models/                 # MongoDB schemas
└── public/                 # Static assets
```

---

## Features

* **Student Portal** - Digital profiles, smart internship recommendations, real-time application tracking, certificate downloads
* **Mentor Dashboard** - One-click approval/rejection, centralized application view
* **Placement Cell** - Real-time analytics, advanced filtering, automated reporting (eliminates spreadsheets)
* **Recruiter Panel** - Pre-screened candidates, simplified posting, feedback system

---

## System Workflow

1. **Student Registration** → Creates profile (Name, Dept, Resume, Skills, CGPA)
2. **Internship Posting** → Placement Cell/Recruiter posts opportunities
3. **Smart Application** → Students apply to matched internships → Status: *Pending*
4. **Mentor Approval** → Approve/Reject → Status updated
5. **Placement Monitoring** → Real-time dashboard (X applied, Y approved, Z pending)
6. **Recruiter Shortlisting** → Shortlist → Status: *Selected for Interview*
7. **Completion & Feedback** → Recruiter uploads feedback → Status: *Completed*
8. **Auto Certificate** → PDF certificate generated & downloadable

---

## Styling

**Tech:** Tailwind CSS with custom theme

**Color Scheme:**

* Primary: `#19183B` (Dark Navy)
* Secondary: `#708993` (Teal)
* Accent: `#A1C2BD` (Light Teal)
* Background: `#E7F2EF` (Light Mint)

---

## Troubleshooting

**Styling Issues:**

1. Run `npm install` to ensure all dependencies are installed
2. Clear cache: `rm -rf .next` and restart
3. Reinstall Tailwind: `npm install -D tailwindcss postcss autoprefixer`

**Development Issues:**

1. Use Node.js 16+ and npm 7+
2. Verify MongoDB connection string in `.env.local`
3. Check Clerk API keys are correct

**Database Issues:**

1. Verify MongoDB URI
2. Check IP whitelist (if using Atlas)
3. Test with MongoDB Compass

---

## Available Scripts

* `npm run dev` → Start development server
* `npm run build` → Build for production
* `npm run start` → Start production server
* `npm run lint` → Code quality checks

---

## Dependencies

### Core

* Next.js 15.5.4
* React 19.1.1
* Node.js & Express
* TypeScript 5.9.2

### Database & Auth

* MongoDB & Mongoose
* Clerk (Authentication)

### UI & Styling

* Tailwind CSS 3.4.0
* Lucide React (icons)
* PostCSS & Autoprefixer

### State & Utils

* Zustand (State Management)
* PDF-lib (Certificates)
* Axios (API calls)

### Development

* ESLint, Prettier
* TypeScript types for Node/React

---

## Technical Approach

* **Frontend:** Next.js, Tailwind CSS, Zustand
* **Backend:** Express, Node.js
* **Authentication:** Clerk (role-based access)
* **Database:** MongoDB (Student, Internship, Application, Mentor, Feedback, Certificate models)
* **Deployment:** Vercel (frontend), Render (backend)

---

## Impact & Benefits

**Students:** Transparent process, equal access, no more chasing signatures  
**Mentors:** One-click approvals, centralized tracking, no email chains  
**Placement Cell:** Saves hundreds of hours, eliminates spreadsheets, paperless process  
**Recruiters:** Pre-screened candidates, simplified hiring, structured feedback

---

## Feasibility

**Technical:** Modern stack, open-source libraries, low cost, scalable  
**Viability:** Freemium model, addresses real pain points, high adoption potential  
**Challenges:** Data security (role-based access), user adoption (official channel mandate), sustainability (premium features)

---
