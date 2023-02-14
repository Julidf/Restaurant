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
  
  const handleCreateClick = () => {
    navigate("/admin/products/create-user");
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
      <div className="filter_container">
        <input value={search} type="text" placeholder="Search by email" onChange={searcher} className="filter_input"/>
      </div>
      <table className="table_product">
        <thead>
          <tr>
            <th><button onClick={() => orderBy("id")} type="button" className="order_modify_button">ID</button></th>
            <th><button onClick={() => orderBy("firstName")} type="button" className="order_modify_button">FIRST NAME</button></th>
            <th><button onClick={() => orderBy("lastName")} type="button" className="order_modify_button">LAST NAME</button></th>
            <th><button onClick={() => orderBy("email")} type="button" className="order_modify_button">EMAIL</button></th>
            <th><button onClick={() => orderBy("role")} type="button" className="order_modify_button">ROLE</button></th>
            <th><button onClick={() => orderBy("isEnabled")} type="button" className="order_modify_button">ENABLED</button></th>
          </tr>
        </thead>
        <tbody>
          {results.map((user: DBUser) => (
            <tr key={user.id}>
              <td className="td_product">{user.id}</td>
              <td className="td_product">{user.firstName}</td>
              <td className="td_product">{user.lastName}</td>
              <td className="td_product">{user.email}</td>
              <td className="td_product">{user.role}</td>
              <td className="td_product">{`${user.isEnabled}`}</td>
              <td className="td_product_button"><button type="button" onClick={() => handleEditClick(user)} className="modify_product_button">EDIT</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default UserDashboard;
