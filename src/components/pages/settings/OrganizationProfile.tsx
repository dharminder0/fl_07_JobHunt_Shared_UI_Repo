import { useEffect, useState } from "react";
import { Grid, Link, Button, Avatar } from "@mui/material";
import {
  CorporateFareOutlined,
  Edit,
  Facebook,
  Language,
  LocationOnOutlined,
  MailOutline,
  Phone,
} from "@mui/icons-material";
import { getOrgProfileDetails } from "../../../components/sharedService/apiService";
import { AppDispatch } from "../../../components/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "../../../components/features/drawerSlice";
import Loader from "../../sharedComponents/Loader";
import SocialIcon from "../../../components/sharedComponents/SocialIcon";
import HtmlRenderer from "../../../components/sharedComponents/HtmlRenderer";

const OrganizationProfile = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [orgData, setOrgData] = useState<any>();
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const drawerState = useSelector((state: any) => state.drawer);

  useEffect(() => {
    if (!drawerState.isOpen) {
      getOrgProfile();
    }
  }, [drawerState]);

  const getOrgProfile = () => {
    setIsLoader(true);
    getOrgProfileDetails(userData.orgCode)
      .then((result: any) => {
        if (result.success) {
          setOrgData(result.content);
          userData.companyIcon = result.content.logo;
          localStorage.setItem("userData", JSON.stringify(userData));
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

  const handleOpenDrawer = (name: string) => {
    dispatch(openDrawer({ drawerName: name }));
  };

  return (
    <div className="p-4">
      {!isLoader ? (
        <>
          <div className="mb-6 flex justify-between">
            <div className="flex items-center gap-4 mb-4 w-[calc(100%-160px)]">
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
                <h5 className="text-heading flex items-center">
                  {orgData?.orgName}
                </h5>
                <div className="mt-1 text-base">
                  Registered address: {orgData?.regAddress}
                </div>
              </div>
            </div>
            <div className="w-[150px]">
              <Button
                variant="outlined"
                startIcon={<Edit fontSize="inherit" />}
                onClick={() => handleOpenDrawer("OrgProfileUpdate")}
              >
                Edit Profile
              </Button>
            </div>
          </div>
          <Grid container spacing={6}>
            {/* Company Profile */}
            <Grid item xs={12} md={9}>
              <div>
                <div className="text-base text-gray-700 mb-2">
                  <HtmlRenderer content={orgData?.description} />
                </div>
              </div>
            </Grid>

            {/* Tech Stack and Office Location */}
            <Grid item xs={12} md={3}>
              <div>
                <h5 className="text-heading group/item flex items-center mb-2">
                  Contact Information
                </h5>

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
                    <Link
                      href={orgData?.website}
                      underline="none"
                      target="_blank"
                    >
                      <Language fontSize="small" /> {orgData?.website}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <h5 className="text-heading flex items-center mb-2">
                  Office Location
                </h5>
                <ul className="text-gray-700 text-base">
                  {orgData?.officeLocation &&
                    orgData?.officeLocation?.length > 0 &&
                    orgData?.officeLocation.map((item: any) => (
                      <li>
                        <LocationOnOutlined fontSize="small" color="primary" />{" "}
                        {item.city}, {item.stateName}
                      </li>
                    ))}
                </ul>
              </div>

              <div className="mt-4">
                <h5 className="text-heading flex items-center mb-2">
                  Social Links
                </h5>
                <ul className="text-gray-700 text-base">
                  {orgData?.socialLinks &&
                    orgData?.socialLinks?.length > 0 &&
                    orgData?.socialLinks.map((item: any) => (
                      <li>
                        <Link href={item?.url} underline="none">
                          <SocialIcon platform={item.platform} /> {item?.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </Grid>
          </Grid>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default OrganizationProfile;
