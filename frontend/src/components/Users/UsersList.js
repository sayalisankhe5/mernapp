import { useGetUsersQuery } from "./usersApiSlice";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetUsersQuery();
  let content;
  if (isLoading) {
    content = <p>Loading Users....</p>;
  }
  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }
  if (isSuccess) {
    const { ids } = users;

    content = (
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Roles</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {ids?.length
            ? ids.map((userid) => <User key={userid} userId={userid} />)
            : null}
        </tbody>
      </table>
    );
  }
  return content;
};

export default UsersList;
