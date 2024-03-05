import React, { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  roundedStyle?: "regular" | "pill";
}

export const Input: FC<InputProps> = ({ roundedStyle = "regular", ...props }) => {
  return (
    <input
      className="w-full p-4 border border-solid border-secondary-400 rounded-xl 
               bg-white text-base placeholder:text-secondary-100"
      {...props}
    />
  )
}