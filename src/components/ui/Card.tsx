import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function Card({ className, children, ...props }: CardProps) {
  return (
    <article
      className={cn(
        "rounded-[8px] border border-ash-100/10 bg-coal-900/75 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      {children}
    </article>
  );
}
