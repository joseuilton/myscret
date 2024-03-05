import React from "react";
import HeaderVisitor from "../components/HeaderVisitor";

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <>
      <HeaderVisitor />
      {children}
    </>
  )
}