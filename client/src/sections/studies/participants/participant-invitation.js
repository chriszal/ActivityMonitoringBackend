import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Typography,Box,TextField,Button} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { Stack } from '@mui/system';

export const SendRegistrationEmailDialog = ({ onClose, onSend, selectedParticipant }) => {
    
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
        }),
        onSubmit: async (values) => {  
            setLoading(true);
            await onSend(values, selectedParticipant);  
            setLoading(false);
            onClose();
        },
    });

    return (
        <Box flexDirection="column" display="flex" p={2} justifyContent="center" width="100%">
            <TextField
                autoFocus
                label="Email Address"
                type="email"
                name="email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
        <Box mt={2} display="flex"  justifyContent="flex-end">
            <Button onClick={onClose} color="primary">
                Cancel
            </Button>
            <LoadingButton 
                variant='contained'
                onClick={formik.handleSubmit}
                color="primary"
                loading={loading}
            >
                Send
            </LoadingButton>
        </Box>
    </Box>
    );
};
