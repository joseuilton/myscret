import { Avatar } from "@/app/components/Avatar";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { FiRefreshCcw } from "react-icons/fi";

export function FormProfile() {
  return (
    <form className="flex flex-col gap-4">
      <Input type="name" placeholder="Informe seu nome" />
      <Input type="name" placeholder="@nomedousuario" />

      <fieldset className="p-4 border border-solid border-secondary-400 rounded-xl">
        <p className="mb-2.5 text-base text-secondary-500">Escolha um avatar</p>

        <div className="flex items-center gap-6">
          <Avatar imageUrl="/avatar2.png" alt="Avatar aleatório" />
          <Avatar imageUrl="/avatar4.png" alt="Avatar aleatório" />
          <Avatar imageUrl="/avatar7.png" alt="Avatar aleatório" />
          <button type="button" className="text-secondary-500">
            <FiRefreshCcw size={24} />
          </button>
        </div>
      </fieldset>

      <Button className="uppercase" type="submit" disabled>
        Cadastrar
      </Button>
    </form>
  )
}