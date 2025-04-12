export type APIResponse = {
  status: boolean;
  message: string;
  data: {
    userId: string;
    name: string;
    email: string;
  } | null;
  error?: {
    code: string;
    details?: Record<string, string[]>;
  };
};
