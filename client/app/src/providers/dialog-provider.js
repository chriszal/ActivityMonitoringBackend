import { useState } from 'react';
import { DialogContext } from '../contexts/dialog-context';
import ResponsiveDialog from "src/components/responsive-dialog" ;

export const DialogProvider = ({ children }) => {
  const [dialogState, setDialogState] = useState({
    open: false,
    title: '',
    message: '',
    actions: null
  });

  const openDialog = (title, message, actions) => {
    setDialogState({
      open: true,
      title,
      message,
      actions
    });
  };

  const closeDialog = () => {
    setDialogState(prevState => ({ ...prevState, open: false }));
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <ResponsiveDialog 
        open={dialogState.open} 
        title={dialogState.title} 
        message={dialogState.message} 
        actions={dialogState.actions}
        onClose={closeDialog}
      />
    </DialogContext.Provider>
  );
};
