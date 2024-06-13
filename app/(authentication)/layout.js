export const metadata = {
  title: "Expensio Authentication | Abhishek Katkam",
  description:
    "Expensio is a robust expense tracking and management tool designed to simplify financial oversight for individuals and businesses.",
};

export default function AuthenticationLayout({ children }) {
    return (
    <>
      <main className="relative flex min-h-full min-w-full bg-background">
        {children}
      </main>
    </>
  );
}
