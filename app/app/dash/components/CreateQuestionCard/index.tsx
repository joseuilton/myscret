import { HeaderQuestionCard } from "@/app/components/HeaderQuestionCard";

interface CreateQuestionCardProps {
  imageUrl: string;
  question: string;
}

export function CreateQuestionCard({ imageUrl, question }: CreateQuestionCardProps) {
  return (
    <div className="rounded-3xl bg-white">
      <HeaderQuestionCard imageUrl="/avatar2.png" />
      <div className="pt-4 pb-8 px-4 text-sm text-center text-secondary-600 font-semibold">
        <p>Envie-me uma mensagem anônima!</p>
      </div>
    </div>
  )
}