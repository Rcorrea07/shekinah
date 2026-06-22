import {
  ArrowRight,
  Calendar,
  Flame,
  HeartHandshake,
  MessageCircle,
} from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { formatLongDate, formatTime, getGreeting } from "../../lib/date";
import type {
  AppView,
  EventItem,
  PrayerRequest,
  Testimony,
} from "../../types/domain";

type HomeDashboardProps = {
  prayerRequests: PrayerRequest[];
  events: EventItem[];
  testimonies: Testimony[];
  onNavigate: (view: AppView) => void;
};

export function HomeDashboard({
  prayerRequests,
  events,
  testimonies,
  onNavigate,
}: HomeDashboardProps) {
  const totalPrayers = prayerRequests.reduce(
    (total, request) => total + request.prayingCount,
    0,
  );

  const nextEvent = events.length > 0 ? events[0] : null;

  return (
    <div className="mx-auto grid max-w-[1400px] gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
      <section className="hatch-panel rounded-[8px] border border-ash-100/10 bg-coal-900/75 p-5 sm:p-7 lg:min-h-[520px]">
        <div className="flex flex-col gap-8 lg:h-full lg:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-3xl">
              <Badge tone="ember">{getGreeting()}, Shekinah</Badge>
              <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.02] text-ash-100 sm:text-5xl lg:text-6xl">
                Manter a chama acesa!
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-ash-300">
                Pedidos, avisos e testemunhos reunidos para a célula caminhar junta.
              </p>
            </div>
            <div className="hidden lg:block">
              <img src="/logo.png" alt="Shekinah Logo" className="size-48 object-contain" />
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
            {nextEvent ? (
              <div className="rounded-[8px] border border-ember-400/20 bg-coal-950/60 p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone="moss">Próximo encontro</Badge>
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-ash-500">
                    {formatLongDate(nextEvent.date)} · {formatTime(nextEvent.date)}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-ash-100">
                  {nextEvent.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ash-400">
                  {nextEvent.location}
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Button
                    variant="primary"
                    icon={<HeartHandshake className="size-4" strokeWidth={1.8} />}
                    onClick={() => onNavigate("prayer")}
                  >
                    Pedir oração
                  </Button>
                </div>
              </div>
            ) : (
              <div className="rounded-[8px] border border-ash-100/10 bg-coal-950/60 p-5 flex items-center justify-center">
                <p className="text-sm text-ash-400">Nenhum evento próximo agendado.</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Metric label="pedidos" value={prayerRequests.length} icon={HeartHandshake} />
              <Metric label="orações" value={totalPrayers} icon={Flame} />
              <Metric label="avisos" value={events.length} icon={Calendar} />
              <Metric label="relatos" value={testimonies.length} icon={MessageCircle} />
            </div>
          </div>
        </div>
      </section>

      <aside className="grid gap-5">
        <Card>
          <Badge tone="moss">Atalhos</Badge>
          <div className="mt-4 grid gap-2">
            <QuickLink
              icon={Calendar}
              label="Avisos e eventos"
              onClick={() => onNavigate("events")}
            />
            <QuickLink
              icon={MessageCircle}
              label="Testemunhos"
              onClick={() => onNavigate("testimonies")}
            />
          </div>
        </Card>
      </aside>
    </div>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Flame;
}) {
  return (
    <div className="rounded-[8px] border border-ash-100/10 bg-ash-100/5 p-4">
      <Icon className="size-4 text-ember-300" strokeWidth={1.8} />
      <p className="mt-4 text-2xl font-semibold text-ash-100">{value}</p>
      <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ash-500">
        {label}
      </p>
    </div>
  );
}

function QuickLink({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Calendar;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="flex items-center justify-between gap-3 rounded-[8px] border border-ash-100/10 bg-coal-950/50 px-3 py-3 text-left text-sm font-semibold text-ash-200 transition hover:border-ember-400/25 hover:bg-ember-400/10 hover:text-ash-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-300"
      type="button"
      onClick={onClick}
    >
      <span className="flex min-w-0 items-center gap-3">
        <Icon className="size-4 shrink-0 text-ember-300" strokeWidth={1.8} />
        <span className="truncate">{label}</span>
      </span>
      <ArrowRight className="size-4 shrink-0 text-ash-500" strokeWidth={1.8} />
    </button>
  );
}
