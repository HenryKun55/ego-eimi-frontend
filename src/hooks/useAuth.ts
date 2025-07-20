import { useState } from 'react'
import axios from 'axios'
import {
  AuthRequestSchema,
  AuthResponseSchema,
} from '../lib/schemas'
import { z } from 'zod'

export function useAuth() {
  const [token, setToken] = useState<string | null>(null)
  const [email, setEmail] = useState<string>('')

  const login = async (input: z.infer<typeof AuthRequestSchema>) => {
    const validated = AuthRequestSchema.safeParse(input)
    if (!validated.success) throw new Error('❌ Credenciais inválidas')

    const response = await axios.post('http://localhost:3000/auth/login', input)

    const parsed = AuthResponseSchema.safeParse(response.data)
    if (!parsed.success) throw new Error('❌ Resposta inválida do servidor')

    setToken(parsed.data.access_token)
    setEmail(input.email)
  }

  const logout = () => {
    setToken(null)
    setEmail('')
  }

  return { token, email, login, logout, isAuthenticated: !!token }
}
