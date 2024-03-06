import { AnswerCard } from "@/app/components/AnswerCard";

export default function AnswersPage() {
  const profile = {
    imageUrl: "/avatar2.png",
    name: "José Uilton",
    username: "uilton"
  }

  return (
    <main className="container flex flex-col gap-5 justify-center px-7 mt-8">
      <h1 className="text-center text-base text-secondary-100 font-semibold">
        suas respostas enviadas
      </h1>

      <ul className="flex flex-col gap-24 mt-8">
        <li>
          <AnswerCard
            profile={profile}
            profilePosition="bottom"
            question="Manda a boa"
            answer="Você é muito é besta kkkkkkkkkkkk"
          />
        </li>
      </ul>
    </main>
  )
}