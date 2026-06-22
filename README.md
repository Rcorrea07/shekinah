# Shekinah App

Aplicativo web da célula jovem Shekinah, feito em React + Vite + TypeScript.

O projeto centraliza informações importantes da célula, como pedidos de oração, avisos/eventos e testemunhos. A área de pedidos de oração usa Supabase para persistir os pedidos e Realtime para atualizar a tela quando novos pedidos ou contadores forem alterados.

## Tecnologias

- React
- TypeScript
- Vite
- React Router
- Supabase
- Tailwind CSS
- Lucide React

## Requisitos

- Node.js instalado
- npm instalado
- Um projeto Supabase configurado

## Como Rodar Localmente

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-publica-anon
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O app ficará disponível, normalmente, em:

```bash
http://localhost:5173
```

Se a porta estiver em uso, o Vite abrirá em outra porta.

## Configuração do Supabase

O app espera uma tabela chamada `prayer_requests`.

Existe um script SQL pronto em:

```bash
supabase/prayer_requests_setup.sql
```

Execute esse script no SQL Editor do Supabase. Ele:

- adiciona `id` e `createdAt` caso não existam;
- configura chave primária;
- habilita Row Level Security;
- cria policies para leitura, criação e atualização;
- insere os dois pedidos base da célula.

Campos esperados pela aplicação:

```txt
id
name
request
isAnonymous
prayingCount
createdAt
category
```

Para o Realtime funcionar, habilite a tabela `prayer_requests` nas configurações de Realtime do Supabase.

## Scripts

Rodar em desenvolvimento:

```bash
npm run dev
```

Gerar build de produção:

```bash
npm run build
```

Pré-visualizar o build:

```bash
npm run preview
```

Checar TypeScript:

```bash
npm run lint
```

## Rotas

O projeto usa React Router com rotas reais:

- `/` - Início
- `/oracoes` - Pedidos de oração
- `/avisos` - Avisos e eventos
- `/testemunhos` - Testemunhos

Isso permite atualizar a página com F5 sem voltar para a Home.

## Observações

- O arquivo `.env.local` não deve ser commitado.
- Os pedidos mockados permanecem como base visual da aplicação.
- O controle de "Estou orando" é limitado a um clique por navegador usando LocalStorage.
- Para persistência real dos pedidos e contadores, as policies do Supabase precisam estar aplicadas corretamente.
