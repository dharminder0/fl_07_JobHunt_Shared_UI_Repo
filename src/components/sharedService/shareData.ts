export const RoleData: any = [
  {
    id: "1",
    role: "vendor",
    name: "Vendor",
    isActive: false,
  },
  {
    id: "2",
    name: "Company",
    role: "company",
    isActive: false,
  },
  {
    id: "3",
    name: "Both",
    role: ["company", "vendor"],
    isActive: false,
  },
];

export const ClientStatus: any = [
  {
    id: 1,
    name: "Active",
    value: "Active",
  },
  {
    id: 2,
    name: "Inactive",
    value: "Inactive",
  },
];

export const LocationTypeStatus: any = [
  {
    id: 1,
    name: "Onsite",
    value: "Onsite",
  },
  {
    id: 2,
    name: "Hybrid",
    value: "Hybrid",
  },
  {
    id: 3,
    name: "Remote",
    value: "Remote",
  },
];

export const RequirementStatus: any = [
  {
    id: 1,
    name: "Open",
    value: "Open",
  },
  {
    id: 2,
    name: "On Hold",
    value: "On Hold",
  },
  {
    id: 3,
    name: "Closed",
    value: "Closed",
  },
];

export const OrgStrength: any = ["0-10", "10-50", "50-100", "100-500", "500+"];
