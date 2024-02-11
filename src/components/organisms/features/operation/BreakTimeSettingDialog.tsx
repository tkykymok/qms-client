import React, { FC, useMemo } from "react";
import MyDialog from "@/components/molecules/MyDialog";
import { useForm } from "react-hook-form";
import MyTimeRangePicker from "@/components/molecules/MyTimeRangePicker";
import { UpdateBreakTimeRequest } from "@/types/request/StoreStaffRequest";
import { StoreStaff } from "@/types/model/staff";
import { useStoreStaff } from "@/hooks/useStoreStaff";

interface BreakTimeSettingDialogProps {
  staff: StoreStaff;
  isOpen: boolean;
  onClose: () => void;
}

const BreakTimeSettingDialog: FC<BreakTimeSettingDialogProps> = ({
  staff,
  isOpen,
  onClose,
}) => {
  const { watch, setValue, handleSubmit } = useForm<UpdateBreakTimeRequest>({
    defaultValues: {
      staffId: staff.staffId,
      breakStartTime: staff.breakStartTime || "",
      breakEndTime: staff.breakEndTime || "",
    },
  });

  const { handleUpdateBreakTime } = useStoreStaff();

  const onChangeStartTime = (timeValue: string) => {
    setValue("breakStartTime", timeValue);
  };

  const onChangeEndTime = (timeValue: string) => {
    setValue("breakEndTime", timeValue);
  };

  const onSubmit = async (form: UpdateBreakTimeRequest) => {
    try {
      await handleUpdateBreakTime(form);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const brakeTime = useMemo(() => {
    if (staff.breakStartTime && staff.breakEndTime) {
      return `${staff.breakStartTime} 〜 ${staff.breakEndTime}`;
    }
    return "未設定";
  }, [staff]);

  return (
    <MyDialog
      isOpen={isOpen}
      title={"休憩時間設定"}
      onOk={handleSubmit(onSubmit)}
      okText={"登録"}
      onCancel={onClose}
      cancelText={"キャンセル"}
      onClose={onClose}
    >
      <div className="text-neutral-600 text-sm ">休憩時間: {brakeTime}</div>
      <div className="p-3 flex justify-between items-center">
        <MyTimeRangePicker
          onChangeStartTime={onChangeStartTime}
          onChangeEndTime={onChangeEndTime}
          defaultStartTime={staff.breakStartTime}
          defaultEndTime={staff.breakEndTime}
        />
      </div>
    </MyDialog>
  );
};

export default BreakTimeSettingDialog;
