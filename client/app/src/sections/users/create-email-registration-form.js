import { useContext } from 'react';
import { DialogContext } from 'src/contexts/dialog-context';
import { AlertContext } from 'src/contexts/alert-context';
import {
    Box,
    Button,
    Card,
    Stack,
    CardActions,
    CardContent,
    FormControl, InputLabel, MenuItem, Select,FormHelperText,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid
} from '@mui/material';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from 'src/utils/axios-instance';

const rolesOptions = [
    {
        value: 'admin',
        label: 'Admin'
    },
    {
        value: 'member',
        label: 'Member'
    }
];

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address.')
        .required('Email is required.'),
    role: Yup.string()
        .required('Role is required.')
});



export const CreateEmailRegistrationForm = () => {
    const { openDialog, closeDialog } = useContext(DialogContext);
    const { showAlert } = useContext(AlertContext);

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
            role: "",
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            const dialogText = "Are you sure you want to send a registration form to this email?";
            const dialogActions = (
                <>
                    <Button autoFocus onClick={closeDialog}>
                        Back
                    </Button>
                    <Button
                        onClick={async () => {
                            closeDialog();
                            try {
                                console.log(values);
                                const response = await axiosInstance.post(`/user/register`, values);
                              
                                console.log("Submitted", response.data);
                                showAlert('Registration email sent successfully!', 'success');
                                router.back();
                              } catch (error) {
                                console.error("There was an error during registration.", error);
                                
                                if (error.response) {
                                  showAlert(error.response.data.message || 'An error occurred while trying to register your user.', 'error');
                                  helpers.setErrors({ submit: error.response.data.message });
                                } else {
                                  // Network error or issue reaching the server
                                  showAlert('Unable to reach the server. Please check your connection or contact an Admin.', 'error');
                                }
                                helpers.setStatus({ success: false });
                                helpers.setSubmitting(false);
                              }
                              
                        }}
                        autoFocus
                    >
                        Send
                    </Button>
                </>
            );
            openDialog('Confirmation', dialogText, dialogActions);
        },
    });



    return (
        <div>
            <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
                <Card sx={{ maxWidth: 1300 }}>
                    <CardHeader subheader="Please fill out the email and role to send a registration email." title="Register User By Email Invitation" />
                    <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: -1.5 }}>
                            <Grid container spacing={3}>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        required
                                        value={formik.values.email}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </Grid>

                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <FormControl fullWidth error={formik.touched.role && Boolean(formik.errors.role)}>
                                        <InputLabel htmlFor="role">Select Role</InputLabel>
                                        <Select
                                            label="Select Role"
                                            name="role"
                                            value={formik.values.role}
                                            onBlur={formik.handleBlur}
                                            onChange={(e) => {
                                                formik.setFieldValue("role", e.target.value);
                                            }}
                                            
                                            inputProps={{
                                                name: "role",
                                                id: "role",
                                            }}
                                        >
                                            {rolesOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.role && formik.errors.role && (
                                            <FormHelperText>{formik.errors.role}</FormHelperText>
                                        )}
                                    </FormControl>


                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Stack
                            alignItems="center"
                            direction="row"
                            spacing={1}
                        >
                            <Button type='submit' variant="contained" >
                                Send email
                            </Button>
                        </Stack>

                    </CardActions>
                </Card>
            </form>
           

        </div>
    );
};
