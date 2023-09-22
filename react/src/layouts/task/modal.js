/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import AddTask from './add'; // Importez le formulaire AddTask ici

function AddTaskModal() {
  const [open, setOpen] = useState(true); // Ouvrez le modal par défaut

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}  
      maxWidth="md" // Ajustez la valeur en fonction de vos besoins
      fullWidth
    >
      <DialogContent>
        <AddTask onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskModal;
