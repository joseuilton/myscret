"use client";
import { AnswerCard } from "@/app/components/AnswerCard";
import { useAuth } from "@/app/contexts/AuthContext";
import api from "@/app/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Message = {
  answer: string;
  question: string;
  user: {
    name: string;
    username: string;
    pictureUrl: string;
  } | null;
}

interface DashMessagePageProps {
  params: {
    answerId: string;
  }
}

export default function DashMessagePage({ params }: DashMessagePageProps) {
  const { user } = useAuth();
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!user) return;
        console.log(params.answerId);
        const response = await api.get(`/answers/${params.answerId}`);

        if (response.status === 200) {
          const messageData = {
            answer: response.data.answer.answer,
            question: response.data.question.question,
            user: response.data.user ? {
              name: response.data.user.name,
              username: response.data.user.username,
              pictureUrl: response.data.user.pictureUrl,
            } : null
          }
          setMessage(messageData);
        }
      } catch (err) {
        toast.error("Erro ao buscar mensagem");
        return;
      }
    }

    fetchData();
  }, [user]);

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

      {message && (
        <AnswerCard
          profile={message.user}
          profilePosition="top"
          question={message.question}
          answer={message.answer}
        />
      )}


    </main>
  )
}