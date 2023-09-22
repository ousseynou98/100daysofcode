/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

export default function ExpensesTable() {
  const [expenses, setExpenses] = useState([]);
  

  async function getExpenses() {
    const response = await axios.get("http://127.0.0.1:8000/api/expenses");
    return response.data;
  }

  async function deleteExpense(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/expense/${id}`);
      const newExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(newExpenses);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Dépense supprimée",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erreur dépense non supprimée",
      });
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getExpenses();
      setExpenses(data);
    }

    fetchData();
  }, []);

  return {
    columns: [
        { Header: "Date", accessor: "Date", align: "left" },
        { Header: "Description", accessor: "Description", align: "left" },
        { Header: "Collègue", accessor: "Collegue", align: "left" },
        { Header: "Projet", accessor: "Projet", align: "left" },
        { Header: "Montant", accessor: "Montant", align: "left" },
        { Header: "Facturable", accessor: "Facturable", align: "left" },
        { Header: "Reçu", accessor: "Reçu", align: "left" },
        { Header: "Action", accessor: "Action", align: "center" },
    ],

    rows: expenses.map((expense) => ({
        Date: expense.expense_date,
        Description: expense.description,
        Collegue: (
            <div style={{ display: "flex", alignItems: "center" }}>
                {/* <Tooltip title={expense.user_name}> */}
                  <Avatar
                    src={`http://127.0.0.1:8000/storage/images/${expense.image}`}
                    alt=""
                    sx={{ width: 50, height: 50, marginRight: 1 }}
                  />
                  
                {/* </Tooltip> */}
                <p>{expense.user_name}</p>
            </div>
         ),
        Projet: expense.project_name,
        Montant: expense.amount +" FCFA",
        Facturable: expense.billable === 1 ? 'Oui' : 'Non',
        Reçu: (
            <span>
              {expense.receipt ? (
                <a
                  href={`http://127.0.0.1:8000/storage/images/receipt/${expense.receipt}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visuliser le reçu
                </a>
              ) : (
                "N/A" // Ou tout autre texte que vous souhaitez afficher lorsque receipt est vide
              )}
            </span>
          ),
        Action: [
            <Link key="edit" to={`/expense/edit/${expense.id}`} component={Link}>
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
                deleteExpense(expense.id);
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
