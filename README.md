![Let's Go Atira Logo](public/logo.png)

## Let's go Atira — Web

Interface web do projeto **Let's go Atira**, uma plataforma para registrar e guardar os momentos dos eventos do MEJ (Movimento Empresa Júnior) da **Atria Jr.** — a empresa júnior da Faculdade de Tecnologia da Unicamp Limeira.

O **Atira** é o mascote da Atria Jr. e dá nome ao projeto.

🔗 **Link:** [`letsgoatira.vercel.app`](https://letsgoatira.vercel.app)

---

## 🛠️ Tecnologias

- [Next.js 16](https://nextjs.org/) — framework React com App Router e Server Actions
- [React 19](https://react.dev/) — biblioteca de UI
- [Tailwind CSS v4](https://tailwindcss.com/) — estilização utilitária
- [Headless UI](https://headlessui.com/) — componentes de UI acessíveis (dialogs)
- [TanStack Query](https://tanstack.com/query) — gerenciamento de estado assíncrono
- [Lucide React](https://lucide.dev/) — ícones
- [TypeScript](https://www.typescriptlang.org/) — tipagem estática

---

## 📋 Funcionalidades

- Listagem e criação de **eventos** com imagem de capa, data e localização
- Registro de **presenças** em eventos por e-mail
- Upload de **fotos** nos eventos
- Listagem e cadastro de **membros** com foto de perfil e cargo
- Interface totalmente **responsiva** para mobile e desktop

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 20+
- API do backend rodando (veja o [repositório da API](https://github.com/thomhenriq/letsgoatira-backend))

### Instalação

```bash
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
API_URL=https://letsgoatira-backend.onrender.com
```

| Variável  | Descrição              |
| --------- | ---------------------- |
| `API_URL` | URL base da API backend |

### Rodando

```bash
# desenvolvimento
npm run dev

# build de produção
npm run build
npm run start
```

A aplicação sobe por padrão em `http://localhost:3000`.

---

## 📁 Estrutura do projeto

```
src/
├── api/              # Funções de fetch para a API (events, members)
├── app/
│   ├── (app)/        # Rotas autenticadas com layout compartilhado
│   │   ├── page.tsx          # Home — visão geral
│   │   ├── eventos/          # Listagem e detalhe de eventos
│   │   └── membros/          # Listagem de membros
│   ├── api/          # Route handlers Next.js (ex: upload de fotos)
│   └── globals.css
├── components/       # Componentes reutilizáveis (cards, dialogs, header…)
├── lib/              # Utilitários: actions, api client, env
├── providers/        # Providers React (TanStack Query)
└── types/            # Tipos TypeScript compartilhados
```

---

## 🏢 Sobre a Atria Jr.

A [Atria Jr.](https://atriajr.com.br/) é a empresa júnior da Faculdade de Tecnologia (FT) da Unicamp, campus Limeira. Faz parte do MEJ — Movimento Empresa Júnior — e desenvolve projetos de tecnologia com impacto real.
