import { TextField, SvgIcon, Chip, Button } from "@mui/material";
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';

export const UserSearch = ({ userType, loading, emails, handleSearch, handleDelete, formik }) => {
  return (
    <TextField
      fullWidth
      label={`Type the email of a ${userType}`}
      name={`study_${userType}Input`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === " ") {
          e.preventDefault();
          handleSearch();
        }
      }}
      InputProps={{
        startAdornment: (
          <>
            <Button size="small"
              sx={{ color: 'grey.500', ml: "-12px", mt: "12px" }}
            >
              <SvgIcon><MagnifyingGlassIcon /></SvgIcon>
            </Button>
            {emails.map((email, index) => (
              <Chip
                key={index}
                size="small"
                label={email}
                onDelete={() => handleDelete(index)}
                sx={{ m: 0.5, marginTop: "20px" }}
              />
            ))}
          </>
        )
      }}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      required
      value={formik.values[`study_${userType}Input`]}
      error={formik.touched[`study_${userType}Input`] && Boolean(formik.errors[`study_${userType}Input`])}
      helperText={formik.touched[`study_${userType}Input`] && formik.errors[`study_${userType}Input`]}
    />
  );
};
