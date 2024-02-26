import React, { FC, useMemo } from "react";
import MyDialog from "@/components/molecules/MyDialog";
import { useForm } from "react-hook-form";
import MyTimeRangePicker from "@/components/molecules/MyTimeRangePicker";
import { UpdateBreakTimeRequest } from "@/types/request/storeStaffRequest";
import { StoreStaff } from "@/types/model/staff";
import { useStoreStaff } from "@/hooks/useStoreStaff";
import Button from "@/components/atoms/Button";
import { Typography } from "@/components/molecules/Typography";

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

  const updateBreakTime = async (form: UpdateBreakTimeRequest) => {
    try {
      await handleUpdateBreakTime(form);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const clearBreakTime = async (form: UpdateBreakTimeRequest) => {
    const request: UpdateBreakTimeRequest = {
      staffId: form.staffId,
      breakStartTime: null,
      breakEndTime: null,
    };

    try {
      await handleUpdateBreakTime(request);
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
      title={`休憩時間設定(${staff.lastName})`}
      onClose={onClose}
      customFooter={
        <>
          <div>
            <Button variant={"light"} onClick={onClose}>
              キャンセル
            </Button>
          </div>
          <div>
            <Button variant={"primary"} onClick={handleSubmit(updateBreakTime)}>
              更新
            </Button>
          </div>
        </>
      }
    >
      <div className="flex justify-center items-center px-2 pt-2">
        <Typography variant="subtitle2" className="text-neutral-600">
          {brakeTime}
        </Typography>
        {staff.breakStartTime && staff.breakEndTime && (
          <div className="absolute right-6">
            <Button
              variant={"danger"}
              size={"sm"}
              onClick={handleSubmit(clearBreakTime)}
            >
              取消
            </Button>
          </div>
        )}
      </div>
      <div className="px-3 py-6 flex justify-between items-center">
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
