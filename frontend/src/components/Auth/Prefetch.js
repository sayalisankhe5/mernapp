import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import store from "../../redux/store";
import { notesApiSlice } from "../Notes/notesApiSlice";
import { usersApiSlice } from "../Users/usersApiSlice";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      notesApiSlice.util.prefetch("getNotes", "prefetchNotesList", {
        force: true,
      })
    );
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "prefetchUsersList", {
        force: true,
      })
    );
  }, []);
  return <Outlet />;
};

export default Prefetch;
