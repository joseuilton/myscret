"use client";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { useAuth } from "@/app/contexts/AuthContext";
import api from "@/app/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.string().email("Email inválido!");

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const router = useRouter();
  const authContext = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const result = formSchema.safeParse(email);
    
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    if (!password) {
      toast.error("Por favor insira sua senha!");
      return;
    }

    setIsSubmitLoading(true);

    try {
      await authContext.Login({ email, password });
      toast.success("Login realizado com sucesso!");
      router.push("/dash");
      return;
    } catch (err: any) {
      toast.error(err.response.data.messageError);
    } finally {
      setIsSubmitLoading(false);
    }
  }

  return (
    <main className="max-w-screen-sm mx-auto px-6">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <Input
          type="email"
          placeholder="Informe um e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Informe sua password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="uppercase"
          type="submit"
          disabled={email.length === 0 || password.length === 0 || isSubmitLoading}
        >
          {isSubmitLoading && <ImSpinner8 className="animate-spin" size={24} />}
          Acessar minha conta
        </Button>
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