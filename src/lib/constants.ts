export const POSITION_MAP: Record<number, string> = {
  1: "GKP",
  2: "DEF",
  3: "MID",
  4: "FWD",
};

export const POSITION_FULL: Record<number, string> = {
  1: "Goalkeeper",
  2: "Defender",
  3: "Midfielder",
  4: "Forward",
};

export const POSITION_COLORS: Record<number, string> = {
  1: "#f59e0b", // amber
  2: "#06d6a0", // emerald
  3: "#22d3ee", // cyan
  4: "#f43f5e", // rose
};

export const TEAM_SHORT_NAMES: Record<number, string> = {
  1: "ARS",
  2: "AVL",
  3: "BOU",
  4: "BRE",
  5: "BHA",
  6: "CHE",
  7: "CRY",
  8: "EVE",
  9: "FUL",
  10: "IPS",
  11: "LEI",
  12: "LIV",
  13: "MCI",
  14: "MUN",
  15: "NEW",
  16: "NFO",
  17: "SOU",
  18: "TOT",
  19: "WHU",
  20: "WOL",
};

export const STATUS_MAP: Record<string, { label: string; color: string }> = {
  a: { label: "Available", color: "#06d6a0" },
  d: { label: "Doubtful", color: "#f59e0b" },
  i: { label: "Injured", color: "#ef4444" },
  s: { label: "Suspended", color: "#ef4444" },
  u: { label: "Unavailable", color: "#ef4444" },
  n: { label: "Not available", color: "#94a3b8" },
};

export const FDR_COLORS: Record<number, string> = {
  1: "#06d6a0", // very easy - emerald
  2: "#22d3ee", // easy - cyan
  3: "#94a3b8", // medium - gray
  4: "#f59e0b", // hard - amber
  5: "#ef4444", // very hard - red
};

export const CHART_COLORS = [
  "#7c3aed", // purple
  "#06d6a0", // emerald
  "#22d3ee", // cyan
  "#f59e0b", // amber
  "#f43f5e", // rose
];
