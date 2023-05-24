import { useState } from 'react';
import { AlertContext } from '../contexts/alert-context';
import { Alert } from '@mui/material';


export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  
    const showAlert = (message, severity = 'success') => {
      setAlert({ open: true, message, severity });
      setTimeout(() => setAlert({ open: false, message: '', severity: 'success' }), 5000); 
    };
  
    const closeAlert = () => {
      setAlert({ open: false, message: '', severity: 'success' });
    };
  
    return (
      <AlertContext.Provider value={{ alert, showAlert, closeAlert }}>
        {children}
        {alert.open && (
          <div
            style={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              zIndex: 9999
            }}
          >
            <Alert severity={alert.severity} onClose={closeAlert}>{alert.message}</Alert>
          </div>
        )}
      </AlertContext.Provider>
    );
  };
