export const RoleType: any = {
  Vendor: "1",
  Client: "2",
  Both: "3",
};

export const BillingType: any = {
  Monthly: 1,
  Annually: 2,
};

export const Visibility: any = {
  Limited: 1,
  Empaneled: 2,
  Public: 3,
};

export const RequirementsStatus: any = {
  Open: 1,
  OnHold: 2,
  Closed: 3,
};

export const LocationType: any = {
  Onsite: 1,
  Hybrid: 2,
  Remote: 3,
};

export const InvitedType: any = {
  Pending: 1,
  Accepted: 2,
  Declined: 3,
  Archived: 4,
};

export enum ApplicationEnums {
  New = 1,
  UnderReview = 2,
  Shortlisted = 3,
  TechnicalAssessment = 4,
  InterviewRound1 = 5,
  InterviewRound2 = 6,
  InterviewRound3 = 7,
  Selected = 8,
  Onboarded = 9,
  ContractClosed = 10,
  Rejected = 11,
  OnHold = 12,
  Withdrawn = 13,
}
