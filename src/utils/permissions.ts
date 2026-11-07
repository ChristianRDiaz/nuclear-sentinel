import { User } from "../types";

const getNormalizedRole = (user: User | null): string => {
  return user?.role?.trim().toLowerCase() || "";
};

export const canCreateOccurrence = (user: User | null): boolean => {
  const role = getNormalizedRole(user);
  return role === "operador" || role === "supervisor";
};

export const canResolveOccurrence = (user: User | null): boolean => {
  const role = getNormalizedRole(user);
  return role === "supervisor";
};

export const canManageSystem = (user: User | null): boolean => {
  const role = getNormalizedRole(user);
  return role === "supervisor";
};
