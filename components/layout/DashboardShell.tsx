"use client";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardShellProps {
  children: React.ReactNode;
  title?: string;
}

export default function DashboardShell({ children, title }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-[#0F0F1A] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-60 transition-all duration-300">
        <Navbar title={title} />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
