import useSWR from "swr";
import { StoreStaff } from "@/types/model/staff";
import * as Usecase from "@/usecase/storeStaffUsecase";
import { useMemo } from "react";
import {
  SortActiveStaffRequest,
  ToggleActiveStaffRequest,
} from "@/types/request/StoreStaffRequest";

export const storeStaffsFetcher = (): Promise<StoreStaff[]> => {
  return Usecase.getStoreStaffs();
};

export const useStoreStaff = () => {
  const { data: storeStaffs, mutate: storeStaffMutate } = useSWR<StoreStaff[]>(
    "storeStaffs",
    storeStaffsFetcher,
    {
      revalidateOnReconnect: true,
      fallbackData: [],
    },
  );

  const activeStaffs = useMemo(() => {
    if (!storeStaffs) {
      return [];
    }
    return storeStaffs
      .filter((staff) => staff.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [storeStaffs]);

  // 活動中スタッフの並び順を更新します。
  const handleSortActiveStaffs = async (activeStaffIds: number[]) => {
    await storeStaffMutate((prev) => {
      // 引数で渡されたactiveStaffIdsを元に、storeStaffsの並び順を更新します。
      return prev!.map((staff) => {
        const index = activeStaffIds.indexOf(staff.staffId);
        if (index !== -1) {
          return {
            ...staff,
            sortOrder: index + 1,
          };
        }
        return staff;
      });
    }, false);

    // 並び順を更新するリクエストを送信します。
    await Usecase.sortActiveStaffs(activeStaffIds);
  };

  const handleToggleActiveStaff = async (targetStaff: StoreStaff) => {
    await storeStaffMutate((prev) => {
      return prev!.map((staff) => {
        if (staff.staffId === targetStaff.staffId) {
          return {
            ...targetStaff,
            isActive: !targetStaff.isActive,
          };
        }
        return staff;
      });
    }, false);

    // 活動中スタッフのON/OFFを切り替えるリクエストを送信します。
    await Usecase.toggleActiveStaff(targetStaff);
  };

  return {
    storeStaffs,
    activeStaffs,
    handleSortActiveStaffs,
    handleToggleActiveStaff,
  };
};
