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
import Checkbox from "@mui/material/Checkbox";

function AddExpense() {
  const navigate = useNavigate();

  
  const [description, setDescription] = useState("");
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const [amount, setAmount] = useState("");
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const [expenseDate, setExpenseDate] = useState("");
  const handleExpenseDateChange = (event) => {
    setExpenseDate(event.target.value);
  };

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
  };

  const [project, setProject] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const handleProjectChange = (event) => {
    const selectedProjectId = event.target.value;
    setSelectedProject(selectedProjectId);
  };

  const [team, setTeam] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const [billable, setBillable] = useState("");
//   const handleBillableChange = (event) => {
//     setBillable(event.target.value);
//   };
    const handleBillableChange = (event) => {
    const isChecked = event.target.checked;
    setBillable(isChecked ? 1 : 0);
  };
  

  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData();
  data.append('description', description);
  data.append('amount', amount);
  data.append('category', selectedCategory);
  data.append('expenseDate', expenseDate);
  data.append('project', selectedProject);
  data.append('team', selectedTeam);
  data.append('billable', billable);
  data.append('file', file);
  axios.post("http://127.0.0.1:8000/api/expense/store", data)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Dépense ajoutée avec succès!',
      }).then(() => {
        // redirection vers la page de liste d'utilisateurs
        navigate("/expenses");
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
  async function fetchCategory() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/expense/category");
      setCategory(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des category :", error);
    }
  }

  fetchCategory();
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
                  Ajout dépense
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* Formulaire d'ajout utilisateur */}
                <MDBox p={3}>
                  <form onSubmit={handleSubmit}>
                    <Box p={3}>
                      <InputLabel id="description-label" style={{marginBottom:"10px"}}>Description</InputLabel>
                      <TextareaAutosize
                       
                        value={description}
                        onChange={handleDescriptionChange}
                        aria-label="Description"
                        minRows={5} // Vous pouvez ajuster le nombre minimum de lignes ici
                        placeholder="Saisissez la description ici"
                        style={{ width: '100%' }}
                      />
                    </Box>
                    <Box p={3} mt={-4}>
                    <InputLabel id="description-label" style={{marginBottom:"10px"}}>Date</InputLabel>
                      <TextField
                          type="date"
                          value={expenseDate}
                          onChange={handleExpenseDateChange}
                          fullWidth
                      />
                    </Box>

                    <Box p={3} mt={-4}>
                      <TextField
                          type="number"
                          label="prix"
                          value={amount}
                          onChange={handleAmountChange}
                          fullWidth
                      />
                    </Box>

                    <MDBox p={3}>
                      <InputLabel id="category-label">Catégorie</InputLabel>
                      <MDSelect
                        labelId="category-label"
                        id="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        fullWidth
                      >
                        {category.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
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

                    <MDBox p={3}>
                      <InputLabel id="team-label">Équipe</InputLabel>
                      <MDSelect
                        labelId="team-label"
                        id="team"
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

                    {/* <Box p={3} mt={-4}>
                    <InputLabel id="billable-label">Facturable</InputLabel>
                    <Checkbox
                        id="billable"
                        label="Facturable"
                        // checked={isChecked}
                        onChange={handleBillableChange}
                        color="primary" 
                        />
                    </Box> */}
                    <Box display="flex" alignItems="center" p={3}>
                        <label htmlFor="billable" style={{ color: "rgb(142, 142, 142)",fontSize: "1rem",fontFamily:"roboto" }}>
                            Facturable
                        </label>
                        <Checkbox
                            id="billable"
                            // checked={isChecked}
                            onChange={handleBillableChange}
                            color="primary"
                            value={billable}
                        />
                        
                    </Box>
                    <Box p={3} >
                        <InputLabel id="receipt-label" mb={4}>Joindre un reçu</InputLabel>
                        <TextField

                        type="file"
                        accept=".jpeg, .jpg, .png"
                        onChange={handleFileChange}
                        fullWidth
                        />
                    </Box>

                    <MDBox p={3} textAlign="right">
                        <Link to='/products' component={Link} >
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

export default AddExpense;
