import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import store from "../../redux/store";
import { notesApiSlice } from "../Notes/notesApiSlice";
import { usersApiSlice } from "../Users/usersApiSlice";

const Prefetch = () => {
  useEffect(() => {
    console.log("subsrcibing");
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());

    return () => {
      console.log("unsubsrcibing");

      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);
  return <Outlet />;
};

export default Prefetch;
