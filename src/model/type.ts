export type Reservation = {
  reservationId: number;
  storeId: number;
  customerId: number;
  reservationNumber: number;
  reservedDate: string;
  staffId: number | null;
  serviceStartTime: string | null;
  serviceEndTime: string | null;
  holdStartTime: string | null;
  status: Status;
  notified: boolean;
  arrived: boolean;
  version: number;
  menuName: string;
  price: number;
  time: number;
  storeName: string | null;
  homePageUrl: string | null;
  customerLastName: string;
  customerFirstName: string;
};

export type Status =
  | typeof IN_PROGRESS
  | typeof WAITING
  | typeof PENDING
  | typeof DONE
  | typeof CANCELED;

export const WAITING = 0;
export const IN_PROGRESS = 1;
export const DONE = 2;
export const PENDING = 5;
export const CANCELED = 9;

export type StoreStaff = {
  staffId: number;
  storeId: number;
  lastName: string;
  firstName: string | null;
  isActive: boolean;
  reservationId: number | null;
};
