export type SessionUser = {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  firstName: string;
  lastName: string;
} | null;
