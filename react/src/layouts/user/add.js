/* eslint-disable prettier/prettier */
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material UI components
import { Box, TextField, MenuItem, Select as MDSelect } from "@material-ui/core";

// Axios for API requests
import axios from "axios";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React Router Dom
import { useNavigate,Link } from "react-router-dom";
import React, { useState } from "react";
import Swal from 'sweetalert2';


function AddUser() {
  const navigate = useNavigate();

  
  const [username, setUsername] = useState("");
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const [email, setEmail] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const [profil, setProfil] = useState("");
  const handleProfilChange = (event) => {
    setProfil(event.target.value);
  };



const handleSubmit = (event) => {
  event.preventDefault();
  const data = {
    username,
    email,
    password,
    profil
  };
  axios.post("http://127.0.0.1:8000/api/user/store", data)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Utilisateur ajouté avec succès!',
      }).then(() => {
        // redirection vers la page de liste d'utilisateurs
        navigate("/user");
      });
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Une erreur est survenue, veuillez réessayer!',
      });
    });
};

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Ajout utilisateur
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* Formulaire d'ajout utilisateur */}
                <MDBox p={3}>
                  <form onSubmit={handleSubmit}>
                  <Box p={3}>
                    <TextField
                        label="Nom d'utilisateur"
                        value={username}
                        onChange={handleUsernameChange}
                        fullWidth
                    />
                    </Box>
                    <Box p={3}>
                    <TextField
                        type="email"
                        label="Adresse e-mail"
                        value={email}
                        onChange={handleEmailChange}
                        fullWidth
                    />
                    </Box>
                    <Box p={3}>
                    <TextField
                        type="password"
                        label="Mot de passe"
                        value={password}
                        onChange={handlePasswordChange}
                        fullWidth
                    />
                    </Box>
                    <MDBox p={3}>
                        <MDSelect
                            value={profil}
                            onChange={handleProfilChange}
                            label="Rôle"
                            fullWidth
                        >
                            <MenuItem disabled value="">
                                Sélectionner un profil
                            </MenuItem>
                            <MenuItem value="Admin">Administrateur</MenuItem>
                            <MenuItem value="User">Utilisateur</MenuItem>
                        </MDSelect>
                    </MDBox>
                    
                    <MDBox p={3} textAlign="right">
                        <Link to='/user' component={Link} >
                            <MDButton
                            variant="gradient"
                            color="primary"
                            style={{ marginRight: '10px' }}
                            >
                            Retour
                            </MDButton>
                        </Link>
                        <MDButton
                            variant="gradient"
                            color="info"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Enregistrer
                        </MDButton>
                    </MDBox>
                  </form>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddUser;
