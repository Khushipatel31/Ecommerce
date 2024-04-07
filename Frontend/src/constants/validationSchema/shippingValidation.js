import * as Yup from 'yup';


const shippingValidationSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  pinCode: Yup.number().required("Pin Code is required"),
  phoneNo: Yup.number().required("Phone Number is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
});

export default shippingValidationSchema;