import React from "react";
import HeaderVisitor from "../components/HeaderVisitor";

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <>
      <HeaderVisitor />
      <h1 className="text-lg font-semibold text-center text-secondary-600 mb-16">
        Perguntas e mensagens anônimas
      </h1>
      {children}
    </>
  )
}