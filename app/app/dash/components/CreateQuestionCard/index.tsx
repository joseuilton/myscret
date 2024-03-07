import { Avatar } from "@/app/components/Avatar";

interface CreateQuestionCardProps {
  imageUrl: string;
  question: string;
}

export function CreateQuestionCard({ imageUrl, question }: CreateQuestionCardProps) {
  return (
    <div className="rounded-3xl bg-white">
      <div className="flex items-center justify-center bg-primary-500 rounded-t-3xl max-h-8 relative">
        <div className="-top-4 relative">
          <Avatar size="small" borderColor="primary" imageUrl={imageUrl} alt="Avatar do seu perfil" />
        </div>
      </div>
      <div className="pt-4 pb-8 px-4 text-sm text-center text-secondary-600 font-semibold">
        <p>Envie-me uma mensagem anônima!</p>
      </div>
    </div>
  )
}