export interface UserList {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    enabled: boolean;
    accountNonLocked: boolean;
  }

const UserDashboard = ({
    id,
    firstName,
    lastName,
    email,
    role,
    enabled,
    accountNonLocked,
  }: UserList) => {
    return <div></div>
}

export default UserDashboard;
