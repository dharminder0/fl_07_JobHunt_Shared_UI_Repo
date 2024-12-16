import React from "react";
import {
  Grid,
  Link,
  IconButton,
} from "@mui/material";
import {
  Edit,
  Instagram,
  Language,
  LinkedIn,
  LocationOnOutlined,
  MailOutline,
  Phone,
  X,
} from "@mui/icons-material";

const VndProfile = () => {
  const [value, setValue] = React.useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-6 ">
        <div className="flex items-center gap-4 mb-4">
          <div>
            <img
              src={
                "https://opstree.com/wp-content/uploads/2024/10/FavIcon-OpsTree-100x100.png"
              }
              style={{ width: 65, height: 65 }}
            />
          </div>
          <div>
            <h5 className="text-heading group/item flex items-center">
              OpsTree Solutions
              <div className="group/edit invisible group-hover/item:visible">
                <span className="group-hover/edit:text-gray-700 ">
                  <IconButton aria-label="edit" sx={{ marginLeft: 2 }}>
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </h5>
            <div className="mt-1 text-base">
              Registered address: A 27 D, Sector 16, Noida, Uttar Pradesh 201301
            </div>
          </div>
        </div>
      </div>

      {/* Company Profile and Tech Stack */}
      <Grid container spacing={6}>
        {/* Company Profile */}
        <Grid item xs={12} md={9}>
          <div className="mt-2">
            {/* <p className="text-gray-700 text-base">
              Opstree Solutions is a Digital Transformation and Platform
              Engineer Partner. We empower technology leaders and teams to
              deliver the desired tech outcomes. Empower your business with
              tailored consulting solutions to optimize applications,
              infrastructure, and processes. Our experts leverage automation,
              AI, and cloud technologies to deliver smarter, more secure, and
              cost-effective operations, driving improved agility and
              sustainable growth. Specialized solutions designed to address
              unique needs of your industry, providing strategic support
              essential for business success.
            </p> */}
            <p className="text-base text-gray-700 group/item flex  mb-2">
              Opstree Solutions is a Digital Transformation and Platform
              Engineer Partner. We empower technology leaders and teams to
              deliver the desired tech outcomes. Empower your business with
              tailored consulting solutions to optimize applications,
              infrastructure, and processes. Our experts leverage automation,
              AI, and cloud technologies to deliver smarter, more secure, and
              cost-effective operations, driving improved agility and
              sustainable growth. Specialized solutions designed to address
              unique needs of your industry, providing strategic support
              essential for business success.
              <div className="group/edit invisible group-hover/item:visible">
                <span className="group-hover/edit:text-gray-700 ">
                  <IconButton aria-label="edit" sx={{ marginLeft: 2 }}>
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </p>
          </div>
        </Grid>

        {/* Tech Stack and Office Location */}
        <Grid item xs={12} md={3}>
          <div>
            <h5 className="text-heading group/item flex items-center mb-2">
              Contact Information
              <div className="group/edit invisible group-hover/item:visible">
                <span className="group-hover/edit:text-gray-700 ">
                  <IconButton aria-label="edit" sx={{ marginLeft: 2 }}>
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </h5>

            <ul className="text-gray-700 text-base">
              <li>
                <Link href="mailto:connect@opstree.com" underline="none">
                  <MailOutline fontSize="small" /> connect@opstree.com
                </Link>
              </li>
              <li>
                <Link href="tel:+91(120) 413 7323" underline="none">
                  <Phone fontSize="small" /> +91(120) 413 7323
                </Link>
              </li>
              <li>
                <Link href="https://opstree.com/" underline="none">
                  <Language fontSize="small" /> https://opstree.com/
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h5 className="text-heading group/item flex items-center mb-2">
              Office Location
              <div className="group/edit invisible group-hover/item:visible">
                <span className="group-hover/edit:text-gray-700 ">
                  <IconButton aria-label="edit" sx={{ marginLeft: 2 }}>
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </h5>
            <ul className="text-gray-700 text-base">
              <li>
                <LocationOnOutlined fontSize="small" /> Noida
              </li>
              <li>
                <LocationOnOutlined fontSize="small" /> Hyderabad
              </li>
              <li>
                <LocationOnOutlined fontSize="small" /> Delaware(UK)
              </li>
              <li>
                <LocationOnOutlined fontSize="small" /> Meydan Grandstand(UAE)
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <h5 className="text-heading group/item flex items-center mb-2">
              Social Links
              <div className="group/edit invisible group-hover/item:visible">
                <span className="group-hover/edit:text-gray-700 ">
                  <IconButton aria-label="edit" sx={{ marginLeft: 2 }}>
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </div>
            </h5>
            <ul className="text-gray-700 text-base">
              <li>
                <Link
                  href="https://www.instagram.com/opstreesolutions/"
                  underline="none"
                >
                  <Instagram fontSize="small" /> opstreesolutions
                </Link>
              </li>
              <li>
                <Link href="https://x.com/opstreedevops?mx=2" underline="none">
                  <X fontSize="small" /> opstreedevops
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/company/opstree-solutions/"
                  underline="none"
                >
                  <LinkedIn fontSize="small" /> OpsTree Solutions
                </Link>
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default VndProfile;
