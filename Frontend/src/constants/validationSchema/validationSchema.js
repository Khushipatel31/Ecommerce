import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    registerName: Yup.string().required('Please fill all details'),
    registerEmail: Yup.string().email('Invalid email').required('Email is required'),
    registerPassword: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export default validationSchema;
