import { MessageItem } from "./components/MessageItem";

export default function DashMessagesPage() {
  return (
    <main className="container flex flex-col gap-5 justify-center px-7 mt-8">
      <h1 className="text-center font-semibold text-secondary-100">
        sua caixa de entrada
      </h1>

      <ul className="grid grid-cols-4 gap-6">
        <li>
          <MessageItem readStatus={true} />
        </li>
        <li>
          <MessageItem readStatus={false} />
        </li>
        <li>
          <MessageItem readStatus={true} />
        </li>
        <li>
          <MessageItem readStatus={false} imageUrl={"/avatar2.png"} />
        </li>
        <li>
          <MessageItem readStatus={false} />
        </li>
        <li>
          <MessageItem readStatus={false} />
        </li>
        <li>
          <MessageItem readStatus={true} />
        </li>
        <li>
          <MessageItem readStatus={false} />
        </li>
        <li>
          <MessageItem readStatus={true} />
        </li>
        <li>
          <MessageItem readStatus={false} />
        </li>
        <li>
          <MessageItem readStatus={false} />
        </li>
      </ul>
    </main>
  )
}