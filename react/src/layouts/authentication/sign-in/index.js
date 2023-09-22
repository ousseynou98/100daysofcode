/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
/* eslint-disable prettier/prettier */
import { useState } from "react";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";
import { Navigate  } from 'react-router-dom';
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [error, setError] = useState(null);
const handleSetRememberMe = () => setRememberMe(!rememberMe);

// const handleLogin = async () => {
//   try {
//     const response = await axios.post("http://127.0.0.1:8000/api/login", {
//       email,
//       password,
//     });
//     console.log(response.data); // Afficher les données de la réponse
//     config.headers.Authorization = `Bearer ${token}`;
//     setIsLoggedIn(true); // Définir l'état de connexion sur vrai
//   } catch (errorh) {
//     console.error(errorh);
//     setError("Email ou mot de passe incorrect");
//   }
// };

const handleLogin = async () => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/login", {
      email,
      password,
    });
    console.log(response.data); // Afficher les données de la réponse

    // Store the token in the local storage
    localStorage.setItem("token", response.data.token);

    // Add the token to the authorization header for future requests
    const config = {
      headers: {
        Authorization: `Bearer ${response.data.token}`,
      },
    };
    axios.defaults.headers.common = { ...axios.defaults.headers.common, ...config.headers };

    setIsLoggedIn(true); // Définir l'état de connexion sur vrai
  } catch (errorh) {
    console.error(errorh);
    setError("Email ou mot de passe incorrect");
  }
};


if (isLoggedIn) {
  // Si l'utilisateur est connecté, rediriger vers "/user"
  return <Navigate  to="/user" />;
}
  

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Connexion
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth onChange={(e) => setEmail(e.target.value)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Mot de passe" fullWidth onChange={(e) => setPassword(e.target.value)}/>
            </MDBox>
            {error && (
              <MDBox mb={2}>
                <MDTypography variant="body2" color="error">
                  {error}
                </MDTypography>
              </MDBox>
            )}
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Se souvenir de moi
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleLogin}>
                Se connecter
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
