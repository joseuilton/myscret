"use client";
import { AnswerCard } from "@/app/components/AnswerCard";
import { useAuth } from "@/app/contexts/AuthContext";
import api from "@/app/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Answer = {
  answerId: string;
  answer: string;
  question: string;
}

export default function AnswersPage() {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      try {
        const response = await api.get("/users/answers");
        const answersData = response.data.answers;
        setAnswers(answersData.map((answer: any) => ({
          answerId: answer.answerId,
          answer: answer.answer,
          question: answer.question,
        })));
      } catch (err) {
        console.log(err);
        toast.error("Erro ao buscar respostas");
        return;
      }
    }
    fetchData();
  }, [user]);

  return (
    <main className="container flex flex-col gap-5 justify-center px-7 mt-8">
      <h1 className="text-center text-base text-secondary-100 font-semibold">
        suas respostas enviadas
      </h1>

      <ul className="flex flex-col gap-24 mt-8">
        {answers.map((answer) => (
          <li key={answer.answerId}>
            <AnswerCard
              profile={user!}
              profilePosition="bottom"
              question={answer.question}
              answer={answer.answer}
            />
          </li>
        ))}
      </ul>
    </main>
  )
}