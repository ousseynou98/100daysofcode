/* eslint-disable prettier/prettier */
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function SignOut() {

  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []); // Empty array as the second argument to execute the effect only once, when the component mounts

  return <Navigate  to="/authentication/sign-in" />;
};

export default SignOut;
