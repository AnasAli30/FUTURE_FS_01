# Anas Ali — Personal Portfolio Website

A responsive, high-performance personal portfolio website built with **React**, **Vite**, and **Node.js/Express**. Showcases verified public projects, interactive skill breakdowns, printable professional timeline, dynamic notes feed served via backend API, and a contact form with email notifications and server storage.

---

## ✨ Features

- **Interactive Portfolio & Resume**: Filterable project showcases and printable professional timeline.
- **Contact Inquiries & Email Notifications**: Server-side validation, anti-spam honeypot, IP rate limiting, message persistence, and Nodemailer integration.
- **Dynamic API Notes**: REST API-driven notes and write-ups feed (`GET /api/posts`).
- **Dark & Light Mode**: Seamless theme switcher with `localStorage` persistence.
- **SEO & Performance**: Semantic HTML5 tags, Open Graph meta tags, Twitter card, JSON-LD schema, `robots.txt`, and `sitemap.xml`.
- **Responsive Layout**: Designed for mobile, tablet, and desktop screens.

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
- `npm`

### 1. Installation
```bash
npm install
```

### 2. Development Mode
```bash
npm run dev
```
- **Frontend**: http://127.0.0.1:5173
- **Backend API**: http://127.0.0.1:3001
- The Vite dev server automatically proxies `/api` calls to Express.

### 3. Production Build
```bash
npm run build
npm start
```
- Serves the compiled static frontend and API routes concurrently on `PORT` (default: 3001).

---

## 📧 Contact Form & SMTP Configuration

The contact form works immediately without external services, persisting submissions to `data/messages.json`.

To enable email notifications:
1. Copy `env.example` to `.env`:
   ```bash
   cp env.example .env
   ```
2. Configure your SMTP credentials:
   ```env
   PORT=3001
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_gmail_app_password
   CONTACT_TO=your_email@gmail.com
   ```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Server health & uptime check |
| `GET` | `/api/posts` | Retrieve all notes / write-ups |
| `GET` | `/api/posts/:slug` | Retrieve single note by slug |
| `POST` | `/api/contact` | Validate, store contact inquiry, and forward via SMTP |

---

## 🚀 Deployment

You can deploy the application on **Vercel**, **Render**, or **Railway**:

1. **Full Stack (Render / Railway)**:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Configure environment variables (`SMTP_HOST`, `SMTP_USER`, etc.) in dashboard.

2. **Static (Vercel)**:
   - Framework preset: `Vite`
   - Output directory: `dist`

---

## 👤 Author

- **Name**: Anas Ali
- **GitHub**: [@AnasAli30](https://github.com/AnasAli30)
- **Role**: Full-stack and Web3 Developer
