import { useLocation, useNavigate } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const goHomeClicked = () => navigate("/dash");
  const goHomeButton = null;
  if (pathname != "/dash") {
    goHomeButton = (
      <button className="" title="Home" onClick={goHomeClicked}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  const content = <footer>{goHomeButton}</footer>;

  return content;
};

export default DashFooter;
