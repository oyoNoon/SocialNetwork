// export default Register;
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState(null);
  const [suc, setSuc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!inputs.username.trim()) return "Please enter a username.";
    if (!inputs.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      return "Please enter a valid email address.";
    if (inputs.password.length < 6)
      return "Password must be at least 6 characters.";
    if (inputs.password !== inputs.confirmPassword)
      return "Passwords do not match.";
    if (!inputs.name.trim()) return "Please enter your name.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setSuc(null);

    const clientErr = validate();
    if (clientErr) {
      setErr(clientErr);
      return;
    }

    setLoading(true);
    try {
      const { username, email, password, name } = inputs;
      const res = await axios.post("http://localhost:8800/api/auth/register", {
        username,
        email,
        password,
        name,
      });
      setSuc(res.data || "Registration successful! Redirecting to login…");
      // optional: brief delay then go to login
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      setErr(error?.response?.data || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Create your account.</h1>
          <p>
            Join the community to save your work, follow creators, and pick up
            right where you left off—across any device.
          </p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button type="button">Sign in</button>
          </Link>
        </div>

        <div className="right">
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Choose a username"
                autoComplete="username"
                value={inputs.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={inputs.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
                value={inputs.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="password-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  value={inputs.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle"
                  onClick={() => setShowPwd((s) => !s)}
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="field">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPwd ? "text" : "password"}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                value={inputs.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {err && (
              <p className="error" role="alert" aria-live="assertive">
                {err}
              </p>
            )}
            {suc && (
              <p className="success" role="status" aria-live="polite">
                {suc}
              </p>
            )}

            <div className="actions">
              <button type="submit" disabled={loading}>
                {loading ? "Creating account…" : "Create account"}
              </button>
              {/* <Link to="/terms">Terms</Link> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
