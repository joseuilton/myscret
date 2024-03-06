import Image from "next/image";

interface AvatarProps {
  imageUrl: string;
  alt: string;
  size?: "regular" | "small";
  borderColor?: "regular" | "primary";
}

export function Avatar({ imageUrl, alt, size = "regular", borderColor = "regular" }: AvatarProps) {
  const sizeClass = size === "regular" ? "w-16 h-16 border-4" : "w-[52px] h-[52px] border-2";
  const borderColorClass = borderColor === "regular" ? "border-white" : "border-primary-500";

  return (
    <div 
      className={`rounded-full border-solid ${sizeClass} ${borderColorClass} relative`}
    >
      <Image
        src={imageUrl}
        alt={alt}
        fill
        style={{
          objectFit: "cover"
        }}
      />
    </div>
  )
}