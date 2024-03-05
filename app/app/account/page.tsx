import Link from "next/link";
import { Button } from "../components/Button";

export default function AccountPage() {
  return (
    <main className="container mx-auto px-6">
      <h1 className="text-lg font-semibold text-center text-secondary-600">
        Perguntas e mensagens anônimas
      </h1>

      <h2 className="mt-16 text-lg font-semibold text-center text-secondary-600">
        Vamos começar?
      </h2>

      <div className="mt-8 flex flex-col gap-4">
        <Button className="uppercase" asChild>
          <Link href="/account/create">
            Criar conta
          </Link>
        </Button>

        <Button className="uppercase" asChild>
          <Link href="/account/login">
            Acessar minha conta
          </Link>
        </Button>
      </div>
    </main>
  )
}