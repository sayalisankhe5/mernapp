import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import WelcomeLayout from "./components/Welcome/WelcomeLayout";
import WelcomeWebPage from "./components/Welcome/WelcomeWebPage";
import Login from "./components/Auth/Login";
import DashLayout from "./components/Dashboard/DashLayout";
import WelcomeUser from "./components/Auth/WelcomeUser";
import NotesList from "./components/Notes/NotesList";
import UsersList from "./components/Users/UsersList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeLayout />}>
        <Route index element={<WelcomeWebPage />} />
        <Route path="login" element={<Login />} />

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<WelcomeUser />} />
          <Route path="notes" element={<NotesList />}></Route>
          <Route path="users" element={<UsersList />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
