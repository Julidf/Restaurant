import { useContext } from "react";
import AuthContext from "../context/authProvider";

const useAutho = () => {
    return useContext(AuthContext);
}

export default useAutho;