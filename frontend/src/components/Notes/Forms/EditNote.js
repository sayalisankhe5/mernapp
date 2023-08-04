import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectAllUsers } from "../../Users/usersApiSlice";
import { selectNoteById } from "../notesApiSlice";
import EditNoteForm from "./EditNoteForm";

const EditNote = () => {
  const { id } = useParams();
  const users = useSelector(selectAllUsers);
  const note = useSelector((state) => selectNoteById(state, id));
  const content =
    note && users ? (
      <EditNoteForm note={note} users={users} />
    ) : (
      <p>Loading...</p>
    );
  return content;
};

export default EditNote;
