import { Avatar } from "../Avatar";

interface HeaderQuestionCard {
  imageUrl: string;
}

export function HeaderQuestionCard({ imageUrl }: HeaderQuestionCard) {
  return (
    <div className="flex items-center justify-center bg-primary-500 rounded-t-3xl max-h-8 relative">
      <div className="-top-4 relative">
        <Avatar size="small" borderColor="primary" imageUrl={imageUrl} alt="Avatar do seu perfil" />
      </div>
    </div>
  )
}