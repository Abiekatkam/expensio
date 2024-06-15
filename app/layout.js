import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expensio | Abhishek Katkam",
  description:
    "Expensio is a robust expense tracking and management tool designed to simplify financial oversight for individuals and businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} min-h-screen dark:bg-[#09090a]`}>
        {children}
      </body>
    </html>
  );
}
