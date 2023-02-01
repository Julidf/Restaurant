import { createContext, useState } from "react";

interface AuthProviderProps  {
    children: React.ReactNode;
}
const AuthContext = createContext({});

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;