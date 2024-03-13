import { toast } from "react-toastify";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { FormEvent } from "react";
import { z } from "zod";

interface FormEmailProps {
  email: string;
  onChangeEmail: (data: string) => void;
  onNextStep: () => void;
}

const formEmailSchema = z.string().email();

export function FormEmail({ email, onChangeEmail, onNextStep }: FormEmailProps) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      formEmailSchema.parse(email);
    } catch (err) {
      toast.error("Email inválido!");
      return;
    }

    onNextStep();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <Input
        type="email"
        placeholder="Informe um e-mail"
        value={email}
        onChange={(e) => onChangeEmail(e.target.value)}
      />
      <Button type="submit" className="uppercase" disabled={email.length === 0}>Continuar</Button>
    </form>
  )
}