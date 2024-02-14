import useSWR from "swr";
import * as Usecase from "@/usecase/storeMenuUsecase";
import { StoreMenu } from "@/types/model/storeMenu";
import { useMemo } from "react";

export const storeMenusFetcher = (): Promise<StoreMenu[]> => {
  return Usecase.getStoreMenus();
};

export const useStoreMenu = () => {
  const { data: storeMenus, mutate } = useSWR<StoreMenu[]>(
    "storeMenus",
    storeMenusFetcher,
    {
      revalidateOnReconnect: true,
      fallbackData: [],
    },
  );

  const activeStoreMenus = useMemo(() => {
    return storeMenus?.filter((storeMenu) => !storeMenu.disabled);
  }, [storeMenus]);

  return { activeStoreMenus };
};
