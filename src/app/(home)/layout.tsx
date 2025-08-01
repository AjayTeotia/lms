import { ReactNode } from "react";
import { Navbar } from "./_components/navbar";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />

      <div className="fixed inset-0 -z-10 w-screen h-screen bg-[radial-gradient(#dadde2_1px,transparent_1px)] dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)] [background-size:16px_16px]" />

      <main className="container mx-auto px-4 md:px-6 lg:px-8 mb-32">{children}</main>
    </div>
  );
}
