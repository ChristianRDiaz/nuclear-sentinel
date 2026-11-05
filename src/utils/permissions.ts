import { User } from "../types";

export const canCreateOccurrence = (user: User | null): boolean => {
  if (!user) return false;
  return user.role === "operador" || user.role === "supervisor";
};

export const canResolveOccurrence = (user: User | null): boolean => {
  if (!user) return false;
  return user.role === "supervisor";
};
