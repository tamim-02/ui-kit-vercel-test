import React, { forwardRef } from "react";

export const variants = {
  default: {
    default:
      "border-3 border-primary rounded-lg hover:bg-secondary focus:outline-primary focus:outline-2 placeholder:text-primary-foreground",
    error:
      "border-3 border-red-500 rounded-lg hover:bg-red-100 opacity-75 focus:outline-red-500 focus:outline-2 placeholder:text-red-400",
    disabled:
      "border-3 border-gray-300 rounded-lg bg-muted text-muted-foreground cursor-not-allowed placeholder:text-muted-foreground",
  },
  ghost: {
    default:
      "rounded-lg hover:bg-secondary focus:outline-primary focus:outline-2 placeholder:text-primary-foreground",
    error:
      "rounded-lg hover:bg-red-100 opacity-75 focus:outline-red-500 focus:outline-2 placeholder:text-red-400",
    disabled:
      "rounded-lg bg-muted text-muted-foreground cursor-not-allowed placeholder:text-muted-foreground",
  },
  underlined: {
    default:
      "border-b-3 border-primary rounded-[2px] hover:bg-secondary focus:outline-0 placeholder:text-primary-foreground",
    error:
      "border-b-3 border-red-500 rounded-[2px] hover:bg-red-100 opacity-75 focus:outline-0 placeholder:text-red-400",
    disabled:
      "border-b-3 border-gray-300 rounded-[2px] bg-muted text-muted-foreground cursor-not-allowed placeholder:text-muted-foreground",
  },
};

export const sizes = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-3",
};

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  error?: boolean;
  errorMessage?: string;
  variant?: keyof typeof variants;
  inputSize?: keyof typeof sizes;
  fullWidth?: boolean;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "search"
    | "url"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week";
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className = "",
      label,
      icon,
      iconPosition = "left",
      error = false,
      errorMessage,
      disabled = false,
      variant = "default",
      inputSize = "md",
      fullWidth = false,
      type = "text",
      placeholder,
      id,
      ...props
    },
    ref
  ) => {
    const state = disabled ? "disabled" : error ? "error" : "default";
    const variantClass = variants[variant][state];
    const sizeClass = sizes[inputSize];

    const inputPadding =
      icon && iconPosition === "left"
        ? "pl-10"
        : icon && iconPosition === "right"
        ? "pr-10"
        : "";

    const inputClass = `
      ${variantClass}
      ${sizeClass}
      ${inputPadding}
      ${fullWidth ? "w-full" : ""}
      ${className}
    `;

    const labelClass = `
      mb-1.5 text-sm font-medium
      ${
        error
          ? "text-red-600"
          : disabled
          ? "text-muted-foreground"
          : "text-primary"
      }
    `;

    return (
      <div className={`flex flex-col gap-1 ${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label htmlFor={id} className={labelClass}>
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              {icon}
            </div>
          )}
          <input
            type={type}
            placeholder={placeholder}
            ref={ref}
            id={id}
            disabled={disabled}
            className={`transition-all active:scale-[0.98] duration-200 ${inputClass}`}
            {...props}
          />
          {icon && iconPosition === "right" && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {icon}
            </div>
          )}
        </div>
        {error && errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
