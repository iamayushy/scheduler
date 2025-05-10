import React from "react";
import type { ReactNode } from "react";

type ButtonVariant = 
  | "default" 
  | "destructive" 
  | "outline" 
  | "secondary" 
  | "ghost" 
  | "link";

type ButtonSize = 
  | "default" 
  | "sm" 
  | "lg" 
  | "icon";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "default",
  size = "default",
  disabled = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variantStyles: Record<ButtonVariant, string> = {
    default: "bg-primary text-white hover:bg-primary/90",
    destructive: "bg-red-500 text-white hover:bg-red-500/90",
    outline: "border border-input bg-transparent hover:bg-slate-100 hover:text-slate-900",
    secondary: "bg-slate-200 text-slate-900 hover:bg-slate-200/80",
    ghost: "hover:bg-slate-100 hover:text-slate-900",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10 p-0",
  };

  const buttonClasses = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  ].join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
