"use client";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import ModalProvider from "@/components/providers/ModalProvider";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        storageKey="discord-theme"
      >
        <ModalProvider />
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Provider;
