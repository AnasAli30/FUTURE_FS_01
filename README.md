# FUTURE_FS_01 — Personal Professional Portfolio Website

**Future Interns — Full Stack Web Development Internship (Track Code: FS)**  
**Task 1: Personal Professional Portfolio Website**

A responsive, high-performance personal portfolio website built with **React**, **Vite**, and **Node.js/Express**. Showcases verified public projects, interactive skill breakdowns, printable professional timeline, dynamic notes feed served via backend API, and a contact form with email notifications and server storage.

---

## 📋 Task Overview & Requirements (Future Interns Task 1)

According to the official **Future Interns Full Stack Web Development** specification:
- **Repository Name**: `FUTURE_FS_01` (Mandatory format: `FUTURE_FS_TaskNumber`)
- **Deliverable**: Live portfolio website with source code hosted in a public GitHub repository.
- **Frontend**: React + Vite (HTML5, modern CSS3 with custom design system, JavaScript/TypeScript, FontAwesome).
- **Backend**: Node.js + Express API for contact handling and dynamic notes feed.
- **Key Features Completed**:
  - ✔ Interactive portfolio & resume sections
  - ✔ Contact form with server-side validation, anti-spam honeypot, IP rate limiting, and email notifications (Nodemailer)
  - ✔ Dynamic API-driven notes/blog system (`GET /api/posts`)
  - ✔ Dark & Light mode switcher with `localStorage` persistence
  - ✔ SEO-friendly structure: semantic HTML5 tags, Open Graph meta tags, Twitter card, JSON-LD schema, `robots.txt`, and `sitemap.xml`
  - ✔ Fully responsive layout across mobile, tablet, and desktop screens

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Font Awesome icons
- **Backend**: Node.js, Express
- **Email Delivery**: Nodemailer (SMTP integration with Gmail or custom provider)
- **Data Persistence**: Local JSON file store (`data/messages.json`) with in-memory fallbacks
- **Security & Reliability**: Express rate limiter, CORS, bot honeypot protection, input sanitization

---

## 🚀 How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org) (v18 or higher recommended)
- `npm` (bundled with Node.js)
- `git`

### 1. Clone or Navigate to Project
```bash
cd portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
- **Frontend**: http://127.0.0.1:5173
- **Backend API**: http://127.0.0.1:3001
- The Vite dev server automatically proxies `/api` calls to Express.

### 4. Build and Run Production Server
```bash
npm run build
npm start
```
- Serves the compiled static frontend and API routes concurrently from port 3001.

---

## 📧 Contact Form & SMTP Configuration

The contact form works immediately without external services. Submitted messages are validated and saved to `data/messages.json`.

To enable live email forwarding to your inbox:
1. Copy `env.example` to `.env`:
   ```bash
   cp env.example .env
   ```
2. Fill in your SMTP credentials:
   ```env
   PORT=3001
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_gmail_app_password
   CONTACT_TO=your_email@gmail.com
   ```
*(For Gmail, generate an App Password under Google Account -> Security -> 2-Step Verification -> App Passwords).*

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Server health & uptime check |
| `GET` | `/api/posts` | Retrieve all notes / write-ups |
| `GET` | `/api/posts/:slug` | Retrieve single note by slug |
| `POST` | `/api/contact` | Validate, store contact inquiry, and forward via SMTP |

---

## 📤 How to Push to GitHub

Follow these exact steps to push this project to GitHub under the required repository name:

### Step 1: Create the GitHub Repository
1. Go to [GitHub: New Repository](https://github.com/new).
2. Repository name: **`FUTURE_FS_01`** *(exact required name for Task 1)*.
3. Set visibility to **Public** *(required for evaluation)*.
4. Do **not** initialize with a README, .gitignore, or license (already included in this project).
5. Click **Create repository**.

### Step 2: Push from Terminal
Run the following commands inside this project directory (`portfolio`):

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "feat: complete Future Interns Task 1 portfolio website"

# Rename branch to main
git branch -M main

# Link to your newly created GitHub repository (replace with your GitHub username)
git remote add origin https://github.com/AnasAli30/FUTURE_FS_01.git

# Push code to GitHub
git push -u origin main
```

---

## 🚀 Live Deployment Guide

You can deploy the application on **Vercel**, **Render**, or **Railway**:

1. **Option A — Full Stack on Render / Railway**:
   - Connect your GitHub repository `FUTURE_FS_01`.
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Add environment variables (`SMTP_HOST`, `SMTP_USER`, etc.) in the dashboard.

2. **Option B — Static on Vercel**:
   - Connect repository to Vercel.
   - Framework preset: `Vite`.
   - Output directory: `dist`.

---

## 💼 LinkedIn Announcement & Submission Guide

As specified in the **Future Interns** internship guidelines:
- **LinkedIn Headline**: Update to `Intern – Full stack Web Development`
- **Experience**: List `Future Interns` as your current organization.
- **Task Post**: Once deployed, share a post on LinkedIn including:
  - Brief overview of what you built
  - Key technical learnings & challenges solved
  - Screenshots or short clip of the UI
  - Links: Live website link and GitHub repository (`https://github.com/AnasAli30/FUTURE_FS_01`)
  - Tag **@Future Interns**
- **Portal Submission**: Submit through the official Task Submission Portal using your **CIN ID** when the portal opens.

---

## 👤 Author

- **Name**: Anas Ali
- **GitHub**: [@AnasAli30](https://github.com/AnasAli30)
- **Role**: Full-stack and Web3 Developer
- **Internship**: Future Interns — Full Stack Web Development (Track Code: FS)
