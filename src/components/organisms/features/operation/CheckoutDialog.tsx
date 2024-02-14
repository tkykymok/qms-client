import React, { FC, useMemo, useState } from "react";
import MyDialog from "@/components/molecules/MyDialog";
import { Typography } from "@/components/molecules/Typography";
import Tag from "@/components/atoms/Tag";
import Button from "@/components/atoms/Button";
import { Reservation, ReservationMenu } from "@/types/model/reservation";
import { useStoreMenu } from "@/hooks/useStoreMenu";
import { useReservation } from "@/hooks/useReservation";
import { DONE } from "@/types/model/type";

interface CheckoutDialogProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
  reservation: Reservation;
}

const CheckoutDialog: FC<CheckoutDialogProps> = ({
  isDialogOpen,
  closeDialog,
  reservation,
}) => {
  // 選択されたメニュー
  const [selectedMenus, setSelectedMenus] = useState<ReservationMenu[]>(
    reservation.reservationMenus,
  );

  // 合計金額を計算
  const totalAmount = useMemo(() => {
    return selectedMenus.reduce((acc, menu) => {
      return acc + menu.price;
    }, 0);
  }, [selectedMenus]);

  // 予約に関するカスタムフック
  const { handleUpdateReservation } = useReservation();
  // メニューに関するカスタムフック
  const { activeStoreMenus } = useStoreMenu();

  // 選択されたメニューかどうか判定
  const isSelectedMenu = (menu: ReservationMenu) => {
    return selectedMenus.some((m) => m.storeMenuId === menu.storeMenuId);
  };

  // メニュー選択を切り替え処理
  const handleSelectMenu = (menu: ReservationMenu) => {
    if (isSelectedMenu(menu)) {
      setSelectedMenus((prev) =>
        prev.filter((m) => m.storeMenuId !== menu.storeMenuId),
      );
    } else {
      setSelectedMenus((prev) => [...prev, menu]);
    }
  };

  // 確認ボタン押下処理
  const handleConfirm = () => {
    // 予約のステータスを更新
    handleUpdateReservation(
      reservation.reservationId,
      null,
      DONE,
      reservation.version,
    ).then(() => {
      closeDialog();
    });
  };

  return (
    <MyDialog
      isOpen={isDialogOpen}
      title="お会計"
      onClose={closeDialog}
      size="5xl"
      onOk={handleConfirm}
      okText="確認"
      onCancel={closeDialog}
      cancelText="キャンセル"
    >
      <div className="p-3">
        <Typography variant="h6">メニュー</Typography>
        <div className="flex justify-end">
          <div className="flex items-center space-x-2 min-h-8">
            {selectedMenus.map((menu) => (
              <Tag key={menu.storeMenuId} backgroundColor={menu.tagColor}>
                <span className="text-lg">{menu.menuName}</span>
              </Tag>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 min-h-64">
          {activeStoreMenus?.map((menu) => (
            <div key={menu.storeMenuId} className="p-6 h-full">
              <Button
                onClick={() => handleSelectMenu(menu)}
                variant={isSelectedMenu(menu) ? "primary" : "transparent"}
              >
                {menu.menuName}
              </Button>
            </div>
          ))}
        </div>

        <Typography variant="h6" className="mb-4">
          料金
        </Typography>
        <Typography variant="h6" className="text-right text-neutral-600">
          合計(税込)：¥{totalAmount.toLocaleString()}
        </Typography>
      </div>
    </MyDialog>
  );
};

export default CheckoutDialog;
