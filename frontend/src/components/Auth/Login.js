import { useRef, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/authSlice";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = await login({ username, password }).unwrap();
    dispatch(setCredentials({ accessToken }));
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <section>
      <header></header>
      <main></main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          className=""
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          className=""
          id="password"
          value={password}
          type="password"
          onChange={handlePasswordChange}
          required
        />
      </form>
    </section>
  );
};

export default Login;
