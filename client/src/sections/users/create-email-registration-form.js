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
                                console.log(values)
                                const response = await fetch(
                                    `http://localhost:8081/api/v1/user/register`,
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(values),
                                    }
                                );

                                if (response.ok) {
                                    console.log("Submitted", values);
                                    showAlert('Registration email sent successfully!', 'success');
                                    router.back();
                                } else {
                                    const data = await response.json();
                                    showAlert('Registration email failed to send!', 'error');
                                    helpers.setStatus({ success: false });
                                    helpers.setErrors({ submit: data.message });
                                    helpers.setSubmitting(false);
                                }
                            } catch (err) {
                                helpers.setStatus({ success: false });
                                helpers.setErrors({ submit: err.message });
                                showAlert( err.message, 'error');
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
                    <CardHeader subheader="Please fill out the email and role to send a registration email." title="Register User By Email" />
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
