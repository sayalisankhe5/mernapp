import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import WelcomeLayout from "./components/Welcome/WelcomeLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeLayout />}></Route>
    </Routes>
  );
}

export default App;
