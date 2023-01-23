import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthCheck = (requiredRole: string) => {
  const navigate = useNavigate()

  const token: any = localStorage.getItem('token')
  const decodedToken: any = jwtDecode(token)

  if (token == null || decodedToken.role !== requiredRole) {
    return false;
  } else {
    return true;
  }
}

export default AuthCheck
