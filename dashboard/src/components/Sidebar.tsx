import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Sparkles,
  Sun,
  Moon,
  ArrowRightLeft,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const mainNav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/knowledge-base", label: "Knowledge Base", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
];

const infoNav = [
  { to: "/skills", label: "Skills", icon: Sparkles },
];

function NavItem({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 border border-transparent px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors",
          isActive
            ? "border-foreground bg-foreground text-background"
            : "text-foreground/60 hover:text-foreground hover:border-foreground"
        )
      }
    >
      <Icon className="size-4 shrink-0" />
      <span>{label}</span>
    </NavLink>
  );
}

export function Sidebar({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      className={cn(
        "flex h-full w-56 flex-col bg-background text-foreground border-r border-foreground",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-center border-b border-foreground px-4 py-5">
        <div className="text-lg font-bold tracking-tighter uppercase">
          B—OS
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        <span className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          System
        </span>
        {mainNav.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}

        <span className="mt-6 mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Reference
        </span>
        {infoNav.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-foreground px-3 py-3 flex items-center justify-between">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="size-3.5" />
          ) : (
            <Moon className="size-3.5" />
          )}
          <span>{theme === "dark" ? "Light" : "Dark"}</span>
        </button>
        <ArrowRightLeft className="size-3.5 text-muted-foreground" />
      </div>
    </aside>
  );
}
