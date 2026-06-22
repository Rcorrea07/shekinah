import { useState } from "react";
import { CalendarPlus, Clock, Copy, ExternalLink, MapPin } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { formatLongDate, formatTime } from "../../lib/date";
import type { EventAction, EventItem } from "../../types/domain";

type EventsPanelProps = {
  events: EventItem[];
};

export function EventsPanel({ events }: EventsPanelProps) {
  const [copiedEventId, setCopiedEventId] = useState<string | null>(null);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const handleAction = async (eventItem: EventItem, action: EventAction) => {
    if (action.kind === "calendar") {
      window.open(createCalendarLink(eventItem), "_blank", "noopener,noreferrer");
      return;
    }

    if (action.kind === "copyPix" && action.value) {
      await navigator.clipboard.writeText(action.value);
      setCopiedEventId(eventItem.id);
      window.setTimeout(
        () => setCopiedEventId((current) => (current === eventItem.id ? null : current)),
        1600,
      );
      return;
    }

    setExpandedEventId((current) => (current === eventItem.id ? null : eventItem.id));
  };

  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <SectionHeader
        eyebrow="Avisos e eventos"
        title="Agenda que a célula consegue usar."
        description="Datas, locais e ações rápidas para o que está acontecendo agora."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {events.map((eventItem) => (
          <Card key={eventItem.id} className="flex min-h-[360px] flex-col">
            <div className="flex items-start justify-between gap-4">
              <Badge tone="ember">{formatLongDate(eventItem.date)}</Badge>
              <CalendarPlus className="size-5 text-ember-300" strokeWidth={1.7} />
            </div>

            <h3 className="mt-5 text-2xl font-semibold leading-tight text-ash-100">
              {eventItem.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-ash-300">
              {eventItem.description}
            </p>

            <div className="mt-auto grid gap-3 border-t border-ash-100/10 pt-4">
              <Meta icon={Clock} value={formatTime(eventItem.date)} />
              <Meta icon={MapPin} value={eventItem.location} />
            </div>

            {expandedEventId === eventItem.id ? (
              <div className="mt-4 rounded-[8px] border border-moss-300/20 bg-moss-500/10 p-3 text-sm leading-6 text-moss-300">
                Combine carona, lanche e chegada pelo grupo da célula.
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-2">
              {eventItem.actions.map((action) => (
                <Button
                  key={action.label}
                  size="sm"
                  variant={action.kind === "calendar" ? "primary" : "secondary"}
                  icon={getActionIcon(action.kind)}
                  onClick={() => void handleAction(eventItem, action)}
                >
                  {action.kind === "copyPix" && copiedEventId === eventItem.id
                    ? "Pix copiado"
                    : action.label}
                </Button>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Meta({
  icon: Icon,
  value,
}: {
  icon: typeof Clock;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-ash-300">
      <Icon className="size-4 text-ember-300" strokeWidth={1.8} />
      <span>{value}</span>
    </div>
  );
}

function getActionIcon(kind: EventAction["kind"]) {
  if (kind === "calendar") {
    return <CalendarPlus className="size-4" strokeWidth={1.8} />;
  }

  if (kind === "copyPix") {
    return <Copy className="size-4" strokeWidth={1.8} />;
  }

  return <ExternalLink className="size-4" strokeWidth={1.8} />;
}

function createCalendarLink(eventItem: EventItem) {
  const start = new Date(eventItem.date);
  const end = new Date(start.getTime() + 90 * 60 * 1000);
  const dates = `${toGoogleDate(start)}/${toGoogleDate(end)}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: eventItem.title,
    dates,
    location: eventItem.location,
    details: eventItem.description,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function toGoogleDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
