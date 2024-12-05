import type { Metadata } from "next";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SuGaMi Package Camera",
  description: "SuGaMi Package Camera",
};

export default function Layout({children}: {children: React.ReactNode}) {
  return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="flex-grow p-6 md:overflow-y-auto">{children}</div>
      </div>
  );
}
