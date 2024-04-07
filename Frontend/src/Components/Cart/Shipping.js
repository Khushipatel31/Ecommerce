import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import shippingValidationSchema from "../../constants/validationSchema/shippingValidation"
import { useSelector, useDispatch } from "react-redux";
import { Country, State } from "country-state-city";
import MetaData from "../Layouts/MetaData";
import CheckOutSteps from "./CheckOutSteps";
import { saveShippingInfo } from "../../actions/cartAction";

const Shipping = () => {

  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cartSlice);


  const shippingSubmit = (values, { setSubmitting }) => {
    console.log(values);
    const formData = {
      address: values.address || "", // Default to empty string if address is undefined
      city: values.city || "",
      state: values.state || "",
      country: values.country || "",
      pinCode: values.pinCode || "",
      phoneNo: values.phoneNo || "",
    };
    dispatch(saveShippingInfo(formData));
    setSubmitting(false);
    // window.location.replace("/order/confirm");
  };

  return (
    <>
    <CheckOutSteps activeStep={0} />
    <MetaData title="Shipping Details"></MetaData>
    <div className="flex pt-12   justify-center items-center">
      <div className="rounded shadow pb-9    bg-white w-1/3    box-border">
        <div className="flex h-[3vmax]">
          <p className="transition-all text-xl cursor-pointer grid place-items-center w-full hover:text-fuchsia-700 hover:font-bold text-fuchsia-700 font-bold border-b-4 border-fuchsia-950">
            Shipping Details
          </p>
        </div>
        <Formik
          initialValues={{
            address: shippingInfo.address,
            city: shippingInfo.city,
            pinCode: shippingInfo.pinCode,
            phoneNo: shippingInfo.phoneNo,
            country: shippingInfo.country,
            state: shippingInfo.state,
          }}
          validationSchema={shippingValidationSchema}
          onSubmit={shippingSubmit}
        >
          {({ values, isSubmitting }) => (
            <Form className="shippingForm  flex flex-col items-center m-auto pt-9 px-[2vmax] justify-evenly gap-5  h-[100%] ">
              <div className="flex flex-col w-full">
                <div className="address flex w-full items-center relative">
                  <HomeIcon className="absolute translate-x-0 text-6xl ml-4  top-1/2 transform -translate-y-1/2" />
                  <Field
                    type="text"
                    placeholder="Address"
                    name="address"
                    className="rounded px-12 py-4  w-full box-border border-2 border-gray-500"
                  />
                </div>
                <ErrorMessage name="address" component="div" className="error text-center text-red-500 " />
              </div>
              <div className="flex flex-col w-full">
                <div className="city flex w-full items-center relative">
                  <LocationCityIcon className="absolute translate-x-0 text-6xl ml-4 top-1/2 transform -translate-y-1/2" />
                  <Field
                    type="text"
                    placeholder="City"
                    name="city"
                    className="rounded px-12 py-4 w-full box-border border-2 border-gray-500"
                  />
                </div>
                <ErrorMessage name="city" component="div" className="error text-center text-red-500" />
              </div>
              <div className="flex flex-col w-full">
                <div className="pinDropIcon flex w-full items-center relative">
                  <PinDropIcon className="absolute translate-x-0 text-6xl ml-4 top-1/2 transform -translate-y-1/2" />
                  <Field
                    type="number"
                    placeholder="Pin Code"
                    name="pinCode"
                    className="rounded px-12 py-4 w-full box-border border-2 border-gray-500"
                  />
                </div>
                <ErrorMessage name="pinCode" component="div" className="error text-center text-red-500" />
              </div>
              <div className="flex flex-col w-full">
                <div className="phoneNo flex w-full items-center relative">
                  <PhoneIcon className="absolute translate-x-0 text-6xl ml-4 top-1/2 transform -translate-y-1/2" />
                  <Field
                    type="number"
                    placeholder="Phone Number"
                    name="phoneNo"
                    size="10"
                    className="rounded px-12 py-4 w-full box-border border-2 border-gray-500"
                  />
                </div>
                <ErrorMessage name="phoneNo" component="div" className="error text-center text-red-500" />
              </div>
              <div className="flex flex-col w-full">
                <div className="Country flex w-full items-center relative">
                  <PublicIcon className="absolute translate-x-0 text-6xl ml-4 top-1/2 transform -translate-y-1/2" />
                  <Field
                    as="select"
                    placeholder="Country"
                    name="country"
                    className="rounded px-12 py-4 w-full box-border border-2 border-gray-500"
                  >
                    <option value="">Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </Field>
                </div>

                <ErrorMessage name="country" component="div" className="error text-center text-red-500" />
              </div>
              {
                values.country && <div className="flex flex-col w-full">
                  <div className="State flex w-full items-center relative">
                    <TransferWithinAStationIcon className="absolute translate-x-0 text-6xl ml-4 top-1/2 transform -translate-y-1/2" />
                    <Field
                      as="select"
                      placeholder="State"
                      name="state"
                      className="rounded px-10 py-4 w-full box-border border-2 border-gray-500"
                    >
                      <option value="">State</option>
                      {State &&
                        State.getStatesOfCountry(values.country).map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </Field>
                  </div>
                  <ErrorMessage name="state" component="div" className="error text-center text-red-500" />
                </div>
              }

              <button
                disabled={isSubmitting}
                type="submit"
                className="shippingBtn mt-2 text-lg bg-fuchsia-950 rounded p-2 w-full transition-all text-white hover:bg-fuchsia-900"
              >
                Continue
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </>
  );
}

export default Shipping;
