import type { Metadata } from "next";
import { Zain } from "next/font/google";
import "./globals.css";

const zain = Zain({
  variable: "--font-zain",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Leo Store | متجر ليو",
  description: "Premium shopping experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${zain.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
