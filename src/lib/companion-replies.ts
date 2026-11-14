type ReplyTopic =
  | "civic"
  | "legal"
  | "health"
  | "work"
  | "learn"
  | "create"
  | "capital"
  | "play"
  | "safety"
  | "general";

const OPENERS: Record<ReplyTopic, string> = {
  civic:
    "Let's sort this out together. Tell me which document or service you need — ID, permit, municipal account — and your province, and I'll walk you through the steps in plain language.",
  legal:
    "I can help you understand your rights here. This isn't a substitute for a lawyer, but I can explain the process, the documents involved, and what to ask for.",
  health:
    "I hear you. I can share general guidance and point you to the right kind of care — I won't diagnose, but I can help you prepare for a clinic visit.",
  work:
    "Let's get this moving. Tell me a bit more — are we writing, planning, or job hunting — and I'll draft something you can use right away.",
  learn:
    "Happy to explain. Give me the topic and how deep you want to go, and I'll break it down step by step.",
  create:
    "Let's make something. Tell me the format — a post, a track idea, a pitch, a design brief — and the vibe you're going for.",
  capital:
    "Let's look at the numbers. Tell me your income, what's coming up, and what you're saving toward, and I'll help you plan it out.",
  play:
    "Sawubona! Let's talk culture, music or something fun. What are you in the mood for?",
  safety:
    "I'm with you. If you're in immediate danger, contact local emergency services first. Otherwise, tell me what's happening and I'll help you document it and know your options.",
  general:
    "I'm ACHUZI, your companion for civic help, health, work, learning, creativity, money and safety — all in your language. What's on your mind?",
};

const FOLLOW_UPS: Record<ReplyTopic, string[]> = {
  civic: [
    "Here's what's usually needed: a valid ID, proof of address, and the correct form for your municipality.",
    "Most offices are busiest early morning — going after 11am often means a shorter queue.",
    "Want me to draft a checklist you can screenshot and take with you?",
  ],
  legal: [
    "Generally, you have the right to ask for written reasons for any decision that affects you.",
    "Keep copies of everything — contracts, messages, receipts — dated and in one place.",
    "If this becomes a dispute, Legal Aid South Africa offers free consultations for qualifying cases.",
  ],
  health: [
    "If symptoms are severe or sudden, please go to your nearest clinic or emergency room right away.",
    "Your nearest public clinic can usually see you without an appointment for non-emergencies.",
    "Want me to help you write down your symptoms clearly before you go in?",
  ],
  work: [
    "Here's a quick structure: context, your ask, and a clear next step.",
    "Keep it short — most readers decide in the first two lines.",
    "Want me to turn this into three versions: formal, friendly, and WhatsApp-ready?",
  ],
  learn: [
    "Let's start with the big picture, then zoom into the part that's confusing.",
    "I'll use an example from everyday life to make it stick.",
    "Want a short quiz afterwards to check it landed?",
  ],
  create: [
    "Here's a first draft direction — tell me what to push further and what to dial back.",
    "I can give you three variations in different tones if you want options.",
    "Want this exported as something you can share right away?",
  ],
  capital: [
    "A simple starting split: 50% needs, 30% wants, 20% savings — we can adjust it to fit your reality.",
    "Stokvels work well for disciplined group saving — want a simple structure for one?",
    "Want me to build you a one-page monthly budget you can fill in?",
  ],
  play: [
    "Amapiano, Afro House, or something more laid back today?",
    "There's a Tshivenda proverb for that — want to hear it?",
    "I can suggest a playlist direction or a cultural fact to go with it.",
  ],
  safety: [
    "I'm logging the time and details here. Would you like me to open Protection Mode for live guidance?",
    "Your safety comes first — is there someone nearby you trust who you can call right now?",
    "I can help you write down what happened while it's fresh, in case you need it later.",
  ],
  general: [
    "You can also open Protection Mode any time from the Safety tile if you ever need it.",
    "I work in English, Tshivenda, Sepedi, Xitsonga and Siswati — just switch languages any time.",
    "What would be most useful to you right now?",
  ],
};

export function resolveTopic(raw: string | null | undefined): ReplyTopic {
  const topics: ReplyTopic[] = [
    "civic",
    "legal",
    "health",
    "work",
    "learn",
    "create",
    "capital",
    "play",
    "safety",
  ];
  const value = (raw ?? "").toLowerCase();
  return (topics.find((t) => t === value) ?? "general") as ReplyTopic;
}

export function openingLine(topic: ReplyTopic): string {
  return OPENERS[topic];
}

export function nextReply(topic: ReplyTopic, turn: number): string {
  const pool = FOLLOW_UPS[topic];
  return pool[turn % pool.length];
}
