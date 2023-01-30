import axios from "axios";
import React, { useState, useEffect } from "react";

export default function UserList() {
  const [userList, setUserList] = useState<any>([]);
  const token = localStorage.getItem("token");
  const getUserList = async () => {
    await axios
      .get("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  };

  const fetchUserList = async () => {
    const data = await getUserList();
    console.log(data)
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
          <li key={user.email}>
            {user.name} {user.lastname} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
