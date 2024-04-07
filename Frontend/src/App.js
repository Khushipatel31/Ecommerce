import './App.css';
import WebFont from "webfontloader";
import { useEffect } from 'react';
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
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children:[
      {
        index:true,
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
      },{
        path:"/password/update",
        element:<UpdatePassword/>
      },
      {
        path:"/password/forgot",
        element:<ForgotPassword/>
      },
      {
        path:"/password/reset/:token",
        element:<ResetPassword/>
      },
      {
        path:"login",
        element:<LoginSignup/>
      },
      {
        path: "products",
        element: <Products />,
        children:[
          {
            index:true,
            element:<Products/>
          },
          {
            path: ":keyword", 
            element: <Products/>
          }
        ]
      },
      {
        path:"/product/:id",
        element:<ProductDetails/>
      },
      {
        path:"/shipping",
        element:<Shipping/>
      }
    ]
  },

 
]);


const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    }, [])
  })
  return (
    <RouterProvider router={routes}></RouterProvider>
    
  );
}


export default App;
