/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";


export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  

  async function getProducts() {
    const response = await axios.get("http://127.0.0.1:8000/api/products");
    return response.data;
  }

  async function deleteProduct(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/product/${id}`);
      const newProducts = products.filter((product) => product.id !== id);
      setProducts(newProducts);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Produit supprimé",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erreur produit non supprimé",
      });
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
    }

    fetchData();
  }, []);

  return {
    columns: [
      { Header: "Description", accessor: "Description", align: "left" },
      { Header: "Prix", accessor: "Price", align: "left" },
      { Header: "Catégorie", accessor: "Category_name", align: "left" },
      { Header: "Action", accessor: "Action", align: "center" },
    ],

    rows: products.map((product) => ({
      Description: product.description,
      Price: product.price,
      Category_name: product.category_name,
      Action: [
        <Link key="edit" to={`/product/edit/${product.id}`} component={Link}>
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
              deleteProduct(product.id);
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
