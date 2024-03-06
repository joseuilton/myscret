import Link from "next/link";
import { MdLogout } from "react-icons/md"
import { FiMessageCircle, FiSend } from "react-icons/fi";
import { GoInbox } from "react-icons/go";

import { Button } from "../Button";
import Image from "next/image";
import { Avatar } from "../Avatar";

export function HeaderLogged() {
  return (
    <header className="container px-7 pt-11">
      <div className="flex justify-between items-center">
        <Button className="w-auto" roundedStyle="pill" size="small" variant="light" asChild>
          <Link href="/">
            <MdLogout size={24} />
          </Link>
        </Button>

        <div className="opacity-50">
          <Image
            src={"/logo.png"}
            alt="Logo MySecret"
            width={32}
            height={32}
          />
        </div>

        <Avatar imageUrl="/avatar2.png" alt="Avatar do seu perfil" size="small" />
      </div>

      <nav className="mt-8">
        <ul className="flex justify-between items-center">
          <li>
            <Button size="small" asChild>
              <Link href="/dash">
                <FiMessageCircle size={16} />
                perguntas
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="light" size="small" asChild>
              <Link href="/dash/messages">
                <GoInbox size={16} />
                mensagens
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="light" size="small" asChild>
              <Link href="/dash/answers">
                <FiSend size={16} />
                respostas
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}