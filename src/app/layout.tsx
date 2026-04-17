import type { Metadata } from "next";
import packageJson from "../../package.json";

import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";
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
      <body className="min-h-full">
        <TopNav />
        <Sidebar version={packageJson.version} />
        <main className="min-h-screen pt-16 lg:pl-16">{children}</main>
      </body>
    </html>
  );
}
