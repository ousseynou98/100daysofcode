/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link,useParams } from "react-router-dom";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";

export default function ClientsTable() {
  const [clients, setClients] = useState([]);
  const { id } = useParams();

  async function getClients() {
    const response = await axios.get(`http://127.0.0.1:8000/api/clients`);
    return response.data;
  }

  async function deleteClient(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/client/${id}`);
      const newClients = clients.filter((client) => client.id !== id);
      setClients(newClients);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Client supprimée",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erreur clientth non supprimé",
      });
    }
  }



  useEffect(() => {
    async function fetchData() {
      const data = await getClients();
      setClients(data);
    }

    fetchData();
  }, []);

  return {
    columns: [
      // { Header: "Image", accessor: "imageUrl", width: "10%", align: "left" },
      { Header: "Nom", accessor: "Nom", width: "45%", align: "left" },
      { Header: "Entreprise", accessor: "Entreprise", align: "left" },
      { Header: "Numero", accessor: "Numero", align: "left" },
      { Header: "Action", accessor: "Action", align: "center" },
    ],

    rows: clients.map((Client) => ({
      Nom: (
         <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={Client.image_url}
            alt=""
            sx={{ width: 50, height: 50, marginRight: 1 }}
          />
          {Client.name}
         </div>
      ),
      Entreprise: Client.company_name,
      Numero: Client.phone,
      Action: [
        <Link key="edit" to={`/Client/edit/${Client.id}`} component={Link}>
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
              deleteClient(Client.id);
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
