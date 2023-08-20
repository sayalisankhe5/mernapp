import { useLocation, useNavigate } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../hooks/useAuth";

const DashFooter = () => {
  const navigate = useNavigate();
  const { username, status } = useAuth();
  const { pathname } = useLocation();
  const goHomeClicked = () => navigate("/dash");
  let goHomeButton = null;
  if (pathname != "/dash") {
    goHomeButton = (
      <button className="" title="Home" onClick={goHomeClicked}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  const content = (
    <footer className="dash-footer">
      {goHomeButton}
      <p>Current User: {username}</p>
      <p>Status: {status}</p>
    </footer>
  );

  return content;
};

export default DashFooter;
