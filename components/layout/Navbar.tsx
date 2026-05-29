"use client";

import { Bell, Search, ChevronDown } from 'lucide-react';
import { useState } from "react";
import { notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function Navbar({ title }: { title?: string }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 border-b border-white/10 bg-[#1E1E2E]/80 backdrop-blur-sm flex items-center px-6 gap-4 sticky top-0 z-30">
      {/* Page title */}
      <div className="flex-1 pl-8 lg:pl-0">
        {title && (
          <h1 className="text-lg font-semibold text-white hidden sm:block">{title}</h1>
        )}
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-56">
        <Search size={14} className="text-slate-500" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-sm text-slate-300 placeholder-slate-600 outline-none w-full"
        />
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
          className="relative w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <Bell size={16} />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 top-12 w-80 bg-[#1E1E2E] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Notifications</span>
              <span className="text-xs text-indigo-400 cursor-pointer hover:text-indigo-300">Mark all read</span>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    "px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer",
                    !n.read && "bg-indigo-500/5"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {!n.read && (
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />
                    )}
                    {n.read && <span className="mt-1.5 w-2 h-2 flex-shrink-0" />}
                    <div>
                      <p className="text-sm text-slate-300">{n.message}</p>
                      <p className="text-xs text-slate-600 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
          className="flex items-center gap-2 hover:bg-white/5 rounded-lg px-2 py-1.5 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
            SA
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-white leading-none">Sarah Admin</p>
            <p className="text-xs text-slate-500 mt-0.5">Admin</p>
          </div>
          <ChevronDown size={14} className="text-slate-500 hidden sm:block" />
        </button>

        {showProfile && (
          <div className="absolute right-0 top-12 w-48 bg-[#1E1E2E] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
            {["Profile", "Account Settings", "Billing", "Sign Out"].map((item) => (
              <button
                key={item}
                className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
