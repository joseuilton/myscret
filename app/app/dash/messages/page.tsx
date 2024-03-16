"use client";
import { useEffect, useState } from "react";
import { MessageItem } from "./components/MessageItem";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "react-toastify";
import api from "@/app/lib/axios";
import Link from "next/link";

type Message = {
  answerId: string;
  viewedByQuestionOwner: boolean;
  pictureUrl: string | null;
}

export default function DashMessagesPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      try {
        const response = await api.get("/questions/answers");

        if (response.status === 200) {
          const answersData = response.data.answers
          setMessages(answersData.map((answer: any) => ({
            answerId: answer.answerId,
            viewedByQuestionOwner: answer.viewedByQuestionOwner,
            pictureUrl: answer?.user ? answer.user.pictureUrl : null,
          })));
        }
      } catch (err) {
        toast.error("Erro ao buscar mensagens");
        return;
      }
    }

    fetchData();
  }, [user]);

  return (
    <main className="max-w-screen-sm mx-auto flex flex-col gap-5 justify-center px-7 mt-8">
      <h1 className="text-center font-semibold text-secondary-100">
        sua caixa de entrada
      </h1>

      <ul className="grid grid-cols-4 gap-6">
        {messages.map((message) => (
          <li key={message.answerId}>
            <Link href={`/dash/messages/${message.answerId}`}>
              <MessageItem
                readStatus={message.viewedByQuestionOwner}
                pictureUrl={message.pictureUrl}
              />
            </Link>

          </li>
        ))}
      </ul>
    </main>
  )
}