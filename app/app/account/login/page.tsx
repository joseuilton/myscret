import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="container mx-auto px-6">
      <form className="flex flex-col gap-4 ">
        <Input type="email" placeholder="Informe um e-mail" />
        <Input type="password" placeholder="Informe sua password" />
        <Button className="uppercase" type="submit" disabled>Acessar minha conta</Button>
      </form>

      <Link
        className="block mt-8 p-4 uppercase text-center text-secondary-500 font-semibold"
        href="/account"
      >
        Voltar
      </Link>
    </main>
  )
}