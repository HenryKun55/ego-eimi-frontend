import { useRef, useState } from 'react'
import { Button } from './ui/button'
import { useAuth } from '../hooks/useAuth'
import { useAskQuery } from '../hooks/useAskQuery'

export function AskForm() {
  const { token, email, login, logout, isAuthenticated } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [question, setQuestion] = useState('')
  const [lastQuestion, setLastQuestion] = useState<string | null>(null)
  const [answer, setAnswer] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const answerRef = useRef<HTMLDivElement>(null)

  const ask = useAskQuery(token)

  const handleLogin = async () => {
    setError(null)
    try {
      await login(form)
      setQuestion('')
      setAnswer(null)
      setError(null)
      setTimeout(() => textareaRef.current?.focus(), 100)
    } catch {
      setError('❌ Login inválido')
    }
  }

  const handleAsk = () => {
    if (!question.trim()) return

    setAnswer(null)
    setError(null)
    setLastQuestion(question)
    setQuestion('') // limpa o campo

    ask.mutate(
      { question },
      {
        onSuccess: (data) => {
          setAnswer(data.answer)
          setTimeout(() => {
            answerRef.current?.scrollIntoView({ behavior: 'smooth' })
          }, 100)
        },
        onError: (error) =>
          setError('❌ Erro ao consultar o backend: ' + error),
      }
    )
  }

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Ego Eimi - Demo RAG</h1>

      {!isAuthenticated ? (
        <form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault()
            handleLogin()
          }}
        >
          <input
            className="w-full border rounded p-2 text-sm"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm((f) => ({ ...f, email: e.target.value }))
            }
          />
          <input
            className="w-full border rounded p-2 text-sm"
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
          />
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 italic">
              Logado como <strong>{email}</strong>
            </p>
            <Button variant="outline" onClick={logout}>
              Sair
            </Button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleAsk()
            }}
            className="space-y-2"
          >
            <textarea
              ref={textareaRef}
              className="w-full border rounded-lg p-2 text-sm"
              rows={4}
              placeholder="Digite sua pergunta..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleAsk()
                }
              }}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={!question.trim() || ask.isPending}
            >
              {ask.isPending ? 'Consultando...' : 'Perguntar'}
            </Button>
          </form>

          {lastQuestion && answer && (
            <div
              ref={answerRef}
              className="bg-green-100 border border-green-400 p-3 rounded text-sm whitespace-pre-wrap"
            >
              <strong>Pergunta:</strong> {lastQuestion}
              <br />
              <br />
              <strong>Resposta:</strong> {answer}
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 p-3 rounded text-sm text-red-600">
              {error}
            </div>
          )}
        </>
      )}
    </div>
  )
}
