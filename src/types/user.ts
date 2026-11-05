export type UserRole = "operador" | "supervisor";

export interface User {
  id: string;
  name: string;
  email: string;
  senha?: string; 
  role: UserRole;
}
