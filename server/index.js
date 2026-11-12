import cors from "cors";
import express from "express";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";
import posts from "./posts.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

try {
  const envFile = fsSync.readFileSync(path.join(root, ".env"), "utf8");
  for (const line of envFile.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const eq = trimmed.indexOf("=");
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
} catch {
  // .env is optional
}
const dataFile = path.join(root, "data", "messages.json");
const dist = path.join(root, "dist");
const isProd = process.env.NODE_ENV === "production";
const PORT = Number(process.env.PORT) || 3001;

const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(express.json({ limit: "32kb" }));

const hits = new Map();

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length) {
    return forwarded.split(",")[0].trim();
  }
  return req.ip || "local";
}

function tooMany(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60 * 60 * 1000);
  if (recent.length >= 5) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function clean(value, max) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function readMessages() {
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function mailMessage(entry) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return false;

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Portfolio" <${user}>`,
    to: process.env.CONTACT_TO || user,
    replyTo: entry.email,
    subject: `Portfolio message from ${entry.name}`,
    text: `${entry.name} <${entry.email}>\n\n${entry.message}`,
  });
  return true;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "anas-ali-portfolio" });
});

app.get("/api/posts", (_req, res) => {
  res.json(posts);
});

app.get("/api/posts/:slug", (req, res) => {
  const post = posts.find((item) => item.slug === req.params.slug);
  if (!post) {
    res.status(404).json({ error: "Note not found." });
    return;
  }
  res.json(post);
});

app.post("/api/contact", async (req, res) => {
  if (tooMany(clientIp(req))) {
    res.status(429).json({ error: "Too many messages. Try again in a little while." });
    return;
  }

  const trap = clean(req.body?.company, 200);
  if (trap) {
    res.json({ ok: true, emailed: false });
    return;
  }

  const name = clean(req.body?.name, 80);
  const email = clean(req.body?.email, 120);
  const message = clean(req.body?.message, 2000);

  if (name.length < 2) {
    res.status(400).json({ error: "Add your name." });
    return;
  }
  if (!validEmail(email)) {
    res.status(400).json({ error: "Add a valid email so I can reply." });
    return;
  }
  if (message.length < 10) {
    res.status(400).json({ error: "Write a short message (at least 10 characters)." });
    return;
  }

  const entry = {
    id: `${Date.now()}`,
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };

  try {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    const existing = await readMessages();
    existing.push(entry);
    await fs.writeFile(dataFile, JSON.stringify(existing, null, 2));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not store the message." });
    return;
  }

  let emailed = false;
  try {
    emailed = await mailMessage(entry);
  } catch (error) {
    console.error(error);
  }

  res.json({ ok: true, emailed });
});

if (isProd) {
  app.use(express.static(dist));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(dist, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`API listening on http://127.0.0.1:${PORT}`);
});
