import * as Yup from 'yup';

const updateValidationSchema = Yup.object().shape({
    updateProfileName: Yup.string().required('Please fill all details'),
    updateProfileEmail: Yup.string().email('Invalid email').required('Email is required'),
});

export default updateValidationSchema;
