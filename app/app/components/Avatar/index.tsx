import Image from "next/image";

interface AvatarProps {
  imageUrl: string;
  alt: string;
}

export function Avatar({ imageUrl, alt }: AvatarProps) {
  return (
    <div className="w-16 h-16 rounded-full border-4 border-solid border-white relative">
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