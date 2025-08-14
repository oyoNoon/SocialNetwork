// export default Login;
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Make inputs controlled; no debounce (keeps cursor/IMEs happy)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login(inputs);
      navigate("/");
    } catch (error) {
      setErr(error?.response?.data || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Welcome Back.</h1>
          <p>
            Access your account to continue exploring, creating, and connecting.
            Your dashboard, projects, and community are just a click away.
          </p>
          <span>New here? Join us today.</span>
          <Link to="/register">
            <button type="button">Register</button>
          </Link>
        </div>

        <div className="right">
          <h1>Sign in to your account</h1>

          <form onSubmit={handleLogin} noValidate>
            <div className="field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                autoComplete="username"
                required
                value={inputs.username}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                value={inputs.password}
                onChange={handleChange}
              />
            </div>

            {err && (
              <p className="error" role="alert">
                {err}
              </p>
            )}

            <div className="actions">
              <button type="submit" disabled={loading}>
                {loading ? "Signing you in…" : "Sign In"}
              </button>
              <Link to="/forgot">Forgot your password?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
