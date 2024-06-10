import { SidebarContextProvider } from "@/components/providers/sidebar-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Sidebar from "@/components/sidebar/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "Expensio | Abhishek Katkam",
  description:
    "Expensio is a robust expense tracking and management tool designed to simplify financial oversight for individuals and businesses.",
};

export default function HomeLayout({ children }) {
  return (
    <>
      <div className="flex h-full flex-col text-gray-600 antialiased">
        <NextTopLoader color="#7c3aed" height={2} showSpinner={false} />
        {/* authprovider */}
        {/* theme provider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="relative flex min-h-full min-w-full bg-background dark:bg-[#09090a]">
            <SidebarContextProvider>
              <Sidebar />
              <div className="h-full w-full sm:ml-[64px]">
                <div className="flex h-full w-full flex-col max-sm:ml-0">
                  {children}
                </div>
              </div>
            </SidebarContextProvider>
          </main>
        </ThemeProvider>
        <Toaster
          closeButton
          position="top-right"
          theme="system"
          visibleToasts={3}
          richColors
        />
      </div>
    </>
  );
}
