import { useEffect, useState } from "react";
import { Grid, Link, Button } from "@mui/material";
import {
  Edit,
  Facebook,
  Language,
  LocationOnOutlined,
  MailOutline,
  Phone,
} from "@mui/icons-material";
import { getOrgProfileDetails } from "../../../components/sharedService/apiService";
import { AppDispatch } from "../../../components/redux/store";
import { useDispatch } from "react-redux";
import { openDrawer } from "../../../components/features/drawerSlice";
import Loader from "../../../components/shared/Loader";

const OrganizationProfile = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [orgData, setOrgData] = useState<any>();
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    getOrgProfile();
  }, []);

  const getOrgProfile = () => {
    setIsLoader(true);
    getOrgProfileDetails(userData.orgCode)
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

  const handleOpenDrawer = (name: string) => {
    dispatch(openDrawer(name));
  };

  return (
    <div className="p-4">
      {!isLoader ? (
        <>
          <div className="mb-6 flex justify-between">
            <div className="flex items-center gap-4 mb-4 w-[calc(100%-160px)]">
              <div>
                <img
                  src={
                    !orgData?.logo
                      ? "https://opstree.com/wp-content/uploads/2024/10/FavIcon-OpsTree-100x100.png"
                      : orgData?.logo
                  }
                  style={{ width: 65, height: 65 }}
                />
              </div>
              <div>
                <h5 className="text-heading flex items-center">
                  {orgData?.orgName}
                </h5>
                <div className="mt-1 text-base">
                  Registered address: A 27 D, Sector 16, Noida, Uttar Pradesh
                  201301
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
                <p className="text-base text-gray-700 mb-2">
                  {orgData?.description}
                </p>
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
                    <Link href={orgData?.website} underline="none">
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
                          <Facebook fontSize="small" color="primary" />{" "}
                          {item?.name}
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
