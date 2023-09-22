/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import AddTaskModal from './modal';
import moment from 'moment';

function TaskIndex() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    cardTitle: {
      marginBottom: theme.spacing(2),
    },
    cardContent: {
      minHeight: "150px",
      // width: '100%', // Définit la largeur à 100%
      // minHeight: '150px',
      margin: "auto",
      width: "100%",
    },
    taskItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: theme.spacing(1),
    },
    taskIcon: {
      marginRight: theme.spacing(1),
      color: theme.palette.primary.main,
    },
  }));

  const classes = useStyles();
  const [tasks, setTasks] = useState([]);

  async function getTasks() {
    const response = await axios.get("http://127.0.0.1:8000/api/tasks");
    const tasksWithIds = response.data.map((task, index) => ({
      ...task,
      draggableId: task.id.toString(),
      index,
    }));
    return tasksWithIds;
  }

  async function updateTask(taskId, updatedData) {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/tasks/${taskId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche : ", error);
      throw error;
    }
  }

  async function deleteTask(taskId) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Tâches supprimée",
      }).then(() => {
        // Redirection vers la page de liste des tâches après la suppression
        window.location.reload();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erreur tâches non supprimée",
      });
    }
  }

  const onDragEnd = async (result) => {
    if (!result.destination) return; // L'élément n'a pas été déplacé
  
    const updatedTasks = [...tasks];
    const movedTask = updatedTasks.find((task) => task.id.toString() === result.draggableId);
  
    if (!movedTask) {
      console.error("Tâche non trouvée : ", result.draggableId);
      return;
    }
  
    // Mettez à jour le statut de la tâche en fonction de la colonne de destination
    switch (result.destination.droppableId) {
      case "nouvelle":
        movedTask.status = "Nouvelle";
        break;
      case "enCours":
        movedTask.status = "En cours";
        break;
      case "terminee":
        movedTask.status = "Terminée";
        break;
      default:
        break;
    }

    // Mettez à jour le champ "position" de la tâche déplacée
    movedTask.position = result.destination.index + 1; 
  
    // Mettez à jour l'ordre des tâches dans la colonne source
    const sourceColumnTasks = updatedTasks.filter(
      (task) => task.status === result.source.droppableId
    );
    const destinationColumnTasks = updatedTasks.filter(
      (task) => task.status === result.destination.droppableId
    );
    sourceColumnTasks.splice(result.source.index, 1);
    destinationColumnTasks.splice(result.destination.index, 0, movedTask);
  
    // Mettez à jour l'ensemble des tâches
    setTasks(updatedTasks);
  
    // Mettez à jour la tâche sur le serveur
    try {
      await updateTask(movedTask.id, { status: movedTask.status, position: movedTask.position });
    } catch (error) {
      // Gérez l'erreur ici, par exemple, en affichant un message à l'utilisateur
      console.error("Erreur lors de la mise à jour de la tâche sur le serveur : ", error);
    }
  };
  

  useEffect(() => {
    async function fetchData() {
      const data = await getTasks();
      setTasks(data);
    }

    fetchData();
  }, []);

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const openAddTaskModal = () => {
    setIsAddTaskModalOpen(true);
  };

  const closeAddTaskModal = () => {
    setIsAddTaskModalOpen(false);
  };


  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isAddTaskModalOpen && <AddTaskModal onClose={closeAddTaskModal} />}
      <MDButton variant="contained" color="success" onClick={openAddTaskModal} style={{float:"right"}}>
        Ajouter une tâche
      </MDButton>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <div className={classes.root}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Grid container spacing={2}>
                {/* Tâches Nouvelles */}
                <Grid item xs={12} sm={6} md={4} >
                  <Card style={{ backgroundColor: 'rgb(226, 227, 229)' , maxHeight: '800px', overflow: 'auto' }}>
                    <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 className={classes.cardTitle}>Tâches Nouvelles</h4>
                      
                    </div>
                      <Droppable droppableId="nouvelle">
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={classes.cardContent}
                          >
                            {tasks
                              .filter((task) => task.status === "Nouvelle")
                              .map((task, index) => (
                                <Draggable
                                  key={task.id}
                                  draggableId={task.draggableId}
                                  index={index}
                                >
                                 
                                  {(provided) => (
                                    <Card
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                      className={classes.taskItem}
                                    >
                                     
                                      <CardContent>
                                       
                                        <MDTypography variant="subtitle1"><u> <b>{task.title}</b></u></MDTypography>
                                        
                                        <MDTypography variant="body2"><b>Description :</b> {task.description}</MDTypography>
                                        <MDTypography variant="body2"><b>Projet :</b> {task.project_title}</MDTypography>
                                        <MDTypography variant="body2"><b>Client :</b> {task.client_name}</MDTypography>
                                        <MDTypography variant="body2"><b>Deadline:</b> {moment(task.due_date).format('DD/MM/YYYY HH:mm')}</MDTypography>
                                        <div>
                                          {task.user_image.split(',').map((image, index) => (
                                            <img
                                              key={index}
                                              src={`http://127.0.0.1:8000/storage/images/${image}`} 
                                              alt={`Worker ${index + 1}`}
                                              style={{
                                                width: '24px',
                                                height: '24px',
                                                marginRight: '4px',
                                                borderRadius: '50%',
                                              }}
                                            />
                                          ))}
                                        </div>
                                        <IconButton
                                          color="error" // Utilisez la couleur de votre choix pour l'icône de corbeille
                                          //onClick={() => handleDeleteTask(task.id)} // Gérez la suppression ici
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
                                                deleteTask(task.id);
                                              }
                                            });
                                          }}
                                          style={{ float: 'right' }}
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      </CardContent>
                                    </Card>
                                  )}

                                </Draggable>
                              ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Tâches En cours */}
                <Grid item xs={12} sm={6} md={4}>
                  <Card style={{ backgroundColor: 'rgb(248, 215, 218)', maxHeight: '800px', overflow: 'auto' }}>
                    <CardContent>
                      <h4 className={classes.cardTitle}>Tâches En cours</h4>
                      <Droppable droppableId="enCours">
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={classes.cardContent}
                          >
                            {tasks
                              .filter((task) => task.status === "En cours")
                              .map((task, index) => (
                                <Draggable
                                  key={task.id}
                                  draggableId={task.draggableId}
                                  index={index}
                                >
                                  {(provided) => (
                                    <Card
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                      className={classes.taskItem}
                                    >
                                     
                                    <CardContent>
                                       
                                        <MDTypography variant="subtitle1"><u> <b>{task.title}</b></u></MDTypography>
                                        
                                        <MDTypography variant="body2"><b>Description :</b> {task.description}</MDTypography>
                                        <MDTypography variant="body2"><b>Projet :</b> {task.project_title}</MDTypography>
                                        <MDTypography variant="body2"><b>Client :</b> {task.client_name}</MDTypography>
                                        <MDTypography variant="body2"><b>Deadline:</b> {moment(task.due_date).format('DD/MM/YYYY HH:mm')}</MDTypography>
                                        <div>
                                          {task.user_image.split(',').map((image, index) => (
                                            <img
                                              key={index}
                                              src={`http://127.0.0.1:8000/storage/images/${image}`} 
                                              alt={`Worker ${index + 1}`}
                                              style={{
                                                width: '24px',
                                                height: '24px',
                                                marginRight: '4px',
                                                borderRadius: '50%',
                                              }}
                                            />
                                          ))}
                                        </div>
                                        <IconButton
                                          color="error" // Utilisez la couleur de votre choix pour l'icône de corbeille
                                          //onClick={() => handleDeleteTask(task.id)} // Gérez la suppression ici
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
                                                deleteTask(task.id);
                                              }
                                            });
                                          }}
                                          style={{ float: 'right' }}
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      </CardContent>
                                    </Card>
                                  )}
                                </Draggable>
                              ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Tâches Terminées */}
                <Grid item xs={12} sm={6} md={4}>
                  <Card style={{ backgroundColor: 'rgb(212, 237, 218)', maxHeight: '800px', overflow: 'auto' }}>
                    <CardContent>
                      <h4 className={classes.cardTitle}>Tâches Terminées</h4>
                      <Droppable droppableId="terminee">
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={classes.cardContent}
                          >
                            {tasks
                              .filter((task) => task.status === "Terminée")
                              .map((task, index) => (
                                <Draggable
                                  key={task.id}
                                  draggableId={task.draggableId}
                                  index={index}
                                >
                                 {(provided) => (
                                    <Card
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                      className={classes.taskItem}
                                    >
                                     
                                      <CardContent>
                                       
                                        <MDTypography variant="subtitle1"><u> <b>{task.title}</b></u></MDTypography>
                                        
                                        <MDTypography variant="body2"><b>Description :</b> {task.description}</MDTypography>
                                        <MDTypography variant="body2"><b>Projet :</b> {task.project_title}</MDTypography>
                                        <MDTypography variant="body2"><b>Client :</b> {task.client_name}</MDTypography>
                                        <MDTypography variant="body2"><b>Deadline:</b> {moment(task.due_date).format('DD/MM/YYYY HH:mm')}</MDTypography>
                                        <div>
                                          {task.user_image.split(',').map((image, index) => (
                                            <img
                                              key={index}
                                              src={`http://127.0.0.1:8000/storage/images/${image}`} 
                                              alt={`Worker ${index + 1}`}
                                              style={{
                                                width: '24px',
                                                height: '24px',
                                                marginRight: '4px',
                                                borderRadius: '50%',
                                              }}
                                            />
                                          ))}
                                        </div>
                                        <IconButton
                                          color="error" // Utilisez la couleur de votre choix pour l'icône de corbeille
                                          //onClick={() => handleDeleteTask(task.id)} // Gérez la suppression ici
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
                                                deleteTask(task.id);
                                              }
                                            });
                                          }}
                                          style={{ float: 'right' }}
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      </CardContent>
                                    </Card>
                                  )}
                                </Draggable>
                              ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DragDropContext>
          </div>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TaskIndex;
