/* eslint-disable prettier/prettier */

import React from "react";
import PropTypes from "prop-types"; 
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function MenuHorizontal(props) {
  const { variant, borderRadius, coloredShadow,menuItems,menuColor } = props;

  const appBarStyles = {
    background: "linear-gradient(195deg, #49a3f1, #1A73E8)", // Utilisation du dégradé linéaire
    borderRadius: borderRadius,
    boxShadow: coloredShadow,
    color:menuColor,
  };

  const buttonStyles = {
    color: "white", // Couleur du texte des boutons
  };

  return (
    <AppBar position="static" style={appBarStyles}>
      <Toolbar>
       
        <div>
        {menuItems.map((item, index) => (
            <Button
              key={index}
              color="inherit"
              component={Link}
              to={item.link}
              disabled={item.disabled}
              style={buttonStyles}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </Toolbar>
    </AppBar>
  );
}

MenuHorizontal.propTypes = {
  variant: PropTypes.string,
  borderRadius: PropTypes.string,
  coloredShadow: PropTypes.string,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  menuColor: PropTypes.string,
};

export default MenuHorizontal;
