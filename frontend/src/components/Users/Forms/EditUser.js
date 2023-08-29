import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUserById, useGetUsersQuery } from "../usersApiSlice";
import EditUserForm from "./EditUserForm";
import PulseLoader from "react-spinners/PulseLoader";

const EditUser = () => {
  const { id } = useParams();
  //const user = useSelector((state) => selectUserById(state, id));

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  return (
    <>{user ? <EditUserForm user={user} /> : <PulseLoader color={"#FFF"} />}</>
  );
};

export default EditUser;
