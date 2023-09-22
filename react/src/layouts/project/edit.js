/* eslint-disable prettier/prettier */
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material UI components
import { Box, TextField, MenuItem, Select as MDSelect,InputLabel } from "@material-ui/core";

import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { useNavigate, Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [title, setTitle] = useState("");
  const [client, setClient] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [team, setTeam] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [statusP, setStatusP] = useState("");
  
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/project/${id}`)
      .then((response) => {
        const projectData = response.data;
        
        const teamArray = JSON.parse(projectData.team);

        setTitle(projectData.title);
        setSelectedClient(projectData.client);
        setDueDate(projectData.due_date);
        setSelectedTeam(teamArray);
        setStatusP(projectData.status);
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
 
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };
  
  const handleStatusPChange = (event) => {
    setStatusP(event.target.value);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = {
  //     title,
  //     client: selectedClient,
  //     dueDate,
  //     team: JSON.stringify(selectedTeam), // Convertir en JSON
  //     statusP
  //   };
  //   axios.post("http://127.0.0.1:8000/api/project/store", data)
  //     .then(() => {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Succès',
  //         text: 'Projet ajouté avec succès!',
  //       }).then(() => {
  //         navigate("/projects");
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: 'Une erreur est survenue, veuillez réessayer!',
  //       });
  //     });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      title,
      client: selectedClient,
      dueDate,
      team: JSON.stringify(selectedTeam), // Convertir en JSON
      statusP
    };
    axios
      .put(`http://127.0.0.1:8000/api/project/update/${id}`, data)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: "Projet modifié avec succès!",
        }).then(() => {
          // Redirection vers la page de liste d'utilisateurs
          navigate("/projects");
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


  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user");
        setTeam(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des équipes :", error);
      }
    }
  
    fetchTeams();
  }, []);

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/clients");
        setClient(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des clients :", error);
      }
    }
  
    fetchClients();
  }, []);

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
                  Modification projet
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <MDBox p={3}>
                  <form onSubmit={handleSubmit}>
                    <Box p={3}>
                      <TextField
                          label="Titre"
                          value={title}
                          onChange={handleTitleChange}
                          fullWidth
                      />
                    </Box>

                    <MDBox p={3}>
                      <InputLabel id="client-label">Client</InputLabel>
                      <MDSelect
                        labelId="client-label"
                        id="client"
                        value={selectedClient}
                        onChange={handleClientChange}
                        fullWidth
                      >
                        {client.map((clientItem) => (
                          <MenuItem key={clientItem.id} value={clientItem.id}>
                            {clientItem.name}
                          </MenuItem>
                        ))}
                      </MDSelect>
                    </MDBox>

                    <Box p={3}>
                      <TextField
                          type="date"
                          label="Date d'échéance"
                          value={dueDate}
                          onChange={handleDueDateChange}
                          fullWidth
                      />
                    </Box>
                    <MDBox p={3}>
                      <InputLabel id="team-label">Équipe</InputLabel>
                      <MDSelect
                        labelId="team-label"
                        id="team"
                        multiple
                        value={selectedTeam}
                        onChange={handleTeamChange}
                        fullWidth
                      >
                        {team.map((teamItem) => (
                          <MenuItem key={teamItem.id} value={teamItem.id}>
                            {teamItem.name}
                          </MenuItem>
                        ))}
                      </MDSelect>
                    </MDBox>
                    <MDBox p={3}>
                        <MDSelect
                            value={statusP}
                            onChange={handleStatusPChange}
                            label="Statut"
                            fullWidth
                        >
                            <MenuItem disabled value="">
                                Sélectionner le statut
                            </MenuItem>
                            <MenuItem value="En attente">En attente</MenuItem>
                            <MenuItem value="En cours">En cours</MenuItem>
                            <MenuItem value="Terminé">Terminé</MenuItem>
                            <MenuItem value="Annulé">Annulé</MenuItem>
                        </MDSelect>
                    </MDBox>
                    
                    <MDBox p={3} textAlign="right">
                        <Link to='/projects' component={Link} >
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

export default EditProject;
