import {
  applicationClientUrls,
  applicationServerUrls,
} from "@/components/constant/urls";
import { AuthProvider } from "@/components/providers/auth-provider";
import { SidebarContextProvider } from "@/components/providers/sidebar-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Sidebar from "@/components/sidebar/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { cookies } from "next/headers";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "Expensio | Abhishek Katkam",
  description:
    "Expensio is a robust expense tracking and management tool designed to simplify financial oversight for individuals and businesses.",
};

async function getUser(cookies) {
  const res = await fetch(
    `${applicationClientUrls.host.home}/${applicationServerUrls.user.modify}`,
    {
      headers: { cookie: cookies },
    }
  );
  if (!res.ok) {
    return {};
  }
  return await res.json();
}

export default async function HomeLayout({ children }) {
  const user = await getUser(cookies());
  return (
    <>
      <div className="flex h-full dark:bg-[#09090a] flex-col text-gray-600 antialiased">
        <NextTopLoader color="#7c3aed" height={2} showSpinner={false} />
        <AuthProvider user={user}>
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
        </AuthProvider>
      </div>
    </>
  );
}
