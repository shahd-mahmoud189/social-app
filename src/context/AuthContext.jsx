import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userData, setUserData] = useState(null)

  async function getUserData() {
    if (!token) return null; 
    try {
      const { data } = await axios.get('https://route-posts.routemisr.com/users/profile-data', {
        headers: { token: token }
      })
      setUserData(data.data.user)
      return data
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout(); 
      }
      throw error; 
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setToken(null);
    setUserData(null);
   
  }

  const { data, isError } = useQuery({
    queryFn: getUserData,
    queryKey: ["userData", token], 
    enabled: !!token, 
    retry: false 
  })

  console.log(data);
  

  useEffect(() => {
    if (data?.data.user) {
      setUserData(data.data.user);
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{ token, setToken, userData, setUserData, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}