/* eslint-disable prettier/prettier */

import React, { useState } from "react";
import { Grid, Card, Box } from "@mui/material";
import Swal from 'sweetalert2';
import PermissionCard from "components/PermissionCard";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MenuHorizontal from "components/MenuHorizontal";

const AddPermissions = () => {
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
    // ...
    // Votre code de gestion de soumission
    // ...
  };

  const userPermissions = [
    { value: "read", label: "Lecture", checked: true },
    { value: "create", label: "Création", checked: false },
    { value: "update", label: "Modification", checked: true },
    { value: "delete", label: "Suppression", checked: false },
  ];
  const menuItems = [
    { link: "/permissions", name: "Permissions" },
    { link: "/user", name: "Utilisateurs" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MenuHorizontal
      menuColor="white"
      borderRadius="0.5rem"
      coloredShadow="info" 
      menuItems={menuItems}
      />

      <Box pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <PermissionCard title="Gestion des contacts et des clients CRM" permissions={userPermissions} />
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <PermissionCard title="Gestion des ventes CRM" permissions={userPermissions} />
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <PermissionCard title="Service client et support CRM" permissions={userPermissions} />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default AddPermissions;
