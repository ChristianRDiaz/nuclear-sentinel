import { AlertLevel } from "../types";

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

const STABLE_MODIFIERS = [
  "estável",
  "estavel",
  "normal",
  "controlado",
  "seguro",
  "normalizado",
];

export const autoClassifyOccurrence = (
  title: string,
  description: string,
): AlertLevel => {
  const fullText = `${title} ${description}`.toLowerCase();

  const hasStableContext = STABLE_MODIFIERS.some((mod) =>
    fullText.includes(mod),
  );

  const isCritical = CRITICAL_KEYWORDS.some((word) => fullText.includes(word));

  if (isCritical && !hasStableContext) {
    return "crítica";
  }

  const isAtypical = ATYPICAL_KEYWORDS.some((word) => fullText.includes(word));
  if (isAtypical || (isCritical && hasStableContext)) {
    return "atípica";
  }

  return "normal";
};
