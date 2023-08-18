import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../Auth/authApiSlice";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const DashHeader = () => {
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  const { isManager, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let dashClass = "";
  let DASH_REGEX = /^\/dash(\/)$/;
  let USERS_REGEX = /^\/dash\/users(\/)$/;
  let NOTES_REGEX = /^\/dash\/notes(\/)$/;
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);
  if (isLoading) return <p>Logging out...</p>;
  if (isError) return <p>Error: {error?.data?.message}</p>;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  const newNoteClicked = () => navigate("/dash/notes/new");
  const newUserClicked = () => navigate("/dash/users/new");
  const notesListClicked = () => navigate("/dash/notes");
  const usersListClicked = () => navigate("/dash/users");

  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button onClick={newNoteClicked} title="new note">
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }
  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button title="new user" onClick={newUserClicked}>
        {" "}
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }
  let notesListButton;
  if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
    notesListButton = (
      <button onClick={notesListClicked}>
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }
  let usersListButton;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      usersListButton = (
        <button onClick={usersListClicked}>
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  return (
    <header className="dash-header">
      <div className={`dash-header__container ${dashClass}`}>
        <Link to="/dash">
          <h1 className="dash-header__title">techNotes</h1>
        </Link>
        <nav className="dash-header__nav">
          {newNoteButton}
          {newUserButton}
          {notesListButton}
          {usersListButton}
          {/* add nav buttons later */}
          <button
            className="icon-button"
            title="Logout"
            onClick={() => sendLogout()}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default DashHeader;
