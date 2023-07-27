import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";

const User = (props) => {
  const user = useSelector((state) => selectUserById(state, props.userId));
  const navigate = useNavigate();
  if (user) {
    const handleEdit = () => navigate(`/dash/users/${props.userId}`);
    const userRolesString = user.roles.toString().Replace(",", ", ");
    return (
      <tr>
        <td>{user.username}</td>
        <td>{userRolesString}</td>
        <td onClick={handleEdit}>Edit</td>
      </tr>
    );
  } else return null;
};

export default User;
