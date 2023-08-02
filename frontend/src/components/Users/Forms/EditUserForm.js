import { useEffect, useState } from "react";
import { useDeleteUserMutation, useUpdateUserMutation } from "../usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../../config/roles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const EditUserForm = ({ user }) => {
  const USERNAME_REGEX = /^[A-z]{3-20}$/;
  const PSWD_REGEX = /^[A-z0-9!@#$%]{4-12}$/;
  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);
  const navigate = useNavigate();
  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteUserMutation();
  const [updateUser, { isSuccess, isError, isLoading, error }] =
    useUpdateUserMutation();

  useEffect(() => {
    setValidUsername(USERNAME_REGEX.test(username));
  }, [username]);
  useEffect(() => {
    setValidPassword(PSWD_REGEX.test(password));
  }, [password]);
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      setActive("");
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess]);
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleActiveChange = () => {
    setActive((prev) => !prev);
  };
  const handleRolesChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setRoles(values);
  };
  const roleOptions = Object.values(ROLES).map((r) => {
    return (
      <option key={r} value={r}>
        {r}
      </option>
    );
  });

  let canSave;
  if (password) {
    canSave =
      [validUsername, validPassword, roles.length].every(Boolean) && !isLoading;
  } else {
    canSave = [validUsername, roles.length].every(Boolean) && !isLoading;
  }
  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  const onSaveUserClicked = async () => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      updateUser({ id: user.id, username, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  return (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={handleUsernameChange}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[empty = no change]</span>{" "}
          <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="user-active"
        >
          ACTIVE:
          <input
            className="form__checkbox"
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={active}
            onChange={handleActiveChange}
          />
        </label>

        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <select
          id="roles"
          name="roles"
          className={`form__select ${validRolesClass}`}
          multiple={true}
          size="3"
          value={roles}
          onChange={handleRolesChange}
        >
          {roleOptions}
        </select>
      </form>
    </>
  );
};

export default EditUserForm;
