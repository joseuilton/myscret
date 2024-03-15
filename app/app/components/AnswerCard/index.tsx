import { Avatar } from "../Avatar";

interface AnswerCardProps {
  profile: {
    pictureUrl: string;
    name: string;
    username: string;
  } | null;
  profilePosition: "top" | "bottom";
  question: string;
  answer: string;
}

export function AnswerCard({ profile, profilePosition, question, answer }: AnswerCardProps) {
  const profileHeaderClasses = profilePosition === "top"
    ? "bottom-[72px] left-2"
    : "flex-row-reverse top-[72px] right-2"

  return (
    <div className="pt-5 pb-4 px-4 bg-white rounded-xl shadow relative">
      <div className={`flex items-center gap-3 absolute ${profileHeaderClasses}`}>
        <Avatar
          imageUrl={profile?.pictureUrl ?? "/avatars/avatar-anonymous.png"}
          alt={profile?.name ?? "Usuário anônimo"}
        />
        <div className={profilePosition === "top" ? "-mt-2" : "mt-2"}>
          <h3 className="text-sm text-primary-500 font-semibold">
            {profile?.name ?? "Usuário anônimo"}
          </h3>
          <h4 className="text-xs text-secondary-500 font-semibold">
            @{profile?.username ?? "anônimo"}
          </h4>
        </div>
      </div>

      <h2 className="font-semibold text-sm text-primary-500">{question}</h2>
      <p className="mt-2.5 text-sm text-secondary-500">{answer}</p>
    </div>
  )
}