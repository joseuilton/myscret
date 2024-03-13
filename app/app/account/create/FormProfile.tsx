"use client";
import { Avatar } from "@/app/components/Avatar";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { FormEvent, useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { toast } from "react-toastify";
import { z } from "zod";

function generateAvatarOptions(): string[] {
  const generateNumbers = new Set();

  function generateRandomNumber() {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * 16) + 1;
    } while (generateNumbers.has(randomNumber));

    generateNumbers.add(randomNumber);
    return randomNumber;
  }

  const avatars = [];

  for (let i = 0; i < 3; i++) {
    const number = generateRandomNumber();
    avatars.push(`/avatars/avatar${number}.png`);
  }

  return avatars;
}

interface FormProfileProps {
  name: string;
  username: string;
  avatar: string;
  onChangeName: (data: string) => void;
  onChangeUsername: (data: string) => void;
  onChangeAvatar: (data: string) => void;
  onNextStep: () => void;
}

const usernameSchema = z.string().min(3).max(30).regex(/^[a-zA-Z0-9._]+$/, {
  message: "Username inválido!",
});

export function FormProfile(
  {
    name,
    username,
    avatar,
    onChangeName,
    onChangeUsername,
    onChangeAvatar,
    onNextStep
  }: FormProfileProps
) {
  const [avatarOptions, setAvatarOptions] = useState<string[]>([]);

  useEffect(() => {
    handleGenerateAvatarsClick();
  }, []);

  function handleGenerateAvatarsClick() {
    const avatarRandom = generateAvatarOptions();
    setAvatarOptions(avatarRandom);
    onChangeAvatar(avatarRandom[0]);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!name) {
      toast.error('O campo "nome" é obrigatório!');
      return;
    }

    const result = usernameSchema.safeParse(username);

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    if (!avatarOptions.includes(avatar)) {
      toast.error("Avatar selecionado inválido!");
      return;
    }

    onNextStep();
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        type="name"
        placeholder="Informe seu nome"
        value={name}
        onChange={(e) => onChangeName(e.target.value)}
      />
      <Input
        type="name"
        placeholder="nomedousuario"
        value={username}
        onChange={(e) => onChangeUsername(e.target.value)}
      />

      <fieldset className="p-4 border border-solid border-secondary-400 rounded-xl">
        <p className="mb-2.5 text-base text-secondary-500">Escolha um avatar</p>

        <div className="flex items-center gap-6">
          {avatarOptions.map((avatarOption) => (
            <label htmlFor={`avatar-option-${avatarOption}`} key={avatarOption}>
              <input
                type="radio"
                name="avatar"
                id={`avatar-option-${avatarOption}`}
                value={avatarOption}
                className="hidden"
                checked={avatar === avatarOption}
                onChange={(e) => onChangeAvatar(e.target.value)}
              />
              <Avatar
                borderColor={avatar === avatarOption ? "primary" : "regular"}
                imageUrl={avatarOption}
                alt="Avatar aleatório"
              />
            </label>
          ))}

          <button
            type="button"
            className="text-secondary-500"
            onClick={handleGenerateAvatarsClick}
          >
            <FiRefreshCcw size={24} />
          </button>
        </div>
      </fieldset>

      <Button
        className="uppercase"
        type="submit"
        disabled={name.length === 0 || username.length === 0 || !avatarOptions.includes(avatar)}
      >
        Cadastrar
      </Button>
    </form>
  )
}