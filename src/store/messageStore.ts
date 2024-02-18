import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Message } from "@/types/model/message";
import { ERROR, INFO, SUCCESS, WARNING } from "@/types/constant/messageType";

interface MessageState {
  messages: Message[]; // メッセージの配列
  setMessages: (messages: Message[]) => void; // メッセージをセットする関数
  clearMessage: (id: string) => void; // 指定したidのメッセージをクリアする関数
}

const useMessageStore = create(
  devtools<MessageState>((set) => ({
    messages: [
      { id: "1", type: ERROR, text: "ERRORメッセージ" },
      { id: "2", type: INFO, text: "INFOメッセージ" },
      { id: "3", type: SUCCESS, text: "SUCCESSメッセージ" },
      { id: "4", type: WARNING, text: "WARNINGメッセージ" },
    ],
    setMessages: (messages) => set({ messages }),
    clearMessage: (id: string) =>
      set((prev) => ({
        ...prev,
        messages: prev.messages.filter((m) => m.id !== id),
      })),
  })),
);

export default useMessageStore;
