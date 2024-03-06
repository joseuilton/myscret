import Image from "next/image";
import { FiFileText, FiMail } from "react-icons/fi";

interface MessageItemProps {
  readStatus: boolean;
  imageUrl?: string | null;
}

export function MessageItem({ readStatus, imageUrl = null }: MessageItemProps) {
  const containerReadStatusClass = readStatus
    ? "bg-white"
    : "bg-gradient-to-br from-white to-secondary-400";

  return (
    <div
      className={`flex items-center justify-center w-16 h-16 border-2 border-solid border-white
                 rounded-full shadow relative ${containerReadStatusClass}`}
    >
      <div className="text-secondary-500">
        {imageUrl ? (
          <>
            <Image
              className={`${!readStatus && "blur-[2px]"}`}
              src={imageUrl}
              alt="Avatar"
              fill
              style={{
                objectFit: "cover"
              }}
            />
            {!readStatus && (
              <div
                className="flex justify-center items-center w-[60px] h-[60px] 
                         bg-[rgba(255,204,222,0.6)] text-white absolute top-0 left-0 z-10     
                           rounded-full"
              >
                <FiMail size={24} />
              </div>
            )}
          </>

        ) : (
          readStatus == true ? <FiFileText size={24} /> : <FiMail size={24} />
        )}


      </div>
    </div>
  )
}