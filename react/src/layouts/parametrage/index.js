/* eslint-disable prettier/prettier */

import React from "react";
import { Grid, Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MenuHorizontal from "components/MenuHorizontal";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import usersTableData from "layouts/user/data/usersTableData";

function Parametrage() {
  const { columns, rows } = usersTableData();
  const menuItems = [
    { link: "/", name: "Accueil" },
    { link: "/permissions", name: "Permissions" },
    { link: "/pricing", name: "Tarification" },
    { link: "/disabled", name: "Désactivé", disabled: true },
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
                  Parametrage
                </MDTypography>
              </MDBox>

              <MDBox pt={3}>
                <MDBox textAlign="right" mr={3}>
                  <Link to="/user/add" component={Link}>
                    <MDButton variant="gradient" color="info" type="submit">
                      Ajout parametre
                    </MDButton>
                  </Link>
                </MDBox>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Parametrage;
