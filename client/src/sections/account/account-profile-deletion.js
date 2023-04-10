import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Stack,
  Typography, Unstable_Grid2 as Grid
} from '@mui/material';


export const AccountProfileDeletion = () => (
  <Card>
    <CardContent sx={{ pt: 2 }}>
      <Box sx={{ m: -1.5 }}>
        <Grid
          container
          spacing={3}
        >
          <Grid xs={12} md={4}>
            <Typography variant="h6">Delete Account</Typography>
          </Grid>
          <Grid xs={12} md={8}>
            <Grid container spacing={2}>
              <Stack spacing={2}>
                <Typography variant="subtitle1">Delete your account and all of your source data. This is irreversible.</Typography>
                <Button variant="outlined" color="error" sx={{ width: "fit-content" }}>Delete account</Button>
              </Stack>
            </Grid>


          </Grid>
        </Grid>
      </Box>
    </CardContent>
  </Card>
);
