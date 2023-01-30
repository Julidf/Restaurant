import axios from "axios";
import React, { useState, useEffect } from "react";
import { getUserList } from "../../utils/services/axiosRequests";

export default function UserList() {
  const [userList, setUserList] = useState<any>([]);

  const fetchUserList = async () => {
    const data = await getUserList();
    console.log(data);
    setUserList(data);
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {userList.map((user: any) => (
          <>
            <li key={user.id}>name: {user.firstName}</li>
            <li key={user.id}>lastname: {user.lastName}</li>
            <li key={user.id}>email: {user.email}</li>
            <li key={user.id}>enabled: {`${user.enabled}`}</li>
          </>
        ))}
      </ul>
    </div>
  );
}
