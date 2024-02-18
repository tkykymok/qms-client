"use client";

import React, { FC, useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsInfoCircleFill } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import { ERROR, INFO, SUCCESS, WARNING } from "@/types/constant/messageType";
import CloseButton from "@/components/atoms/CloseButton";
import { Message } from "@/types/model/message";

interface ToastProps {
  message: Message;
  closeMessage: (message: Message) => void;
}

const Toast: FC<ToastProps> = ({ message, closeMessage }) => {
  const [renderStarted, setRenderStarted] = useState(false);

  // コンポーネントがマウントされたときにrenderStartedをtrueに変更します。
  useEffect(() => {
    setTimeout(() => {
      setRenderStarted(true);
    }, 100);
  }, []);

  // メッセージをクローズする処理
  const handleClose = () => {
    setRenderStarted(false);
    setTimeout(() => closeMessage(message), 500); // 500ms はアニメーションの duration と一致させる
  };

  // メッセージの種類に応じたアラートのカラーを定義するマップ
  const toastColor = () => {
    switch (message.type) {
      case SUCCESS:
        return "bg-green-100 text-green-500";
      case INFO:
        return "bg-blue-100 text-blue-500";
      case WARNING:
        return "bg-yellow-100 text-yellow-500";
      case ERROR:
        return "bg-red-100 text-red-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  // メッセージの種類に応じたアイコンを表示する
  const MessageIcon = () => (
    <>
      {message.type === SUCCESS && (
        <AiFillCheckCircle color="green" size={20} />
      )}
      {message.type === INFO && <BsInfoCircleFill color="blue" size={20} />}
      {message.type === WARNING && (
        <RiErrorWarningFill color="orange" size={20} />
      )}
      {message.type === ERROR && <RiErrorWarningFill color="red" size={20} />}
    </>
  );

  return (
    <div
      className={`
        justify-center
        flex
        items-center
        max-w-xl
        px-2
        py-4
        mb-2
        rounded-lg
        shadow-lg
        ${renderStarted ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        transition-all
        ease-in-out
        duration-500
        ${toastColor()}
      `}
      onClick={() => handleClose()}
    >
      <div
        className="
          inline-flex
          items-center
          flex-shrink-0
          w-8
          h-8
          rounded-lg
        "
      >
        <MessageIcon />
      </div>
      <div className="text-sm font-normal">{message.text}</div>
      <CloseButton handleOnClick={() => handleClose()} />
    </div>
  );
};

export default Toast;
