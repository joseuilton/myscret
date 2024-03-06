import { FiCopy } from "react-icons/fi";

import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { HeaderQuestionCard } from "../components/HeaderQuestionCard";
import { CreateQuestionCard } from "./components/CreateQuestionCard";

export default function DashPage() {
  return (
    <main className="container flex flex-col gap-5 justify-center px-7 mt-8">
      <h1 className="text-base text-center font-semibold text-secondary-100">
        O que você quer (ou não) saber
      </h1>

      <div>
        <h2 className="mb-11 text-sm text-center font-semibold text-secondary-500">
          Escolha uma pergunta
        </h2>

        <CreateQuestionCard
          imageUrl="/avatar2.png"
          question="Envie-me uma mensagem anônima!" 
        />

        <div className="mt-4 mb-5 flex justify-center items-center gap-2.5">
          <div className="w-6 h-2.5 bg-primary-500 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-primary-200 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-primary-200 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-primary-200 rounded-full"></div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h2 className="text-sm font-semibold text-secondary-500">
          toque para gerar o link e copiar
        </h2>
        <p className="text-sm text-secondary-500">https://myscret.app/odanieldcs</p>
        <Button className="w-auto">
          <FiCopy size={16} />
          copiar link
        </Button>
      </div>

    </main>
  )
}