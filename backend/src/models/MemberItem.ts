export interface MemberItem {
  
  societyId: string, 
  memberId: string, 
  active: boolean, 
  inactiveTimestamp?: string, 
  lastUpdatedAt: string, 
  attachmentUrl?: string,
  description: string, 
  gender: string,
  firstName: string, 
  lastName: string, 
  birthday: string, 
  postCode: string, 
  city: string,
  street: string, 
  phoneNumber: string,
  handyNumber: string, 
  email: string, 
  memberSince: string, 
  referenceId: string
}
