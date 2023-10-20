import type { Metadata } from "next";
import "./globals.css";
import { openSans } from "./fonts";

export const metadata: Metadata = {
  title: "Tenderhack 2023",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>{children}</body>
    </html>
  );
}
