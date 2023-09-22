/* eslint-disable prettier/prettier */
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material UI components
import {
  Box,
  TextField,
} from "@material-ui/core";

// Axios for API requests
import axios from "axios";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React Router Dom
import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function EditClient() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");


  // Cette fonction sera exécutée lorsque le composant sera monté pour la première fois
  useEffect(() => {
    // On fait une requête à l'API pour récupérer les données  correspondant à l'id dans l'URL
    axios
      .get(`http://127.0.0.1:8000/api/client/${id}`)
      .then((response) => {
        const clientData = response.data;
        
        // Utilisez également ces données pour initialiser les états des champs de formulaire
        setName(clientData.name);
        setPhone(clientData.phone);
        setCompanyName(clientData.company_name);
        setFile(clientData.file); // Assurez-vous que vous avez cette propriété dans votre objet clientData
        setSelectedImage(clientData.image_url);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Une erreur est survenue, veuillez réessayer!",
        });
      });
  }, [id]);


  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  
  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  
  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  // const handleFileChange = (event) => {
  //   //const selectedFile = event.target.files[0];
  //   setFile(event.target.files[0]);
  //   if (event.target.files[0]) {
  //     setFile(event.target.files[0]);
  //     const imageUrl = URL.createObjectURL(event.target.files[0]);
  //     setSelectedImage(imageUrl);
  //   }
  // };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      console.error('Aucune image n\'a été sélectionnée.');
      return;
    }
    const imageUrl = URL.createObjectURL(selectedFile);
    setSelectedImage(imageUrl);
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('file', file);
    data.append('name', name);
    data.append('company_name', company_name);
    data.append('phone', phone);
    axios
      .put(`http://127.0.0.1:8000/api/client/update/${id}`, data)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: "Client modifiée avec succès!",
        }).then(() => {
          // Redirection vers la page de liste client
          navigate("/clients");
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Une erreur est survenue, veuillez réessayer!",
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
                  Modifier client
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* Formulaire de modification utilisateur */}
                <MDBox p={3}>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                      name="file"
                      accept=".jpeg, .jpg, .png"
                      onChange={handleFileChange}
                      fullWidth
                    />

                    {selectedImage && (
                      <img
                        src={selectedImage}
                        alt="Image sélectionnée"
                        style={{ maxWidth: "100%", maxHeight: "200px" ,borderRadius: "1rem",paddingTop:"5px" }}
                      />
                    )}

                    </Box>
                    <MDBox p={3} textAlign="right">
                      <Link to="/clients" component={Link}>
                        <MDButton
                          variant="gradient"
                          color="primary"
                          style={{ marginRight: "10px" }}
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

export default EditClient;
