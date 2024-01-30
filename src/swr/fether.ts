import * as TestUsecase from "../usecase/testUsecase";
import * as ReservationUsecase from "../usecase/reservationUsecase";
import * as StaffUsecase from "../usecase/staffUsecase";
import { Reservation } from "@/types/model/reservation";
import { StoreStaff } from "@/types/model/staff";

export const todoFetcher = (): Promise<any> => {
  return TestUsecase.getTodos();
};

export const reservationsFetcher = (): Promise<Reservation[]> => {
  return ReservationUsecase.getReservations();
};

export const storeStaffsFetcher = (): Promise<StoreStaff[]> => {
  return StaffUsecase.getStoreStaffs();
};
