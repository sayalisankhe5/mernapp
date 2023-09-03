import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectAllUsers, useGetUsersQuery } from "../../Users/usersApiSlice";
import { selectNoteById, useGetNotesQuery } from "../notesApiSlice";
import EditNoteForm from "./EditNoteForm";
import useAuth from "../../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";

const EditNote = () => {
  const { id } = useParams();
  //const users = useSelector(selectAllUsers);
  //const note = useSelector((state) => selectNoteById(state, id));
  const { username, isManager, isAdmin } = useAuth();
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });
  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({ note: data?.entities[id] }),
  });

  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <p>No access</p>;
    }
  }
  const content =
    note && users ? (
      <EditNoteForm note={note} users={users} />
    ) : (
      <PulseLoader color={"#FFF"} />
    );
  return content;
};

export default EditNote;
