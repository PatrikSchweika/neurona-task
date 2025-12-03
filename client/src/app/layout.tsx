import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ApolloWrapper} from "@/src/graphql/setup/ApolloWrapper";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neurona Task"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    // todo: change styles to tailwind classes
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
      <div className="min-h-screen flex flex-col">
          <header className="bg-zinc-900 text-white px-6 py-4 shadow-sm">
              <h1 className="text-2xl font-semibold">
                  <Link href="/">Neurona Task</Link>
              </h1>
          </header>

          <main className="flex-1 p-6 bg-gray-100">
              <ApolloWrapper>
                      <div className="w-full lg:max-w-[75%] mx-auto">
                          {children}
                      </div>
              </ApolloWrapper>
          </main>
      </div>
      </body>
    </html>
  );
}
