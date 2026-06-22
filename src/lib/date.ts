const longDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "2-digit",
  month: "long",
});

const compactDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
});

const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});

export function formatLongDate(value: string) {
  return longDateFormatter.format(new Date(value));
}

export function formatCompactDate(value: string) {
  return compactDateFormatter.format(new Date(value)).replace(".", "");
}

export function formatTime(value: string) {
  return timeFormatter.format(new Date(value));
}

export function getGreeting(now = new Date()) {
  const hour = now.getHours();

  if (hour < 12) {
    return "Bom dia";
  }

  if (hour < 18) {
    return "Boa tarde";
  }

  return "Boa noite";
}
