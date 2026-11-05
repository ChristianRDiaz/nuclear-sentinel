import { User, Occurrence } from "../types";

export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Operador Padrão",
    email: "operador@amazul.com",
    senha: "operador123",
    role: "operador",
  },
  {
    id: "2",
    name: "Supervisor Chefe",
    email: "supervisor@amazul.com",
    senha: "supervisor123",
    role: "supervisor",
  },
];

export const MOCK_OCCURRENCES: Occurrence[] = [
  {
    id: "1",
    title: "Variação de pressão no setor primário",
    description:
      "Detectada leve oscilação nos manômetros do circuito de refrigeração primária.",
    sector: "Setor A - Refrigeração",
    alertLevel: "atípica",
    status: "em análise",
    createdAt: new Date().toISOString(),
    author: "Operador Padrão",
  },
  {
    id: "2",
    title: "Nível de radiação estável",
    description:
      "Leituras perimetrais dentro dos parâmetros nominais e esperados.",
    sector: "Setor B - Perímetro",
    alertLevel: "normal",
    status: "resolvida",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    author: "Supervisor Chefe",
  },
  {
    id: "3",
    title: "Oscilação crítica no núcleo do reator",
    description:
      "Queda súbita de fluxo detectada nos sensores de segurança principais. Ação imediata requerida.",
    sector: "Setor C - Contenção",
    alertLevel: "crítica",
    status: "aberta",
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    author: "Operador Padrão",
  },
  {
    id: "4",
    title: "Falha intermitente na câmera de segurança 04",
    description:
      "Perda de sinal de vídeo no setor de processamento de resíduos.",
    sector: "Setor D - Resíduos",
    alertLevel: "atípica",
    status: "em análise",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    author: "Supervisor Chefe",
  },
  {
    id: "5",
    title: "Manutenção preventiva concluída",
    description:
      "Substituição de filtros de ar HEPA realizada com sucesso na ala administrativa.",
    sector: "Setor E - Administrativo",
    alertLevel: "normal",
    status: "resolvida",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    author: "Operador Padrão",
  },
  {
    id: "6",
    title: "Superaquecimento detectado no transformador",
    description:
      "Temperatura acima do limite operacional na subestação elétrica secundária.",
    sector: "Setor F - Elétrica",
    alertLevel: "crítica",
    status: "aberta",
    createdAt: new Date(Date.now() - 900000).toISOString(),
    author: "Supervisor Chefe",
  },
];
