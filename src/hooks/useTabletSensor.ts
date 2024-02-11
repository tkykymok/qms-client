import { useMemo } from "react";
import {
  useSensor,
  useSensors,
  TouchSensor,
  PointerSensor,
} from "@dnd-kit/core";

// タブレットを判定するユーティリティ関数
const isTablet = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return /tablet|ipad|playbook|silk/.test(userAgent);
};

// カスタムフック
const useTabletSensor = () => {
  // activationOptionsをuseMemoでメモ化
  const activationOptions = useMemo(
    () => ({
      activationConstraint: {
        delay: isTablet() ? 0 : 0, // ここの遅延設定は必要に応じて調整
        tolerance: 0,
      },
    }),
    [],
  );

  // 条件に応じてセンサーを選択
  const Sensor = isTablet() ? TouchSensor : PointerSensor;

  // useSensorをトップレベルで呼び出し
  const sensor = useSensor(Sensor, activationOptions);

  // useSensorsをトップレベルで呼び出し
  const sensors = useSensors(sensor);

  return {
    sensors,
  };
};

export default useTabletSensor;
