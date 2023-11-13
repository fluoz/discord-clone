"use client";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import ModalProvider from "@/components/providers/ModalProvider";
import { SocketProvider } from "@/components/navigation/socket-provider";
import QueryProvider from "@/components/providers/query-provider";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        storageKey="discord-theme"
      >
        <SocketProvider>
          <ModalProvider />
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
        </SocketProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Provider;
