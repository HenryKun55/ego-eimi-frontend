import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AuthRequestSchema, AuthResponseSchema } from "../lib/schemas";
import { z } from "zod";

const API_URL = import.meta.env.VITE_API_URL;

export function useAuth() {
  const mutation = useMutation({
    mutationFn: async (input: z.infer<typeof AuthRequestSchema>) => {
      const validated = AuthRequestSchema.safeParse(input);
      if (!validated.success) throw new Error("❌ Credenciais inválidas");

      const response = await axios.post(`${API_URL}/auth/login`, input);
      const parsed = AuthResponseSchema.safeParse(response.data);
      if (!parsed.success) throw new Error("❌ Resposta inválida do servidor");

      return {
        accessToken: parsed.data.access_token,
        email: input.email,
      };
    },
  });

  return {
    login: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    isAuthenticated: !!mutation.data?.accessToken,
    logout: () => mutation.reset(),
  };
}
