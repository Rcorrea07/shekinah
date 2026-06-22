# Shekinah App

> O app da célula jovem Shekinah: um ponto de encontro digital para oração, avisos, eventos e testemunhos.

O **Shekinah App** nasceu para centralizar tudo o que importa no dia a dia da célula, diminuindo a perda de informações no grupo do WhatsApp e mantendo a galera conectada durante a semana.

A proposta é criar um ambiente simples, acolhedor e sem barreiras, sem precisar de login ou senha, para que qualquer membro ou visitante consiga participar com facilidade.

## O Que O App Faz

| Área | Descrição |
| --- | --- |
| **Mural de Orações em tempo real** | Espaço para compartilhar pedidos de oração. Quando alguém envia um pedido ou clica em **Estou Orando**, a tela atualiza automaticamente para todos via Supabase Realtime. |
| **Corrente de oração protegida** | O botão **Estou Orando** é limitado a um clique por navegador, usando LocalStorage para evitar spam e manter a contagem mais fiel. |
| **Avisos e eventos** | Reúne informações importantes da célula, como local, horários, encontros e eventos. |
| **Testemunhos** | Um espaço para compartilhar vitórias e aquilo que Deus tem feito no meio da célula. |

## Tecnologias

- React
- TypeScript
- Vite
- React Router
- Supabase
- Tailwind CSS
- Lucide React

## Como Rodar Localmente

### 1. Pré-Requisitos

Você precisa ter instalado:

- Node.js
- npm
- Um projeto Supabase configurado

### 2. Instalação

Clone o repositório, abra a pasta no terminal e instale as dependências:

```bash
npm install
```

### 3. Variáveis De Ambiente

Crie um arquivo chamado `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-publica-anon
```

> O arquivo `.env.local` não deve ser commitado. Ele já está protegido pelo `.gitignore`.

### 4. Rodar O App

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O app normalmente abrirá em:

```txt
http://localhost:5173
```

Se a porta estiver ocupada, o Vite escolherá outra automaticamente.

## Supabase

Para o sistema de orações funcionar com persistência e tempo real, o banco precisa de uma tabela chamada `prayer_requests`.

Existe um script pronto em:

```txt
supabase/prayer_requests_setup.sql
```

Copie o conteúdo desse arquivo, cole no **SQL Editor** do Supabase e execute.

O script faz:

- criação/ajuste dos campos necessários;
- configuração de chave primária;
- ativação de RLS;
- criação das policies públicas para o app funcionar sem login;
- inserção dos pedidos base da Shekinah.

Campos esperados:

| Campo | Uso |
| --- | --- |
| `id` | Identificador único do pedido |
| `name` | Nome da pessoa ou `Anônimo` |
| `request` | Texto do pedido |
| `isAnonymous` | Define se o pedido aparece como anônimo |
| `prayingCount` | Quantidade de pessoas que clicaram em **Estou Orando** |
| `createdAt` | Data de criação |
| `category` | Categoria do pedido |

### Realtime

Para a atualização automática funcionar, habilite o Realtime da tabela `prayer_requests` no painel do Supabase.

Caminho no painel:

```txt
Database > Publications > supabase_realtime
```

Depois, marque a tabela `prayer_requests`.

## Rotas

O app usa rotas reais com React Router, então o usuário pode atualizar a página com F5 sem voltar para a Home.

| Rota | Página |
| --- | --- |
| `/` | Tela inicial |
| `/oracoes` | Mural de pedidos de oração |
| `/avisos` | Agenda e avisos da célula |
| `/testemunhos` | Testemunhos e relatos |

## Scripts Disponíveis

```bash
npm run dev
```

Executa o app em modo de desenvolvimento.

```bash
npm run build
```

Gera o build de produção.

```bash
npm run preview
```

Pré-visualiza o build gerado.

```bash
npm run lint
```

Executa a checagem de TypeScript.

## Observações

- Os pedidos base da Shekinah continuam aparecendo como conteúdo inicial.
- Novos pedidos são salvos no Supabase.
- O contador **Estou Orando** é sincronizado pelo Supabase e limitado localmente por navegador.
- Sem as policies corretas no Supabase, o app consegue ler, mas pode falhar ao criar pedidos ou atualizar contadores.
