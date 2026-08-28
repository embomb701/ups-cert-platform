// Data for the Field Service Archetype quiz — a light, for-fun personality
// quiz (not a scientific instrument) built on the classic 12-archetype
// framework, reskinned with a mythological figure per archetype instead of
// the usual "Ruler / Sage / Magician" labels. Pantheon is deliberately mixed
// (Greek, Norse, Roman) rather than one culture per archetype.

export type ArchetypeId =
  | 'ruler' | 'sage' | 'magician' | 'hero' | 'outlaw' | 'explorer'
  | 'creator' | 'caregiver' | 'everyman' | 'jester' | 'lover' | 'innocent';

export interface Archetype {
  id: ArchetypeId;
  archetypeName: string;
  godName: string;
  pantheon: 'Greek' | 'Norse' | 'Roman';
  epithet: string;
  description: string;
  traits: string[];
}

export const ARCHETYPES: Record<ArchetypeId, Archetype> = {
  ruler: {
    id: 'ruler',
    archetypeName: 'The Ruler',
    godName: 'Zeus',
    pantheon: 'Greek',
    epithet: 'King of the Sky, Keeper of Order',
    description:
      "Zeus didn't ask to lead — he took the sky because someone had to hold it together. On a crew, you're the one who steps up when the schedule falls apart and just starts making calls. People follow you because you're usually right, not because you asked them to.",
    traits: ['Decisive', 'Accountable', 'In charge'],
  },
  sage: {
    id: 'sage',
    archetypeName: 'The Sage',
    godName: 'Athena',
    pantheon: 'Greek',
    epithet: 'Goddess of Wisdom, Born Fully Armed',
    description:
      "Athena didn't fight for the sake of fighting — she studied the board first. You're the one who reads the manual before touching the panel, who wants to understand the failure, not just clear the alarm. Slower to start, almost never wrong.",
    traits: ['Deliberate', 'Sharp', 'Thorough'],
  },
  magician: {
    id: 'magician',
    archetypeName: 'The Magician',
    godName: 'Odin',
    pantheon: 'Norse',
    epithet: 'The All-Father, Who Traded an Eye for Wisdom',
    description:
      "Odin gave up an eye at the well of knowledge because he wanted to see what nobody else could. You're the one who finds the fix that isn't in any manual — the workaround that makes no sense until it works.",
    traits: ['Resourceful', 'Unconventional', 'A step ahead'],
  },
  hero: {
    id: 'hero',
    archetypeName: 'The Hero',
    godName: 'Hercules',
    pantheon: 'Roman',
    epithet: 'Twelve Labors, Zero Excuses',
    description:
      "Hercules didn't get to pick easy jobs — he got the ones nobody else could finish. You're the tech who gets the call when it's actually serious, and you don't call back saying it can't be done.",
    traits: ['Reliable under pressure', 'Relentless', 'Proven'],
  },
  outlaw: {
    id: 'outlaw',
    archetypeName: 'The Outlaw',
    godName: 'Loki',
    pantheon: 'Norse',
    epithet: 'The Trickster Who Answers to No One',
    description:
      "Loki broke rules that deserved breaking, and got blamed for plenty that weren't his fault either. You've got no patience for a process that only exists because \"that's how it's always been done\" — and you're usually the one who finds the better way.",
    traits: ['Independent', 'Unconventional', 'Allergic to red tape'],
  },
  explorer: {
    id: 'explorer',
    archetypeName: 'The Explorer',
    godName: 'Mercury',
    pantheon: 'Roman',
    epithet: 'Messenger of the Gods, Never in One Place Long',
    description:
      "Mercury's whole job was motion — between worlds, between people, never sitting still. You're the one who took this job partly for the travel, and you've got a hotel-points system nobody asked about but everyone should copy.",
    traits: ['Restless', 'Adaptable', 'Always halfway to the next site'],
  },
  creator: {
    id: 'creator',
    archetypeName: 'The Creator',
    godName: 'Hephaestus',
    pantheon: 'Greek',
    epithet: 'God of the Forge, Builder of Everything Worth Having',
    description:
      "Hephaestus was the only Olympian who actually made things with his hands, while the rest of them just gave orders. You're happiest with something in pieces on the floor in front of you, and happier still when you put it back together better than it was.",
    traits: ['Hands-on', 'Practical', 'Takes pride in the work itself'],
  },
  caregiver: {
    id: 'caregiver',
    archetypeName: 'The Caregiver',
    godName: 'Vesta',
    pantheon: 'Roman',
    epithet: 'Keeper of the Sacred Flame',
    description:
      "Vesta's whole job was making sure the fire never went out — not glamorous, absolutely essential. You're the one who checks on the new guy, remembers who's got a kid's recital this week, and keeps things running so nobody else has to think about it.",
    traits: ['Steady', 'Protective', 'Keeps the flame lit for everyone else'],
  },
  everyman: {
    id: 'everyman',
    archetypeName: 'The Everyman',
    godName: 'Thor',
    pantheon: 'Norse',
    epithet: 'Protector of Midgard, Friend of the Common Man',
    description:
      "Thor wasn't the cleverest god on the mountain, but he showed up, every time, for people who couldn't fight their own battles. You're the one everybody wants on a job — not flashy, just there, every time, doing the work.",
    traits: ['Dependable', 'Humble', 'No ego about it'],
  },
  jester: {
    id: 'jester',
    archetypeName: 'The Jester',
    godName: 'Bacchus',
    pantheon: 'Roman',
    epithet: 'God of Wine, Ruiner of Bad Moods',
    description:
      "Bacchus showed up to remind everyone that even serious work doesn't have to be miserable. You're the one who makes a 14-hour shift bearable — the joke at the right moment, the reason the whole crew still likes each other by Friday.",
    traits: ['Light on his feet', 'Morale', 'Keeps it human'],
  },
  lover: {
    id: 'lover',
    archetypeName: 'The Lover',
    godName: 'Freya',
    pantheon: 'Norse',
    epithet: 'Goddess of Love, War, and Everything Worth Fighting For',
    description:
      "Freya didn't separate love from loyalty — to her they were the same thing. You're the one who stays close to the people who matter, on the road or off it, and treats every relationship — coworker, customer, family — like it's worth the effort.",
    traits: ['Loyal', 'Connected', 'All-in on the people who matter'],
  },
  innocent: {
    id: 'innocent',
    archetypeName: 'The Innocent',
    godName: 'Apollo',
    pantheon: 'Greek',
    epithet: 'God of Light, Truth, and Clean Answers',
    description:
      "Apollo didn't deal in half-truths — light doesn't leave much room for shadow. You're the one who says what's actually going on, does what you said you'd do, and trusts that doing it right is enough, even when cutting a corner would be easier.",
    traits: ['Honest', 'Straightforward', 'Trusts the process'],
  },
};

