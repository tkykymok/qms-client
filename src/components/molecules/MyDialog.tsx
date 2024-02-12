import React, { FC, Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@/components/atoms/Button";
import { Typography } from "@/components/molecules/Typography";

interface MyDialogProps {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "5xl";
  onClose: () => void;
  onOk?: () => void;
  okText?: string;
  onCancel?: () => void;
  cancelText?: string;
  customFooter?: ReactNode;
}

const MyDialog: FC<MyDialogProps> = ({
  isOpen,
  title = "",
  children,
  size = "md",
  onClose,
  onOk,
  okText = "OK",
  onCancel,
  cancelText = "Cancel",
  customFooter = null,
}) => {
  const getDialogSize = () => {
    switch (size) {
      case "sm":
        return "max-w-sm";
      case "md":
        return "max-w-md";
      case "lg":
        return "max-w-lg";
      case "xl":
        return "max-w-xl";
      case "2xl":
        return "max-w-2xl";
      case "5xl":
        return "max-w-5xl";
      default:
        return "max-w-md";
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 select-none" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`${getDialogSize()} w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
              >
                <Dialog.Title>
                  <Typography variant="h6" className="text-neutral-600">
                    {title}
                  </Typography>
                </Dialog.Title>
                <hr className="my-2" />
                <div className="mt-2">{children}</div>
                <hr className="my-2" />
                <div className="mt-4 flex space-x-5 justify-end">
                  {customFooter ? (
                    // customFooterがある場合はそれを表示
                    <>{customFooter}</>
                  ) : (
                    // customFooterがない場合はOKとCancelボタンを表示
                    <>
                      {onCancel && (
                        <div>
                          <Button variant={"light"} onClick={onClose}>
                            {cancelText}
                          </Button>
                        </div>
                      )}

                      {onOk && (
                        <div>
                          <Button variant={"primary"} onClick={onOk}>
                            {okText}
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MyDialog;
