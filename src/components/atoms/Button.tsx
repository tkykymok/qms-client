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
  | "link"
  | "transparent";

interface ButtonProps {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "lg",
  children,
  onClick,
}) => {
  // variantに基づいてボタンのスタイルを切り替える関数
  const getButtonClasses = (variant: Variant) => {
    const baseClasses = `
      w-full h-full justify-center rounded-md shadow-md border border-transparent
      px-4 py-2 font-medium focus:outline-none focus-visible:ring-2
      focus-visible:ring-offset-2 select-none`;

    const sizeClasses = {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
    };

    const variantClasses = {
      primary:
        "bg-blue-500 hover:bg-blue-600 text-white focus-visible:ring-blue-500 border border-blue-200 hover:border-blue-300",
      secondary:
        "bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500 border border-gray-200 hover:border-gray-300",
      danger:
        "bg-red-500 hover:bg-red-600 text-white focus-visible:ring-red-500 border border-red-200 hover:border-red-300",
      warning:
        "bg-yellow-500 hover:bg-yellow-600 text-black focus-visible:ring-yellow-500 border border-yellow-200 hover:border-yellow-300",
      success:
        "bg-green-500 hover:bg-green-600 text-white focus-visible:ring-green-500 border border-green-200 hover:border-green-300",
      info: "bg-blue-100 hover:bg-blue-200 text-blue-800 focus-visible:ring-blue-500 border border-blue-200 hover:border-blue-300",
      light:
        "bg-gray-100 hover:bg-gray-200 text-gray-800 focus-visible:ring-gray-500 border border-gray-200 hover:border-gray-300",
      dark: "bg-gray-800 hover:bg-gray-900 text-white focus-visible:ring-gray-500 border border-gray-200 hover:border-gray-300",
      link: "bg-transparent hover:bg-blue-100 text-blue-500 focus-visible:ring-blue-500 underline",
      transparent:
        "bg-transparent hover:bg-gray-100 text-gray-800 focus-visible:ring-gray-500 border border-gray-200 hover:border-gray-300",
    };

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;
  };

  return (
    <button
      tabIndex={-1}
      type="button"
      className={getButtonClasses(variant)}
      // className="shadow-lg"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
