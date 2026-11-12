import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faBars,
  faBolt,
  faCode,
  faEnvelope,
  faGamepad,
  faLayerGroup,
  faMoon,
  faPaperPlane,
  faPenNib,
  faPrint,
  faServer,
  faSun,
  faWallet,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { moreWork, profile, projects, record, skills } from "./data.js";

const skillIcons = {
  layer: faLayerGroup,
  code: faCode,
  server: faServer,
  wallet: faWallet,
  pen: faPenNib,
  bolt: faBolt,
};

const nav = [
  { href: "#work", label: "Work", icon: faGamepad },
  { href: "#about", label: "About", icon: faLayerGroup },
  { href: "#record", label: "Record", icon: faServer },
  { href: "#notes", label: "Notes", icon: faPenNib },
  { href: "#contact", label: "Contact", icon: faEnvelope },
];

function Icon({ icon }) {
  return <FontAwesomeIcon icon={icon} />;
}

export default function App() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || "light");
  const [open, setOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState(skills[0].name);
  const [filter, setFilter] = useState("All");
  const [posts, setPosts] = useState([]);
  const [openPost, setOpenPost] = useState(null);
  const [notesState, setNotesState] = useState("loading");
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState({ type: "idle", text: "" });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error("notes");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setPosts(data);
        setOpenPost(data[0]?.slug ?? null);
        setNotesState("ready");
      })
      .catch(() => {
        if (!cancelled) setNotesState("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filters = useMemo(() => {
    const tags = new Set(["All"]);
    projects.forEach((project) => project.stack.forEach((tag) => tags.add(tag)));
    return [...tags];
  }, []);

  const visible = projects.filter(
    (project) => filter === "All" || project.stack.includes(filter)
  );
  const skill = skills.find((item) => item.name === activeSkill) || skills[0];

  function onField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setStatus({ type: "sending", text: "Sending…" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not send.");
      setForm({ name: "", email: "", message: "", company: "" });
      setStatus({
        type: "ok",
        text: data.emailed
          ? "Message received and emailed."
          : "Message saved on the server. Email delivery is off until SMTP is configured.",
      });
    } catch (error) {
      setStatus({ type: "error", text: error.message || "Could not reach the server." });
    }
  }

  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <div className="shell">
        <aside className="rail">
          <a className="brand" href="#top">
            <span className="mark">A</span>
            <span>
              <strong>{profile.name}</strong>
              <small>{profile.role}</small>
            </span>
          </a>
          <nav className={open ? "nav open" : "nav"} aria-label="Sections">
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                <Icon icon={item.icon} />
                {item.label}
              </a>
            ))}
          </nav>
          <div className="rail-foot">
            <button
              type="button"
              className="icon-btn"
              aria-pressed={theme === "dark"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Icon icon={theme === "dark" ? faSun : faMoon} />
              <span>{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
            <div className="socials">
              <a href={profile.github} aria-label="GitHub" target="_blank" rel="noreferrer">
                <Icon icon={faGithub} />
              </a>
              <a href={profile.x} aria-label="X" target="_blank" rel="noreferrer">
                <Icon icon={faXTwitter} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <Icon icon={faEnvelope} />
              </a>
            </div>
          </div>
        </aside>

        <button
          type="button"
          className="menu"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon icon={open ? faXmark : faBars} />
        </button>

        <main id="content">
          <header className="hero" id="top">
            <h1>
              I build websites and products people can open.
            </h1>
            <p className="lede">
              I am {profile.name}. I ship full-stack web apps and, when the product needs a chain,
              wallet-connected tools. The work below is already public — games, dashboards, and mint sites —
              not placeholder case studies.
            </p>
            <div className="hero-actions">
              <a className="btn solid" href="#work">
                <Icon icon={faGamepad} /> See the work
              </a>
              <a className="btn" href="#contact">
                <Icon icon={faPaperPlane} /> Contact
              </a>
              <button type="button" className="btn" onClick={() => window.print()}>
                <Icon icon={faPrint} /> Print record
              </button>
            </div>
            <p className="stamp">Open to collaborate</p>
          </header>

          <section id="work" aria-labelledby="work-title">
            <div className="section-head">
              <h2 id="work-title">Selected work</h2>
              <p>Projects I can describe from the live product or the repository itself.</p>
            </div>
            <div className="filters" role="tablist" aria-label="Filter projects">
              {filters.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  role="tab"
                  aria-selected={filter === tag}
                  className={filter === tag ? "chip on" : "chip"}
                  onClick={() => setFilter(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="cards">
              {visible.map((project) => (
                <article className="card" key={project.title}>
                  <div className="card-top">
                    <span>{project.year}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <p>{project.summary}</p>
                  <ul className="tags">
                    {project.stack.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <div className="card-links">
                    <a href={project.href} target={project.internal ? undefined : "_blank"} rel="noreferrer">
                      <Icon icon={faArrowUpRightFromSquare} /> Live
                    </a>
                    <a href={project.repo} target="_blank" rel="noreferrer">
                      <Icon icon={faGithub} /> Code
                    </a>
                  </div>
                </article>
              ))}
            </div>
            {visible.length === 0 && <p className="empty">Nothing in this filter.</p>}

            <h3 className="subhead">Also live</h3>
            <ul className="directory">
              {moreWork.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    <Icon icon={faArrowUpRightFromSquare} />
                    <span>{item.title}</span>
                    <small>{item.stack}</small>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section id="about" className="split" aria-labelledby="about-title">
            <div>
              <h2 id="about-title">About</h2>
              <p>
                I work from India and publish as <a href={profile.github}>{profile.handle}</a> on GitHub
                and <a href={profile.x}>@anasxdev</a> on X. The public profile describes the focus as
                decentralized apps, smart contracts, Farcaster mini-apps, and Layer 2 work — plus an
                interest in Solana and autonomous agents.
              </p>
              <p>
                This page is the readable version of that record: what shipped, which stack it used, and
                how to reach me. Descriptions stay inside what the live sites and repositories already say.
              </p>
            </div>
            <div>
              <h3 className="subhead">Skills, with a source</h3>
              <div className="skill-list">
                {skills.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    className={item.name === skill.name ? "skill on" : "skill"}
                    onClick={() => setActiveSkill(item.name)}
                    aria-pressed={item.name === skill.name}
                  >
                    <Icon icon={skillIcons[item.icon]} />
                    {item.name}
                  </button>
                ))}
              </div>
              <p className="skill-note" aria-live="polite">
                {skill.detail}
              </p>
            </div>
          </section>

          <section id="record" aria-labelledby="record-title">
            <div className="section-head">
              <h2 id="record-title">Record</h2>
              <p>No invented job titles. This is the public timeline I can stand behind.</p>
            </div>
            <ol className="timeline">
              {record.map((item) => (
                <li key={item.title}>
                  <span>{item.when}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p className="role">{item.role}</p>
                    <p>{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="notes" aria-labelledby="notes-title">
            <div className="section-head">
              <h2 id="notes-title">Notes</h2>
              <p>Short write-ups served by the API, so the backend is part of the site.</p>
            </div>
            {notesState === "loading" && <p className="empty">Loading notes…</p>}
            {notesState === "error" && (
              <p className="empty">
                Notes appear when the API is running. Start it with <code>npm run dev</code> or{" "}
                <code>npm start</code>.
              </p>
            )}
            <div className="notes">
              {posts.map((post) => (
                <article key={post.slug} className={openPost === post.slug ? "note open" : "note"}>
                  <button type="button" onClick={() => setOpenPost(post.slug)}>
                    <time dateTime={post.date}>{post.date}</time>
                    <strong>{post.title}</strong>
                    <span>{post.summary}</span>
                  </button>
                  {openPost === post.slug && (
                    <div className="note-body">
                      <p>{post.body}</p>
                      <ul className="tags">
                        {post.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section id="contact" aria-labelledby="contact-title">
            <div className="section-head">
              <h2 id="contact-title">Contact</h2>
              <p>
                Email <a href={`mailto:${profile.email}`}>{profile.email}</a>, or send a note through the
                form. Messages are stored by the API and emailed when SMTP is configured.
              </p>
            </div>
            <form className="form" onSubmit={onSubmit} noValidate>
              <label className="trap">
                Company
                <input
                  name="company"
                  value={form.company}
                  onChange={onField}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
              <label>
                Name
                <input name="name" value={form.name} onChange={onField} autoComplete="name" required />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onField}
                  autoComplete="email"
                  required
                />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  rows="6"
                  value={form.message}
                  onChange={onField}
                  required
                />
              </label>
              <button className="btn solid" type="submit" disabled={status.type === "sending"}>
                <Icon icon={faPaperPlane} />
                {status.type === "sending" ? "Sending" : "Send message"}
              </button>
              {status.text && (
                <p className={status.type === "error" ? "form-status bad" : "form-status"} role="status">
                  {status.text}
                </p>
              )}
            </form>
          </section>

          <footer>
            <p>
              <Icon icon={faCode} /> {profile.name} · {profile.location}
            </p>
            <p>Built for Future Interns full-stack Task 1, 2026.</p>
          </footer>
        </main>
      </div>
    </>
  );
}
