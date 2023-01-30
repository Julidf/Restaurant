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
    return( 
        <div>
            <p>Name: {firstName}</p>
            <p>Lastname: {lastName}</p>
            <p>Email: {email}</p>
            <p>Role: {role}</p>
            <p>Enabled: {`${enabled}`}</p>
            <p>Locked: {`${accountNonLocked}`}</p>
        </div>
    )
}

export default UserDashboard;
