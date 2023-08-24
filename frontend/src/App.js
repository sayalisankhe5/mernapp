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
import EditUser from "./components/Users/Forms/EditUser";
import NewUser from "./components/Users/Forms/NewUser";
import EditNote from "./components/Notes/Forms/EditNote";
import NewNote from "./components/Notes/Forms/NewNote";
import Prefetch from "./components/Auth/Prefetch";
import PersistLogin from "./components/Auth/PersistLogin";
import useTitle from "./hooks/useTitle";

function App() {
  useTitle("Sandy D. Repairs");
  return (
    <Routes>
      <Route path="/" element={<WelcomeLayout />}>
        <Route index element={<WelcomeWebPage />} />
        <Route path="login" element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path="dash" element={<DashLayout />}>
              <Route index element={<WelcomeUser />} />
              <Route path="users">
                <Route index element={<UsersList />} />
                <Route path=":id" element={<EditUser />} />
                <Route path="new" element={<NewUser />} />
              </Route>
              <Route path="notes">
                <Route index element={<NotesList />} />
                <Route path=":id" element={<EditNote />} />
                <Route path="new" element={<NewNote />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
