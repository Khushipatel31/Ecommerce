import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[30vw] w-full p-10vmax text-center">
      <CheckCircleIcon className="text-green-600 mb-4"  style={{fontSize:	 '8rem' }}/>
      <Typography  style={{fontSize:'2rem' }}>
        Your Order has been Placed successfully
      </Typography>
      <Link
        to="/order/me"
        className="mt-9 w-48 ml-0 self-center text-lg   bg-fuchsia-950 rounded p-2 transition-all text-white hover:bg-fuchsia-900"
      >
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
