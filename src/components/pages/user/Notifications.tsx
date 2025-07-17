import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import {
  getNotificationsList,
  getNotificationUpdate,
} from "../../../components/sharedService/apiService";
import NoDataAvailable from "../../../components/sharedComponents/NoDataAvailable";

import {
  signalREmitter,
  startNotificationConnection,
  stopNotificationConnection,
} from "../../sharedService/signalRService";
import * as signalR from "@microsoft/signalr";
import configData from "../../sharedService/config";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import moment from "moment";
import { useNavigate } from "react-router";

export const Notifications = () => {
  const navigation = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const activeRole = localStorage.getItem("activeRole") || "";
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [notificationList, setNotificationList] = useState<any[]>([]);

  const getNotificationsListData = () => {
    const payload = {
      orgCode: userData?.orgCode,
      pageSize: pageSize,
      page: pageIndex,
    };
    getNotificationsList(payload)
      .then((result: any) => {
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
  }, []);

  // useEffect(() => {
  //   getNotificationsListData();

  //   startNotificationConnection(userData.orgCode, {
  //     onCountUpdate: () => {
  //       console.log("📡 count new notification");
  //       getNotificationsListData();
  //     },
  //     onListUpdate: () => {
  //       console.log("📡 Recieved new notification");
  //       getNotificationsListData();
  //     },
  //     onReadStatusUpdate: () => {
  //       console.log("📡 Recieved update notification");
  //       getNotificationsListData();
  //     },
  //   });

  //   return () => {
  //     stopNotificationConnection();
  //   };
  // }, []);

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
        notificationList?.map((item: any) => (
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
                    <FiberManualRecordIcon fontSize="inherit" color="primary" />
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
        ))
      ) : (
        <>
          <NoDataAvailable />
        </>
      )}
    </div>
  );
};
