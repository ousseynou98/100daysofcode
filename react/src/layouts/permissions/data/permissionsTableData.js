/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";

export default function PermissionsTable() {
  const [roles, setPermissions] = useState([]);

  async function getPermissions() {
    const response = await axios.get("http://127.0.0.1:8000/api/permissions");
    return response.data;
  }

  async function deletePermission(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/permissions/${id}`);
      const newPermissions = users.filter((user) => user.id !== id);
      setPermissions(newPermissions);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Utilisateur supprimé",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erreur utilisateur non supprimé",
      });
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getPermissions();
      setPermissions(data);
    }

    fetchData();
  }, []);

  return {
    columns: [
      { Header: "Role", accessor: "Role", width: "45%", align: "left" },
      { Header: "Description", accessor: "Description", align: "left" },
      { Header: "Action", accessor: "Action", align: "center" },
    ],

    rows: roles.map((role) => ({
      Role: role.name,
      Description: role.description,
      Action: [
        <Link key="edit" to={`/permissions/edit/${role.id}`} component={Link}>
          <MDButton variant="text" color="dark">
            <Icon>edit</Icon>&nbsp;edit
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
              deletePermission(user.id);
            }
          });
        }}
      >
        <Icon>delete</Icon>&nbsp;delete
      </MDButton>,
      ],
    })),
  };
}
