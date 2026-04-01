import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Sparkles,
  Sun,
  Moon,
  Hexagon,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
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
        "flex h-full w-56 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-4">
        <Hexagon className="size-5 text-sidebar-primary" />
        <span className="text-base font-semibold tracking-tight">Brand OS</span>
      </div>

      <Separator />

      {/* Main nav */}
      <nav className="flex flex-1 flex-col gap-1 px-3 py-3">
        <span className="mb-1 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Main
        </span>
        {mainNav.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}

        <span className="mt-4 mb-1 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Info
        </span>
        {infoNav.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border px-3 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="w-full justify-start gap-2 text-sidebar-foreground/70"
        >
          {theme === "dark" ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </Button>
      </div>
    </aside>
  );
}
