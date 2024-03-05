import { twMerge } from "tailwind-merge";
import { Slot, type AsChildProps } from "./Slot"

type ButtonProps = AsChildProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> & {
  style?: React.CSSProperties;
  className?: string;
  variant?: "primary" | "light";
  size?: "regular" | "small";
}


type VariantMapKeys = "primary" | "light";
const buttonVariantMap = new Map<VariantMapKeys, string>([
  ["primary", "bg-primary-500 text-white disabled:bg-primary-200 disabled:text-primary-300"],
  ["light", "bg-white text-secondary-100"]
]);

type SizeMapKeys = "regular" | "small";
const buttonSizeMap = new Map<SizeMapKeys, string>([
  ["regular", "p-4 text-base rounded-xl"],
  ["small", "p-3 text-xs rounded-xl"]
])

export function Button(
    { asChild, variant = "primary", size = "regular", className, ...props }: ButtonProps
  ) {
  const buttonClassName = twMerge(
    "w-full flex justify-center items-center font-semibold",
    buttonVariantMap.get(variant),
    buttonSizeMap.get(size),
    className
  )

  return (asChild ? (
    <Slot className={buttonClassName} {...props} />
  ) : (
    <>
      <button
        className={buttonClassName}
        {...props}
      />
    </>
  ))
}