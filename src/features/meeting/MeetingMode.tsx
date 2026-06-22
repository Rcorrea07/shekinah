import { Bell, BookOpen, Flame, MapPin, Music, Users } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { formatLongDate } from "../../lib/date";
import type { MeetingGuide } from "../../types/domain";

type MeetingModeProps = {
  guide: MeetingGuide;
};

export function MeetingMode({ guide }: MeetingModeProps) {
  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <section className="hatch-panel rounded-[8px] border border-ember-400/20 bg-coal-900/80 p-5 sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <Badge tone="ember">Modo encontro</Badge>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.02] text-ash-100 sm:text-5xl">
              {guide.theme}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ash-300">
              Roteiro limpo para conduzir a célula sem perder o fio da conversa.
            </p>
          </div>
          <div className="rounded-[8px] border border-ash-100/10 bg-coal-950/60 p-4">
            <InfoLine icon={Flame} label="Horário" value={`${formatLongDate(guide.date)} · ${guide.startsAt}`} />
            <InfoLine icon={MapPin} label="Local" value={guide.location} />
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <Card className="border-ember-400/20 bg-ember-400/10">
          <div className="flex items-center gap-3">
            <BookOpen className="size-5 text-ember-300" strokeWidth={1.7} />
            <Badge tone="quiet">{guide.verseReference}</Badge>
          </div>
          <blockquote className="mt-5 text-2xl font-medium leading-snug text-ash-100">
            “{guide.verse}”
          </blockquote>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <Users className="size-5 text-moss-300" strokeWidth={1.7} />
            <h3 className="text-lg font-semibold text-ash-100">Quebra-gelo</h3>
          </div>
          <p className="mt-4 text-sm leading-7 text-ash-300">{guide.icebreaker}</p>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <SectionHeader title="Perguntas de reflexão" />
          <ol className="mt-5 grid gap-3">
            {guide.reflectionQuestions.map((question, index) => (
              <li
                className="grid gap-3 rounded-[8px] border border-ash-100/10 bg-coal-950/40 p-4 sm:grid-cols-[44px_1fr]"
                key={question}
              >
                <span className="grid size-11 place-items-center rounded-[8px] border border-ember-400/25 bg-ember-400/10 font-mono text-sm text-ember-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="self-center text-sm leading-6 text-ash-200">{question}</p>
              </li>
            ))}
          </ol>
        </Card>

        <div className="grid gap-5">
          <Card>
            <div className="flex items-center gap-3">
              <Music className="size-5 text-ember-300" strokeWidth={1.7} />
              <h3 className="text-lg font-semibold text-ash-100">Louvor sugerido</h3>
            </div>
            <ul className="mt-4 grid gap-3">
              {guide.worshipSuggestions.map((song) => (
                <li className="soft-top-line pt-3 text-sm text-ash-300" key={song}>
                  {song}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <Bell className="size-5 text-ember-300" strokeWidth={1.7} />
              <h3 className="text-lg font-semibold text-ash-100">Avisos finais</h3>
            </div>
            <ul className="mt-4 grid gap-3">
              {guide.notices.map((notice) => (
                <li className="text-sm leading-6 text-ash-300" key={notice}>
                  {notice}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InfoLine({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 border-b border-ash-100/10 py-3 last:border-b-0">
      <Icon className="mt-0.5 size-4 shrink-0 text-ember-300" strokeWidth={1.8} />
      <div>
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ash-500">
          {label}
        </p>
        <p className="mt-1 text-sm font-medium text-ash-100">{value}</p>
      </div>
    </div>
  );
}
