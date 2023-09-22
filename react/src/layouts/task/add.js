/* eslint-disable prettier/prettier */
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material UI components
import { Box, TextField, MenuItem, Select as MDSelect,InputLabel,TextareaAutosize } from "@material-ui/core";

// Axios for API requests
import axios from "axios";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React Router Dom
import { useNavigate,Link } from "react-router-dom";
import React, { useState,useEffect } from "react";
import Swal from 'sweetalert2';


function AddTask() {
  const navigate = useNavigate();

  
  const [title, setTitle] = useState("");
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const [client, setClient] = useState([]);
  const [selectedClient, setSelectedClient] = useState([]);
  const handleClientChange = (event) => {
    const selectedClientId = event.target.value;
    setSelectedClient(selectedClientId);
  };
 
  const [team, setTeam] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };
  
  const [statusP, setStatusP] = useState("");
  const handleStatusPChange = (event) => {
    setStatusP(event.target.value);
  };

  const [project, setProject] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const handleProjectChange = (event) => {
    const selectedProjectId = event.target.value;
    setSelectedProject(selectedProjectId);
  };

  const [due_date, setDueDate] = useState("");
  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const [description, setDescription] = useState("");
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };



const handleSubmit = (event) => {
  event.preventDefault();
  const data = {
    title,
    due_date,
    project:selectedProject,
    team: selectedTeam.join(),
    statusP,
    description
  };
//   axios.post("http://127.0.0.1:8000/api/tasks/store", data)
//     .then(() => {
//       Swal.fire({
//         icon: 'success',
//         title: 'Succès',
//         text: 'Tâche ajoutée avec succès!',
//       }).then(() => {
//         // redirection vers la page de liste d'utilisateurs
//         window.location.reload();
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
axios.post("http://127.0.0.1:8000/api/tasks/store", data)
  .then(() => {
    // Redirection vers la page de liste d'utilisateurs
    window.location.reload();
  })
  .catch((error) => {
    console.log(error);
    // Vous pouvez ajouter un message d'erreur ou une gestion spécifique ici si nécessaire
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

useEffect(() => {
  async function fetchProjects() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/projects");
      setProject(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des projects :", error);
    }
  }

  fetchProjects();
}, []);



  return (
    // <DashboardLayout>
      // <DashboardNavbar />
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
                  Ajout tâche
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* Formulaire d'ajout utilisateur */}
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
                  <InputLabel id="statut-label">Statut</InputLabel>
                      <MDSelect
                          value={statusP}
                          onChange={handleStatusPChange}
                          label="Statut"
                          fullWidth
                      >
                          <MenuItem disabled value="">
                              Sélectionner le statut
                          </MenuItem>
                          <MenuItem value="Nouvelle">Nouvelle</MenuItem>
                          <MenuItem value="En cours">En cours</MenuItem>
                          <MenuItem value="Terminée">Terminée</MenuItem>
                      </MDSelect>
                  </MDBox>
                    

                  <MDBox p={3}>
                    <InputLabel id="project-label">Project</InputLabel>
                    <MDSelect
                      labelId="project-label"
                      id="project"
                      value={selectedProject}
                      onChange={handleProjectChange}
                      fullWidth
                    >
                      {project.map((project) => (
                        <MenuItem key={project.id} value={project.id}>
                          {project.title}
                        </MenuItem>
                      ))}
                    </MDSelect>
                  </MDBox>

                    {/* <Box p={3}>
                    <TextField
                        type="date"
                        label=""
                        value={dueDate}
                        onChange={handleDueDateChange}
                        fullWidth
                    />
                    </Box> */}
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
                        {team.map((user) => (
                          <MenuItem key={user.id} value={user.id}>
                            {user.name}
                          </MenuItem>
                        ))}
                      </MDSelect>
                    </MDBox>
                    <Box p={3}>
                    <InputLabel id="team-label">Deadline</InputLabel>
                      <TextField
                          value={due_date}
                          type="datetime-local"
                          onChange={handleDueDateChange}
                          fullWidth
                      />
                    </Box>
                    <Box p={3}>
                    <InputLabel id="description-label" style={{marginBottom:"10px"}}>Description</InputLabel>
                      <TextareaAutosize
                       
                        value={description}
                        onChange={handleDescriptionChange}
                        aria-label="Description"
                        minRows={4} // Vous pouvez ajuster le nombre minimum de lignes ici
                        placeholder="Saisissez la description ici"
                        style={{ width: '100%' }}
                      />
                    </Box>
                    
                    <MDBox p={3} textAlign="right">
                        {/* <Link to='/projects' component={Link} >
                            <MDButton
                            variant="gradient"
                            color="primary"
                            style={{ marginRight: '10px' }}
                            >
                            Retour
                            </MDButton>
                        </Link> */}
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
      // <Footer />
    // </DashboardLayout>
  );
}

export default AddTask;
