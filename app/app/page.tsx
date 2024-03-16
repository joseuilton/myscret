"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (!localStorage.getItem('@App:token') || !localStorage.getItem("@App:user")) {
      redirect("/account")
    }

    redirect("/dash");
  }, []);

  return (
    <main>
      <h1>Hello, World!</h1>
    </main>
  );
}
