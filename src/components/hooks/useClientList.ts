import { useState, useEffect } from "react";
import { getClientLists } from "../sharedService/apiService";

export const useClientList = (orgCode?: string) => {
  const [clientList, setClientList] = useState<any[]>([]);

  useEffect(() => {
    if (orgCode) {
      getClientLists(orgCode).then((result: any) => {
        if (result) {
          setClientList(result);
        }
      });
    }
  }, [orgCode]);

  return clientList;
};
