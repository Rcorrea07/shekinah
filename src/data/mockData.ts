import type {
  Devotional,
  EventItem,
  MeetingGuide,
  PrayerRequest,
  Testimony,
} from "../types/domain";

export const meetingGuide: MeetingGuide = {
  id: "meeting-2026-06-12",
  theme: "Fogo que permanece",
  date: "2026-06-12T20:00:00-03:00",
  startsAt: "20:00",
  location: "Casa da Ana e do Victor",
  verseReference: "Lucas 24:32",
  verse:
    "Porventura, não ardia o nosso coração, quando ele, pelo caminho, nos falava?",
  icebreaker:
    "Compartilhe uma memória simples em que você percebeu cuidado de Deus no meio de uma semana comum.",
  reflectionQuestions: [
    "O que tem apagado nossa sensibilidade à presença de Deus?",
    "Que práticas ajudam a manter o coração aceso sem transformar fé em performance?",
    "Como a célula pode ser um lugar seguro para recomeços reais?",
  ],
  worshipSuggestions: [
    "A Casa é Sua - Casa Worship",
    "Santo Pra Sempre - Central 3",
    "Acende Outra Vez - Jefferson & Suellen",
  ],
  notices: [
    "Levar um lanche simples para compartilhar após a palavra.",
    "Separar 10 minutos finais para oração em duplas.",
    "Confirmar presença dos visitantes até sexta às 12h.",
  ],
};

export const mockPrayerRequests: PrayerRequest[] = [
  {
    id: "prayer-1",
    name: "Shekinah",
    request:
      "Ore por direção nas decisões e por constância na rotina devocional.",
    isAnonymous: false,
    prayingCount: 0,
    createdAt: "2026-06-22T22:20:00-03:00",
    category: "direcao",
  },
  {
    id: "prayer-2",
    name: "Shekinah",
    request:
      "Orar pela cadeira!!! Para que cada vez mais pessoas consigam conhecer o amor de Cristo",
    isAnonymous: false,
    prayingCount: 0,
    createdAt: "2026-06-22T10:30:00-03:00",
    category: "gratidao",
  },
];

export const mockEvents: EventItem[] = [
  {
    id: "event-1",
    title: "Célula Shekinah",
    date: "2026-07-11T20:00:00-03:00",
    location: "Casa da Ryan",
    description:
      "Noite de comunhão, palavra, oração, adoração e lanche compartilhado.",
    actions: [
      {
        label: "Adicionar à agenda",
        kind: "calendar",
      },
      {
        label: "Ver detalhes",
        kind: "details",
      },
    ],
  },
  {
    id: "event-2",
    title: "Culto de Jovens",
    date: "2026-06-27T15:00:00-03:00",
    location: "IEQ SEDE",
    description:
      "Culto temático da copa!!! Venha com a camiseta do seu time ou da seleção brasileira para adorar a Deus juntos nesse clima de copa do mundo.",
    actions: [
      {
        label: "Copiar Pix",
        kind: "copyPix",
        value: "pix-shekinah@exemplo.com",
      },
      {
        label: "Ver detalhes",
        kind: "details",
      },
    ],
  },
  {
    id: "event-3",
    title: "Arraiá Shekinah",
    date: "2026-06-04T22:00:00-03:00",
    location: "Chácara Vitória",
    description:
      "Período estendido de louvor, intercessão, palavra e comunhão.",
    actions: [
      {
        label: "Adicionar à agenda",
        kind: "calendar",
      },
    ],
  },
];

export const mockDevotional: Devotional = {
  id: "devotional-2026-06-09",
  title: "Permanecer perto",
  date: "2026-06-09T07:00:00-03:00",
  verseReference: "João 15:5",
  verse:
    "Eu sou a videira, vós, os ramos. Quem permanece em mim, e eu, nele, esse dá muito fruto.",
  readingTime: "6 min",
  reflections: [
    {
      id: "reflection-1",
      title: "Fruto nasce de permanência",
      content:
        "Jesus não começa falando de produtividade, mas de ligação. Antes do fruto visível, existe uma vida escondida recebendo seiva.",
    },
    {
      id: "reflection-2",
      title: "Rotina também pode ser altar",
      content:
        "Nem toda experiência com Deus parece grande por fora. Permanecer, muitas vezes, é voltar ao lugar simples de escuta, confissão e obediência.",
    },
    {
      id: "reflection-3",
      title: "Comunhão sustenta o fogo",
      content:
        "A célula não substitui o secreto, mas ajuda a proteger o coração do isolamento. A chama cresce quando alguém ora junto.",
    },
  ],
  prayerPrompt:
    "Senhor, ensina-nos a permanecer em ti com alegria, verdade e constância durante a semana.",
};

export const mockTestimonies: Testimony[] = [
  {
    id: "testimony-1",
    author: "Rafa",
    content:
      "Depois do último encontro, consegui conversar com minha mãe com calma. Foi pequeno, mas senti Deus abrindo uma porta de reconciliação.",
    date: "2026-06-08T12:00:00-03:00",
    status: "approved",
  },
  {
    id: "testimony-2",
    author: "Anônimo",
    content:
      "Voltei a orar antes de dormir. Ainda estou recomeçando, mas a semana pareceu menos pesada.",
    date: "2026-06-06T22:40:00-03:00",
    status: "approved",
  },
  {
    id: "testimony-3",
    author: "Camila",
    content:
      "Recebi resposta de um processo seletivo e quero agradecer a Deus pela direção.",
    date: "2026-06-09T09:10:00-03:00",
    status: "pending",
  },

];
