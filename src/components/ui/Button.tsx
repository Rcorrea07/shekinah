import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "ember";
type ButtonSize = "sm" | "md" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  fullWidth?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-ember-400 text-coal-950 shadow-[0_0_28px_rgba(224,166,74,0.18)] hover:bg-ember-300",
  secondary:
    "border border-ash-100/20 bg-ash-100/10 text-ash-100 hover:border-ash-100/30 hover:bg-ash-100/10",
  ghost: "text-ash-200 hover:bg-ash-100/10 hover:text-ash-100",
  ember:
    "border border-ember-400/30 bg-ember-400/10 text-ember-300 hover:bg-ember-400/20",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-11 px-4 text-sm",
  icon: "size-10 justify-center p-0",
};

export function Button({
  className,
  children,
  icon,
  variant = "secondary",
  size = "md",
  fullWidth = false,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-[8px] font-semibold leading-none transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-300 active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className,
      )}
      type={type}
      {...props}
    >
      {icon ? <span className="grid size-4 place-items-center">{icon}</span> : null}
      {children}
    </button>
  );
}
