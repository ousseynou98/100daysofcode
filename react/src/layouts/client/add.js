/* eslint-disable prettier/prettier */
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material UI components
import { Box, TextField} from "@material-ui/core";

// Axios for API requests
import axios from "axios";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React Router Dom
import { useNavigate,Link,useParams } from "react-router-dom";
import React, { useState } from "react";
import Swal from 'sweetalert2';


function AddClient() {
  const navigate = useNavigate();

  // const { id } = useParams();
  // const [idCampagne, setIdCampagne] = useState(id || 'defaultId');
  // const handleIdCampagneChange = (event) => {
  //   setIdCampagne(event.target.value);
  // };
  

  
  const [name, setName] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const [phone, setPhone] = useState("");
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const [company_name, setCompanyName] = useState("");
  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('file', file);
    data.append('name', name);
    data.append('company_name', company_name);
    data.append('phone', phone);
  axios.post("http://127.0.0.1:8000/api/client/store", data)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Client ajoutée avec succès!',
      }).then(() => {
        // redirection vers la page de liste d'utilisateurs
        navigate("/clients");
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
                  Ajout client
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* Formulaire d'ajout utilisateur */}
                <MDBox p={3}>
                  <form onSubmit={handleSubmit}>
                  <Box p={3}>
                    <TextField
                        label="Prenom & Nom"
                        value={name}
                        onChange={handleNameChange}
                        style={{ marginBottom: "2rem" }}
                        fullWidth
                    />
                    
                    <TextField
                        label="Entreprise"
                        type="text"
                        value={company_name}
                        onChange={handleCompanyNameChange}
                        style={{ marginBottom: "2rem" }}
                        fullWidth
                    />
                    <TextField
                        label="Numéro"
                        type="number"
                        value={phone}
                        onChange={handlePhoneChange}
                        fullWidth
                        style={{ marginBottom: "2rem" }}
                    />
                    <TextField

                      type="file"
                      accept=".jpeg, .jpg, .png"
                      onChange={handleFileChange}
                      fullWidth
                    />
                    </Box>
                    <MDBox p={3} textAlign="right">
                        <Link to='/campagnes' component={Link} >
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

export default AddClient;

                    