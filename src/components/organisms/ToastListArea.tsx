"use client";

import React, { FC, useCallback, useEffect, useState } from "react";
import useMessageStore from "@/store/messageStore";
import { Message } from "@/types/model/message";
import Toast from "@/components/molecules/Toast";

interface ToastListAreaProps {}

const ToastListArea: FC<ToastListAreaProps> = ({}) => {
  // ストアから必要な状態とメソッドを取得
  const { messages, clearMessage } = useMessageStore((state) => ({
    messages: state.messages,
    clearMessage: state.clearMessage,
  }));

  // 各メッセージのsetTimeout IDを保存するためのステート
  const [timerIds, setTimerIds] = useState<Map<string, NodeJS.Timeout>>(
    new Map(),
  );

  // メッセージがなくなった場合に対応するためのタイマーをクリアする
  useEffect(() => {
    return () => {
      // コンポーネントのアンマウント時にタイマーをクリア
      Object.values(timerIds).forEach(clearTimeout);
    };
  }, [timerIds]);

  // メッセージが表示されてから7秒後に自動でクローズするための処理
  useEffect(() => {
    const newTimerIds: Map<string, NodeJS.Timeout> = new Map();
    messages.forEach((message) => {
      if (timerIds.get(message.id)) {
        newTimerIds.set(message.id, timerIds.get(message.id)!);
      } else {
        const newTimerId = setTimeout(() => closeMessage(message), 7000);
        newTimerIds.set(message.id, newTimerId);
      }
    });

    setTimerIds(newTimerIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  /**
   * メッセージをクローズする処理
   */
  const closeMessage = useCallback(
    (message: Message) => {
      clearMessage(message.id); // ストアのメッセージをクリア
    },
    [clearMessage],
  );

  return (
    <div className="absolute right-0 p-3 z-50">
      {messages.map((message) => (
        <Toast key={message.id} message={message} closeMessage={closeMessage} />
      ))}
    </div>
  );
};

export default ToastListArea;
