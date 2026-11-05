export type AlertLevel = "normal" | "atípica" | "crítica";
export type OccurrenceStatus =
  | "aberta"
  | "em análise"
  | "resolvida"
  | "pendente";

export interface Occurrence {
  id: string;
  title: string;
  description: string;
  sector: string;
  alertLevel: AlertLevel;
  status: OccurrenceStatus;
  createdAt: string;
  author: string;
  resolvedBy?: string;
  resolutionNotes?: string;
}
