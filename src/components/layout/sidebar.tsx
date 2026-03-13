"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Calendar,
  Zap,
  GitCompareArrows,
  ChevronLeft,
  ChevronRight,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/players", label: "Players", icon: Users },
  { href: "/fixtures", label: "Fixtures", icon: Calendar },
  { href: "/gameweek", label: "Gameweek Live", icon: Zap },
  { href: "/teams", label: "Teams", icon: GitCompareArrows },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-[#0d0d14] transition-all duration-300",
          collapsed ? "w-16" : "w-56"
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 border-b border-border px-4">
          <Trophy className="h-6 w-6 shrink-0 text-fpl-purple" />
          {!collapsed && (
            <span className="text-lg font-bold tracking-tight">
              FPL<span className="text-fpl-purple">Hub</span>
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-fpl-purple/15 text-fpl-purple"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-10 items-center justify-center border-t border-border text-muted-foreground hover:text-foreground"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </aside>

      {/* Spacer to push content */}
      <div
        className={cn(
          "shrink-0 transition-all duration-300",
          collapsed ? "w-16" : "w-56"
        )}
      />
    </>
  );
}
