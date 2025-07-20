# 🎨 Ego Eimi - Frontend (TeamBrain)

Este é o frontend do MVP **TeamBrain**, parte do desafio técnico da Ego Eimi. Ele serve como interface de interação com o sistema RAG, permitindo que um usuário autenticado envie perguntas e visualize respostas contextualizadas com base nos documentos que tem permissão para acessar.

---

## ⚡ Tecnologias

- **React + Vite**: app moderno e leve
- **Tailwind CSS**: estilização rápida e responsiva
- **React Query**: cache e requisições eficientes
- **TypeScript**: segurança de tipos
- **Bun**: runtime moderno e rápido

---

## ▶️ Como rodar (modo isolado)

### 1. Configure o `.env`

```bash
VITE_API_URL=http://localhost:5173
```

---

### 2. Instale dependências

```bash
bun install
```

---

### 3. Execute localmente

```bash
bun run dev
```

Acesse via: [http://localhost:5173](http://localhost:5173)

---

## 🐳 Como rodar via Docker (recomendado)

Use o `docker-compose` da raiz do projeto:

```bash
docker compose up -d
```

O frontend estará acessível via:

📍 [http://localhost:4173](http://localhost:4173)

---

## 📁 Estrutura

```
src/
├── components/
│   ├── ask.form.tsx         ← formulário principal
│   ├── query.provider.tsx   ← React Query Provider
│   └── ui/                  ← botão reutilizável
├── hooks/
│   ├── useAuth.ts           ← login automático
│   └── useAskQuery.ts       ← chamada RAG
├── lib/
│   ├── schemas.ts           ← validações
│   └── utils.ts             ← utilitários gerais
├── App.tsx
└── main.tsx
```

---

## 💬 Comportamento

- Voceê loga com algum usuário **[admin|henrique|felipe|viewer]@empresa.com**
- Senha padrão: **123456**
- Mostra o formulário de pergunta e renderiza a resposta.
- Usa `React Query` para gerenciar a chamada ao backend.

---

## 🧪 Testes

Este frontend não possui testes automatizados implementados, dado o escopo do desafio. Mas está preparado para receber testes com Vitest + Testing Library.

---

## 🌱 Possíveis Melhorias Futuras

- Tela de login com autenticação real
- Feedback visual de loading/erro
- Testes de UI com Vitest
- Temas e acessibilidade

---

> Feito para ser leve, funcional e direto ao ponto, com uma coquinha gelada.
