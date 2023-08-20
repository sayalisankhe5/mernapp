import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteNoteMutation, useUpdateNoteMutation } from "../notesApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";
const EditNoteForm = ({ note, users }) => {
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [user, setUser] = useState(note.user);
  const [completed, setCompleted] = useState(note.completed);
  const navigate = useNavigate();
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();
  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteNoteMutation();
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  const handleUserChange = (e) => {
    setUser(e.target.value);
  };
  const userOptions = users.map((u) => {
    return (
      <option key={u.id} value={u.id}>
        {u.username}
      </option>
    );
  });
  const { isManager, isAdmin } = useAuth();
  const handleCompletedChange = () => setCompleted((prev) => !prev);
  const canSave = [title, text, user].every(Boolean) && !isLoading;
  const onSaveNoteClicked = async (e) => {
    if (canSave) {
      await updateNote({ id: note.id, title, text, completed, user });
    }
  };
  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id });
  };
  const created = new Date(note.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(note.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delError?.data?.message) ?? "";
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setUser("");
      setCompleted("");
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess]);
  return (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Note #{note.ticketNo}</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveNoteClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            {(isManager || isAdmin) && (
              <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteNoteClicked}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            )}
          </div>
        </div>
        <label className="form__label" htmlFor="note-title">
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="note-title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={handleTitleChange}
        />

        <label className="form__label" htmlFor="note-text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="note-text"
          name="text"
          value={text}
          onChange={handleTextChange}
        />
        <div className="form__row">
          <div className="form__divider">
            <label
              className="form__label form__checkbox-container"
              htmlFor="note-completed"
            >
              WORK COMPLETE:
              <input
                className="form__checkbox"
                id="note-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={handleCompletedChange}
              />
            </label>

            <label
              className="form__label form__checkbox-container"
              htmlFor="note-username"
            >
              ASSIGNED TO:
            </label>
            <select
              id="note-username"
              name="username"
              className="form__select"
              value={user}
              onChange={handleUserChange}
            >
              {userOptions}
            </select>
          </div>
          <div className="form__divider">
            <p className="form__created">
              Created:
              <br />
              {created}
            </p>
            <p className="form__updated">
              Updated:
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditNoteForm;
