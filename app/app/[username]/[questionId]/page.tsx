"use client";
import { useEffect, useState } from "react";
import HeaderVisitor from "../../components/HeaderVisitor";
import { FormAnswer } from "./FormAnswer";
import api from "@/app/lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FormIdentify } from "./FormIdentify";
import { CongratulationsMessage } from "./CongratulationsMessage";

interface CreateAnswerForQuestionProps {
  params: {
    questionId: string;
  }
}

type Question = {
  text: string;
  pictureUrl: string;
}

export default function CreateAnswerForQuestion({ params }: CreateAnswerForQuestionProps) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");
  const [username, setUsername] = useState("");
  const [step, setStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/questions/${params.questionId}`);
        if (response.status === 200) {
          setQuestion({
            text: response.data.question.question,
            pictureUrl: response.data.question.user.pictureUrl
          })
        }
      } catch (err) {
        console.log(err);
        toast.error("Erro ao buscar pergunta");
        router.push("/dash");
      }
    }
    fetchData();
  }, []);

  async function handleNextStep() {
    if (step === 2) return;

    if (step === 1) {
      try {
        await api.post(`/questions/${params.questionId}/answers`, {
          answer,
          username: username ?? null
        });
      } catch (err) {
        toast.error("Erro ao enviar a resposta, por favor tente novamente mais tarde.");
      }
    }

    setStep((previous) => {
      return previous + 1;
    })
  }

  function handleChangeAnswer(data: string) {
    setAnswer(data);
  }

  function handleChangeUsername(data: string) {
    setUsername(data);
  }

  return (
    <>
      <HeaderVisitor />
      <main className="max-w-screen-sm mx-auto px-7">
        { step === 0 && (question && <FormAnswer
            question={question}
            answer={answer}
            onChangeAnswer={handleChangeAnswer}
            onNextStep={handleNextStep}
        />) }
        { step === 1 && <FormIdentify
            username={username}
            onChangeUsername={handleChangeUsername}
            onNextStep={handleNextStep}
        /> }
        { step === 2 && <CongratulationsMessage /> }
      </main>
    </>
  )
}