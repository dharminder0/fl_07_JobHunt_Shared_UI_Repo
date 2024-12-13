import React from "react";
import {
  Typography,
  Grid,
  Box,
  Tabs,
  Tab,
  Chip,
  Link,
  Button,
  Modal,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Language,
  LocationOnOutlined,
  MailOutline,
  Phone,
  PictureAsPdf,
  Share,
} from "@mui/icons-material";

const VendorDetails = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState("bench");
  const handleRowClick = (id: any) => {};
  const [open, setOpen] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const benchData = [
    {
      id: 1,
      resource: "Raj Pathar",
      skills: "Software Associate",
      experience: "8 years",
      location: "Noida",
      availability: "Immediate",
    },
    {
      id: 2,
      resource: "Harshit Tandon ",
      skills: "Front End Lead",
      experience: "8 years",
      location: "Noida",
      availability: "Immediate",
    },
    {
      id: 3,
      resource: "Sajid Sarkar ",
      skills: "Software Developer",
      experience: "4 years",
      location: "Noida",
      availability: "Immediate",
    },
    {
      id: 4,
      resource: "Vaibav Rastogi",
      skills: "Front End Developer",
      experience: "3 years",
      location: "Noida",
      availability: "Immediate",
    },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div>
            <img
              src={
                "https://fleekitsolutions.com/wp-content/uploads/2023/09/favicon-32x32-1.png"
              }
              style={{ width: 65, height: 65 }}
            />
          </div>
          <div>
            <p className="text-heading">Fleek IT Solutions</p>
            <div className="mt-1">
              <Chip
                label="Web Development"
                variant="outlined"
                sx={{ fontSize: 12 }}
                className="my-1 me-1"
              />
              <Chip
                label="Mobile App Development"
                variant="outlined"
                sx={{ fontSize: 12 }}
                className="my-1 me-1"
              />
              <Chip
                label="DevOps"
                variant="outlined"
                sx={{ fontSize: 12 }}
                className="my-1 me-1"
              />
              <Chip
                label="QA"
                variant="outlined"
                sx={{ fontSize: 12 }}
                className="my-1 me-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Company Profile and Tech Stack */}
      <Grid container spacing={6}>
        {/* Company Profile */}
        <Grid item xs={12} md={9}>
          <div className="mt-2">
            <p className="text-gray-700 text-base">
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
            </p>
          </div>
          <div className="my-2">
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
              >
                <Tab value="bench" label="Bench Strength" />
              </Tabs>

              {value === "bench" && (
                <div className="table-body mt-4">
                  <table>
                    <thead>
                      <tr>
                        <th className="add-right-shadow">Resource name</th>
                        <th>Skill Set</th>
                        <th>Experience</th>
                        <th>Location</th>
                        <th>Availability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {benchData.map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item.id)}>
                          <th className="add-right-shadow">{item.resource}</th>
                          <td>{item.skills}</td>
                          <td>{item.experience}</td>
                          <td>{item.location}</td>
                          <td>{item.availability}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Box>
          </div>
        </Grid>

        {/* Tech Stack and Office Location */}
        <Grid item xs={12} md={3}>
          <div className="mb-2 space-y-4">
            {/* <p className="text-base">
              Click the 'Invite' button to send a notification to vendors.
              Interested vendors will follow the instructions to complete the
              process. You can track their progress and manage empaneled vendors
              from the 'Manage Vendors' section.
            </p> */}
            <Button
              onClick={handleClickOpen}
              variant="outlined"
              startIcon={<Share />}
            >
              Invite for Empanelment
            </Button>

            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogContent>
                <div className="space-y-4">
                  <p className="text-heading">Invite Vendors for Empanelment</p>
                  <p className="text-base">
                    Click the 'Invite' button to send a notification to vendors.
                    Interested vendors will follow the instructions to complete
                    the process. You can track their progress and manage
                    empaneled vendors from the 'Manage Vendors' section.
                  </p>
                  <p className="text-base">Write a Personalized Message</p>
                </div>
                <form className="mt-2 space-y-4">
                  <TextField
                    label="Message"
                    // value={companyName}
                    // onChange={(e) => setCompanyName(e.target.value)}
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}
                  />
                </form>
              </DialogContent>
              <DialogActions sx={{ paddingBottom: 2, paddingRight: 3 }}>
                <Button autoFocus onClick={handleClose} variant="outlined">
                  Close
                </Button>
                <Button variant="contained">Invite</Button>
              </DialogActions>
            </Dialog>
            {/* <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <p className="text-base">Write a Personalized Message</p>
                <form className="w-full max-w-md mt-2 space-y-4">
                  <TextField
                    label="Message"
                    // value={companyName}
                    // onChange={(e) => setCompanyName(e.target.value)}
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}
                  />
                  <Button onClick={handleOpen} variant="contained">
                    Send Request
                  </Button>
                </form>
              </Box>
            </Modal> */}
          </div>
          <div className="mt-4">
            <h5 className="text-heading mb-2">Contact Information</h5>
            <ul className="text-gray-700 text-base">
              <li>
                <Link href="mailto:sales@fleekitsolutions.com" underline="none">
                  <MailOutline fontSize="small" /> sales@fleekitsolutions.com
                </Link>
              </li>
              <li>
                <Link href="tel:+91 971181234" underline="none">
                  <Phone fontSize="small" /> +91 971181234
                </Link>
              </li>
              <li>
                <Link href="www.fleekitsolutions.com" underline="none">
                  <Language fontSize="small" /> www.fleekitsolutions.com
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h5 className="text-heading mb-2">Office Location</h5>
            <ul className="text-gray-700 text-base">
              <li>
                <LocationOnOutlined fontSize="small" /> Noida
              </li>
              <li>
                <LocationOnOutlined fontSize="small" /> Gurgaon
              </li>
              <li>
                <LocationOnOutlined fontSize="small" /> Delhi(NCR)
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <h5 className="text-heading mb-2">Resource Offering</h5>

            <Chip
              label="Remote"
              variant="outlined"
              sx={{ fontSize: 12 }}
              className="my-1 me-1"
            />

            <Chip
              label="Onsite"
              variant="outlined"
              sx={{ fontSize: 12 }}
              className="my-1 me-1"
            />

            <Chip
              label="Hybrid"
              variant="outlined"
              sx={{ fontSize: 12 }}
              className="my-1 me-1"
            />
          </div>
          <div className="mt-4">
            <h5 className="text-heading mb-2">Company Deck</h5>
            <PictureAsPdf fontSize="large" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default VendorDetails;
