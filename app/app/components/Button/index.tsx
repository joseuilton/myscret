import { twMerge } from "tailwind-merge";
import { Slot, type AsChildProps } from "./Slot"

type ButtonProps = AsChildProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> & {
  style?: React.CSSProperties;
  className?: string;
  variant?: "primary" | "light";
  size?: "regular" | "small";
  roundedStyle?: "regular" | "pill";
}


type VariantMapKeys = "primary" | "light";
const buttonVariantMap = new Map<VariantMapKeys, string>([
  ["primary", "bg-primary-500 text-white disabled:bg-primary-200 disabled:text-primary-300"],
  ["light", "bg-white text-secondary-100"]
]);

type SizeMapKeys = "regular" | "small";
const buttonSizeMap = new Map<SizeMapKeys, string>([
  ["regular", "p-4 text-base"],
  ["small", "p-3 text-xs"]
])

type RoundedStyleMapKeys = "regular" | "pill";
const buttonRoundedStyleMap = new Map<RoundedStyleMapKeys, string>([
  ["regular", "rounded-xl"],
  ["pill", "rounded-full"]
]);

export function Button(
    { 
      asChild, 
      variant = "primary", 
      size = "regular", 
      roundedStyle = "regular", 
      className,
      ...props 
    }: ButtonProps
  ) {
  const buttonClassName = twMerge(
    "w-full flex justify-center items-center gap-1.5 font-semibold disabled:cursos-not-allowed",
    buttonVariantMap.get(variant),
    buttonSizeMap.get(size),
    buttonRoundedStyleMap.get(roundedStyle),
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