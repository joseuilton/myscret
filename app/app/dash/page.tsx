"use client";
import { FiCopy } from "react-icons/fi";
import Slider from "react-slick";

import { Button } from "../components/Button";
import { CreateQuestionCard } from "./components/CreateQuestionCard";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import api from "../lib/axios";
import { toast } from "react-toastify";

const questions = [
  "Envie-me uma mensagem anônima!",
  "Me envie confissões anônimas!",
  "Me descreva em 3 palavras anônimamente!",
  "Advinhe minha viagem preferida, anonimamente!"
];

export default function DashPage() {
  const { user } = useAuth();
  const [activeSlideQuestion, setActiveSlideQuestion] = useState(0);
  const [questionLink, setQuestionLink] = useState<string | null>(null);

  async function handleGenerateLink() {
    const question = questions[activeSlideQuestion];
    try {
      const response = await api.post("/questions", {
        question
      });

      if (response.status === 201) {
        const questionId = response.data.question.questionId;
        const link = `http://${window.location.hostname}/${user?.username}/${questionId}`;
        setQuestionLink(link);
        navigator.clipboard.writeText(link);
        toast.success(
          "Link copiado para a sua área de transferência!",
          { position: "bottom-center" }
        );
      }
    } catch (err) {
      toast.error("Ocorreu um erro ao gerar o link, tente novamente mais tarde");
    }

  }

  return (
    <main className="container flex flex-col gap-5 justify-center px-7 mt-8">
      <h1 className="text-base text-center font-semibold text-secondary-100">
        O que você quer (ou não) saber
      </h1>

      <div>
        <h2 className="mb-5 text-sm text-center font-semibold text-secondary-500">
          Escolha uma pergunta
        </h2>

        <Slider
          customPaging={(i) => (
            <a className="inline-block w-2.5 bg-primary-200 h-2.5 rounded-full transition-all"></a>
          )}
          beforeChange={(current, next) => setActiveSlideQuestion(next)}
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          arrows={false}
        >
          {questions.map((question, index) => (
            <div className="pt-8 px-4" key={index}>
              <CreateQuestionCard
                imageUrl={user?.pictureUrl!}
                question={question}
              />
            </div>
          ))}
        </Slider>

      </div>

      <div className="mt-5 flex flex-col items-center gap-4">
        <h2 className="text-sm font-semibold text-secondary-500">
          toque para gerar o link e copiar
        </h2>
        <p className="text-sm text-center text-secondary-500">
          {questionLink ? questionLink : "..."}
        </p>
        <Button className="w-auto" onClick={handleGenerateLink}>
          <FiCopy size={16} />
          Gerar Link e copiar
        </Button>
      </div>

    </main>
  )
}