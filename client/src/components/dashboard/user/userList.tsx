import { useState, useEffect } from "react";
import { getUserList } from "../../../utils/services/axiosRequests";
import UserNavBar from "../../navbar/userNavBar";
import UserDashboard from "./userDashboard";

export default function UserList() {
  const [userList, setUserList] = useState<any>([]);

  const fetchUserList = async () => {
    const data = await getUserList();
    setUserList(data);
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div>
      <UserNavBar />
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Lastname</th> 
            <th>Email</th>
            <th>Role</th>
            <th>Active</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user: any) => (
            <UserDashboard key={user.id} {...user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
