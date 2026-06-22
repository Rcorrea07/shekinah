import { BadgeCheck, MessageCircle, ShieldCheck } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { formatCompactDate } from "../../lib/date";
import type { Testimony } from "../../types/domain";

type TestimoniesPanelProps = {
  testimonies: Testimony[];
  pendingCount: number;
};

export function TestimoniesPanel({
  testimonies,
  pendingCount,
}: TestimoniesPanelProps) {
  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <SectionHeader
        eyebrow="Testemunhos"
        title="Relatos para lembrar o que Deus fez."
        description="A lista mostra relatos aprovados; a fila de revisão fica separada para liderança."
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <section className="grid gap-4 md:grid-cols-2">
          {testimonies.map((testimony) => (
            <Card key={testimony.id} className="flex min-h-64 flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <MessageCircle className="size-5 text-ember-300" strokeWidth={1.7} />
                  <Badge tone="moss">Aprovado</Badge>
                </div>
                <blockquote className="mt-5 text-lg leading-8 text-ash-100">
                  “{testimony.content}”
                </blockquote>
              </div>
              <div className="mt-6 border-t border-ash-100/10 pt-4">
                <p className="font-semibold text-ash-200">{testimony.author}</p>
                <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ash-500">
                  {formatCompactDate(testimony.date)}
                </p>
              </div>
            </Card>
          ))}
        </section>

        <aside className="grid gap-4 self-start">
          <Card className="hatch-panel">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge tone="quiet">Moderação</Badge>
                <p className="mt-4 text-4xl font-semibold text-ash-100">
                  {pendingCount}
                </p>
                <p className="mt-2 text-sm leading-6 text-ash-400">
                  {pendingCount === 1
                    ? "relato aguardando revisão"
                    : "relatos aguardando revisão"}
                </p>
              </div>
              <ShieldCheck className="size-5 text-ember-300" strokeWidth={1.7} />
            </div>
          </Card>

          <Card>
            <BadgeCheck className="size-5 text-moss-300" strokeWidth={1.8} />
            <h3 className="mt-4 text-lg font-semibold text-ash-100">
              Publicação cuidadosa
            </h3>
            <p className="mt-3 text-sm leading-6 text-ash-400">
              Relatos sensíveis podem ser aprovados, editados ou mantidos apenas para a liderança.
            </p>
          </Card>
        </aside>
      </div>
    </div>
  );
}
