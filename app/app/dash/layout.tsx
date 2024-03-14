"use client";
import React, { useEffect } from "react";
import { HeaderLogged } from "../components/HeaderLogged";
import { useRouter } from "next/navigation";

interface DashLayoutProps {
  children: React.ReactNode;
}

export default function DashLayout({ children }: DashLayoutProps) {
  const router = useRouter();
  
  useEffect(() => {
    if (!localStorage.getItem("@App:token")) {
      router.push("/account/login");
    }
  }, []);

  return (
    <>
      <HeaderLogged />
      {children}
    </>
  )
}