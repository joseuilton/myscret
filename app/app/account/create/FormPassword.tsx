import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { ZodError, z } from "zod";

interface FormPasswordProps {
  password: string;
  onChangePassword: (data: string) => void;
  onNextStep: () => void;
}

const formPasswordSchema = z.string().min(6, "A senha deve ter pelo menos 6 caracteres");

export function FormPassword({ password, onChangePassword, onNextStep }: FormPasswordProps) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const result = formPasswordSchema.safeParse(password);

    if(!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    onNextStep();
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        type="password"
        placeholder="Informe uma senha"
        value={password}
        onChange={(e) => onChangePassword(e.target.value)}
      />
      <Button type="submit" className="uppercase" disabled={password.length === 0}>
        Continuar
      </Button>
    </form>
  )
}