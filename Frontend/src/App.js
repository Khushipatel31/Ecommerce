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
import NewProduct from "./Components/admin/NewProduct"
import UpdateProduct from './Components/admin/UpdateProduct';
import ProcessOrder from './Components/admin/ProcessOrder';
import { Elements } from "@stripe/react-stripe-js";
import { MyOrders } from './Components/Order/MyOrders';
import Orders from './Components/admin/Orders';
import Users from './Components/admin/Users';
import UpdateUser from './Components/admin/UpdateUser';
import ProductReviews from './Components/admin/ProductReviews';
import { loadStripe } from '@stripe/stripe-js';
import Swal from 'sweetalert2';
import TokenError from './Components/Error/TokenError';

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const getStripeApiKey = async () => {
    try {
      const response = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(response.data.stripeApiKey);
      return stripeApiKey
    } catch (error) {
      if (error) {
        TokenError(error);
        Swal.fire({
          title: `${error.message}`,
          text: "oops something went wrong!",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.replace("/")
          }
        });
      }
    }
    return stripeApiKey;
  }
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
          loader: getStripeApiKey,
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
    }, {
      path: "/admin",
      element: <Dashboard />,
      children: [
        {
          index: true,
          element: <AdminDashboard />,
        },
        {
          path: "products",
          element: <ProductList />
        },
        {
          path: "product",
          element: <NewProduct />
        },
        {
          path: "product/:id",
          element: <UpdateProduct />
        },
        {
          path: "orders",
          element: <Orders />
        },
        {
          path: "order/:id",
          element: <ProcessOrder />
        },
        {
          path: "users",
          element: <Users />
        },
        {
          path: "user/:id",
          element: <UpdateUser />
        },
        {
          path: "reviews",
          element: <ProductReviews />
        }
      ]

    }
  ]);






  return (
    <RouterProvider router={routes}></RouterProvider>

  );
}


export default App;
