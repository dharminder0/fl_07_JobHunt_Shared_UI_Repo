import { useEffect, useState } from "react";
import { InvitedType, RoleType } from "../sharedService/enums";
import { getOnboardInvitedList } from "../sharedService/apiService";

type TabValue = "Active" | "Archived";

interface UseOrgRequestListProps {
  orgCode: string;
  tabValue: TabValue;
  pageIndex: number;
  pageSize: number;
}

export const useOrgRequestList = ({
  orgCode,
  tabValue,
  pageIndex,
  pageSize,
}: UseOrgRequestListProps) => {
  const [activeDataList, setActiveDataList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrgRequestList = () => {
    const payload = {
      orgCode,
      relationshipType: [RoleType.Client],
      status:
        tabValue === "Active" ? InvitedType.Accepted : InvitedType.Archived,
      page: pageIndex,
      pageSize: pageSize,
    };

    setIsLoading(true);

    getOnboardInvitedList(payload)
      .then((result: any) => {
        setActiveDataList(result.count > 0 ? result.list : []);
      })
      .catch((error) => {
        console.error("Error fetching org request list:", error);
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 1000);
      });
  };

  useEffect(() => {
    if (orgCode) {
      fetchOrgRequestList();
    }
  }, [orgCode, tabValue, pageIndex, pageSize]);

  return {
    activeDataList,
    isLoading,
    refetch: fetchOrgRequestList,
  };
};
