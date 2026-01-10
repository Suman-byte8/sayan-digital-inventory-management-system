import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import { AuthProvider } from "@/context/AuthContext";
import { SettingsProvider } from "@/context/SettingsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory Management System",
  description: "Manage your products efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} font-display bg-background-light text-slate-900 antialiased overflow-hidden`}>
        <AuthProvider>
          <SettingsProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
