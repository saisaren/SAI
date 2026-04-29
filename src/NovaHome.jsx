import React, { useState, useEffect } from "react";

export default function NovaHome() {
  /* =========================
     STATES
  ========================= */
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState("");

  // Focus Timer
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  /* =========================
     GREETING
  ========================= */
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  /* =========================
     TASKS
  ========================= */
  const addTask = () => {
    if (!input.trim()) return;

    setTasks([
      {
        id: Date.now(),
        title: input,
        done: false,
      },
      ...tasks,
    ]);

    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  };

  const completed = tasks.filter((task) => task.done).length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);

  /* =========================
     TIMER WITH ALARM
  ========================= */
  useEffect(() => {
    let timer;

    if (running) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else {
          if (minutes > 0) {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          } else {
            // Finished
            setRunning(false);
            setMinutes(0);
            setSeconds(0);

            const audio = new Audio(
              "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
            );

            audio.play();

            alert("⏰ Focus session complete!");
          }
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [running, minutes, seconds]);

  /* =========================
     UI
  ========================= */
  return (
    <div className="nova-shell">
      <div className="nova-glow"></div>

      {/* HEADER */}
   <header className="nova-header">
  <div className="brand">
    <img
      src="/Nova.png"
      alt="Nova Logo"
      className="brand-logo"
    />

    <div>
      <p className="muted">Welcome Back</p>

      <h1>Nova</h1>

      <span className="muted">
        Private productivity system
      </span>
    </div>
  </div>

  <button className="ghost-btn">
    Dashboard
  </button>
</header>

      <div className="nova-grid">
        {/* LEFT SIDE */}
        <div>
          {/* HERO */}
          <section className="hero-card">
            <div>
              <p className="muted small">MISSION</p>

              <h2>
                Design your day.
                <br />
                Protect your future.
              </h2>
            </div>

            <div className="ring">{progress}%</div>
          </section>

          {/* TASKS */}
          <section className="panel">
            <h3 className="section-title">
              Priority Flow
            </h3>

            <div className="task-row">
              <input
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                placeholder="Enter next priority..."
              />

              <button onClick={addTask}>
                Add
              </button>
            </div>

            <div className="task-list">
              {tasks.length === 0 ? (
                <div className="empty">
                  No priorities yet. Begin
                  intentionally.
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    className="task-card"
                    key={task.id}
                  >
                    <button
                      className="check"
                      onClick={() =>
                        toggleTask(task.id)
                      }
                    >
                      {task.done ? "✓" : ""}
                    </button>

                    <span
                      className={
                        task.done ? "done" : ""
                      }
                    >
                      {task.title}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* RIGHT SIDE */}
        <div>
          {/* DEEP FOCUS */}
          <section className="side-card">
            <h3 className="section-title">
              Deep Focus
            </h3>

            <div className="timer">
              {String(minutes).padStart(
                2,
                "0"
              )}
              :
              {String(seconds).padStart(
                2,
                "0"
              )}
            </div>

            <input
              type="number"
              min="1"
              className="focus-input"
              placeholder="Set Minutes"
              onChange={(e) => {
                setMinutes(
                  Number(e.target.value)
                );
                setSeconds(0);
              }}
            />

            <button
              className="primary-btn"
              onClick={() =>
                setRunning(true)
              }
            >
              Start
            </button>

            <button
              className="ghost-btn full-btn"
              onClick={() =>
                setRunning(false)
              }
            >
              Pause
            </button>

            <button
              className="ghost-btn full-btn"
              onClick={() => {
                setRunning(false);
                setMinutes(25);
                setSeconds(0);
              }}
            >
              Reset
            </button>
          </section>

          {/* NOTES */}
          <section
            className="side-card"
            style={{
              marginTop: "24px",
            }}
          >
            <h3 className="section-title">
              Thought Space
            </h3>

            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              placeholder="Write ideas, plans, reflections..."
            />
          </section>
        </div>
      </div>
    </div>
  );
}