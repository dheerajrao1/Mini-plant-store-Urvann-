import React, { useState } from "react";

export default function Header({ user, onLogin, onRegister, onLogout }) {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    try {
      if (mode === "login") {
        const res = await onLogin(username, password);
        if (!res.ok) setMsg(res.message || "Login failed");
        else setOpen(false);
      } else {
        const res = await onRegister(username, password);
        if (!res.ok) setMsg(res.message || "Register failed");
        else {
          setMsg("Registered! You can login now.");
          setMode("login");
        }
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <header className="header">
      <h1 className="logo">🌿 Plant Catalog</h1>

      {!user ? (
        <div className="auth-actions">
          <button className="btn" onClick={() => { setMode("login"); setOpen(true); }}>
            Login / Signup
          </button>
        </div>
      ) : (
        <div className="auth-actions">
          <span className="welcome">Hi, {user.username} ({user.role})</span>
          <button className="btn btn-danger" onClick={onLogout}>Logout</button>
        </div>
      )}

      {/* Simple modal */}
      {open && (
        <div className="modal">
          <div className="modal-card">
            <div className="modal-header">
              <h3>{mode === "login" ? "Login" : "Signup"}</h3>
              <button className="close" onClick={() => setOpen(false)}>×</button>
            </div>
            <form onSubmit={submit} className="modal-body">
              <input
                className="input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {msg && <p className="error small">{msg}</p>}

              <button className="btn" disabled={busy} type="submit">
                {busy ? "Please wait…" : mode === "login" ? "Login" : "Signup"}
              </button>

              <p className="hint">
                {mode === "login" ? (
                  <>No account? <button type="button" className="link" onClick={() => setMode("register")}>Signup</button></>
                ) : (
                  <>Already registered? <button type="button" className="link" onClick={() => setMode("login")}>Login</button></>
                )}
              </p>

              <p className="hint">
                <strong>Admin demo:</strong> username <code>admin</code>, password <code>admin123</code>
              </p>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
