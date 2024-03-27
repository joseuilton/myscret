import { useEffect, useState } from "react"
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ImSpinner8 } from "react-icons/im";

interface FormIdentifyProps {
  username: string;
  isSubmitLoading: boolean;
  onChangeUsername: (data: string) => void;
  onNextStep: () => void;
}

export function FormIdentify(
  { username, isSubmitLoading, onChangeUsername, onNextStep }: FormIdentifyProps
) {
  const [isIdentified, setIsIdentified] = useState(false);

  useEffect(() => {
    onChangeUsername("");
  }, [isIdentified])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onNextStep();
  }

  return (
    <div>
      <h1 className="mb-14 text-secondary-600 text-center font-semibold">
        Você quer se identificar?
      </h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div
          className="flex items-center gap-2.5 p-5 bg-white text-secondary-500 rounded-3xl shadow-sm"
        >
          <input
            className="appearance-none w-6 h-6 border-2 border-secondary-100 rounded-lg
                         checked:bg-primary-500 checked:border-primary-500"
            type="checkbox"
            name="isIdentified"
            id="isIdentified"
            checked={isIdentified}
            onChange={(e) => setIsIdentified(e.target.checked)}
          />
          <label htmlFor="isIdentified">sim, quero me identificar</label>
        </div>

        {isIdentified && (
          <div>
            <Input
              roundedStyle="large"
              name="username"
              id="username"
              placeholder="informe_seu_usuario"
              value={username}
              onChange={(e) => onChangeUsername(e.target.value)}
            />
          </div>
        )}


        <Button
          type="submit"
          disabled={(isIdentified && username.length === 0) || isSubmitLoading}
        >
          {isSubmitLoading && <ImSpinner8 className="animate-spin" size={24} />}
          Enviar
        </Button>
      </form>
    </div>
  )
}