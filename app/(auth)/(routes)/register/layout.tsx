import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register to Nitrox Chat",
  description: "Register to Nitrox Chat",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
