import { z } from 'zod'

export const AskRequestSchema = z.object({
  question: z.string().min(1, 'Digite uma pergunta'),
})

export const AskChunkSchema = z.object({
  content: z.string(),
  metadata: z.object({
    text: z.string(),
    documentId: z.string(),
    chunkIndex: z.number().optional(),
    startIndex: z.number().optional(),
    endIndex: z.number().optional(),
    sourceName: z.string().optional(),
    requiredRole: z.string().optional(),
  }),
  score: z.number(),
})

export const AskResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    answer: z.string(),
    chunks: z.array(AskChunkSchema),
  }),
  message: z.string(),
})

export const AuthRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(4),
})

export const AuthResponseSchema = z.object({
  access_token: z.string(),
})
