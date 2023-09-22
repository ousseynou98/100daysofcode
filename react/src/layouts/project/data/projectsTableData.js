/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";


export default function ProjectsTable() {
  const [projets, setProjects] = useState([]);
  

  async function getProjects() {
    const response = await axios.get("http://127.0.0.1:8000/api/projects");
    return response.data;
  }

  async function deleteProjet(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/project/${id}`);
      const newProjects = projets.filter((projet) => projet.id !== id);
      setProjects(newProjects);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Projet supprimé",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erreur projet non supprimé",
      });
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getProjects();
      setProjects(data);
    }

    fetchData();
  }, []);

  return {
    columns: [
      { Header: "Titre", accessor: "Title", align: "left" },
      { Header: "Client", accessor: "Client", align: "left" },
      { Header: "Date d'échéance", accessor: "Due_date", align: "left" },
      { Header: "Equipe", accessor: "Team", align: "left" },
      { Header: "Statut", accessor: "Status", align: "left" },
      { Header: "Action", accessor: "Action", align: "center" },
    ],

    rows: projets.map((projet) => ({
      Title: projet.title,
      Client: projet.client_name,
      Due_date: projet.due_date,
      // Team: projet.user_name,
      Team: (
        <div style={{ display: "flex", alignItems: "center" }}>
          {projet.user_image.split(",").map((imageName, index) => (
            <Tooltip title={projet.user_name.split(",")[index]} key={index}>
              <Avatar
                src={`http://127.0.0.1:8000/storage/images/${imageName}`}
                alt=""
                sx={{ width: 50, height: 50, marginRight: 1 }}
              />
            </Tooltip>
          ))}
        </div>
     ),
      // Status: projet.status,
      Status: (
        <span
          style={{
            backgroundColor:
              projet.status.toLowerCase() === "en attente"
                ? "rgb(255, 243, 205)"
                : projet.status.toLowerCase() === "en cours"
                ? "rgb(204, 229, 255)"
                : projet.status.toLowerCase() === "terminé"
                ? "rgb(212, 237, 218)"
                : projet.status.toLowerCase() === "annulé"
                ? "rgb(248, 215, 218)"
                : "transparent", // Couleur de fond par défaut
            color:
              projet.status.toLowerCase() === "en cours" ||
              projet.status.toLowerCase() === "terminé" ||
              projet.status.toLowerCase() === "annulé"
                ? "white" // Couleur du texte pour certaines valeurs de statut
                : "black", // Couleur du texte par défaut
            padding: "4px 8px", // Espacement du texte à l'intérieur du span
            borderRadius: "4px", // Bordures arrondies
          }}
        >
          {projet.status}
        </span>
      ),
      Action: [
        <Link key="edit" to={`/project/edit/${projet.id}`} component={Link}>
          <MDButton variant="text" color="dark">
            <Icon>edit</Icon>&nbsp;Modifier
          </MDButton>
        </Link>,
        <MDButton
        key="delete"
        variant="text"
        color="primary"
        onClick={() => {
          Swal.fire({
            title: "Voulez vous confirmer la suppression?",
            text: "Vous ne pourrez pas revenir en arrière !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Supprimer",
            cancelButtonText: "Annuler",
          }).then((result) => {
            if (result.isConfirmed) {
              deleteProjet(projet.id);
            }
          });
        }}
      >
        <Icon>delete</Icon>&nbsp;Supprimer
      </MDButton>,
      ],
    })),
  };
}
