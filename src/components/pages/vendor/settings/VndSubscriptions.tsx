import React, { useState } from "react";
import {
  Switch,
  Box,
  Typography,
  Button,
  Slider,
  Tabs,
  Tab,
} from "@mui/material";
import clsx from "clsx";

// Tailwind classes
const cardBase =
  "w-full max-w-sm p-6 rounded-lg shadow-lg text-base transition-transform duration-300";
const selectedCard =
  "bg-violet-900 text-white text-base transform scale-105 hover:scale-110";

const VndSubscriptions: React.FC = () => {
  const [billingType, setBillingType] = useState<"monthly" | "annually">(
    "monthly"
  );
  const [tabValue, setTabValue] = React.useState("Subscription");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleToggle = () => {
    setBillingType((prev) => (prev === "monthly" ? "annually" : "monthly"));
  };

  const pricingPlans = [
    {
      name: "Intro",
      price: 123,
      features: [
        "Upload Video up to 720p Resolution",
        "Attachment & Post Scheduling",
      ],
    },
    {
      name: "Base",
      price: 123,
      features: [
        "Upload Video with HD Resolution",
        "Attachment & Post Scheduling",
      ],
    },
    {
      name: "Pro",
      price: 123,
      features: [
        "Upload Video with HD Resolution",
        "Attachment & Post Scheduling",
        "Set your rates",
        "Exclusive Deals",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: 123,
      features: [
        "Upload Video with 4K Resolution",
        "Attachment & Post Scheduling",
        "Set your rates",
        "Exclusive Deals",
        "Advanced Statistics",
      ],
    },
  ];

  return (
    <div className="px-6">
      <Tabs
        value={tabValue}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="Subscription" label="Subscription" />
        <Tab value="Invoices" label="Invoices" />
        <Tab value="Payment" label="Payment Method" />
      </Tabs>

      {tabValue === "Subscription" && (
        <div className="flex items-center flex-col mt-4">
          {/* Header */}
          <h2 className="mb-2 text-heading">
            The Right Plan for Your Business
          </h2>
          <p className="text-base text-gray-500 mb-8 text-center max-w-md">
            We have several powerful plans to showcase your business and get
            discovered as a creative entrepreneur. Everything you need.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center mb-8 w-2/3 justify-center space-x-6 mt-6">
            <p className="text-base">Bill Monthly</p>
            <Switch
              checked={billingType === "annually"}
              onChange={handleToggle}
              color="primary"
              size="small"
            />
            <p className="text-base">Bill Annually</p>
            <div className="w-1/3">
              <Slider
                max={50}
                defaultValue={1}
                aria-label="Default"
                valueLabelDisplay="on"
              />
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-6xl">
            {pricingPlans.map((plan) => (
              <Box
                key={plan.name}
                className={clsx(
                  cardBase,
                  plan.highlight ? selectedCard : "bg-white",
                  "hover:shadow-2xl hover:-translate-y-2"
                )}
              >
                {/* Title */}
                <Typography
                  variant="h6"
                  className={clsx(
                    plan.highlight ? "text-white" : "text-gray-800",
                    "mb-4 text-title"
                  )}
                >
                  {plan.name}
                </Typography>

                {/* Price */}
                <Typography
                  variant="h5"
                  className={clsx(
                    plan.highlight ? "text-white" : "text-gray-800"
                  )}
                >
                  ${billingType === "monthly" ? plan.price : plan.price - 10}
                  <span className="text-sm"> /month</span>
                </Typography>

                {/* Features */}
                <ul
                  className={clsx(
                    plan.highlight ? "text-white" : "text-gray-600",
                    "mt-4 mb-6"
                  )}
                >
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center mb-2">
                      ✓ {feature}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <Button
                  variant="contained"
                  fullWidth
                  className={clsx(
                    plan.highlight
                      ? "bg-white text-violet-900 hover:bg-gray-100"
                      : "bg-violet-600 text-white hover:bg-violet-700"
                  )}
                >
                  {plan.highlight ? "Try 1 month" : "Choose"}
                </Button>
              </Box>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VndSubscriptions;
