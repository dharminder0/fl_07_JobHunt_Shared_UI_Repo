import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import {
  getNotificationsList,
  getNotificationUpdate,
} from "../../../components/sharedService/apiService";
import NoDataAvailable from "../../../components/sharedComponents/NoDataAvailable";

import {
  signalREmitter,
} from "../../sharedService/signalRService";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import moment from "moment";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export const Notifications = () => {
  const navigation = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const activeRole = localStorage.getItem("activeRole") || "";
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [notificationList, setNotificationList] = useState<any[]>([]);
  const [notificationCount, setNotificationCount] = useState<any>(0);

  const getNotificationsListData = () => {
    const payload = {
      orgCode: userData?.orgCode,
      pageSize: pageSize,
      page: pageIndex,
    };
    getNotificationsList(payload)
      .then((result: any) => {
        setNotificationCount(result.count);
        if (result.count >= 0) {
          setNotificationList(result.notifications);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const handle = () => {
      console.log("📡 Count updated, fetching...");
      getNotificationsListData();
    };
    handle();
    signalREmitter.on("countUpdate", handle);
    signalREmitter.on("readStatusUpdate", handle);
    signalREmitter.on("listUpdate", handle);

    return () => {
      signalREmitter.off("countUpdate", handle);
      signalREmitter.off("readStatusUpdate", handle);
      signalREmitter.off("listUpdate", handle);
    };
  }, [pageIndex]);

  const handleNotifyRead = (item: any) => {
    if (!item.isRead) {
      getNotificationUpdate(item.id).then((result: any) => {
        if (result) {
          console.log("updated");
        }
      });
    }
  };

  const handleRedirection = (item: any) => {
    if (item.notificationType === 1) {
      navigation(`/${activeRole}/myvendors`);
    }
    if (item.notificationType === 2) {
      navigation(`/${activeRole}/candidate`);
    }
    if (item.notificationType === 3) {
      navigation(`/${activeRole}/candidates`);
    }
  };

  return (
    <div className="my-3">
      {notificationList?.length > 0 ? (
        <>
          {notificationList?.map((item: any) => (
            <Accordion key={item.id} className="!bg-indigo-50">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-header-${item.id}`}
                id={`panel-header-${item.id}`}
                onClick={(e: any) => {
                  handleNotifyRead(item);
                  e.stopPropagation();
                }}
              >
                <div className="flex justify-between w-full items-center">
                  <div className="flex">
                    {!item.isRead && (
                      <FiberManualRecordIcon
                        fontSize="inherit"
                        color="primary"
                      />
                    )}
                    <p
                      className="text-base font-semibold hover:text-indigo-500"
                      onClick={(e: any) => {
                        handleRedirection(item);
                        e.stopPropagation();
                      }}
                    >
                      {item?.title}
                    </p>
                  </div>
                  <div className="text-base">
                    {moment(item.createdOn).format("DD-MM-YYYY")}
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails className="!bg-white">
                <p className="text-base my-1">{item.message}</p>
              </AccordionDetails>
            </Accordion>
          ))}

          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-2 sm:px-4">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-base text-gray-700">
                  Showing <span>{(pageIndex - 1) * pageSize + 1}</span> to{" "}
                  <span>
                    {Math.min(pageIndex * pageSize, notificationCount || 0)}
                  </span>{" "}
                  of <span>{notificationCount || 0}</span> results
                </p>
              </div>
            </div>
            <div className="flex flex-1 justify-end">
              <IconButton
                size="small"
                onClick={() => setPageIndex(pageIndex - 1)}
                disabled={pageIndex <= 1}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => setPageIndex(pageIndex + 1)}
                disabled={
                  pageIndex >= Math.ceil((notificationCount || 0) / pageSize)
                }
              >
                <ChevronRight />
              </IconButton>
            </div>
          </div>
        </>
      ) : (
        <>
          <NoDataAvailable />
        </>
      )}
    </div>
  );
};
