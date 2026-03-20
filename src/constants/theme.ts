export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  title: string;
}

export const COLORS = {
  bg: "#000000",
  black: "#000000",
  textInverse: "#000000",
  sidebarBg: "#2c2c2c",
  sidebarPanel: "#1c1c1c",
  surface: "#383838",
  surfaceAlt: "#2a2a2a",
  surfaceElevated: "#333333",
  border: "#404040",
  borderSoft: "rgba(255,255,255,0.1)",
  borderStrong: "rgba(255,255,255,0.3)",
  textPrimary: "#ececec",
  textHeading: "#f0f0f0",
  textSecondary: "#9a9a9a",
  textMuted: "#555555",
  textPlaceholder: "#666666",
  accent: "#ffffff",
  white: "#ffffff",
  danger: "#ef4444",
  warning: "#facc15",
  userBubble: "#141414",
  userBubbleBorder: "rgba(255,255,255,0.08)",
  inputBg: "#0d0d0d",
  green: "#d6d6d6",
  sessionActive: "#3a3a3a",
  searchBg: "#383838",
  avatarUserBg: "#4a4a4a",
  sheetBg: "#212121",
  sheetBackdrop: "rgba(0,0,0,0.48)",
  overlaySoft: "rgba(0,0,0,0.22)",
  glassBg: "rgba(255,255,255,0.06)",
  glassBorder: "rgba(255,255,255,0.13)",
  glassShine: "rgba(255,255,255,0.04)",
  glassCardBorder: "rgba(255,255,255,0.14)",
  glassCardTint: "rgba(34,34,34,0.8)",
  glassCardFallback: "rgba(34,34,34,0.96)",
  surfaceSoft: "rgba(255,255,255,0.05)",
  surfaceStrong: "rgba(255,255,255,0.08)",
  divider: "rgba(255,255,255,0.1)",
  handle: "rgba(255,255,255,0.35)",
  headerIconBg: "rgba(255,255,255,0.15)",
  headerIcon: "rgba(255,255,255,0.72)",
  headerAction: "rgba(255,255,255,0.78)",
  overlay: "rgba(0,0,0,0.4)",
  hamburger: "#aaaaaa",
} as const;

export const SUGGESTIONS = [
  "Dia nge-ghosting setelah jalan bareng",
  "Cara bikin dia penasaran sama gue",
  "Bedah screenshot chat gue",
];

export const GREETING =
  "Yo bro, gue Signal AI - dating coach lo. Mau bedah chat, baca sinyal cewek, atau cari strategi? Drop aja di sini.";

export const DUMMY_SESSIONS: ChatSession[] = [
  { id: "1", title: "Dia ghosting habis jalan" },
  { id: "2", title: "PDKT 7 hari game plan" },
  { id: "3", title: "Bedah chat screenshot" },
  { id: "4", title: "Cara reply kalau dia cold" },
];
