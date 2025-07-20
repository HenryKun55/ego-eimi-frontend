import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { AskRequestSchema, AskResponseSchema } from '../lib/schemas'
import { z } from 'zod'

type AskInput = z.infer<typeof AskRequestSchema>

export const useAskQuery = (token?: string | null) => {
  return useMutation({
    mutationFn: async (input: AskInput) => {
      const validated = AskRequestSchema.safeParse(input)
      if (!validated.success) throw new Error('❌ Payload inválido')

      const response = await axios.post('http://localhost:3000/ask', input, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      })

      const parsed = AskResponseSchema.safeParse(response.data)
      if (!parsed.success) throw new Error('❌ Resposta inválida do servidor')

      return parsed.data.data
    },
  })
}
