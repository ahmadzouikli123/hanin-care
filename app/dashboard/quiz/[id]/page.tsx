"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const BG = "#060910";
const SURFACE = "#0d1117";
const ACCENT = "#00ff87";
const MUTED = "#64748b";
const TEXT = "#e2e8f0";
const BORDER = "rgba(255,255,255,0.07)";
const RED = "#ff4757";
const GREEN = "#00ff87";

const questions = [
  { question: "What is a bug in software testing?", options: ["A planned feature", "An error or defect in the software", "A design document"], answer: 1 },
  { question: "What does QA stand for?", options: ["Quality Assurance", "Quick Access", "Query Analysis"], answer: 0 },
  { question: "What is regression testing?", options: ["Testing new features only", "Testing after fixing bugs to ensure nothing broke", "Testing UI design"], answer: 1 },
  { question: "What is a test case?", options: ["Steps to verify functionality", "A bug report", "A deployment script"], answer: 0 },
  { question: "What does UAT stand for?", options: ["User Acceptance Testing", "Universal App Testing", "User Automation Tool"], answer: 0 },
  { question: "What is smoke testing?", options: ["Testing for performance", "A preliminary test to check basic functionality", "Security testing"], answer: 1 },
  { question: "What is the difference between verification and validation?", options: ["They are the same", "Verification checks the process, validation checks the product", "Validation checks the process, verification checks the product"], answer: 1 },
  { question: "What is a test plan?", options: ["A document outlining the testing strategy and scope", "A list of bugs", "A deployment checklist"], answer: 0 },
  { question: "What is black-box testing?", options: ["Testing with knowledge of internal code", "Testing without knowledge of internal code", "Testing hardware components"], answer: 1 },
  { question: "What is white-box testing?", options: ["Testing without knowledge of internal code", "Testing with knowledge of internal code", "Testing UI only"], answer: 1 },
  { question: "What is exploratory testing?", options: ["Automated testing", "Unscripted testing where tester explores the application", "Performance testing"], answer: 1 },
  { question: "What does SDLC stand for?", options: ["Software Development Life Cycle", "System Design Logic Check", "Software Deployment Launch Control"], answer: 0 },
  { question: "What is a test suite?", options: ["A collection of test cases", "A single test case", "A bug tracking tool"], answer: 0 },
  { question: "What is boundary value analysis?", options: ["Testing at the boundaries of input ranges", "Testing random values", "Testing database connections"], answer: 0 },
  { question: "What is equivalence partitioning?", options: ["Dividing inputs into equivalent classes to reduce test cases", "Testing all possible inputs", "Splitting code into modules"], answer: 0 },
  { question: "What is load testing?", options: ["Testing how many bugs exist", "Testing system performance under expected load", "Testing UI responsiveness"], answer: 1 },
  { question: "What is stress testing?", options: ["Testing beyond normal capacity to find breaking point", "Testing under normal conditions", "Testing with a small dataset"], answer: 0 },
  { question: "What is a defect lifecycle?", options: ["The stages a bug goes through from discovery to closure", "The software release cycle", "The QA hiring process"], answer: 0 },
  { question: "What is sanity testing?", options: ["Full regression after a major change", "A quick check to verify a specific function works after a fix", "Performance benchmarking"], answer: 1 },
  { question: "What does API stand for?", options: ["Application Programming Interface", "Automated Program Integration", "Applied Process Index"], answer: 0 },
  { question: "What is usability testing?", options: ["Testing how easy the software is to use", "Testing server response time", "Testing code coverage"], answer: 0 },
  { question: "What is the purpose of a bug report?", options: ["To document a defect so it can be reproduced and fixed", "To approve a release", "To plan a sprint"], answer: 0 },
  { question: "What is test coverage?", options: ["The percentage of code exercised by tests", "The number of testers on a project", "The time taken to run tests"], answer: 0 },
  { question: "What is a test environment?", options: ["The setup where testing is performed", "The production server", "A developer's local machine only"], answer: 0 },
  { question: "What is performance testing?", options: ["Testing functionality", "Evaluating system speed, scalability, and stability", "Testing user interfaces"], answer: 1 },
  { question: "What is security testing?", options: ["Checking for vulnerabilities and unauthorized access", "Testing login UI design", "Checking color contrast"], answer: 0 },
  { question: "What is compatibility testing?", options: ["Testing across different browsers, OS, and devices", "Testing one browser only", "Testing database schemas"], answer: 0 },
  { question: "What is a mock object in testing?", options: ["A simulated object that mimics real dependencies", "A real database record", "A production server"], answer: 0 },
  { question: "What is unit testing?", options: ["Testing the entire application", "Testing individual components or functions", "Testing user flows"], answer: 1 },
  { question: "What is integration testing?", options: ["Testing individual units in isolation", "Testing how different modules work together", "Testing the final product with end users"], answer: 1 },
  { question: "What is end-to-end testing?", options: ["Testing one function", "Testing the complete user workflow from start to finish", "Testing database queries"], answer: 1 },
  { question: "What is a flaky test?", options: ["A test that always fails", "A test that passes and fails inconsistently", "A test with no assertions"], answer: 1 },
  { question: "What does CI/CD stand for?", options: ["Continuous Integration / Continuous Delivery", "Code Inspection / Code Deployment", "Component Integration / Component Design"], answer: 0 },
  { question: "What is test-driven development (TDD)?", options: ["Writing tests after code", "Writing tests before writing the code", "Testing only in production"], answer: 1 },
  { question: "What is the purpose of a test report?", options: ["To summarize testing activities and results", "To plan future features", "To document server configurations"], answer: 0 },
  { question: "What is a critical bug severity?", options: ["Minor cosmetic issue", "A defect that crashes the system or blocks major functionality", "A spelling mistake in UI"], answer: 1 },
  { question: "What is accessibility testing?", options: ["Checking if the app works for users with disabilities", "Testing mobile screen sizes", "Load testing"], answer: 0 },
  { question: "What is a test stub?", options: ["A placeholder that simulates a module not yet developed", "A completed module", "A test result"], answer: 0 },
  { question: "What is the V-model in testing?", options: ["A testing model where each development phase has a corresponding test phase", "A performance testing framework", "An agile methodology"], answer: 0 },
  { question: "What is retesting?", options: ["Re-running all tests", "Testing a specific bug after it has been fixed", "Running tests on a new feature"], answer: 1 },
  { question: "What is a release candidate?", options: ["A version ready for final testing before production release", "A developer's local build", "A test environment backup"], answer: 0 },
  { question: "What is mutation testing?", options: ["Changing requirements during testing", "Modifying code slightly to check if tests catch the changes", "Testing on different operating systems"], answer: 1 },
  { question: "What is a test harness?", options: ["A collection of software used to run tests automatically", "A physical testing device", "A bug tracking tool"], answer: 0 },
  { question: "What is risk-based testing?", options: ["Testing everything equally", "Prioritizing tests based on risk and impact", "Testing only low-risk areas"], answer: 1 },
  { question: "What is severity vs priority in bug tracking?", options: ["They always mean the same thing", "Severity is the impact of the bug; priority is how urgently it should be fixed", "Priority is the impact; severity is urgency"], answer: 1 },
  { question: "What is static testing?", options: ["Running the application to find bugs", "Reviewing code or documents without executing the program", "Automated UI testing"], answer: 1 },
  { question: "What is dynamic testing?", options: ["Reviewing code without running it", "Executing the software to find defects", "Analyzing requirements only"], answer: 1 },
  { question: "What is code review in QA?", options: ["Running automated tests", "Manually examining source code to find errors", "Deploying code to production"], answer: 1 },
  { question: "What is a test oracle?", options: ["A tool that predicts test results", "A mechanism to determine whether a test passed or failed", "A testing database"], answer: 1 },
  { question: "What is agile testing?", options: ["Testing done only at the end of a project", "Testing integrated throughout the agile development cycle", "Manual testing without any planning"], answer: 1 },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [time, setTime] = useState(600);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return;
    const timer = setInterval(() => setTime((t) => {
      if (t <= 1) { setFinished(true); return 0; }
      return t - 1;
    }), 1000);
    return () => clearInterval(timer);
  }, [finished]);

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === questions[current].answer) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (current + 1 >= questions.length) { setFinished(true); return; }
    setCurrent((c) => c + 1);
    setSelected(null);
  };

  const restart = () => {
    setCurrent(0); setScore(0);
    setSelected(null); setTime(600); setFinished(false);
  };

  const progress = ((current + 1) / questions.length) * 100;
  const mins = Math.floor(time / 60);
  const secs = String(time % 60).padStart(2, "0");
  const pct = Math.round((score / questions.length) * 100);

  // ── FINISHED SCREEN ──
  if (finished) {
    const passed = pct >= 70;
    return (
      <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: "Arial, sans-serif", display: "flex", flexDirection: "column" }}>
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(6,9,16,0.92)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${BORDER}` }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
            <span style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: ACCENT, letterSpacing: 2 }}>QA_PLATFORM</span>
          </Link>
        </nav>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 20px 40px" }}>
          <div style={{ textAlign: "center", maxWidth: 500, width: "100%" }}>
            <div style={{ fontSize: 72, marginBottom: 16 }}>{passed ? "🏆" : "📝"}</div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: ACCENT, textTransform: "uppercase", letterSpacing: 3, marginBottom: 16 }}>
              // Quiz Complete
            </div>
            <h1 style={{ fontSize: 56, fontWeight: 900, letterSpacing: -2, marginBottom: 8, color: passed ? ACCENT : TEXT }}>
              {pct}%
            </h1>
            <p style={{ color: MUTED, fontFamily: "monospace", fontSize: 14, marginBottom: 48 }}>
              You answered {score} out of {questions.length} questions correctly
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 48 }}>
              {[
                { label: "Correct", value: score, color: GREEN },
                { label: "Wrong", value: questions.length - score, color: RED },
                { label: "Score", value: `${pct}%`, color: passed ? GREEN : "#f59e0b" },
              ].map((item) => (
                <div key={item.label} style={{ padding: "20px 12px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 10, textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: item.color, fontFamily: "monospace" }}>{item.value}</div>
                  <div style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 1, marginTop: 4 }}>{item.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={restart} style={{ padding: "14px 32px", background: ACCENT, color: "#000", fontFamily: "monospace", fontSize: 13, fontWeight: 700, border: "none", borderRadius: 8, cursor: "pointer", textTransform: "uppercase", letterSpacing: 1 }}>
                Try Again →
              </button>
              <Link href="/" style={{ padding: "14px 32px", border: `1px solid ${BORDER}`, color: MUTED, fontFamily: "monospace", fontSize: 13, textDecoration: "none", borderRadius: 8, textTransform: "uppercase", letterSpacing: 1, display: "inline-flex", alignItems: "center" }}>
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ SCREEN ──
  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: "Arial, sans-serif" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(6,9,16,0.92)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${BORDER}` }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
          <span style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: ACCENT, letterSpacing: 2 }}>QA_PLATFORM</span>
        </Link>
        {/* Timer */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "monospace", fontSize: 14, color: time < 60 ? RED : MUTED }}>
          <span style={{ fontSize: 16 }}>⏱</span>
          {mins}:{secs}
        </div>
      </nav>

      {/* PROGRESS BAR */}
      <div style={{ position: "fixed", top: 64, left: 0, right: 0, height: 3, background: BORDER, zIndex: 99 }}>
        <div style={{ height: "100%", width: `${progress}%`, background: ACCENT, transition: "width 0.4s ease", boxShadow: `0 0 10px ${ACCENT}` }} />
      </div>

      {/* MAIN */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "110px 24px 60px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: ACCENT, textTransform: "uppercase", letterSpacing: 3 }}>
            // QA Quiz
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 12, color: MUTED }}>
            <span style={{ color: TEXT, fontWeight: 700 }}>{current + 1}</span> / {questions.length}
          </div>
        </div>

        {/* Question Card */}
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "40px 36px", marginBottom: 20 }}>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: MUTED, textTransform: "uppercase", letterSpacing: 2, marginBottom: 20 }}>
            Question {current + 1}
          </div>
          <h2 style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 700, lineHeight: 1.4, color: TEXT, marginBottom: 0 }}>
            {questions[current].question}
          </h2>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
          {questions[current].options.map((option, index) => {
            let bg = SURFACE;
            let borderColor = BORDER;
            let textColor = TEXT;
            let icon = "";

            if (selected !== null) {
              if (index === questions[current].answer) {
                bg = "rgba(0,255,135,0.08)";
                borderColor = "rgba(0,255,135,0.5)";
                textColor = GREEN;
                icon = "✓";
              } else if (index === selected) {
                bg = "rgba(255,71,87,0.08)";
                borderColor = "rgba(255,71,87,0.5)";
                textColor = RED;
                icon = "✗";
              }
            }

            return (
              <button key={index} onClick={() => handleAnswer(index)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", padding: "18px 24px",
                  background: bg, border: `1px solid ${borderColor}`,
                  borderRadius: 10, cursor: selected !== null ? "default" : "pointer",
                  transition: "all 0.2s", textAlign: "left", color: textColor,
                  fontFamily: "Arial, sans-serif", fontSize: 15,
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 12, color: selected !== null ? borderColor : MUTED, minWidth: 24 }}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </div>
                {icon && <span style={{ fontSize: 18, fontWeight: 700, color: textColor }}>{icon}</span>}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        {selected !== null && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={nextQuestion} style={{
              padding: "14px 32px", background: ACCENT, color: "#000",
              fontFamily: "monospace", fontSize: 13, fontWeight: 700,
              border: "none", borderRadius: 8, cursor: "pointer",
              textTransform: "uppercase", letterSpacing: 1,
            }}>
              {current + 1 >= questions.length ? "See Results →" : "Next Question →"}
            </button>
          </div>
        )}

        {/* Score tracker */}
        <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 32 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: GREEN, fontFamily: "monospace" }}>{score}</div>
            <div style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 1 }}>Correct</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: RED, fontFamily: "monospace" }}>{current - score}</div>
            <div style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 1 }}>Wrong</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: MUTED, fontFamily: "monospace" }}>{questions.length - current - 1}</div>
            <div style={{ fontSize: 11, color: MUTED, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 1 }}>Remaining</div>
          </div>
        </div>

      </div>
    </div>
  );
}
