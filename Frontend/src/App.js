import './App.css';
import WebFont from "webfontloader";
import axios from "axios";
import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard';
import Contact from './Components/Contact/Contact';
import Home from './Components/Home/Home';
import ProductDetails from './Components/Home/Product/ProductDetails';
import Products from "./Components/Products/Products"
import LoginSignup from './Components/User/LoginSignup';
import Account from './Components/User/Account';
import Update from './Components/User/Update';
import UpdatePassword from './Components/User/UpdatePassword';
import ForgotPassword from './Components/User/ForgotPassword';
import ResetPassword from './Components/User/ResetPassword';
import Cart from './Components/Cart/Cart';
import Shipping from './Components/Cart/Shipping';
import ConfirmOrder from './Components/Cart/ConfirmOrder';
import Payment from './Components/Cart/Payment';
import OrderSuccess from './Components/Cart/OrderSuccess';
import OrderDetails from './Components/Order/OrderDetails';
import AdminDashboard from './Components/admin/AdminDashboard';
import ProductList from './Components/admin/ProductList';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { MyOrders } from './Components/Order/MyOrders';

const App = () => {
  
  const [stripeApiKey, setStripeApiKey] = useState("");
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "account",
          element: <Account />,
        },
        {
          path: "me/update",
          element: <Update />,
        }, {
          path: "/password/update",
          element: <UpdatePassword />
        },
        {
          path: "/password/forgot",
          element: <ForgotPassword />
        },
        {
          path: "/password/reset/:token",
          element: <ResetPassword />
        },
        {
          path: "login",
          element: <LoginSignup />
        },
        {
          path: "products",
          element: <Products />,
          children: [
            {
              index: true,
              element: <Products />
            },
            {
              path: ":keyword",
              element: <Products />
            }
          ]
        },
        {
          path: "/product/:id",
          element: <ProductDetails />
        },
        {
          path: "/shipping",
          element: <Shipping />
        },
        {
          path: "/order/confirm",
          element: <ConfirmOrder />
        },
        {
          path: "/process/payment",
          element: (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
          )
        },
        {
          path: "/success",
          element: <OrderSuccess />
        },
        {
          path: "/orders",
          element: <MyOrders />
        },
        {
          path: "/order/:id",
          element: <OrderDetails />
        },
      ]
    },{
      path:"/admin",
      element:<Dashboard/>,
      children:[
        {
          index: true,
          element: <AdminDashboard />,
        },
        {
          path:"products",
          element:<ProductList/>
        }
      ]

    }
  ]);

  const getStripeApiKey = async () => {
    const response = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(response.data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  })
  return (
    <RouterProvider router={routes}></RouterProvider>

  );
}


export default App;
