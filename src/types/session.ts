export type SessionUser = {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  firstName: string;
  lastName: string;
  phone: string;
  primaryRole: string;
} | null;

export type AuthenticatedUser = NonNullable<SessionUser>;
