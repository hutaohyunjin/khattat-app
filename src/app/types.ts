export type LetterEntry = {
  arabic: string; name: string; roman: string;
  detail: {
    arabicName: string; globalIndex: number; nibAngle: string;
    about: string; strokes: string[]; proportionTip: string;
    forms: { isolated: string; initial: string; medial: string; final: string };
  };
};
export type LetterGroup = { num: string; name: string; label: string; trait: string; available: boolean; letters: LetterEntry[]; };
export type Tab = "home" | "styles" | "practice" | "ranks";
