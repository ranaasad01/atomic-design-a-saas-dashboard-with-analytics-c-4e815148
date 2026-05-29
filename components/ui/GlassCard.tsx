"use client";

import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export default function GlassCard({ children, className, gradient }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm",
        gradient && "bg-gradient-to-br from-indigo-500/10 to-violet-500/5",
        className
      )}
    >
      {children}
    </div>
  );
}
