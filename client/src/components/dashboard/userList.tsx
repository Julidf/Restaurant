import { useState, useEffect } from "react";
import { getUserList } from "../../utils/services/axiosRequests";
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
      <h2>User List</h2>
        {userList.map((user: any) => (
          <UserDashboard key={user.id} {...user} />
        ))}
    </div>
  );
}
