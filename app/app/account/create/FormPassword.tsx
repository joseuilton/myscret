import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";

export function FormPassword() {
  return (
    <form className="flex flex-col gap-4">
      <Input type="password" placeholder="Informe uma senha" />
      <Button type="submit" className="uppercase" disabled>Continuar</Button>
      <div
        className="p-2.5 bg-secondary-200 text-secondary-500 text-xs font-medium text-center
                     rounded-full"
      >
        a senha deve ter 6 caracteres
      </div>
    </form>
  )
}