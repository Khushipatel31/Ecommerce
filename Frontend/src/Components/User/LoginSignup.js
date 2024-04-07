import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import validationSchema from '../../constants/validationSchema/validationSchema';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login ,register} from "../../actions/userAction";
import Loader from '../Layouts/Loader/Loader';
const Swal = require('sweetalert2');

const LoginSignup = () => {
    const dispatch = useDispatch();
    const loginTab = useRef(null);
    const { loading, error, isAuthenticated } = useSelector((state) => state.userSlice);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [activeTab, setActiveTab] = useState("login");
    const [profilePreview, setProfilePreview] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [loginError, setLoginError] = useState("");
    const [emailError, setEmailError] = useState("");
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
        if (isAuthenticated) {
            window.location.replace("/account")
        }
    }, [dispatch, error, isAuthenticated])

    const loginSubmit = (e) => {
        e.preventDefault();
        if (!loginEmail.trim() || !loginPassword.trim()) {
            setLoginError("Please enter both email and password.");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(loginEmail)) {
                setEmailError("Invalid email format");
            } else {
                setEmailError("");
            }
        } else {
            setLoginError("");
            setEmailError("");
            dispatch(login(loginEmail, loginPassword));
        }
    };

    const registerSubmit = (values, { setSubmitting }) => {
        console.log("Register form submitted");
        console.log(values);
        console.log("Profile Image:", profileImage);
        const formData = new FormData();
        formData.append('name', values.registerName);
        formData.append('email', values.registerEmail);
        formData.append('password', values.registerPassword);
        formData.append('profileImage', profileImage);
        console.log(formData);
        setSubmitting(false);
        dispatch(register(formData));
    };

    const switchTabs = (tab) => {
        setActiveTab(tab);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfilePreview(reader.result); // Set the image preview
                setProfileImage(reader.result); // Set the uploaded image
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            {loading ? <Loader /> : <div className='lsContainer flex w-[100vw] h-[40vw] bg-gray-50 bg-231-231-231 top-0 left-0 max-w-[100%] justify-center items-center'>
                <div className='lsBox rounded shadow bg-white w-[29vw] h-[65vh] box-border overflow-hidden'>
                    <div>
                        <div className='lsToggle flex h-[3vmax]'>
                            <p className={`transition-all text-xl cursor-pointer grid place-items-center w-full hover:text-fuchsia-700 hover:font-bold ${activeTab === "login" ? "text-fuchsia-700 font-bold border-b-4 border-fuchsia-950 " : ""}`} onClick={() => switchTabs("login")}>Login</p>
                            <p className={`transition-all text-xl cursor-pointer grid place-items-center w-full hover:text-fuchsia-700 hover:font-bold ${activeTab === "register" ? "text-fuchsia-700 font-bold  border-b-4 border-fuchsia-950 " : ""}`} onClick={() => switchTabs("register")}>Register</p>
                        </div>
                    </div>
                    {activeTab === "login" && (
                        <form className='loginForm flex pt-7  flex-col items-center m-auto p-[2vmax] justify-evenly h-[80%] transition-all' ref={loginTab} onSubmit={loginSubmit}>
                            <div className='loginEmail flex w-full items-center'>
                                <MailOutlineIcon className='absolute translate-x-0 text-6xl ml-8' />
                                <input type='email' placeholder='Email' className='rounded px-1 py-4 pl-20 w-full box-border border-2 border-gray-500' required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                            </div>
                            <div className='error'>{emailError}</div> {/* Display email validation error message */}
                            <div className='loginPassword flex w-full items-center'>
                                <LockOpenIcon className='absolute translate-x-0 text-6xl ml-8' />
                                <input type='password' placeholder='Password' className='px-1 py-4 rounded pl-20 w-full box-border border-2 border-gray-500' required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                            </div>
                            <Link to="/password/forgot" className='self-end transition-all hover:text-fuchsia-700 hover:font-bold hover:underline hover:underline-offset-1'>Forgot Password ?</Link>
                            <div className='error'>{loginError}</div> {/* Display login error message */}
                            <input type='submit' value="Login" className='loginBtn  text-lg bg-fuchsia-950 rounded p-2 w-full transition-all text-white hover:bg-fuchsia-900' />
                        </form>
                    )}
                    {activeTab === "register" && (
                        <Formik
                            initialValues={{
                                registerName: '',
                                registerEmail: '',
                                registerPassword: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={registerSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className='   pb-9  signupForm flex flex-col items-center m-auto pt-9 px-[2vmax] justify-evenly gap-3 h-[90%] transition-all'>
                                    <div className='signUpName flex w-full items-center'>
                                        <PersonIcon className='absolute translate-x-0 text-6xl ml-8' />
                                        <Field type='text' name='registerName' placeholder='Name' className='px-1 py-4 rounded pl-20 w-full box-border border-2 border-gray-500' />
                                    </div>
                                    <div className='registerEmail flex w-full items-center'>
                                        <MailOutlineIcon className='absolute translate-x-0 text-6xl ml-8' />
                                        <div className='flex-col flex w-full'>
                                            <Field type='email' name='registerEmail' placeholder='Email' className='rounded px-1 py-4 pl-20 w-full box-border border-2 border-gray-500' />
                                        </div>
                                    </div>
                                    <div className='registerPassword flex w-full items-center'>
                                        <LockOpenIcon className='absolute translate-x-0 text-6xl ml-8' />
                                        <Field type='password' name='registerPassword' placeholder='Password' className='px-1 py-4 rounded pl-20 w-full box-border border-2 border-gray-500' />
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
                                    <ErrorMessage name='registerName' component='div' className='error' />
                                    <ErrorMessage name='registerPassword' component='div' className='error' />
                                    <ErrorMessage name='registerEmail' component='div' className='error' />
                                    <button type='submit' className='loginBtn text-lg bg-fuchsia-950 rounded p-2 w-full transition-all text-white hover:bg-fuchsia-900' disabled={isSubmitting}>
                                        {isSubmitting ? 'Registering...' : 'Register'}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    )}
                </div>
            </div>}
        </>
    )
}

export default LoginSignup;
