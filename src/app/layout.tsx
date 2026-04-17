import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Knowledge Library - Autom8Lab",
  description:
    "A searchable library of AI prompts, agents, workflows, tools, and resources organized by business problem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
