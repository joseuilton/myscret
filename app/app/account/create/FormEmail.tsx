import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";

export function FormEmail() {
  return (
    <form className="flex flex-col gap-4">
      <Input type="email" placeholder="Informe um e-mail" />
      <Button type="submit" className="uppercase" disabled>Continuar</Button>
    </form>
  )
}