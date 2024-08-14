type LogInError = "email" | "password";

type LogInErrors = Record<LogInError, string | null>;

export type { LogInError, LogInErrors };
