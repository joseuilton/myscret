import React, { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  roundedStyle?: "regular" | "large";
}

export const Input: FC<InputProps> = ({ roundedStyle = "regular", ...props }) => {
  const roundedStyleClasses = roundedStyle === "regular"
    ? "p-4 rounded-xl"
    : "p-5 border-transparent rounded-3xl shadow-sm"

  return (
    <input
      className={`w-full border border-solid border-secondary-400 bg-white text-base 
                placeholder:text-secondary-100 ${roundedStyleClasses} 
                focus:outline-none focus:ring-2 focus:ring-primary-500`}
      {...props}
    />
  )
}