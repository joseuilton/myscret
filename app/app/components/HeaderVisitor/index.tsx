import Image from "next/image";

export default function HeaderVisitor() {
  return (
    <header className="flex justify-center items-center pt-20 pb-9">
      <Image
        src={"/logo-navigator.png"}
        alt="Logo MySecret"
        width={147}
        height={49}
      />
    </header>
  )
}