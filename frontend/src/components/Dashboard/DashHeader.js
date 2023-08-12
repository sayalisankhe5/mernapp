import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../Auth/authApiSlice";
import { useEffect } from "react";

const DashHeader = () => {
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
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
    DASH_REGEX.test(pathname) ||
    NOTES_REGEX.test(pathname) ||
    USERS_REGEX.test(pathname)
  ) {
    dashClass = 
  }
  return (
    <header className="dash-header">
      <div className={`dash-header__container${dashClass}`}>
        <Link to="/dash">
          <h1 className="dash-header__title">techNotes</h1>
        </Link>
        <nav className="dash-header__nav">
          {/* add nav buttons later */}
          <button onClick={() => sendLogout()}></button>
        </nav>
      </div>
    </header>
  );
};

export default DashHeader;
