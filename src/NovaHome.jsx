import React, { useEffect, useState } from "react";
import "./lifedock.css";

export default function NovaHome() {
  const [quote, setQuote] = useState("");
  const quotes = [
    "Focus deeper. Build better days.",
    "Small wins become strong lives.",
    "Consistency beats intensity.",
    "Protect your attention.",
    "Momentum starts now."
  ];

  useEffect(() => {
    setQuote(
      quotes[Math.floor(Math.random() * quotes.length)]
    );
  }, []);

  return (
    <div className="nova-shell">
      <div className="nova-glow"></div>

      <header className="nova-header">
        <div className="brand">
          <img
            src="/Nova.png"
            alt="Nova"
            className="brand-logo"
          />

          <div>
            <p className="muted small">
              PRIVATE PRODUCTIVITY SYSTEM
            </p>
            <h1>Nova</h1>
            <span className="muted">
              Designed for clarity & execution
            </span>
          </div>
        </div>

        <button className="ghost-btn">
          Today
        </button>
      </header>

      <section className="hero-card lift">
        <div>
          <p className="muted small">
            DAILY FOCUS
          </p>

          <h2>{quote}</h2>

          <p className="muted hero-sub">
            Remove friction. Build rhythm.
            Keep promises to yourself.
          </p>
        </div>

        <div className="ring pulse">
          Ready
        </div>
      </section>

      <div className="nova-grid">
        <div className="panel lift">
          <div className="section-title">
            Priority Tasks
          </div>

          <div className="task-row">
            <input placeholder="What matters most today?" />
            <button>Add</button>
          </div>

          <div className="empty">
            No tasks yet. Add one meaningful step.
          </div>
        </div>

        <div className="side-card lift">
          <div className="section-title">
            Deep Focus
          </div>

          <div className="timer">
            25:00
          </div>

          <button className="primary-btn">
            Start Session
          </button>
        </div>

        <div className="panel lift">
          <div className="section-title">
            Notes
          </div>

          <textarea placeholder="Capture ideas, plans, reflections..." />
        </div>

        <div className="side-card lift">
          <div className="section-title">
            System Status
          </div>

          <p className="muted">
            Private. Secure. Built for focus.
          </p>

          <div className="status-dot-row">
            <span className="dot"></span>
            Online
          </div>
        </div>
      </div>
    </div>
  );
}