export type AppView =
  | "home"
  | "prayer"
  | "events"
  | "testimonies";

export type PrayerRequest = {
  id: string;
  name?: string;
  request: string;
  isAnonymous: boolean;
  prayingCount: number;
  createdAt: string;
  category: "familia" | "saude" | "direcao" | "gratidao" | "outro";
};

export type EventActionKind = "calendar" | "copyPix" | "details";

export type EventAction = {
  label: string;
  kind: EventActionKind;
  value?: string;
};

export type EventItem = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  actions: EventAction[];
};

export type DevotionalReflection = {
  id: string;
  title: string;
  content: string;
};

export type Devotional = {
  id: string;
  title: string;
  date: string;
  verseReference: string;
  verse: string;
  readingTime: string;
  reflections: DevotionalReflection[];
  prayerPrompt: string;
};

export type Testimony = {
  id: string;
  author: string;
  content: string;
  date: string;
  status: "approved" | "pending";
};

export type MeetingGuide = {
  id: string;
  theme: string;
  date: string;
  startsAt: string;
  location: string;
  verseReference: string;
  verse: string;
  icebreaker: string;
  reflectionQuestions: string[];
  worshipSuggestions: string[];
  notices: string[];
};
