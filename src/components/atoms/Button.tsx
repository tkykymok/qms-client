import React, { FC, ReactNode } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "success"
  | "info"
  | "light"
  | "dark"
  | "link";

interface ButtonProps {
  variant?: Variant;
  children: ReactNode;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  children,
  onClick,
}) => {
  // variantに基づいてボタンのスタイルを切り替える関数
  const getButtonClasses = (variant: Variant) => {
    const baseClasses = `
      inline-flex justify-center rounded-md border border-transparent
      px-4 py-2 text-lg font-medium focus:outline-none focus-visible:ring-2
      focus-visible:ring-offset-2 select-none`;

    const variantClasses = {
      primary:
        "bg-blue-500 hover:bg-blue-600 text-white focus-visible:ring-blue-500",
      secondary: "bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500",
      danger:
        "bg-red-500 hover:bg-red-600 text-white focus-visible:ring-red-500",
      warning:
        "bg-yellow-500 hover:bg-yellow-600 text-black focus-visible:ring-yellow-500",
      success:
        "bg-green-500 hover:bg-green-600 text-white focus-visible:ring-green-500",
      info: "bg-blue-100 hover:bg-blue-200 text-blue-800 focus-visible:ring-blue-500",
      light:
        "bg-gray-100 hover:bg-gray-200 text-gray-800 focus-visible:ring-gray-500",
      dark: "bg-gray-800 hover:bg-gray-900 text-white focus-visible:ring-gray-500",
      link: "bg-transparent hover:bg-blue-100 text-blue-500 focus-visible:ring-blue-500 underline",
    };

    return `${baseClasses} ${variantClasses[variant]}`;
  };

  return (
    <button
      tabIndex={-1}
      type="button"
      className={getButtonClasses(variant)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
