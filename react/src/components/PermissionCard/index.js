/* eslint-disable prettier/prettier */
import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardContent, Checkbox, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function PermissionCard({ title,permissions, onPermissionChange }) {
  return (
    <Card sx={{ borderRadius: "12px" }}>
      {/* <CardHeader title="Permissions" sx={{ p: 1 }} /> */}
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
            {title}
        </MDTypography>
        </MDBox>
      <CardContent>
        <Grid container spacing={1}>
          {permissions.map((perm) => (
            <Grid item xs={6} key={perm.value}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={perm.checked}
                  onChange={() => onPermissionChange(perm.value)}
                  color="primary"
                />
                <span>{perm.label}</span>
              </div>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

PermissionCard.propTypes = {
    title: PropTypes.string.isRequired,
  permissions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
    })
  ),
  onPermissionChange: PropTypes.func,
};

export default PermissionCard;
