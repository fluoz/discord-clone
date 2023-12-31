import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import Provider from "./provider";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nitrox Chat",
  description: "nitrox chat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(openSans.className, "bg-white dark:bg-[#313338]")}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
