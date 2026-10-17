import { useEffect, useState } from "react";
import { profile, about, facts, education, skills, projects } from "./data";
import "./App.css";

const sections = ["about", "skills", "projects", "contact"];

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("show"), io.unobserve(e.target))),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActive() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((id) => io.observe(document.getElementById(id)));
    return () => io.disconnect();
  }, []);
  return active;
}

function Photo() {
  const [ok, setOk] = useState(true);
  return (
    <div className="photo-box">
      {ok ? (
        <img src={profile.photo} alt={profile.name} onError={() => setOk(false)} />
      ) : (
        <div className="photo-fallback">{profile.name[0]}</div>
      )}
    </div>
  );
}

function Heading({ label, title, light }) {
  return (
    <div className={`heading reveal ${light ? "light" : ""}`}>
      <span>{label}</span>
      <h2>{title}</h2>
    </div>
  );
}

export default function App() {
  useReveal();
  const active = useActive();
  const [menu, setMenu] = useState(false);
  const [form, setForm] = useState({ name: "", message: "" });

  const send = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(`${form.message}\n\n${form.name}`);
    window.location.href = `mailto:${profile.email}?subject=Message%20from%20${encodeURIComponent(form.name)}&body=${body}`;
  };

  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <a href="#home" className="brand">{profile.name}<i>.</i></a>
          <button className="burger" onClick={() => setMenu(!menu)}>{menu ? "Close" : "Menu"}</button>
          <nav className={menu ? "open" : ""}>
            {sections.map((s) => (
              <a key={s} href={`#${s}`} className={active === s ? "on" : ""} onClick={() => setMenu(false)}>{s}</a>
            ))}
            <a className="nav-cta" href={profile.resume} target="_blank" rel="noreferrer">Resume</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="wrap hero-in">
            <div className="hero-text">
              <p className="status"><span /> Available for work</p>
              <h1>Hi, I'm <b>{profile.name}</b>.<br />A {profile.role} from Delhi.</h1>
              <p className="lead">{profile.intro}</p>
              <div className="btns">
                <a className="btn amber" href="#projects">View my work</a>
                <a className="btn ghost" href="#contact">Get in touch</a>
              </div>
              <div className="mini">
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a href={`mailto:${profile.email}`}>Email</a>
              </div>
            </div>
            <Photo />
          </div>
        </section>

        <section id="about" className="sec">
          <div className="wrap">
            <Heading label="About" title="A little about me" />
            <div className="about reveal">
              <div className="about-text">{about.map((p, i) => <p key={i}>{p}</p>)}</div>
              <div className="panel">
                <dl>
                  {facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                </dl>
              </div>
            </div>
            <h3 className="sub reveal">Education</h3>
            <div className="edu reveal">
              {education.map((e) => (
                <div key={e.title}><b>{e.title}</b><span>{e.sub}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="sec cream">
          <div className="wrap">
            <Heading label="Skills" title="What I work with" />
            <div className="skill-grid">
              {skills.map((g, i) => (
                <div className={`skill-card c${i}`} key={g.group}>
                  <h3>{g.group}</h3>
                  <div className="chips">{g.items.map((it) => <span key={it}>{it}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="sec">
          <div className="wrap">
            <Heading label="Projects" title="Things I've built" />
            <div className="cards">
              {projects.map((p, i) => (
                <article className="card reveal" key={p.title}>
                  <div className="shot">
                    {p.image ? <img src={p.image} alt={p.title} /> : <><em>0{i + 1}</em><span>{p.title}</span></>}
                  </div>
                  <div className="card-body">
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                    <div className="tags">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
                    <div className="card-links">
                      <a href={p.live} target="_blank" rel="noreferrer">Live demo →</a>
                      <a href={p.code} target="_blank" rel="noreferrer">Source code</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="sec dark">
          <div className="wrap">
            <Heading label="Contact" title="Let's work together" light />
            <div className="contact reveal">
              <div>
                <p className="c-text">I'm open to developer roles and internships. Send me a message and I'll reply as soon as I can.</p>
                <ul className="info">
                  <li><span>Email</span><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
                  <li><span>Phone</span>{profile.phone}</li>
                  <li><span>Location</span>{profile.location}</li>
                </ul>
              </div>
              <form onSubmit={send}>
                <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
                <label>Message<textarea required rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>
                <button className="btn amber" type="submit">Send message</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap foot-in">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a> · <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></span>
        </div>
      </footer>
    </>
  );
}