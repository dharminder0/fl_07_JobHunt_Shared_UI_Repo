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
import configData from "../../sharedService/config.json";

export const Notifications = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
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
          // getNotificationsListData();
          console.log("updated");
        }
      });
    }
  };

  return (
    <div className="my-3">
      {notificationList?.length > 0 ? (
        notificationList?.map((item: any) => (
          <Accordion
            key={item.id}
            className={!item.isRead ? "!bg-indigo-100" : "!bg-white"}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-header-${item.id}`}
              id={`panel-header-${item.id}`}
              onClick={() => handleNotifyRead(item)}
            >
              <p className="text-base">{item?.title}</p>
            </AccordionSummary>
            <AccordionDetails className="!bg-white">
              <p className="text-base">{item.message}</p>
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
