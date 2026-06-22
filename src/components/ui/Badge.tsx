import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type BadgeTone = "quiet" | "ember" | "moss" | "wine";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

const toneClasses: Record<BadgeTone, string> = {
  quiet: "border-ash-100/10 bg-ash-100/10 text-ash-200",
  ember: "border-ember-400/25 bg-ember-400/10 text-ember-300",
  moss: "border-moss-300/25 bg-moss-500/10 text-moss-300",
  wine: "border-wine-400/30 bg-wine-400/10 text-wine-400",
};

export function Badge({ className, tone = "quiet", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full border px-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em]",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
