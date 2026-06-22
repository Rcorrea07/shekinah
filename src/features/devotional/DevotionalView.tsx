import { BookOpen, Clock, Flame } from "lucide-react";
import { Accordion } from "../../components/ui/Accordion";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { formatLongDate } from "../../lib/date";
import type { Devotional } from "../../types/domain";

type DevotionalViewProps = {
  devotional: Devotional;
};

export function DevotionalView({ devotional }: DevotionalViewProps) {
  return (
    <div className="mx-auto grid max-w-[1180px] gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <aside className="lg:sticky lg:top-8 lg:self-start">
        <Card className="hatch-panel">
          <Badge tone="ember">{formatLongDate(devotional.date)}</Badge>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-ash-100">
            {devotional.title}
          </h2>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-ash-300">
            <span className="inline-flex items-center gap-2">
              <BookOpen className="size-4 text-ember-300" strokeWidth={1.8} />
              {devotional.verseReference}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4 text-ember-300" strokeWidth={1.8} />
              {devotional.readingTime}
            </span>
          </div>
        </Card>
      </aside>

      <main className="space-y-5">
        <section className="rounded-[8px] border border-ember-400/20 bg-ember-400/10 p-5 sm:p-7">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember-300">
            Versículo
          </p>
          <blockquote className="reading-measure mt-4 text-2xl font-medium leading-relaxed text-ash-100 sm:text-3xl">
            “{devotional.verse}”
          </blockquote>
        </section>

        <section>
          <SectionHeader
            title="Reflexões"
            description="Leia em blocos curtos, sem pressa, e deixe uma pergunta acompanhar o dia."
          />
          <div className="mt-5">
            <Accordion
              items={devotional.reflections}
              defaultOpenId={devotional.reflections[0]?.id}
            />
          </div>
        </section>

        <Card>
          <div className="flex items-center gap-3">
            <Flame className="size-5 text-ember-300" strokeWidth={1.8} />
            <h3 className="text-lg font-semibold text-ash-100">Oração do dia</h3>
          </div>
          <p className="reading-measure mt-4 text-base leading-7 text-ash-300">
            {devotional.prayerPrompt}
          </p>
        </Card>
      </main>
    </div>
  );
}
