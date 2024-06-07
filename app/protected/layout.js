import Sidebar from "@/components/sidebar/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expensio | Abhishek Katkam",
  description:
    "Expensio is a robust expense tracking and management tool designed to simplify financial oversight for individuals and businesses.",
};

export default function ProtectedLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning="true">
      <body className={`${inter.className} flex h-full flex-col text-gray-600 antialiased`}>
          <NextTopLoader color="#7c3aed" height={2} showSpinner={false} />
          {/* authprovider */}
          {/* theme provider */}
          <main className="relative flex min-h-full min-w-full bg-background">
            {/* <SidebarContextProvider> */}
            <Sidebar />
            <div className="h-full w-full sm:ml-[64px]">
              <div className="flex h-full w-full flex-col max-sm:ml-0">
                {children}
              </div>
            </div>
            {/* </SidebarContextProvider> */}
          </main>
          <Toaster
            closeButton
            position="top-right"
            theme="system"
            visibleToasts={3}
            richColors
          />
        </body>
      </html>
    </>
  );
}
