import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import updateValidationSchema from '../../constants/validationSchema/updateValidationSchema';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile } from "../../actions/userAction";
import Loader from '../Layouts/Loader/Loader';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';
import MetaData from "../Layouts/MetaData";
const Swal = require('sweetalert2');

const Update = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userSlice);
    const [flag, setFlag] = useState(0);
    const { error, isUpdated, loading } = useSelector((state) => state.userSlice);
    const [profilePreview, setProfilePreview] = useState(user.profileUrl);
    const [profileImage, setProfileImage] = useState("");
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const updateProfileSubmit = async (values, { setSubmitting }) => {
        if (flag === 0) {
            setProfileImage("");
        }
        console.log(profileImage);
        const formData = {
            name: values.updateProfileName,
            email: values.updateProfileEmail,
            profileImage: profileImage
        }
        setSubmitting(false);
        dispatch(updateProfile(formData));
    };
    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error}`,
                footer: '<a href="#">Why do I have this issue?</a>'
            });
            dispatch(clearErrors(dispatch));
        }
        // console.log(isUpdated)
        if (isUpdated) {
            Swal.fire({
                icon: "success",
                title: "Profile Updated Successfully",
                text: ``,
                footer: '<a href="#">Why do I have this issue?</a>'
            }).then(() => {
                dispatch({ type: UPDATE_PROFILE_RESET });
                window.location.replace("/account");
            });
        }
    }, [dispatch, error, isUpdated])
    const handleImageChange = (e) => {
        setFlag(1);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfilePreview(reader.result);
                setProfileImage(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <MetaData title="Update Profile" />
            {loading ? <Loader /> : <div className='lsContainer flex w-[100vw] h-[40vw] bg-gray-50 bg-231-231-231 top-0 left-0 max-w-[100%] justify-center items-center'>
                <div className='lsBox rounded shadow bg-white w-[29vw] h-[65vh] box-border overflow-hidden'>
                    <div>
                        <div className='lsToggle flex h-[3vmax]'>
                            <p className={`transition-all text-xl cursor-pointer grid place-items-center w-full hover:text-fuchsia-700 hover:font-bold  text-fuchsia-700 font-bold  border-b-4 border-fuchsia-950 "}`} >Update Profile</p>
                        </div>
                    </div>
                    <Formik
                        initialValues={{
                            updateProfileName: name,
                            updateProfileEmail: email,
                        }}
                        validationSchema={updateValidationSchema}
                        onSubmit={updateProfileSubmit}

                    >
                        {({ values, handleChange, isSubmitting }) => (
                            <Form className='   pb-9  signupForm flex flex-col items-center m-auto pt-9 px-[2vmax] justify-evenly gap-3 h-[90%] transition-all'>
                                <div className='signUpName flex w-full items-center'>
                                    <PersonIcon className='absolute translate-x-0 text-6xl ml-8' />
                                    <Field type='text' name='updateProfileName' placeholder='Name' className='px-1 py-4 rounded pl-20 w-full box-border border-2 border-gray-500' value={values.updateProfileName} onChange={handleChange} />
                                </div>
                                <div className='updateProfileEmail flex w-full items-center'>
                                    <MailOutlineIcon className='absolute translate-x-0 text-6xl ml-8' />
                                    <div className='flex-col flex w-full'>
                                        <Field value={values.updateProfileEmail} onChange={handleChange} type='email' name='updateProfileEmail' placeholder='Email' className='rounded px-1 py-4 pl-20 w-full box-border border-2 border-gray-500' />
                                    </div>
                                </div>
                                <div className='profileImage flex w-full items-center'>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={handleImageChange}
                                        className='rounded px-1 py-4 w-full box-border border-2 border-gray-500'
                                    />
                                    {profilePreview && <img src={profilePreview} alt="Profile" style={{ maxWidth: "100px", maxHeight: "100px" }} />}
                                </div>
                                <ErrorMessage name='updateProfileName' component='div' className='error' />
                                <ErrorMessage name='updateProfileEmail' component='div' className='error' />
                                <button disabled={isSubmitting} type='submit' className='loginBtn text-lg bg-fuchsia-950 rounded p-2 w-full transition-all text-white hover:bg-fuchsia-900' >
                                    Edit Profile </button>
                            </Form>
                        )}
                    </Formik>

                </div>
            </div>}
        </>
    )
}

export default Update