import { useState, type ReactNode } from "react";
import {
  Calendar,
  HeartHandshake,
  Home,
  Menu,
  MessageCircle,
  X,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import type { AppView } from "../../types/domain";

type NavItem = {
  id: AppView;
  path: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

type AppShellProps = {
  activeView: AppView;
  children: ReactNode;
};

const navItems: NavItem[] = [
  {
    id: "home",
    path: "/",
    label: "Início",
    description: "Próximo encontro e atalhos",
    icon: Home,
  },
  {
    id: "prayer",
    path: "/oracoes",
    label: "Oração",
    description: "Pedidos da semana",
    icon: HeartHandshake,
  },
  {
    id: "events",
    path: "/avisos",
    label: "Avisos",
    description: "Agenda e detalhes",
    icon: Calendar,
  },
  {
    id: "testimonies",
    path: "/testemunhos",
    label: "Testemunhos",
    description: "Relatos moderados",
    icon: MessageCircle,
  },
];

export function AppShell({ activeView, children }: AppShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeItem = navItems.find((item) => item.id === activeView) ?? navItems[0];

  const handleViewChange = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="app-texture min-h-[100dvh] text-ash-100">
      <div className="mx-auto flex min-h-[100dvh] max-w-[1480px]">
        <aside className="sticky top-0 hidden h-[100dvh] w-72 shrink-0 flex-col border-r border-ash-100/10 bg-coal-950/60 p-5 backdrop-blur-xl lg:flex">
          <div className="hatch-panel rounded-[8px] border border-ash-100/10 bg-coal-900/80 p-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Shekinah Logo" className="size-10 object-contain" />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-ember-300">
                  Célula jovem
                </p>
                <h1 className="mt-1 text-2xl font-semibold leading-none">Shekinah</h1>
              </div>
            </div>
          </div>

          <nav aria-label="Navegação principal" className="mt-6 grid gap-2">
            {navItems.map((item) => (
              <NavButton
                key={item.id}
                item={item}
                isActive={activeView === item.id}
                onClick={handleViewChange}
              />
            ))}
          </nav>

          <div className="mt-auto rounded-[8px] border border-ember-400/20 bg-ember-400/10 p-4">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ember-300">
              Semana em movimento
            </p>
            <p className="mt-2 text-sm leading-6 text-ash-300">
              Um app para lembrar, conduzir, orar e guardar o que Deus está fazendo.
            </p>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-ash-100/10 bg-coal-950/80 px-4 py-3 backdrop-blur-xl lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <Link
                className="flex min-w-0 items-center gap-3 rounded-[8px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember-300"
                to="/"
                onClick={handleViewChange}
              >
                <img src="/logo.png" alt="Shekinah Logo" className="size-8 object-contain" />
                <div className="min-w-0">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ember-300">
                    Shekinah
                  </p>
                  <p className="truncate text-sm font-semibold text-ash-100">
                    {activeItem.label}
                  </p>
                </div>
              </Link>

              <button
                className="grid size-10 place-items-center rounded-[8px] border border-ash-100/10 bg-ash-100/10 text-ash-100 transition hover:bg-ash-100/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-300"
                type="button"
                aria-label={isMenuOpen ? "Fechar navegação" : "Abrir navegação"}
                onClick={() => setIsMenuOpen((current) => !current)}
              >
                {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>

            {isMenuOpen ? (
              <nav
                aria-label="Navegação principal"
                className="mt-4 grid gap-2 border-t border-ash-100/10 pt-4"
              >
                {navItems.map((item) => (
                  <NavButton
                    key={item.id}
                    item={item}
                    isActive={activeView === item.id}
                    onClick={handleViewChange}
                  />
                ))}
              </nav>
            ) : null}
          </header>

          <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

function NavButton({
  item,
  isActive,
  onClick,
}: {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;

  return (
    <Link
      className={cn(
        "group flex w-full items-center gap-3 rounded-[8px] border px-3 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-300",
        isActive
          ? "border-ember-400/30 bg-ember-400/10 text-ash-100"
          : "border-transparent text-ash-400 hover:border-ash-100/10 hover:bg-ash-100/10 hover:text-ash-100",
      )}
      to={item.path}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
    >
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-[8px] border transition",
          isActive
            ? "border-ember-400/30 bg-ember-400/10 text-ember-300"
            : "border-ash-100/10 bg-coal-800/60 text-ash-400 group-hover:text-ember-300",
        )}
      >
        <Icon className="size-5" strokeWidth={1.7} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold">{item.label}</span>
        <span className="block truncate text-xs text-ash-500">{item.description}</span>
      </span>
    </Link>
  );
}
