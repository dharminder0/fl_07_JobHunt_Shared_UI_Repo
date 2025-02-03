import React, { useMemo } from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";
import { type Navigation } from "@toolpad/core/AppProvider";

export const COMPANY_NAVIGATION:Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "company/dashboard",
    title: "Dashboard",
    icon: <DashboardOutlinedIcon />,
  },
  {
    segment: "company/myrequirements",
    title: "Requirements",
    icon: <WorkOutlineOutlinedIcon />,
  },
  {
    segment: "company/candidates",
    title: "Applicants",
    icon: <GroupAddOutlinedIcon />,
  },
  {
    segment: "company/clients",
    title: "Clients",
    icon: <AssuredWorkloadOutlinedIcon />,
  },
  {
    segment: "company",
    title: "Vendors",
    icon: <BusinessOutlinedIcon />,
    children: [
      {
        segment: "myvendors",
        title: "Empaneled",
        icon: <BusinessOutlinedIcon />,
      },
      {
        segment: "findvendors",
        title: "Search",
        icon: <ScreenSearchDesktopOutlinedIcon />,
      },
      {
        segment: "vndonboarding",
        title: "Onboarding",
        icon: <HandshakeOutlinedIcon />,
      },
    ],
  },
  {
    segment: "company/messages",
    title: "Messages",
    icon: <ChatOutlinedIcon />,
  },
  {
    kind: "header",
    title: "Settings",
  },
  {
    segment: "company/profile",
    title: "Organization Profile",
    icon: <ContactPageOutlinedIcon />,
  },
  {
    segment: "company/subscriptions",
    title: "Subscriptions",
    icon: <SubscriptionsOutlinedIcon />,
  },
  {
    segment: "company/members",
    title: "Members",
    icon: <PeopleOutlinedIcon />,
  },
];

export const VENDOR_NAVIGATION:Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "vendor/dashboard",
    title: "Dashboard",
    icon: <HomeOutlinedIcon />,
  },
  {
    segment: "vendor/requirements",
    title: "Requirements",
    icon: <WorkOutlineOutlinedIcon />,
  },
  {
    segment: "vendor/candidate",
    title: "Applicants",
    icon: <GroupAddOutlinedIcon />,
  },
  {
    segment: "vendor/bench",
    title: "Bench",
    icon: <PersonSearchOutlinedIcon />,
  },
  {
    segment: "vendor",
    title: "Clients",
    icon: <BusinessOutlinedIcon />,
    children: [
      {
        segment: "clients",
        title: "Empaneled",
        icon: <BusinessOutlinedIcon />,
      },
      {
        segment: "searchclient",
        title: "Search",
        icon: <ScreenSearchDesktopOutlinedIcon />,
      },
      {
        segment: "onboarding",
        title: "Onboarding",
        icon: <HandshakeOutlinedIcon />,
      },
    ],
  },
  {
    segment: "vendor/messages",
    title: "Messages",
    icon: <ChatOutlinedIcon />,
  },
  {
    kind: "header",
    title: "Settings",
  },
  {
    segment: "vendor/profile",
    title: "Organization Profile",
    icon: <PersonOutlineOutlined />,
  },
  {
    segment: "vendor/subscriptions",
    title: "Subscriptions",
    icon: <SubscriptionsOutlinedIcon />,
  },
  {
    segment: "vendor/members",
    title: "Members",
    icon: <PeopleOutlinedIcon />,
  },
];
