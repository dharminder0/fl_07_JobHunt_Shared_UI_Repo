import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Grid2,
} from "@mui/material";
import { ArrowForward, Facebook, LinkedIn, Twitter } from "@mui/icons-material";

const VendorCompanyDetails = () => {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="mb-6 ">
        <div className="flex items-center gap-4 mb-4">
          <div>
            <img
              src={require("../../../assets/images/CompanyLogo.png")}
              style={{ width: 65, height: 65 }}
            />
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
            <div className="flex items-center">
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="44" height="44" rx="22" fill="white" />
                <path
                  d="M18.4678 18.3947L18.4656 18.3965L18.4634 18.3986L18.4678 18.3947ZM28.4219 18.2082C28.3523 18.1411 28.2751 18.0824 28.1919 18.0334C28.0741 17.964 27.9433 17.9196 27.8076 17.9028C27.672 17.886 27.5343 17.8972 27.4031 17.9358C27.272 17.9743 27.1501 18.0393 27.0451 18.1268C26.9401 18.2143 26.8541 18.3225 26.7925 18.4445C26.448 19.1232 25.9729 19.7272 25.3945 20.2218C25.483 19.7234 25.5276 19.2183 25.5278 18.7121C25.5297 17.1722 25.1234 15.6593 24.3505 14.3274C23.5775 12.9956 22.4654 11.8924 21.1274 11.1301C20.98 11.0465 20.8138 11.0018 20.6444 11.0001C20.475 10.9983 20.3079 11.0397 20.1588 11.1202C20.0098 11.2007 19.8836 11.3178 19.7922 11.4605C19.7008 11.6031 19.6471 11.7667 19.6362 11.9357C19.5802 12.8839 19.3324 13.8109 18.9076 14.6604C18.4828 15.51 17.89 16.2644 17.165 16.8781L16.9346 17.0656C16.1765 17.5757 15.5055 18.2045 14.9473 18.9279C14.0796 20.021 13.4785 21.3012 13.1917 22.6671C12.9049 24.0329 12.9403 25.4468 13.2951 26.7966C13.6498 28.1464 14.3142 29.3949 15.2354 30.4433C16.1567 31.4916 17.3096 32.3109 18.6026 32.8361C18.7544 32.8981 18.9191 32.9219 19.0823 32.9052C19.2454 32.8885 19.402 32.8319 19.5381 32.7404C19.6742 32.6489 19.7857 32.5254 19.8628 32.3806C19.9399 32.2358 19.9801 32.0743 19.98 31.9103C19.9793 31.8042 19.9625 31.6989 19.9302 31.5978C19.7065 30.7568 19.6421 29.8814 19.7403 29.0168C20.6865 30.8015 22.2054 32.2162 24.0528 33.0334C24.2783 33.1342 24.5332 33.1478 24.7681 33.0715C26.2277 32.6004 27.5425 31.7639 28.5878 30.6415C29.633 29.5191 30.3739 28.1481 30.74 26.6588C31.1061 25.1694 31.0853 23.6112 30.6796 22.1321C30.2739 20.653 29.4967 19.3023 28.4219 18.2082ZM24.5171 31.0392C23.6454 30.5975 22.8765 29.9772 22.2603 29.2187C21.6441 28.4602 21.1944 27.5806 20.9405 26.6369C20.8629 26.3191 20.8029 25.9974 20.7608 25.673C20.7322 25.4665 20.6398 25.274 20.4965 25.1226C20.3532 24.9711 20.1661 24.8682 19.9615 24.8283C19.8984 24.8159 19.8343 24.8096 19.77 24.8097C19.5943 24.8097 19.4216 24.856 19.2694 24.9439C19.1173 25.0319 18.991 25.1584 18.9033 25.3107C18.0736 26.7419 17.6563 28.3748 17.6978 30.0285C16.968 29.4611 16.3581 28.7545 15.9034 27.9497C15.4488 27.1449 15.1584 26.2578 15.049 25.3399C14.9397 24.422 15.0137 23.4915 15.2666 22.6024C15.5195 21.7133 15.9464 20.8833 16.5225 20.1603C16.9599 19.5922 17.4876 19.0996 18.0845 18.7023C18.1103 18.6857 18.1351 18.6674 18.1587 18.6477C18.1587 18.6477 18.4554 18.4022 18.4655 18.3966C19.8902 17.1915 20.9035 15.5721 21.3643 13.7639C22.4538 14.7711 23.1804 16.1099 23.431 17.5724C23.6817 19.0349 23.4425 20.5392 22.7505 21.8518C22.6591 22.0269 22.6216 22.2252 22.6427 22.4216C22.6639 22.6181 22.7427 22.8039 22.8693 22.9555C22.9959 23.1072 23.1646 23.218 23.3541 23.2739C23.5436 23.3298 23.7454 23.3284 23.9341 23.2698C25.4659 22.7896 26.8138 21.8517 27.7964 20.5823C28.3869 21.4545 28.773 22.4489 28.9259 23.4911C29.0787 24.5334 28.9944 25.5967 28.6792 26.6018C28.364 27.6069 27.826 28.528 27.1054 29.2963C26.3847 30.0646 25.5 30.6604 24.5171 31.0393L24.5171 31.0392Z"
                  fill="#26A4FF"
                />
              </svg>
              <div className="ms-4">
                <Typography className="font-medium text-gray-600">
                  Founded
                </Typography>
                <Typography fontWeight={600}>July 31, 2011</Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className="flex items-center">
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="44" height="44" rx="22" fill="white" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M22 15C21.4696 15 20.9609 15.2107 20.5858 15.5858C20.2107 15.9609 20 16.4696 20 17C20 17.5304 20.2107 18.0391 20.5858 18.4142C20.9609 18.7893 21.4696 19 22 19C22.5304 19 23.0391 18.7893 23.4142 18.4142C23.7893 18.0391 24 17.5304 24 17C24 16.4696 23.7893 15.9609 23.4142 15.5858C23.0391 15.2107 22.5304 15 22 15ZM19.1716 14.1716C19.9217 13.4214 20.9391 13 22 13C23.0609 13 24.0783 13.4214 24.8284 14.1716C25.5786 14.9217 26 15.9391 26 17C26 18.0609 25.5786 19.0783 24.8284 19.8284C24.0783 20.5786 23.0609 21 22 21C20.9391 21 19.9217 20.5786 19.1716 19.8284C18.4214 19.0783 18 18.0609 18 17C18 15.9391 18.4214 14.9217 19.1716 14.1716ZM15 19C14.7348 19 14.4804 19.1054 14.2929 19.2929C14.1054 19.4804 14 19.7348 14 20C14 20.2652 14.1054 20.5196 14.2929 20.7071C14.4804 20.8946 14.7348 21 15 21C15.2652 21 15.5196 20.8946 15.7071 20.7071C15.8946 20.5196 16 20.2652 16 20C16 19.7348 15.8946 19.4804 15.7071 19.2929C15.5196 19.1054 15.2652 19 15 19ZM12.8787 17.8787C13.4413 17.3161 14.2043 17 15 17C15.7957 17 16.5587 17.3161 17.1213 17.8787C17.6839 18.4413 18 19.2044 18 20C18 20.7956 17.6839 21.5587 17.1213 22.1213C16.5587 22.6839 15.7957 23 15 23C14.2043 23 13.4413 22.6839 12.8787 22.1213C12.3161 21.5587 12 20.7956 12 20C12 19.2044 12.3161 18.4413 12.8787 17.8787ZM29 19C28.7348 19 28.4804 19.1054 28.2929 19.2929C28.1054 19.4804 28 19.7348 28 20C28 20.2652 28.1054 20.5196 28.2929 20.7071C28.4804 20.8946 28.7348 21 29 21C29.2652 21 29.5196 20.8946 29.7071 20.7071C29.8946 20.5196 30 20.2652 30 20C30 19.7348 29.8946 19.4804 29.7071 19.2929C29.5196 19.1054 29.2652 19 29 19ZM26.8787 17.8787C27.4413 17.3161 28.2043 17 29 17C29.7957 17 30.5587 17.3161 31.1213 17.8787C31.6839 18.4413 32 19.2043 32 20C32 20.7957 31.6839 21.5587 31.1213 22.1213C30.5587 22.6839 29.7957 23 29 23C28.2043 23 27.4413 22.6839 26.8787 22.1213C26.3161 21.5587 26 20.7957 26 20C26 19.2043 26.3161 18.4413 26.8787 17.8787ZM22 23.9993C21.2003 23.9993 20.4189 24.2389 19.7566 24.6872C19.1323 25.1098 18.6408 25.6996 18.3377 26.3878L18.0966 29H25.9034L25.6623 26.3878C25.3592 25.6996 24.8677 25.1098 24.2434 24.6872C23.5811 24.2389 22.7997 23.9993 22 23.9993ZM28 29H31V28.0001C31 28 31 28.0001 31 28.0001C31 27.5845 30.8704 27.1791 30.6294 26.8405C30.3884 26.5019 30.0479 26.2467 29.6552 26.1106C29.2625 25.9744 28.8371 25.964 28.4382 26.0808C28.2014 26.1501 27.981 26.2621 27.7871 26.41C27.9262 26.9175 28 27.451 28 28V29ZM26.9298 24.5776C26.51 23.9732 25.9804 23.4479 25.3646 23.031C24.3713 22.3587 23.1994 21.9993 22 21.9993C20.8006 21.9993 19.6287 22.3587 18.6354 23.031C18.0196 23.4479 17.49 23.9732 17.0702 24.5776C16.7758 24.3995 16.4578 24.2591 16.1237 24.1613C15.3258 23.9278 14.4751 23.9486 13.6897 24.2209C12.9042 24.4932 12.2232 25.0035 11.7411 25.6808C11.2591 26.358 11.0001 27.1686 11 27.9999V30C11 30.5523 11.4477 31 12 31H32C32.5523 31 33 30.5523 33 30V28C32.9999 27.1687 32.7409 26.358 32.2589 25.6808C31.7768 25.0035 31.0958 24.4932 30.3103 24.2209C29.5249 23.9486 28.6742 23.9278 27.8763 24.1613C27.5422 24.2591 27.2242 24.3995 26.9298 24.5776ZM16.2129 26.41C16.019 26.2621 15.7986 26.1501 15.5618 26.0808C15.1629 25.964 14.7375 25.9744 14.3448 26.1106C13.9521 26.2467 13.6116 26.5019 13.3706 26.8405C13.1296 27.1791 13 27.5844 13 28C13 28 13 28 13 28V29H16V28C16 27.451 16.0738 26.9175 16.2129 26.41Z"
                  fill="#26A4FF"
                />
              </svg>
              <div className="ms-4">
                <Typography className="font-medium text-gray-600">
                  Employees
                </Typography>
                <Typography fontWeight={600}>4000+</Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className="flex items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.5 10.5005C14.5 9.11924 13.3808 8 12.0005 8C10.6192 8 9.5 9.11924 9.5 10.5005C9.5 11.8808 10.6192 13 12.0005 13C13.3808 13 14.5 11.8808 14.5 10.5005Z"
                  stroke="#26A4FF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.9995 21C10.801 21 4.5 15.8984 4.5 10.5633C4.5 6.38664 7.8571 3 11.9995 3C16.1419 3 19.5 6.38664 19.5 10.5633C19.5 15.8984 13.198 21 11.9995 21Z"
                  stroke="#26A4FF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div className="ms-4">
                <Typography className="font-medium text-gray-600">
                  Location
                </Typography>
                <Typography fontWeight={600}>20 countries</Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className="flex items-center">
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="44" height="44" rx="22" fill="white" />
                <g clip-path="url(#clip0_286_15329)">
                  <path
                    d="M13 31H31"
                    stroke="#26A4FF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 31V17L23 13V31"
                    stroke="#26A4FF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M29 31V21L23 17"
                    stroke="#26A4FF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19 19V19.01"
                    stroke="#26A4FF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19 22V22.01"
                    stroke="#26A4FF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19 25V25.01"
                    stroke="#26A4FF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19 28V28.01"
                    stroke="#26A4FF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_286_15329">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(10 10)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <div className="ms-4">
                <Typography className="font-medium text-gray-600">
                  Industry
                </Typography>
                <Typography fontWeight={600}>Payment Gateway</Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      {/* Company Profile and Tech Stack */}
      <Grid container spacing={6}>
        {/* Company Profile */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" fontWeight={600}>
            Company Profile
          </Typography>
          <div className="mt-2">
            <Typography className="text-gray-700">
              Stripe is a software platform for starting and running internet
              businesses. Millions of businesses rely on Stripe’s software tools
              to accept payments, expand globally, and manage their businesses
              online. Stripe has been at the forefront of expanding internet
              commerce, powering new business models, and supporting the latest
              platforms, from marketplaces to mobile commerce sites. We believe
              that growing the GDP of the internet is a problem rooted in code
              and design, not finance. Stripe is built for developers, makers,
              and creators. We work on solving the hard technical problems
              necessary to build global economic infrastructure—from designing
              highly reliable systems to developing advanced machine learning
              algorithms to prevent fraud.
            </Typography>
            <div className="mt-6">
              <Typography variant="h5" fontWeight={600}>
                Contact
              </Typography>
              <div className="flex gap-4 mt-2">
                <Button variant="outlined" startIcon={<Twitter />}>
                  twitter.com/stripe
                </Button>
                <Button variant="outlined" startIcon={<Facebook />}>
                  facebook.com/StripeHQ
                </Button>
                <Button variant="outlined" startIcon={<LinkedIn />}>
                  linkedin.com/company/stripe
                </Button>
              </div>
            </div>
          </div>

          <div className="my-4">
            <img
              src={require("../../../assets/images/Frame1191.png")}
              alt=""
              className="w-full"
            />
          </div>
        </Grid>

        {/* Tech Stack and Office Location */}
        <Grid item xs={12} md={4}>
          <div className="mt-2">
            <Typography variant="h5" fontWeight={600}>
              Tech Stack
            </Typography>
            <div className="flex gap-4 items-center my-4">
              <span className="p-2 bg-gray-200 rounded-md">HTML5</span>
              <span className="p-2 bg-gray-200 rounded-md">CSS3</span>
              <span className="p-2 bg-gray-200 rounded-md">JavaScript</span>
            </div>
            <Button variant="text" endIcon={<ArrowForward />}>
              View tech stack
            </Button>
          </div>

          <div className="mt-6">
            <Typography variant="h5" fontWeight={600}>
              Office Location
            </Typography>
            <ul className="text-gray-700">
              <li>Noida</li>
              <li>Gurgaon</li>
              <li>Delhi(NCR)</li>
            </ul>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default VendorCompanyDetails;