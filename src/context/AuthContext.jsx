import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export default function AuthContextProvider({children}) {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [userData, setUserData] = useState(null)

    async function getUserData() {
    try {
      const {data} = await axios.get('https://route-posts.routemisr.com/users/profile-data',{
        headers: { Authorization: `Bearer ${token}` }
      })
      setUserData(data.data.user)
      console.log(data);
      
    } catch (error) {
      console.log(error.response);
    }
  }  

  const {data}= useQuery({
    queryFn:getUserData,
    queryKey:["userData"],
  })

  useEffect(() => {
  if (token) {
    getUserData();
  }
}, [token]);

  return (
    <AuthContext.Provider value={{token, setToken, userData, setUserData}}>
      {children}
    </AuthContext.Provider>
  )
}
