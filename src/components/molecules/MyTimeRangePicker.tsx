import React, { FC } from "react";
import { Timeit } from "react-timeit";

interface MyTimeRangePickerProps {
  onChangeStartTime: (timeValue: string) => void;
  onChangeEndTime: (timeValue: string) => void;
  defaultStartTime?: string | null;
  defaultEndTime?: string | null;
}

const MyTimeRangePicker: FC<MyTimeRangePickerProps> = ({
  onChangeStartTime,
  onChangeEndTime,
  defaultStartTime,
  defaultEndTime,
}) => {
  // 現在時刻を取得
  const currentTime = new Date();
  currentTime.setMinutes(0, 0, 0); // 分、秒、ミリ秒をリセット

  // デフォルトの開始時間(現在時刻から分を除いたもの)
  const defaultStartTimeIfNotPresent = currentTime.toLocaleTimeString();

  // デフォルトの終了時間(デフォルトの開始時間+1時間)
  const endTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
  const defaultEndTimeIfNotPresent = endTime.toLocaleTimeString();

  // 除外する分のリスト
  const minuteExclude = [
    1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 21, 22, 23, 24, 26,
    27, 28, 29, 31, 32, 33, 34, 36, 37, 38, 39, 41, 42, 43, 44, 46, 47, 48, 49,
    51, 52, 53, 54, 56, 57, 58, 59,
  ];

  return (
    <>
      <Timeit
        minuteExclude={minuteExclude}
        defualtValue={defaultStartTime || defaultStartTimeIfNotPresent}
        notShowExclude
        onChange={onChangeStartTime}
      />
      <div className="text-gray-500 font-bold select-none">〜</div>
      <Timeit
        minuteExclude={minuteExclude}
        defualtValue={defaultEndTime || defaultEndTimeIfNotPresent}
        notShowExclude
        onChange={onChangeEndTime}
      />
    </>
  );
};

export default MyTimeRangePicker;
