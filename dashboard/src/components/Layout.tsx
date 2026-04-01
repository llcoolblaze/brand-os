import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { cn } from "@/lib/utils";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden border-b border-foreground">
      {/* Desktop sidebar */}
      <Sidebar className="hidden md:flex" />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar
        className={cn(
          "fixed inset-y-0 left-0 z-50 transition-transform duration-200 md:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      />

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-foreground flex items-center justify-between px-4 lg:px-6 bg-background z-40">
          {/* Mobile menu */}
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <div className="text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
            Brand OS
          </div>

          <div className="text-xs uppercase tracking-[0.2em] font-medium text-muted-foreground hidden lg:block">
            [ GTM Operating System ]
          </div>

          <div className="text-xs font-mono text-muted-foreground">
            v1.0.0
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto">
          <main className="mx-auto w-full max-w-6xl px-4 lg:px-8 py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
