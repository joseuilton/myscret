import { useState } from "react"
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function FormIdentify() {
  const [isIdentified, setIsIdentified] = useState(false);

  return (
    <div>
      <h1 className="mb-14 text-secondary-600 text-center font-semibold">
        Você quer se identificar?
      </h1>

      <form className="flex flex-col gap-5">
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
              placeholder="@informe_seu_usuario"
            />
          </div>
        )}


        <Button type="submit" disabled>Enviar</Button>
      </form>
    </div>
  )
}