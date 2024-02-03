import * as TestUsecase from "@/usecase/testUsecase";
import * as ReservationUsecase from "@/usecase/reservationUsecase";
import * as StaffUsecase from "@/usecase/storeStaffUsecase";
import { Reservation } from "@/types/model/reservation";
import { StoreStaff } from "@/types/model/staff";

export const todoFetcher = (): Promise<any> => {
  return TestUsecase.getTodos();
};
