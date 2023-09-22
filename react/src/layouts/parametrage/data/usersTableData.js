/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";

export default function UsersTable() {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const response = await axios.get("http://127.0.0.1:8000/api/user");
    return response.data;
  }

  async function deleteUser(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user/${id}`);
      const newUsers = users.filter((user) => user.id !== id);
      setUsers(newUsers);
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
      const data = await getUsers();
      setUsers(data);
    }

    fetchData();
  }, []);

  return {
    columns: [
      { Header: "Nom", accessor: "Nom", width: "45%", align: "left" },
      { Header: "Email", accessor: "Email", align: "left" },
      { Header: "Profil", accessor: "Profil", align: "left" },
      { Header: "Action", accessor: "Action", align: "center" },
    ],

    rows: users.map((user) => ({
      Nom: user.name,
      Email: user.email,
      Profil: user.profil,
      Action: [
        <Link key="edit" to={`/user/edit/${user.id}`} component={Link}>
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
              deleteUser(user.id);
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
