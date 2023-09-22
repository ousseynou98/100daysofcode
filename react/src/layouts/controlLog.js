/* eslint-disable prettier/prettier */
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function withAuth(Component) {
  function AuthenticatedComponent(props) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/check-authentication"
          );
          if (response.status === 200) {
            setAuthenticated(true);
          }
        } catch (error) {
          console.log(error);
          setAuthenticated(false);
        } finally {
          setLoading(false);
        }
      };
      checkAuthentication();
    }, []);

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!authenticated) {
      return <Navigate to="/authentication/sign-in" />;
    }

    return <Component {...props} />;
  }

  return AuthenticatedComponent;
}

export default withAuth;
