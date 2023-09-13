import axiosInstance from 'src/utils/axios-instance';

export const handleSearch = async ({ role, inputValue, setLoading, setEmails, formik }) => {
  if (!inputValue.trim()) {
    return;
  }

  

  try {
    setLoading(true);
    const response = await axiosInstance.get(`/user/id/${inputValue.trim()}`);
    const userExists = Object.keys(response.data).length > 0;
    console.log(response)

    if (userExists) {
      if (!formik.values[`study_${role}`].find(user => user.email === inputValue.trim())) {
        formik.setValues(prevValues => ({
          ...prevValues,
          [`study_${role}`]: [
            ...prevValues[`study_${role}`],
            { id: response.data.id, email: inputValue.trim() }
          ]
        }));
        setEmails(prevEmails => [...prevEmails, inputValue.trim()]);
        formik.setErrors({ [`study_${role}Input`]: "" });
        formik.setFieldValue(`study_${role}Input`, '');
      } else {
        formik.setErrors({ [`study_${role}Input`]: `${role.charAt(0).toUpperCase() + role.slice(1)} already exists.` });
      }
    } else {
      formik.setErrors({ [`study_${role}Input`]: `${role.charAt(0).toUpperCase() + role.slice(1)} not found.` });
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || `An error occurred while searching for the ${role}.`;
    formik.setErrors({ [`study_${role}Input`]: errorMessage });
    console.log(error);
  } finally {
    setLoading(false);
  }
};
