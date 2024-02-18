import { MessageType } from "@/types/constant/messageType";

export type Message = {
  id: string;
  type: MessageType | null; // メッセージのタイプ（e.g., エラー, 情報, 警告など）
  text: string; // メッセージのテキスト内容
};
