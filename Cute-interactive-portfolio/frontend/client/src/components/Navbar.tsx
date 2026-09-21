import { useEffect, useState } from "react";
import "../css/Navbar.css";

const SECTIONS = [
  { id: "about", label: "Tentang" },
  { id: "work", label: "Karya" },
  { id: "skills", label: "Keahlian" },
  { id: "contact", label: "Kontak" },
];

export default function Navbar() {
  const [active, setActive] = useState<string>("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a href="/" className="nav__mark">
        NNLS
      </a>

      <nav className="nav__links">
        {SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav__link ${active === id ? "nav__link--active" : ""}`}
          >
            {label}
          </a>
        ))}
      </nav>

      <a className="nav__cta" href="/cv.pdf" download>
        CV
      </a>
    </header>
  );
}
