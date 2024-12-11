import React from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";

const VendorCompanyDetails = () => {
  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      {/* Header Section */}
      <Card className="mb-6">
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <div>
              <Typography variant="h4" className="font-bold">
                Stripe
              </Typography>
              <a href="https://stripe.com" className="text-blue-500 underline">
                https://stripe.com
              </a>
            </div>
          </div>
          <Grid container spacing={2} className="mt-4">
            <Grid item xs={12} sm={6} md={3}>
              <Typography className="font-medium text-gray-600">
                Founded
              </Typography>
              <Typography>July 31, 2011</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography className="font-medium text-gray-600">
                Employees
              </Typography>
              <Typography>4000+</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography className="font-medium text-gray-600">
                Location
              </Typography>
              <Typography>20 countries</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography className="font-medium text-gray-600">
                Industry
              </Typography>
              <Typography>Payment Gateway</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Company Profile and Tech Stack */}
      <Grid container spacing={6}>
        {/* Company Profile */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" className="font-bold mb-4">
                Company Profile
              </Typography>
              <Typography className="text-gray-700">
                Stripe is a software platform for starting and running internet
                businesses. Millions of businesses rely on Stripe's software
                tools to accept payments, expand globally, and manage their
                businesses online. Stripe is built for developers, makers, and
                creators.
              </Typography>
              <div className="mt-6">
                <Typography variant="h6" className="font-bold mb-2">
                  Contact
                </Typography>
                <div className="flex gap-4">
                  <a
                    href="https://twitter.com/stripe"
                    className="text-blue-500 underline"
                  >
                    Twitter
                  </a>
                  <a
                    href="https://facebook.com/StripeHQ"
                    className="text-blue-500 underline"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://linkedin.com/company/stripe"
                    className="text-blue-500 underline"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Tech Stack and Office Location */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" className="font-bold mb-4">
                Tech Stack
              </Typography>
              <div className="flex gap-4 items-center">
                <span className="p-2 bg-gray-200 rounded-md">HTML5</span>
                <span className="p-2 bg-gray-200 rounded-md">CSS3</span>
                <span className="p-2 bg-gray-200 rounded-md">JavaScript</span>
              </div>
              <Button
                variant="outlined"
                className="mt-4 text-blue-500 border-blue-500"
              >
                View tech stack
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent>
              <Typography variant="h6" className="font-bold mb-4">
                Office Location
              </Typography>
              <ul className="list-disc ml-5 text-gray-700">
                <li>United States</li>
                <li>England</li>
                <li>Japan</li>
                <li>Australia</li>
                <li>China</li>
              </ul>
              <Button
                variant="outlined"
                className="mt-4 text-blue-500 border-blue-500"
              >
                View countries
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default VendorCompanyDetails;
