import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, newProduct } from "../../actions/productAction";
import { Button } from "@material-ui/core";
import MetaData from "../Layouts/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstant";
import { ErrorMessage, Field, Formik } from "formik";
import { Form } from "react-router-dom";
import Swal from "sweetalert2";
import Compressor from "compressorjs";
const NewProduct = () => {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector(
        (state) => state.productSlice
    );
    const categories = ["Electrical", "PC", "Laptop", "Tablet"];
    const [imagesPreview, setImagesPreview] = useState([]);
    const [images, setImages] = useState([]);

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
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Product Created Successfully',
                text: 'You have successfully registered!',
                confirmButtonText: 'OK'
            })
            window.location.replace("/admin");
            dispatch({ type: NEW_PRODUCT_RESET });
        }

    }, [dispatch, error, success])
    const createProductSubmitHandler = (values, { setSubmitting }) => {

        console.log(values);
        console.log(images)
        const myForm = {
            name: values.name,
            price: values.price,
            description: values.description,
            category: values.categoryy,
            Stock: values.stock,
            images, 
        }
        console.log(myForm)
        dispatch(newProduct(myForm));
        setSubmitting(false);
        window.location.replace("/admin/");
    };


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };
    return (
        <>
            <MetaData title="New Product" />
            <div className="dashboard w-full max-w-full h-screen flex">
                <SideBar />
                <div className="dashboardContainer col-span-2 p-4 w-full">
                    <div className="dashboardSummary justify-center mt-10 pt-8 flex items-center w-full flex-col h-[90%] ">
                        <div className="rounded shadow-md pb-9    bg-white w-1/3    box-border">
                            <div>
                                <div className="flex h-[3vmax]">
                                    <p className="transition-all text-xl cursor-pointer grid place-items-center w-full hover:text-fuchsia-700 hover:font-bold text-fuchsia-700 font-bold border-b-4 border-fuchsia-950">
                                        Create Product
                                    </p>
                                </div>
                            </div>
                            <Formik
                                initialValues={{
                                    name: "",
                                    price: "",
                                    description: "",
                                    categoryy: "",
                                    stock: "",
                                }}
                                onSubmit={createProductSubmitHandler}
                            >
                                {({ values, isSubmitting, handleSubmit }) => (
                                    <Form className="   pb-9  signupForm flex flex-col items-center m-auto pt-9 px-[2vmax] justify-evenly gap-4 h-[90%] transition-all" onSubmit={handleSubmit}>
                                        <div className="signUpName flex w-full items-center">
                                            <SpellcheckIcon className="absolute translate-x-0 text-6xl ml-8" />
                                            <Field
                                                type="text"
                                                name="name"
                                                placeholder="Product Name"
                                                className="px-1 py-4 rounded pl-20 w-full box-border border-2 border-gray-500"
                                            />
                                        </div>
                                        <div className="registerEmail flex w-full items-center">
                                            <div className="flex-col flex w-full">
                                                <AttachMoneyIcon className="absolute translate-x-0 translate-y-4 text-6xl ml-8" />
                                                {/* <Field type='email' name='registerEmail' placeholder='Email' className='rounded px-1 py-4 pl-20 w-full box-border border-2 border-gray-500' /> */}
                                                <Field
                                                    type="number"
                                                    name="price"
                                                    placeholder="Price"
                                                    className="px-1 py-4 rounded pl-20 w-full box-border border-2 border-gray-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="registerPassword flex w-full items-center">
                                            <DescriptionIcon className="absolute translate-x-0 text-6xl ml-8" />
                                            {/* <Field type='password' name='registerPassword' placeholder='Password' className='px-1 py-4 rounded pl-20 w-full box-border border-2 border-gray-500' /> */}
                                            <Field
                                                as="textarea"
                                                type="text"
                                                name="description"
                                                placeholder="Description"
                                                cols={30}
                                                rows={1}
                                                className="px-1 py-4 rounded pl-20 w-full box-border border-2 border-gray-500"
                                            />
                                        </div>
                                        <div className="registerPassword flex w-full items-center">
                                            <AccountTreeIcon className="absolute translate-x-0 text-6xl ml-8" />
                                            {/* <Field type='password' name='registerPassword' placeholder='Password' className='px-1 py-4 rounded pl-20 w-full box-border border-2 border-gray-500' /> */}
                                            <Field
                                                as="select"
                                                className="px-1 py-4 rounded pl-20 w-full box-border border-2 border-gray-500"
                                                name="categoryy"
                                            >
                                                <option value="">Choose Category</option>
                                                {categories.map((cate) => (
                                                    <option key={cate} value={cate}>
                                                        {cate}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>
                                        <div className="registerEmail flex w-full items-center">
                                            <div className="flex-col flex w-full">
                                                <StorageIcon className="absolute translate-x-0 translate-y-4 text-6xl ml-8" />
                                                {/* <Field type='email' name='registerEmail' placeholder='Email' className='rounded px-1 py-4 pl-20 w-full box-border border-2 border-gray-500' /> */}
                                                <Field
                                                    type="number"
                                                    name="stock"
                                                    placeholder="Price"
                                                    className="px-1 py-4 rounded pl-20 w-full box-border border-2 border-gray-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="profileImage flex w-full items-center">
                                            <input
                                                multiple
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="rounded px-1 py-4 w-full box-border border-2 border-gray-500"
                                            />
                                        </div>
                                        <div
                                            id="createProductFormImage"
                                            className="flex flex-wrap justify-center"
                                        >
                                            {imagesPreview.map((image, index) => (
                                                <div className="flex  mr-3" key={index}>
                                                    <img
                                                        src={image}
                                                        alt={`Preview ${index + 1}`}
                                                        className="max-w-32 h-auto rounded-lg"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            type="submit"
                                            className="loginBtn text-lg bg-fuchsia-950 rounded p-2 w-full transition-all text-white hover:bg-fuchsia-900"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Creating Product..." : "Create Product"}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewProduct;
