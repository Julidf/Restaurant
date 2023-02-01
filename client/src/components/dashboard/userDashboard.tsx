import { deleteUser } from "../../utils/services/axiosRequests";

export interface UserList {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    enabled: boolean;
  }

const UserDashboard = ({
    id,
    firstName,
    lastName,
    email,
    role,
    enabled,
  }: UserList) => {
    return( 
        <tr key={id}>
            <th>{id}</th>
            <th>{firstName}</th>
            <th>{lastName}</th>
            <th>{email}</th>
            <th>{role[0] + role.slice(1).toLowerCase()}</th>
            <th>{`${enabled}`}</th>
            <th>
              <button className="btn" onClick={()=>{deleteUser()}}>
                X
              </button>
            </th>
        </tr>
    )
}

export default UserDashboard;
