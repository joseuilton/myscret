import React from "react";
import { HeaderLogged } from "../components/HeaderLogged";

interface DashLayoutProps {
  children: React.ReactNode;
}

export default function DashLayout({ children }: DashLayoutProps) {
  return (
    <>
      <HeaderLogged />
      {children}
    </>
  )
}