export interface ArchetypeQuizOption {
  label: string;
  archetype: ArchetypeId;
}

export interface ArchetypeQuizQuestion {
  question: string;
  options: ArchetypeQuizOption[];
}

export const ARCHETYPE_QUESTIONS: ArchetypeQuizQuestion[] = [
  {
    question: 'Something breaks on-site and nobody knows why. You:',
    options: [
      { label: 'Take charge and start directing the fix', archetype: 'ruler' },
      { label: 'Slow down and diagnose before touching anything', archetype: 'sage' },
      { label: "Try the unconventional fix nobody else would", archetype: 'magician' },
      { label: "Just start working it with your hands until it gives", archetype: 'creator' },
    ],
  },
  {
    question: 'Your crew would describe you as:',
    options: [
      { label: 'The one who gets it done, whatever it takes', archetype: 'hero' },
      { label: "The one who doesn't play by dumb rules", archetype: 'outlaw' },
      { label: 'The one everyone counts on, no drama', archetype: 'everyman' },
      { label: "The one who keeps it fun even when it's rough", archetype: 'jester' },
    ],
  },
  {
    question: 'A rookie joins your crew. Your first move:',
    options: [
      { label: "Make sure they don't get hurt before anything else", archetype: 'caregiver' },
      { label: 'Tell them straight what’s expected, no sugarcoating', archetype: 'innocent' },
      { label: "Take them somewhere they've never worked before", archetype: 'explorer' },
      { label: "Pair them with someone who'll actually click with them", archetype: 'lover' },
    ],
  },
  {
    question: 'Best part of the job, honestly:',
    options: [
      { label: 'Running the show, making the calls', archetype: 'ruler' },
      { label: 'Learning something new about how things actually work', archetype: 'sage' },
      { label: "The next trip you haven't been on yet", archetype: 'explorer' },
      { label: "Building something that wasn't there before", archetype: 'creator' },
    ],
  },
  {
    question: 'Worst part of the job, honestly:',
    options: [
      { label: "Following rules that don't make sense", archetype: 'outlaw' },
      { label: 'Missing time with people who matter', archetype: 'lover' },
      { label: "Sitting still when there's nothing to fix", archetype: 'hero' },
      { label: "Watching a new guy struggle and not being able to help fast enough", archetype: 'caregiver' },
    ],
  },
  {
    question: 'A random free evening, your move:',
    options: [
      { label: 'Loud bar, good music, blow off steam with the crew', archetype: 'jester' },
      { label: 'Quiet night in with someone who actually gets you', archetype: 'lover' },
      { label: 'Reading up on something totally unrelated to work', archetype: 'sage' },
      { label: 'Already looking up flights somewhere new', archetype: 'explorer' },
    ],
  },
  {
    question: 'When the whole schedule falls apart:',
    options: [
      { label: 'You take over and rebuild the plan', archetype: 'ruler' },
      { label: 'You find an angle nobody else considered', archetype: 'magician' },
      { label: 'You just keep working, one thing at a time', archetype: 'everyman' },
      { label: 'You crack a joke so nobody panics', archetype: 'jester' },
    ],
  },
  {
    question: 'What people actually come to you for:',
    options: [
      { label: 'A straight answer, no spin', archetype: 'innocent' },
      { label: 'Backup when things get serious', archetype: 'hero' },
      { label: 'A creative way out of a dead end', archetype: 'magician' },
      { label: 'Someone to actually listen', archetype: 'caregiver' },
    ],
  },
  {
    question: 'Your idea of doing it right:',
    options: [
      { label: "Doing exactly what you said you'd do, every time", archetype: 'innocent' },
      { label: 'Making the people around you better at their job', archetype: 'caregiver' },
      { label: 'Never doing the same job the same way twice', archetype: 'outlaw' },
      { label: "Leaving with your name on something that lasts", archetype: 'creator' },
    ],
  },
  {
    question: "If nobody was watching, you'd still:",
    options: [
      { label: 'Check the work twice', archetype: 'everyman' },
      { label: 'Take the harder, more interesting route', archetype: 'explorer' },
      { label: "Cut the corner that doesn't actually matter", archetype: 'outlaw' },
      { label: 'Make sure everyone else got taken care of first', archetype: 'lover' },
    ],
  },
];

/** Fixed tie-break order — used only when two+ archetypes are tied for first. */
const TIE_BREAK_ORDER: ArchetypeId[] = [
  'ruler', 'hero', 'creator', 'sage', 'magician', 'caregiver',
  'explorer', 'everyman', 'outlaw', 'lover', 'jester', 'innocent',
];

export function topArchetype(tally: Partial<Record<ArchetypeId, number>>): ArchetypeId {
  let best: ArchetypeId = TIE_BREAK_ORDER[0];
  let bestScore = -1;
  for (const id of TIE_BREAK_ORDER) {
    const score = tally[id] ?? 0;
    if (score > bestScore) {
      bestScore = score;
      best = id;
    }
  }
  return best;
}
