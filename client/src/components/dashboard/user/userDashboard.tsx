import { DBUser, UserPropsIndexable } from "../../../utils/interfaces/userInterfaces";
import { Fragment, useEffect, useState } from "react";
import NavbarHandler from "../../navbar/navbarHandler";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../utils/services/axiosRequests";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<UserPropsIndexable[]>([]);
  const [search, setSearch] = useState<string>("");
  const results = !search ? userList : userList.filter((user: DBUser)=> user.email.toLowerCase().includes(search.toLowerCase()))
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  
  useEffect ( () => {
      getUserList();
  }, [])

  const getUserList = async () => {
      const response = await getUsers();
      setUserList(response.data)
  }

  const handleEditClick = (user: DBUser) => {
      navigate(`/admin/users/${user.id}`, { state: { user } });
  };

  const searcher = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setSearch(event.target.value)
  }

  const orderBy = (property: keyof UserPropsIndexable) => {
      setSortAscending(!sortAscending);
      userList.sort((a, b) => {
          if (sortAscending) {
              return a[property] > b[property] ? 1 : -1;
          } else {
              return b[property] > a[property] ? 1 : -1;
          }
      });
  };
  
  return(
    <Fragment>
      <NavbarHandler/>
      <div className="head_dashboard">
        <div className="filter_container_dashboard">
          <input value={search} type="text" placeholder="Search by email" onChange={searcher} className="input_filter_dashboard"/>
        </div>
      </div>
      <table className="table_admin">
        <thead className="thead_admin">
          <tr>
            <th className="th_admin"><button onClick={() => orderBy("id")} type="button" className="button_orderBy_dashboard">ID</button></th>
            <th className="th_admin"><button onClick={() => orderBy("firstName")} type="button" className="button_orderBy_dashboard">FIRST NAME</button></th>
            <th className="th_admin"><button onClick={() => orderBy("lastName")} type="button" className="button_orderBy_dashboard">LAST NAME</button></th>
            <th className="th_admin"><button onClick={() => orderBy("email")} type="button" className="button_orderBy_dashboard">EMAIL</button></th>
            <th className="th_admin"><button onClick={() => orderBy("role")} type="button" className="button_orderBy_dashboard">ROLE</button></th>
            <th className="th_admin"><button onClick={() => orderBy("isEnabled")} type="button" className="button_orderBy_dashboard">ENABLED</button></th>
          </tr>
        </thead>
        <tbody className="tbody_admin">
          {results.map((user: DBUser) => (
            <tr className="tr_admin" key={user.id}>
              <td className="td_admin_id">{user.id}</td>
              <td className="td_admin">{user.firstName}</td>
              <td className="td_admin">{user.lastName}</td>
              <td className="td_admin">{user.email}</td>
              <td className="td_admin">{user.role}</td>
              <td className="td_admin">{`${user.isEnabled}`}</td>
              <td className="td_admin_button"><button type="button" onClick={() => handleEditClick(user)} className="button_edit_dashboard">HANDLE</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default UserDashboard;
