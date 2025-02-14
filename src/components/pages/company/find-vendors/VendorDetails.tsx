import React, { useEffect } from "react";
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
  IconButton,
  Avatar,
} from "@mui/material";
import {
  CorporateFareOutlined,
  Language,
  LocationOnOutlined,
  MailOutline,
  Phone,
  PictureAsPdf,
  Share,
} from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import {
  dispatchedInvitation,
  getOrgProfileDetails,
} from "../../../../components/sharedService/apiService";
import Loader from "../../../../components/shared/Loader";
import HtmlRenderer from "../../../../components/sharedComponents/HtmlRenderer";
import { RoleType } from "../../../../components/sharedService/enums";

const VendorDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/");

  const [isLoader, setIsLoader] = React.useState<boolean>(false);
  const [value, setValue] = React.useState("bench");
  const handleRowClick = (id: any) => {};
  const [open, setOpen] = React.useState(false);
  const [orgData, setOrgData] = React.useState<any>([]);
  const [empMessage, setEmpMessage] = React.useState<any>("");
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getOrgProfile();
  }, [pathSegments[pathSegments.length - 1]]);

  const getOrgProfile = () => {
    setIsLoader(true);
    getOrgProfileDetails(pathSegments[pathSegments.length - 1])
      .then((result: any) => {
        if (result.success) {
          setOrgData(result.content);
        }
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      })
      .catch((error: any) => {
        console.log(error);
        setTimeout(() => {
          setIsLoader(false);
        }, 1000);
      });
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

  const userData = JSON.parse(localStorage.userData);
  const handleInvitation = () => {
    const payload: any = {
      sender: {
        email: userData.email,
        orgCode: userData.orgCode,
        roleType: RoleType.Vendor,
      },
      receiver: {
        email: orgData?.email,
        orgCode: orgData?.orgCode,
      },
      message: empMessage,
    };

    dispatchedInvitation(payload).then((result: any) => {
      if (result) {
        handleClose();
      }
    });
  };
  return (
    <>
      <div className="min-h-screen p-6">
        {!isLoader ? (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <IconButton
                  color="primary"
                  aria-label="add to shopping cart"
                  className="!w-[50px] !h-[50px]"
                  onClick={() => {
                    navigate(-1);
                  }}
                  size="small"
                >
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
                <div>
                  <Avatar
                    alt="Org Icon"
                    src={orgData?.logo || undefined}
                    className="rounded-full !h-12 !w-12"
                  >
                    {!orgData?.logo && (
                      <CorporateFareOutlined fontSize="medium" />
                    )}
                  </Avatar>
                </div>
                <div>
                  <p className="text-heading">{orgData?.orgName}</p>
                  {/* <div className="mt-1">
                    <Chip
                      label="Web Development"
                      variant="outlined"
                      sx={{ fontSize: 12 }}
                      className="my-1 me-1 !text-info"
                      size="small"
                    />
                    
                  </div> */}
                </div>
              </div>
            </div>

            <Grid container spacing={6}>
              {/* Company Profile */}
              <Grid item xs={12} md={9}>
                <div className="mt-2 text-base text-gray-700">
                  <HtmlRenderer content={orgData?.description} />
                </div>
                {/* <div className="my-2">
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
                              <th className="add-right-shadow">
                                Resource name
                              </th>
                              <th>Skill Set</th>
                              <th>Experience</th>
                              <th>Location</th>
                              <th>Availability</th>
                            </tr>
                          </thead>
                          <tbody>
                            {benchData.map((item, index) => (
                              <tr
                                key={index}
                                onClick={() => handleRowClick(item.id)}
                              >
                                <th className="add-right-shadow">
                                  {item.resource}
                                </th>
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
                </div> */}
              </Grid>

              {/* Tech Stack and Office Location */}
              <Grid item xs={12} md={3}>
                <div className="mb-2 space-y-4">
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
                        <p className="text-heading">
                          Invite Vendors for Empanelment
                        </p>
                        <p className="text-base">
                          Click the 'Invite' button to send a notification to
                          vendors. Interested vendors will follow the
                          instructions to complete the process. You can track
                          their progress and manage empaneled vendors from the
                          'Manage Vendors' section.
                        </p>
                        <p className="text-base">
                          Write a Personalized Message
                        </p>
                      </div>
                      <form className="mt-2 space-y-4">
                        <TextField
                          label="Message"
                          value={empMessage}
                          onChange={(e) => setEmpMessage(e.target.value)}
                          fullWidth
                          variant="outlined"
                          multiline
                          required
                          rows={3}
                        />
                      </form>
                    </DialogContent>
                    <DialogActions sx={{ paddingBottom: 2, paddingRight: 3 }}>
                      <Button
                        autoFocus
                        onClick={handleClose}
                        variant="outlined"
                      >
                        Close
                      </Button>
                      <Button
                        variant="contained"
                        disabled={!empMessage}
                        onClick={handleInvitation}
                      >
                        Invite
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
                <div className="mt-4">
                  <h5 className="text-heading mb-2">Contact Information</h5>
                  <ul className="text-gray-700 text-base">
                    <li>
                      <Link href={`mailto:${orgData?.email}`} underline="none">
                        <MailOutline fontSize="small" /> {orgData?.email}
                      </Link>
                    </li>
                    <li>
                      <Link href={`tel:${orgData?.phone}`} underline="none">
                        <Phone fontSize="small" /> {orgData?.phone}
                      </Link>
                    </li>
                    <li>
                      <Link href={orgData?.website} underline="none">
                        <Language fontSize="small" /> {orgData?.website}
                      </Link>
                    </li>
                  </ul>
                </div>

                {orgData?.officeLocation &&
                  orgData?.officeLocation?.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-heading mb-2">Office Location</h5>
                      <ul className="text-gray-700 text-base">
                        {orgData?.officeLocation?.map((item: any) => (
                          <li key={item.city}>
                            <LocationOnOutlined fontSize="small" /> {item.city},{" "}
                            {item.stateName}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* <div className="mt-4">
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
                </div> */}
                {/* <div className="mt-4">
                  <h5 className="text-heading mb-2">Company Deck</h5>
                  <PictureAsPdf fontSize="large" />
                </div> */}
              </Grid>
            </Grid>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default VendorDetails;
