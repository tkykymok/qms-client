export type UpdateReservationStatusRequest = {
  staffId: number;
  status: number;
  storeMenuIds: number[];
  version: number;
};
