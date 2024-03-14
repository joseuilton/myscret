import { FaCheck } from "react-icons/fa6";

export function CongratulationsMessage() {
  return (
    <div>
      <h1 className="mb-14 text-secondary-600 text-center font-semibold">
        Mandou bem!
      </h1>

      <div className="flex justify-center mb-2.5 text-center text-primary-500">
        <FaCheck size={24} />
      </div>
      <h2 className="text-secondary-500 text-center font-semibold">
        Sua mensagem foi enviada
      </h2>
    </div>
  )
}