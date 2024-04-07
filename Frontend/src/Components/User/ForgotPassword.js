import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import updateValidationSchema from '../../constants/validationSchema/updateValidationSchema';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPasswordFunc } from "../../actions/userAction";
import Loader from '../Layouts/Loader/Loader';
import MetaData from "../Layouts/MetaData";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
const Swal = require('sweetalert2');


const ForgotPassword = () => {
    const dispatch=useDispatch();
    const { error, message, loading } = useSelector((state) => state.userSlice);
    const forgotPasswordSubmit = async (values, { setSubmitting }) => {
        console.log(values);
        const formData = {
            email: values.email,
        }
        setSubmitting(false);
        dispatch(forgotPasswordFunc(formData));
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
        if (message) {
            Swal.fire({
                icon: "success",
                title: "Mail sent Successfully",
                text: `${message}`,
                footer: '<a href="#">Why do I have this issue?</a>'
            })
        }
    }, [dispatch, error, message])
  return (
    <>
    <MetaData title="Forgot Password" />
    {loading ? <Loader /> : <div className='lsContainer flex w-[100vw] h-[40vw] bg-gray-50 bg-231-231-231 top-0 left-0 max-w-[100%] justify-center pt-16'>
        <div className='lsBox rounded shadow bg-white w-[29vw] h-[40vh] box-border overflow-hidden'>
            <div>
                <div className='lsToggle flex h-[3vmax]'>
                    <p className={`transition-all text-xl cursor-pointer grid place-items-center w-full hover:text-fuchsia-700 hover:font-bold  text-fuchsia-700 font-bold  border-b-4 border-fuchsia-950 "}`} >Write your mail</p>
                </div>
            </div>
            <Formik
                initialValues={{
                    email:'',
                }}
                onSubmit={forgotPasswordSubmit}
            >
                {({ values, handleChange, isSubmitting }) => (
                    <Form className='pb-9  signupForm flex flex-col items-center m-auto pt-9 px-[2vmax] justify-evenly gap-3 h-[100%] transition-all'>
                        <div className='email flex w-full items-center'>
                            <MailOutlineIcon className='absolute translate-x-0 text-6xl ml-8' />
                            <div className='flex-col flex w-full'>
                                <Field value={values.email} onChange={handleChange} type='email' name='email' placeholder='Email' className='rounded px-1 py-4 pl-20 w-full box-border border-2 border-gray-500' />
                            </div>
                        </div>
                        <ErrorMessage name='email' component='div' className='error' />
                        <button disabled={isSubmitting} type='submit' className='loginBtn text-lg bg-fuchsia-950 rounded p-2 w-full transition-all text-white hover:bg-fuchsia-900' >
                           Send </button>
                    </Form>
                )}
            </Formik>

        </div>
    </div>}
</>
  )
}

export default ForgotPassword