import { User, Occurrence } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Operador Padrão',
    email: 'operador@amazul.com',
    senha: 'operador123',
    role: 'operador',
  },
  {
    id: '2',
    name: 'Supervisor Chefe',
    email: 'supervisor@amazul.com',
    senha: 'supervisor123',
    role: 'supervisor',
  },
];

export const MOCK_OCCURRENCES: Occurrence[] = [
  {
    id: '1',
    title: 'Variação de pressão no setor primário',
    description: 'Detectada leve oscilação nos manômetros do circuito de refrigeração primária.',
    sector: 'Setor A - Refrigeração',
    alertLevel: 'atípica',
    status: 'em análise',
    createdAt: new Date().toISOString(),
    author: 'Operador Padrão',
  },
  {
    id: '2',
    title: 'Nível de radiação estável',
    description: 'Leituras perimetrais dentro dos parâmetros nominais e esperados.',
    sector: 'Setor B - Perímetro',
    alertLevel: 'normal',
    status: 'resolvida',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    author: 'Supervisor Chefe',
  },
];