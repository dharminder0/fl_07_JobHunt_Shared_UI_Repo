import React, { useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Link,
  Grid2,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import {
  AccessTimeOutlined,
  CorporateFareOutlined,
  Download,
  Language,
  LocationOnOutlined,
  MailOutline,
  Phone,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MatchingSkillsDialog from "../../../sharedComponents/MatchingSkillsDialog";
import {
  getClientDataByClientCode,
  getClientsContractData,
} from "../../../../components/sharedService/apiService";
import moment from "moment";
import { LocationType } from "../../../../components/sharedService/enums";
import TablePreLoader from "../../../../components/sharedComponents/TablePreLoader";
import Loader from "../../../../components/sharedComponents/Loader";

const ClientDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const pathSegments = location.pathname.split("/");
  const clientCode = pathSegments[pathSegments.length - 1];
  const type = searchParams.get("type");
  const [value, setValue] = React.useState("activeView");
  const [previousUrl, setpreviousUrl] = React.useState("");
  const [clientData, setClientData] = React.useState<any>({});
  const [contractData, setContractData] = React.useState<any>([]);
  const [isTableLoader, setIsTableLoader] = React.useState<boolean>(false);
  const [isLoader, setIsLoader] = React.useState<boolean>(false);

  useEffect(() => {
    if (location.state && location.state.previousUrl) {
      setpreviousUrl(location.state.previousUrl);
    }
    if (type) {
      !type ? setValue("activeView") : setValue(type);
    }
  }, [type, location.state]);

  useEffect(() => {
    getClientData();
  }, [clientCode]);

  useEffect(() => {
    getContractData();
  }, [value]);

  const getClientData = () => {
    setIsLoader(true);
    getClientDataByClientCode(clientCode)
      .then((result: any) => {
        if (result && Object.keys(result).length > 0) {
          setClientData(result);
          setTimeout(() => {
            setIsLoader(false);
          }, 1000);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const getContractData = () => {
    setContractData([]);
    const payload = {
      clientCode: clientCode,
      contractType:
        value == "activeView"
          ? 2
          : value == "pastView"
            ? 1
            : value == "openView"
              ? 3
              : 0,
      pageNumber: 1,
      pageSize: 10,
    };
    setIsTableLoader(true);
    getClientsContractData(payload).then((result: any) => {
      if (result.success) {
        setContractData(result?.content?.records);
        setTimeout(() => {
          setIsTableLoader(false);
        }, 1000);
      }
    });
  };

  const handleRowClick = (id: number, tab: string) => {
    navigate(`/company/myvendors/${id}?type=${tab}`, {
      state: { previousUrl: location.pathname },
    });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`?type=${newValue}`);
  };

  return (
    <div className="h-full p-6">
      {!isLoader ? (
        <>
          <div className="mb-6 ">
            <div className="flex items-center gap-4 mb-4">
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                className="!w-[50px] !h-[50px]"
                size="small"
                onClick={() => {
                  previousUrl ? navigate(previousUrl) : navigate("/company");
                }}
              >
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              <div>
                <Avatar
                  alt="Org Icon"
                  src={clientData?.faviconURL || undefined}
                  className="rounded-full me-3 !h-[60px] !w-[60px]"
                >
                  {!clientData?.faviconURL && (
                    <CorporateFareOutlined fontSize="small" />
                  )}
                </Avatar>
              </div>
              <div>
                <p className="text-heading">{clientData?.clientName}</p>
                <div className="mt-1 text-base flex-col flex">
                  <Link
                    href={`mailto:${clientData?.contactEmail}`}
                    underline="none"
                  >
                    <MailOutline fontSize="inherit" />{" "}
                    {clientData?.contactEmail}
                  </Link>
                  <Link
                    href={`tel:${clientData?.contactPhone}`}
                    underline="none"
                  >
                    <Phone fontSize="inherit" /> {clientData?.contactPhone}
                  </Link>
                  {clientData?.website && (
                    <Link href="www.fleekitsolutions.com" underline="none">
                      <Language fontSize="inherit" />
                      {clientData?.website}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Grid2 container spacing={6}>
            {/* Company Profile */}
            <Grid2 size={12}>
              <div className="my-2">
                <Box sx={{ width: "100%" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                  >
                    <Tab value="activeView" label="Active Contracts" />
                    <Tab value="pastView" label="Past Contracts" />
                    <Tab value="openView" label="Open Positions" />
                  </Tabs>
                  {value === "activeView" && (
                    <div className="table-body mt-4">
                      <table>
                        <thead>
                          <tr>
                            <th className="add-right-shadow">Title</th>
                            {/* <th>Vendor</th> */}
                            <th>Resource</th>
                            <th>Start Date</th>
                          </tr>
                        </thead>

                        <TablePreLoader
                          isTableLoader={isTableLoader}
                          data={contractData}
                        />

                        <tbody>
                          {contractData.map((item: any, index: number) => (
                            <tr key={index}>
                              {/* <th className="add-right-shadow">{item.title}</th> */}
                              <th className="add-right-shadow">
                                <div className="cursor-pointer hover:text-indigo-700">
                                  {item.requirementTitle}
                                </div>
                                <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                                  <div
                                    className="flex items-center min-w-[135px] max-w-[150px] cursor-pointer hover:text-indigo-700"
                                    onClick={() =>
                                      handleRowClick(
                                        item.vendorCode,
                                        "activeView"
                                      )
                                    }
                                  >
                                    <img
                                      src={item.vendorLogo}
                                      style={{ height: 12, width: 12 }}
                                      className="me-1"
                                    />
                                    <Tooltip title={item.vendorName} arrow>
                                      <span className="text-ellipsis overflow-hidden truncate">
                                        {item.vendorName}
                                      </span>
                                    </Tooltip>
                                  </div>
                                  <div className="flex text-info items-center">
                                    <div className="ms-2 text-indigo-500 cursor-pointer hover:text-indigo-700">
                                      <Download fontSize="inherit" />
                                      <span className="text-info">CV</span>
                                    </div>
                                  </div>
                                </div>
                              </th>
                              {/* <td className="wide-250">
                            <div className="flex">
                              <img
                                src={item.vendorLogo}
                                style={{ height: 16, width: 16 }}
                                className="me-1"
                              />
                              {item.client}
                            </div>
                          </td> */}
                              <td>{item.resourceName}</td>
                              <td>
                                {moment(item.contractStartDate).format(
                                  "DD-MM-YYYY"
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {value === "pastView" && (
                    <div className="table-body mt-4">
                      <table>
                        <thead>
                          <tr>
                            <th className="add-right-shadow">Title</th>
                            {/* <th>Vendor</th> */}
                            <th>Resource</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                          </tr>
                        </thead>

                        <TablePreLoader
                          isTableLoader={isTableLoader}
                          data={contractData}
                        />

                        <tbody>
                          {contractData.map((item: any, index: number) => (
                            <tr key={index}>
                              {/* <th className="add-right-shadow">{item.title}</th> */}
                              <th className="add-right-shadow">
                                <div className="cursor-pointer hover:text-indigo-700">
                                  {item.requirementTitle}
                                </div>
                                <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                                  <div
                                    className="flex items-center min-w-[135px] max-w-[150px] cursor-pointer hover:text-indigo-700"
                                    onClick={() =>
                                      handleRowClick(
                                        item.vendorCode,
                                        "pastView"
                                      )
                                    }
                                  >
                                    <img
                                      src={item.vendorLogo}
                                      style={{ height: 12, width: 12 }}
                                      className="me-1"
                                    />
                                    <Tooltip title={item.vendorName} arrow>
                                      <span className="text-ellipsis overflow-hidden truncate">
                                        {item.vendorName}
                                      </span>
                                    </Tooltip>
                                  </div>
                                  <div className="flex text-info items-center">
                                    <div className="ms-2 text-indigo-500 cursor-pointer hover:text-indigo-700">
                                      <Download fontSize="inherit" />
                                      <span className="text-info">CV</span>
                                    </div>
                                  </div>
                                </div>
                              </th>

                              {/* <td className="wide-250">
                            <div className="flex">
                              <img
                                src={item.vendorLogo}
                                style={{ height: 16, width: 16 }}
                                className="me-1"
                              />
                              {item.client}
                            </div>
                          </td> */}
                              <td>{item.resourceName}</td>
                              <td>
                                {moment(item.contractStartDate).format(
                                  "DD-MM-YYYY"
                                )}
                              </td>
                              <td>
                                {moment(item.contractEndDate).format(
                                  "DD-MM-YYYY"
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {value === "openView" && (
                    <div className="table-body mt-4">
                      <table>
                        <thead>
                          <tr>
                            <th className="add-right-shadow">Role</th>
                            {/* <th>Client</th> */}
                            <th>Date Posted</th>
                            {/* <th>Requirement Type</th> */}
                            <th>No. of Positions</th>
                            {/* <th>Contract period</th> */}
                          </tr>
                        </thead>

                        <TablePreLoader
                          isTableLoader={isTableLoader}
                          data={contractData}
                        />

                        <tbody>
                          {contractData.map(
                            (requirement: any, index: number) => (
                              <tr key={index}>
                                {/* <th>{job.role}</th> */}
                                <th className="add-right-shadow">
                                  <div> {requirement.requirementTitle} </div>
                                  <div className="flex items-center justify-between text-secondary-text text-info mt-1">
                                    <div className="flex">
                                      <div className="flex items-center">
                                        <LocationOnOutlined
                                          fontSize="inherit"
                                          className="mr-1"
                                        />
                                        <span>
                                          {Object.keys(LocationType).find(
                                            (k) =>
                                              LocationType[k] ==
                                              requirement.locationType
                                          )}
                                        </span>
                                      </div>
                                      <div className="flex items-center ms-1">
                                        <AccessTimeOutlined
                                          fontSize="inherit"
                                          className="mr-1"
                                        />
                                        <span>
                                          {requirement.contractPeriod}
                                        </span>
                                      </div>
                                    </div>
                                    {/* <div className="flex items-center cursor-pointer hover:text-indigo-700">
                                <div className="flex items-center text-indigo-500 hover:text-indigo-700 ms-1">
                                  <Download
                                    fontSize="inherit"
                                    className="mr-1"
                                  />
                                  <span>CV</span>
                                </div>
                              </div> */}
                                  </div>
                                </th>
                                {/* <td>{job.client}</td> */}
                                <td>
                                  {moment(
                                    requirement.requirmentPostedDate
                                  ).format("DD-MM-YYYY")}
                                </td>
                                {/* <td>{job.requirementType}</td> */}
                                <td>{requirement.numberOfPosition}</td>
                                {/* <td>{job.contractPeriod}</td> */}
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Box>
              </div>
            </Grid2>
          </Grid2>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ClientDetails;
