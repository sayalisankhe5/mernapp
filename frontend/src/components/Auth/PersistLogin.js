import { useSelector } from "react-redux";
import usePersist from "../../hooks/usePersist";
import { Link, Outlet } from "react-router-dom";
import { useRefreshMutation } from "./authApiSlice";
import { useEffect, useRef, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

const PersistLogin = () => {
  const [persist] = usePersist();
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);
  const token = useSelector((_state) => _state.auth.token);
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current == true || process.env.NODE_ENV != "development") {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.log(err);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);
  }, []);
  let content = "";

  if (!persist) {
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    content = <PulseLoader color={"#FFF"} />;
  } else if (isError) {
    content = (
      <p>
        {error?.data?.message}
        <br />
        <Link to="/login">Back to login</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
