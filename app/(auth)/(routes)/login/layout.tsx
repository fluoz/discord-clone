import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login to Nitrox Chat",
  description: "Login to Nitrox Chat",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
