import { useEffect, useRef, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/authSlice";
import usePersist from "../../hooks/usePersist";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [persist, setPersist] = usePersist();
  const [login, { isLoading }] = useLoginMutation();
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setError("");
  }, [username, password]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setError("No Server Response");
      } else if (err.status === 400) {
        setError("Missing Username or Password");
      } else if (err.status === 401) {
        setError("Unauthorized");
      } else {
        setError(err.data?.message);
      }

      errRef.current.focus();
    }
  };
  const errClass = error ? "errmsg" : "offscreen";
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePersistChange = () => setPersist((prev) => !prev);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <section className="public">
          <header>
            <h1>Employee Login</h1>
          </header>
          <main className="login">
            <p ref={errRef} className={errClass} aria-live="assertive">
              {error}
            </p>
            <form className="form" onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                className="form__input"
                id="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                required
                ref={userRef}
              />
              <label htmlFor="password">Password</label>
              <input
                className="form__input"
                id="password"
                value={password}
                type="password"
                onChange={handlePasswordChange}
                required
              />
              <button className="form__submit-button">Sign In</button>
              <label htmlFor="persistToggle" className="form__persist">
                <input
                  className="form__checkbox"
                  id="persistToggle"
                  checked={persist}
                  onChange={handlePersistChange}
                  type="checkbox"
                />{" "}
                Trust this device
              </label>
            </form>
          </main>
          <footer>
            <Link to="/">Back to home</Link>
          </footer>
        </section>
      )}
    </>
  );
};

export default Login;
