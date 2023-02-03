import { userDashboardHandleDelete } from "../../../utils/helpers";
import UserList from "../../../utils/interfaces/IUserList";

const UserDashboard = ({
  id,
  firstName,
  lastName,
  email,
  role,
  isEnabled,
}: UserList) => {
  return (
    <tr key={id}>
      <th>{id}</th>
      <th>{firstName}</th>
      <th>{lastName}</th>
      <th>{email}</th>
      <th>{role[0] + role.slice(1).toLowerCase()}</th>
      <th>{`${isEnabled}`}</th>
      <th>
        <button className="btn" onClick={() => userDashboardHandleDelete(id)}>
          X
        </button>
      </th>
    </tr>
  );
};

export default UserDashboard;
