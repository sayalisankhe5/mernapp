import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import WelcomeLayout from "./components/Welcome/WelcomeLayout";
import WelcomeWebPage from "./components/Welcome/WelcomeWebPage";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeLayout />}>
        <Route index element={<WelcomeWebPage />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
