import { Link } from "react-router-dom";

const WelcomeUser = () => {
  return (
    <section className="welcome">
      <h2>Hello user</h2>
      <p>
        <Link to="/dash/notes">View All Notes</Link>
      </p>
      <p>
        <Link to="/dash/users">View All Users</Link>
      </p>
      <p>
        <Link to="/dash/notes/new">Add new Note</Link>
      </p>
      <p>
        <Link to="/dash/users/new">Add new User</Link>
      </p>
    </section>
  );
};

export default WelcomeUser;
