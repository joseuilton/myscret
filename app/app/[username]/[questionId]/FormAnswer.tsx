import { Avatar } from "../../components/Avatar";
import { Button } from "../../components/Button";

export function FormAnswer() {
  return (
    <div>
      <h1 className="mb-14 text-secondary-600 text-center font-semibold">
        o que você quer dizer
      </h1>
      <form>
        <div className="bg-white rounded-3xl shadow-sm">
          <div className="pt-8 pb-5 px-4 bg-primary-500 rounded-t-3xl relative">
            <div className="bottom-10 left-[calc(50%-32px)] absolute">
              <Avatar imageUrl="/avatar2.png" alt="Avatar" borderColor="primary" />
            </div>
            <h2 className="text-center text-sm font-semibold text-white">
              Envie-me uma mensagem anônima!
            </h2>
          </div>

          <div className="p-5">
            <textarea
              className="w-full focus:outline-none resize-none placeholder:text-secondary-500"
              name="answer"
              id="answer"
              rows={5}
              placeholder="Escreva aqui sua mensagem anônima..."
            >
            </textarea>
          </div>

        </div>

        <Button className="mt-5 uppercase" disabled>
          Continuar
        </Button>
      </form>
    </div>
  )
}