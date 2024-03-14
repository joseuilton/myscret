import { Avatar } from "../../components/Avatar";
import { Button } from "../../components/Button";

interface FormAnswerProps {
  question: {
    text: string;
    pictureUrl: string;
  };
  answer: string;
  onChangeAnswer: (data: string) => void;
  onNextStep: () => void;
}

export function FormAnswer({ question, onNextStep, answer, onChangeAnswer }: FormAnswerProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onNextStep();
  }

  return (
    <div>
      <h1 className="mb-14 text-secondary-600 text-center font-semibold">
        o que você quer dizer
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-3xl shadow-sm">
          <div className="pt-8 pb-5 px-4 bg-primary-500 rounded-t-3xl relative">
            <div className="bottom-10 left-[calc(50%-32px)] absolute">
              <Avatar imageUrl={question.pictureUrl} alt="Avatar" borderColor="primary" />
            </div>
            <h2 className="text-center text-sm font-semibold text-white">
              {question.text}
            </h2>
          </div>

          <div className="p-5">
            <textarea
              className="w-full focus:outline-none resize-none placeholder:text-secondary-500"
              name="answer"
              id="answer"
              rows={5}
              placeholder="Escreva aqui sua mensagem anônima..."
              value={answer}
              onChange={(e) => onChangeAnswer(e.target.value)}
            >
            </textarea>
          </div>

        </div>

        <Button
          className="mt-5 uppercase"
          disabled={answer.length === 0}
        >
          Continuar
        </Button>
      </form>
    </div>
  )
}