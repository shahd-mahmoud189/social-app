import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../Nav/Nav";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

export default function Layout() {
  const { setUserData, token } = useContext(AuthContext);

  // if (token) {
  //   async function getUserData() {
  //     try {
  //       const { data } = await axios.get(
  //         "https://route-posts.routemisr.com/users/profile-data",
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         },
  //       );
  //       if (data.success) {
  //         setUserData(data.data.user);
  //         localStorage.setItem('user',data.data.user)
  //         console.log(data);
  //         return data.data.user
  //       }
  //     } catch (error) {
  //       console.log(error.response);
  //     }
  //   }
  //   const {} = useQuery({
  //     queryKey: ["userData"],
  //     queryFn: getUserData(),
  //   });
  // }

  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
