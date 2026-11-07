import { AlertLevel } from "../types";

// Listas de palavras-chave organizadas por severidade
const CRITICAL_KEYWORDS = [
  "vazamento",
  "radiação",
  "radiacao",
  "critico",
  "crítico",
  "urgente",
  "emergência",
  "emergencia",
  "incêndio",
  "incendio",
  "explosão",
  "explosao",
  "falha grave",
  "invasão",
  "invasao",
  "contenção",
  "contencao",
];

const ATYPICAL_KEYWORDS = [
  "oscilação",
  "oscilacao",
  "anomalia",
  "estranho",
  "ruído",
  "ruido",
  "aquecimento",
  "desvio",
  "atraso",
  "instável",
  "instavel",
  "alerta",
  "sensor",
];

export const autoClassifyOccurrence = (
  title: string,
  description: string,
): AlertLevel => {
  const fullText = `${title} ${description}`.toLowerCase();

  // Check para nível Crítico
  const isCritical = CRITICAL_KEYWORDS.some((word) => fullText.includes(word));
  if (isCritical) return "crítica";

  // Check para nível Atípico
  const isAtypical = ATYPICAL_KEYWORDS.some((word) => fullText.includes(word));
  if (isAtypical) return "atípica";

  // Padrão se não houver termos de risco
  return "normal";
};
