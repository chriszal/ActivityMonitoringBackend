import Head from 'next/head';
import React, { useState } from 'react';
import { Box, Container, Stack, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Button, IconButton } from '@mui/material';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const Page = () => {
    const [selectValue, setSelectValue] = useState([]);
    const [uploadedImage, setUploadedImage] = useState(null); // State to hold the uploaded image

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageRemove = () => {
        setUploadedImage(null);
    };

    return (
        <>
            <Head>
                <title>
                    Contact Support
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Stack spacing={3}>
                        <Typography variant="h4">
                            Contact
                        </Typography>
                        <Typography variant="body1">
                            Use this section if you have any issues with the dashboard. You can report or ask questions to an admin.
                        </Typography>

                        <TextField
                            label="Full Name *"
                            variant="outlined"
                            // sx={{ width: '50%' }}
                        />

                        <TextField
                            label="Email *"
                            variant="outlined"
                            type="email"
                            // sx={{ width: '50%' }}
                        />

                        <FormControl  variant="outlined">
                            <InputLabel>Reason for Reporting *</InputLabel>
                            <Select
                                multiple
                                value={selectValue}
                                onChange={(event) => setSelectValue(event.target.value)}
                                label="Reason for Reporting"
                                inputProps={{ name: 'reportReason' }}
                            >
                                <MenuItem value={"category1"}>User Account Issues</MenuItem>
                                <MenuItem value={"category2"}>Performance Issues</MenuItem>
                                <MenuItem value={"category3"}>Data Display Issues</MenuItem>
                                <MenuItem value={"category4"}>Feedback/Suggestions</MenuItem>
                                <MenuItem value={"category5"}>Others</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label="Message *"
                            multiline
                            rows={5}
                            variant="outlined"
                            fullWidth
                        />

                        {/* {uploadedImage && (
                            <Box sx={{ position: 'relative', width: 'fit-content' }}>
                                <img src={uploadedImage} alt="Uploaded preview" style={{ maxHeight: '100px', marginTop: '10px' }} />
                                <IconButton
                                    onClick={handleImageRemove}
                                    sx={{ position: 'absolute', top: '-10px', right: '-10px', background: 'rgba(255,255,255,0.7)' }}
                                >
                                    <TrashIcon />
                                </IconButton>
                            </Box>
                        )}

                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload Screenshot
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Button> */}

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </Button>

                    </Stack>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
