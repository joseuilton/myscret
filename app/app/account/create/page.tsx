"use client";
import Link from "next/link";
import { FormEmail } from "./FormEmail";
import { useState } from "react";
import { FormPassword } from "./FormPassword";
import { FormProfile } from "./FormProfile";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/app/lib/axios";

export default function AccountCreatePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  async function handleNextStep() {
    if (currentStep === 3) {
      try {
        const response = await api.post("/users", {
          name,
          username,
          pictureUrl: avatar,
          email,
          password
        });

        if (response.status !== 201) {
          toast.error(response.data.messageError);
          return;
        }

        toast.success("Conta criada com sucesso!");
        router.push("/account/login");
        return;
      } catch (err) {
        toast.error("Algo deu errado, por favor tente novamente mais tarde!");
      }
    }

    setCurrentStep((previous) => previous + 1);
  }

  function handlePreviousStep() {
    if (currentStep === 1) {
      router.replace("/account");
      return;
    }

    setCurrentStep((previous) => previous - 1);
  }

  function handleChangeEmail(data: string) {
    setEmail(data);
  }

  function handleChangePassword(data: string) {
    setPassword(data);
  }

  function handleChangeName(data: string) {
    setName(data);
  }

  function handleChangeUsername(data: string) {
    setUsername(data);
  }

  function handleChangeAvatar(data: string) {
    setAvatar(data);
  }

  return (
    <main className="container mx-auto px-6">
      {currentStep === 1 && (
        <FormEmail
          email={email}
          onChangeEmail={handleChangeEmail}
          onNextStep={handleNextStep}
        />
      )}
      {currentStep === 2 && (
        <FormPassword
          password={password}
          onChangePassword={handleChangePassword}
          onNextStep={handleNextStep}
        />
      )}
      {currentStep === 3 && (
        <FormProfile
          name={name}
          username={username}
          avatar={avatar}
          onChangeName={handleChangeName}
          onChangeUsername={handleChangeUsername}
          onChangeAvatar={handleChangeAvatar}
          onNextStep={handleNextStep}
        />
      )}

      <div className="my-8 flex justify-center items-center gap-2.5">
        <div
          className={`${currentStep === 1 && "w-6 bg-primary-500"} w-2.5 bg-primary-200 h-2.5 rounded-full`}
        ></div>
        <div
          className={`${currentStep === 2 && "w-6 bg-primary-500"} w-2.5 h-2.5 bg-primary-200 rounded-full`}
        ></div>
        <div className={`${currentStep === 3 && "w-6 bg-primary-500"} w-2.5 h-2.5 bg-primary-200 rounded-full`}></div>
      </div>

      <div className="flex justify-center">
        <button
          className="inline-block p-4 uppercase text-center text-secondary-500 font-semibold"
          onClick={handlePreviousStep}
        >
          Voltar
        </button>
      </div>
    </main>
  )
}