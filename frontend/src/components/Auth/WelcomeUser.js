import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const WelcomeUser = () => {
  useTitle("Dashboard");
  const { username, isManager, isAdmin } = useAuth();
  return (
    <section className="welcome">
      <h2>Welcome {username}</h2>
      <p>
        <Link to="/dash/notes">View All Notes</Link>
      </p>

      <p>
        <Link to="/dash/notes/new">Add new Note</Link>
      </p>
      {(isManager || isAdmin) && (
        <>
          <p>
            <Link to="/dash/users">View All Users</Link>
          </p>
          <p>
            <Link to="/dash/users/new">Add new User</Link>
          </p>
        </>
      )}
    </section>
  );
};

export default WelcomeUser;
