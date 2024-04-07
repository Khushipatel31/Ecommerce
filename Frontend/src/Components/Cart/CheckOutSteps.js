import React from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const CheckOutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} >
        {steps.map((item, index) => (
          <Step key={index} active={activeStep === index}>
            <StepLabel icon={item.icon}>
              <span style={{ color: activeStep >= index ? "tomato" : "inherit" }}>
                {item.label}
              </span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckOutSteps;
