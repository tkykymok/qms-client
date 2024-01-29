export type StoreStaff = {
  staffId: number;
  storeId: number;
  lastName: string;
  firstName: string | null;
  isActive: boolean;
  reservationId: number | null;
};
