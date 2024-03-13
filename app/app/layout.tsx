import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "react-toastify/ReactToastify.min.css"
import "./globals.css";

const exo2 = Exo_2({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-exo2",
})

export const metadata: Metadata = {
  title: "MySecret",
  description: "Anonymously questions and answers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="min-h-svh" lang="pt-br">
      <body
        className={`${exo2.className} min-h-max bg-gradient-to-b from-primary-200 to-secondary-800 to-20% bg-no-repeat`}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
