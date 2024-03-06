import { AnswerCard } from "@/app/components/AnswerCard";
import Link from "next/link";

export default function DashMessagePage() {
  const profile = {
    imageUrl: "/avatar2.png",
    name: "José Uilton",
    username: "uilton"
  }

  return (
    <main className="container flex flex-col gap-5 justify-center px-7 mt-8">
      <h1 className="text-center font-semibold text-secondary-100">
        sua caixa de entrada
      </h1>

      <Link 
        className="py-4 mb-16 uppercase text-lg text-center text-secondary-100 font-semibold" 
        href={"/dash/messages"}
      >
        Voltar
      </Link>

      <AnswerCard 
        profile={profile} 
        profilePosition="top" 
        question="Manda a boa" 
        answer="Você é muito é besta" 
      />
    </main>
  )
}