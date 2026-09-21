import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/start.css";

export default function StartPage() {
   const navigate = useNavigate();
  return (
    <main className="start">
      <div className="start__noise" aria-hidden="true" />

      <motion.p
        className="start__eyebrow"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Halo, saya
      </motion.p>

      <motion.h1
        className="start__name"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Nama Kamu
      </motion.h1>

      <motion.p
        className="start__tagline"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Saya merancang dan membangun produk digital — dari ide di kertas
        sampai kode yang jalan di production.
      </motion.p>

      <motion.div
        className="start__actions"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <a
          className="start__btn start__btn--primary"
          href="/cv.pdf"
          download
        >
          <span>Download CV</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2v8m0 0L4.5 6.5M8 10l3.5-3.5M3 13h10"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <button
          type="button"
          className="start__btn start__btn--secondary"
          onClick={() => navigate("/portfolio")}
        >
          <span>Lihat Portfolio</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10m0 0L9 4m4 4l-4 4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </motion.div>
    </main>
  );
}
