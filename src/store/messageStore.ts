import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Message } from "@/types/model/message";

interface MessageState {
  messages: Message[]; // メッセージの配列
  setMessages: (messages: Message[]) => void; // メッセージをセットする関数
  clearMessage: (id: string) => void; // 指定したidのメッセージをクリアする関数
}

const useMessageStore = create(
  devtools<MessageState>((set) => ({
    messages: [],
    setMessages: (messages) => set({ messages }),
    clearMessage: (id: string) =>
      set((prev) => ({
        ...prev,
        messages: prev.messages.filter((m) => m.id !== id),
      })),
  })),
);

export default useMessageStore;
