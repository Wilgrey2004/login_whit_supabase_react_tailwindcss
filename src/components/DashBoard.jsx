import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
export const DashBoard = () => {
  const { session, SignOut } = UserAuth();
  const navigate = useNavigate();

  // useState(() => {
  //   if (!session) {
  //     Navigate("/");
  //   }
  // }, []);
  const habldeSignOut = async (e) => {
    e.preventDefault();

    try {
      await SignOut();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>DashBoard</h1>
      <h2>Hellow and welcome to the Dasboard sr {session?.user?.email}</h2>
      <div>
        <p
          onClick={habldeSignOut}
          className="hover:cursor-pointer border inline-block px-4 py-3 mt-4"
        >
          Sign Out
        </p>
      </div>
    </div>
  );
};
