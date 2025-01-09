import { useEffect, useState } from "react";
import { CheckOutlined } from "@mui/icons-material";
import { Slider, FormControl, Button, ButtonGroup } from "@mui/material";

const PlanSelection = () => {
  const companyType = localStorage.companyType;
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>(
    !companyType ? "vendor" : companyType
  );
  const [users, setUsers] = useState<number>(1); // Default to 12 months
  const [billingFrequency, setBillingFrequency] = useState<string>("monthly");

  useEffect(() => {
    if (companyType) {
      setSelectedType(companyType);
    }
  }, [companyType]);

  // Array of plans
  const plans = [
    {
      id: "vendorTrial",
      title: "Trial Plan",
      details: [
        "3 empanelment requests.",
        "Manage up to 5 resources.",
        "Submit up to 5 applications.",
        "Single member access only.",
      ],
      type: "vendor",
      priceMonthly: 25,
      priceAnnually: 250,
    },
    {
      id: "clientTrial",
      title: "Trial Plan",
      details: [
        "3 empanelment invites.",
        "Post up to 5 requirements.",
        "Single member access only.",
      ],
      type: "client",
      priceMonthly: 20,
      priceAnnually: 200,
    },
    {
      id: "vendorClientTrial",
      title: "Trial Plan",
      details: [
        "3 empanelment requests and invites.",
        "Manage up to 5 resources.",
        "Submit up to 5 applications.",
        "Post up to 5 requirements.",
        "Single member access only.",
      ],
      type: "both",
      priceMonthly: 45,
      priceAnnually: 450,
    },
    {
      id: "vendorBusiness",
      title: "Business Plan",
      details: [
        "Unlimited empanelment requests.",
        "Manage unlimited resources.",
        "Submit unlimited applications.",
        "Multi-member access.",
      ],
      type: "vendor",
      priceMonthly: 90,
      priceAnnually: 900,
    },
    {
      id: "clientBusiness",
      title: "Business Plan",
      details: [
        "Unlimited empanelment invites.",
        "Post unlimited requirements.",
        "Multi-member access.",
      ],
      type: "client",
      priceMonthly: 75,
      priceAnnually: 750,
    },
    {
      id: "vendorClientBusiness",
      title: "Business Plan",
      details: [
        "Unlimited empanelment requests and invites.",
        "Manage unlimited resources.",
        "Submit unlimited applications.",
        "Post unlimited requirements.",
        "Multi-member access.",
      ],
      type: "both",
      priceMonthly: 150,
      priceAnnually: 1500,
    },
  ];

  const handleCardClick = (planId: string) => {
    // Toggle card selection
    setSelectedCard((prev) => (prev === planId ? null : planId));
  };

  const handleUsers = (event: any, newValue: number) => {
    setUsers(newValue);
  };

  const handleBillingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBillingFrequency(event.target.value);
  };

  // Filter plans based on selected type
  let filteredPlans: any = [];
  if (selectedType) {
    filteredPlans = plans.filter((plan) => plan.type === selectedType);
  }

  // Check if any of the selected plans are business plans
  const isBusinessPlanSelected = filteredPlans.some((plan: any) =>
    plan.title.includes("Business Plan")
  );

  return (
    <div>
      {/* Show this section only if a business plan is selected */}
      {isBusinessPlanSelected && (
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-heading">
            The Right Plan for Your Business
          </h2>
          <p className="text-base text-gray-500 mb-8 text-center">
            We have several powerful plans to showcase your business and get
            discovered as a creative entrepreneur. Everything you need.
          </p>
          <div className="flex justify-center mb-8 space-x-6">
            <FormControl component="fieldset">
              <ButtonGroup
                color="primary"
                aria-label="billing frequency"
                onChange={handleBillingChange}
              >
                <Button
                  value="monthly"
                  onClick={() => setBillingFrequency("monthly")}
                  className={
                    billingFrequency === "monthly"
                      ? "!bg-indigo-500 !text-white"
                      : ""
                  }
                >
                  Monthly
                </Button>
                <Button
                  value="annually"
                  onClick={() => setBillingFrequency("annually")}
                  className={
                    billingFrequency === "annually"
                      ? "!bg-indigo-500 !text-white"
                      : ""
                  }
                >
                  Annually
                </Button>
              </ButtonGroup>
            </FormControl>

            <div className="w-full max-w-xs">
              <Slider
                value={users}
                onChange={(e: any) => handleUsers(e, e.target.value)}
                valueLabelDisplay="auto"
                step={1}
                min={1}
                max={50}
                valueLabelFormat={(value) => `${value} Users`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Plans Cards */}
      <div className="flex flex-wrap justify-center space-x-4">
        {filteredPlans.map((plan: any) => (
          <div
            key={plan.id}
            className={`w-[325px] cursor-pointer py-10 px-6 rounded-md border border-indigo-500 hover:shadow-xl hover:-translate-y-1 relative ${
              selectedCard === plan.id ? "!bg-blue-100" : "bg-white"
            }`}
            onClick={() => handleCardClick(plan.id)}
          >
            <div className="mb-8">
              <p className="text-heading text-center text-indigo-700 mb-4">
                {plan.title}
              </p>
              {/* Price displayed inside the card */}
              <p className="text-title font-bold my-5 text-center">
                {billingFrequency === "monthly"
                  ? `$${plan.priceMonthly * users}`
                  : `$${plan.priceAnnually * users}`}
                /{billingFrequency === "monthly" ? "month" : "year"}
              </p>

              {plan.details.map((detail: any, index: number) => (
                <p key={index} className="text-base mb-2">
                  <CheckOutlined color="success" fontSize="small" /> {detail}
                </p>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="contained" className="w-[150px]">
                Choose
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanSelection;
