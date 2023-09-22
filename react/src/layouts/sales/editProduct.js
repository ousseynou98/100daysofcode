/* eslint-disable prettier/prettier */
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material UI components
import { Box, TextField, MenuItem, Select as MDSelect, InputLabel, TextareaAutosize } from "@material-ui/core";

// Axios for API requests
import axios from "axios";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React Router Dom
import { useNavigate, Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentCategory, setCurrentCategory] = useState(""); // Nouvel état pour la catégorie actuelle

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/${id}`)
      .then((response) => {
        const productData = response.data[0];
        setDescription(productData.description);
        setPrice(productData.price);
        setSelectedCategory(productData.category);
        setCurrentCategory(productData.category_id); // Préchargez la catégorie actuelle
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

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      description,
      price,
      category: selectedCategory,
    };
    axios.put(`http://127.0.0.1:8000/api/product/update/${id}`, data)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Produit modifié avec succès!',
        }).then(() => {
          // redirection vers la page de liste d'utilisateurs
          navigate("/products");
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
    async function fetchCategories() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/product/category");
        setCategory(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des categories :", error);
      }
    }
    fetchCategories();
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
                  Modifier produit
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* Formulaire de modification de produit */}
                <MDBox p={3}>
                  <form onSubmit={handleSubmit}>
                    <Box p={3}>
                      <InputLabel id="description-label" style={{ marginBottom: "10px" }}>Description</InputLabel>
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
                      <TextField
                        type="number"
                        label="prix"
                        value={price}
                        onChange={handlePriceChange}
                        fullWidth
                      />
                    </Box>

                    <MDBox p={3}>
                      <InputLabel id="category-label">Catégorie</InputLabel>
                      <MDSelect
                        labelId="category-label"
                        id="category"
                        value={currentCategory} 
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

export default EditProduct;
