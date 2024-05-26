import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import Loader from '../Layouts/Loader/Loader';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';
import MetaData from "../Layouts/MetaData";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from "@material-ui/icons/VpnKey";
const Swal = require('sweetalert2');

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const { error, isUpdated, loading } = useSelector((state) => state.userSlice);

    const updatePasswordSubmit = async (values, { setSubmitting }) => {
        if (values.newPassword !== values.confirmNewPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Your new password and confirm password do not match!"
            });
            return;
        } else {
            console.log(values);
            const formData = {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
                confirmPassword: values.confirmNewPassword
            };
            setSubmitting(false);
            dispatch(updatePassword(formData));
        }
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
        if (isUpdated) {
            Swal.fire({
                icon: "success",
                title: "Password Updated Successfully",
                footer: '<a href="#">Why do I have this issue?</a>'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch({ type: UPDATE_PASSWORD_RESET });
                    window.location.replace("/account");
                }
            });
        }
    }, [dispatch, error, isUpdated])
    return (
        <>
            <MetaData title="Change Password" />
            {loading ? <Loader /> : <div className='lsContainer flex w-[100vw] h-[40vw] bg-gray-50 bg-231-231-231 top-0 left-0 max-w-[100%] justify-center items-center'>
                <div className='lsBox rounded shadow bg-white w-[29vw] h-[65vh] box-border overflow-hidden'>
                    <div>
                        <div className='lsToggle flex h-[3vmax]'>
                            <p className={`transition-all text-xl cursor-pointer grid place-items-center w-full hover:text-fuchsia-700 hover:font-bold  text-fuchsia-700 font-bold  border-b-4 border-fuchsia-950 "}`} >Update Profile</p>
                        </div>
                    </div>
                    <Formik
                        initialValues={{
                            oldPassword: '',
                            newPassword: '',
                            confirmNewPassword: '',
                        }}
                        // validationSchema={updateValidationSchema}
                        onSubmit={updatePasswordSubmit}

                    >
                        {({ values, handleChange, isSubmitting }) => (
                            <Form className='   pb-9  signupForm flex flex-col items-center m-auto pt-9 px-[2vmax] justify-evenly gap-3 h-[90%] transition-all'>
                                <div className='loginPassword flex w-full items-center'>
                                    <VpnKeyIcon className='absolute translate-x-0 text-6xl ml-8' />
                                    <input type='password' value={values.oldPassword} name='oldPassword' onChange={handleChange} placeholder='Old Password' className='px-1 py-4 rounded pl-20 w-full box-border border-2 border-gray-500' />
                                </div> <div className='loginPassword flex w-full items-center'>
                                    <LockOpenIcon className='absolute translate-x-0 text-6xl ml-8' />
                                    <input value={values.newPassword} name='newPassword' onChange={handleChange} type='password' placeholder='New Password' className='px-1 py-4 rounded pl-20 w-full box-border border-2 border-gray-500' />
                                </div> <div className='loginPassword flex w-full items-center'>
                                    <LockIcon className='absolute translate-x-0 text-6xl ml-8' />
                                    <input value={values.confirmNewPassword} name='confirmNewPassword' onChange={handleChange} type='password' placeholder='Confirm New Password' className='px-1 py-4 rounded pl-20 w-full box-border border-2 border-gray-500' />
                                </div>
                                <button disabled={isSubmitting} type='submit' className='loginBtn text-lg bg-fuchsia-950 rounded p-2 w-full transition-all text-white hover:bg-fuchsia-900' >
                                    Change </button>
                            </Form>
                        )}
                    </Formik>

                </div>
            </div>}
        </>
    )
}

export default UpdatePassword