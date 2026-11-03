export type Role = 'operador' | 'supervisor';

export interface User {
  id: string;
  name: string;
  email: string;
  senha: string;
  role: Role;
}

export type AlertLevel = 'normal' | 'atípica' | 'crítica';

export type OccurrenceStatus = 'aberta' | 'em análise' | 'resolvida';

export interface Occurrence {
  id: string;
  title: string;
  description: string;
  sector: string;
  alertLevel: AlertLevel;
  status: OccurrenceStatus;
  createdAt: string;
  author: string;
}