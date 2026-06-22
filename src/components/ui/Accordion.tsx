import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

export type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
  defaultOpenId?: string;
};

export function Accordion({ items, defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState<string | undefined>(
    defaultOpenId ?? items[0]?.id,
  );

  return (
    <div className="divide-y divide-ash-100/10 rounded-[8px] border border-ash-100/10 bg-coal-900/60">
      {items.map((item) => {
        const isOpen = item.id === openId;

        return (
          <section key={item.id}>
            <button
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold text-ash-100 transition hover:bg-ash-100/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-300"
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? undefined : item.id)}
            >
              <span>{item.title}</span>
              <ChevronDown
                aria-hidden="true"
                className={cn("size-4 text-ember-300 transition", isOpen && "rotate-180")}
                strokeWidth={1.8}
              />
            </button>
            {isOpen ? (
              <div className="px-4 pb-5 text-sm leading-6 text-ash-300">
                {item.content}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
