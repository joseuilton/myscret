import Link from "next/link";
import { FormEmail } from "./FormEmail";

export default function AccountCreatePage() {
  return (
    <main className="container mx-auto px-6">
      <FormEmail />

      <div className="my-8 flex justify-center items-center gap-2.5">
        <div className="w-6 h-2.5 bg-primary-500 rounded-full"></div>
        <div className="w-2.5 h-2.5 bg-primary-200 rounded-full"></div>
        <div className="w-2.5 h-2.5 bg-primary-200 rounded-full"></div>
      </div>

      <Link
        className="block p-4 uppercase text-center text-secondary-500 font-semibold"
        href="/account"
      >
        Voltar
      </Link>
    </main>
  )
}