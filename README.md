# AKDev Bank - Banco digital

Este é um projeto de desafio frontend para simular uma aplicação bancária simples, desenvolvido com React, TypeScript e Vite. O objetivo é demonstrar habilidades em desenvolvimento de interfaces modernas, gerenciamento de estado, autenticação e operações bancárias básicas.

## 📋 Descrição

A aplicação simula um sistema bancário com funcionalidades de login, visualização de saldo e transações, e realização de transferências. É uma SPA (Single Page Application) que utiliza roteamento protegido e persistência de estado.

## ✨ Funcionalidades

- **Autenticação de Usuário**: Login com persistência de sessão
- **Dashboard**: Visualização de saldo atual e histórico de transações
- **Transferências**: Realização de transferências com validação de formulários
- **Interface Responsiva**: Design moderno com Tailwind CSS e componentes shadcn/ui
- **Tema Dark/Light**: Suporte a temas com next-themes
- **Notificações**: Feedback visual com Sonner para ações do usuário

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 19**: Biblioteca para construção de interfaces
- **TypeScript**: Tipagem estática para JavaScript
- **Vite**: Build tool e dev server rápido
- **React Router DOM**: Roteamento da aplicação
- **Tailwind CSS**: Framework CSS utilitário
- **shadcn/ui**: Componentes UI baseados em Radix UI
- **Zustand**: Gerenciamento de estado global
- **React Hook Form + Zod**: Validação de formulários
- **Axios**: Cliente HTTP para requisições
- **React Query**: Gerenciamento de estado de servidor
- **Lucide React**: Ícones

### Desenvolvimento

- **ESLint**: Linting e formatação de código
- **Vitest**: Framework de testes
- **Testing Library**: Utilitários para testes de componentes React
- **@vitejs/plugin-react**: Plugin Vite para React

## � Segurança

Esta seção descreve medidas de segurança que poderiam ser implementadas para proteger a aplicação contra ameaças comuns, como engenharia reversa e vazamento de dados. Embora não sejam implementadas neste projeto de desafio, elas são essenciais para aplicações em produção.

### Proteção contra Engenharia Reversa

A engenharia reversa envolve a análise do código fonte ou binários para entender a lógica da aplicação. Para mitigar isso:

- **Ofuscação de Código**: Utilizar ferramentas como Terser ou Webpack plugins para ofuscar o JavaScript/TypeScript compilado, tornando-o difícil de ler e entender.
- **Minificação**: Reduzir o tamanho do código e remover comentários, nomes de variáveis descritivos e estruturas desnecessárias.
- **Source Maps Desabilitados em Produção**: Evitar expor mapas de fonte que mapeiam o código minificado de volta ao original.
- **Proteção contra Debugging**: Implementar detecção de ferramentas de desenvolvedor (como DevTools) e desabilitar funcionalidades em ambientes suspeitos.
- **Código Dividido**: Separar lógica sensível em módulos carregados dinamicamente ou executados no servidor.

### Proteção contra Vazamento de Dados

O vazamento de dados pode ocorrer através de armazenamento inseguro, transmissão não criptografada ou exposição acidental. Medidas preventivas incluem:

- **Criptografia de Dados Sensíveis**: Utilizar bibliotecas como CryptoJS para criptografar dados antes de armazenar no localStorage/sessionStorage ou enviar via API.
- **HTTPS Obrigatório**: Garantir que todas as comunicações sejam feitas via HTTPS, com certificados válidos e HSTS (HTTP Strict Transport Security).
- **Sanitização de Entradas**: Validar e sanitizar todas as entradas do usuário para prevenir injeções (XSS, SQL injection, etc.), utilizando bibliotecas como DOMPurify.
- **Gerenciamento Seguro de Tokens**: Armazenar tokens de autenticação em HttpOnly cookies ou secure storage, com expiração automática e rotação periódica.
- **Auditoria e Logs**: Implementar logging de ações sensíveis para detectar tentativas de acesso não autorizado.
- **Políticas de Segurança de Conteúdo (CSP)**: Configurar headers CSP para restringir fontes de scripts, estilos e recursos externos.
- **Limpeza de Dados**: Remover dados sensíveis da memória e cache após uso, evitando exposição em dumps de memória.

Essas práticas, combinadas com revisões de segurança regulares e testes de penetração, ajudam a manter a aplicação robusta contra ameaças.

## �📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🚀 Instalação

1. Clone o repositório:

   ```bash
   git clone <url-do-repositorio>
   cd desafio
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra [https://app-bancario-simples.vercel.app/] no navegador.

## 📖 Uso

### Login

- Acesse `/login` para fazer login
- Credenciais são simuladas (qualquer email/nome funcionam)

### Dashboard

- Visualize saldo e transações recentes
- Acesse via `/dashboard` (rota protegida)

### Transferências

- Realize transferências via `/transfer`
- Formulário com validação em tempo real
- Atualização automática do saldo e histórico

## 📜 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila a aplicação para produção
- `npm run preview` - Visualiza a build de produção localmente
- `npm run test` - Executa os testes com Vitest
- `npm run lint` - Executa o linter ESLint


## 🧪 Testes

O projeto utiliza Vitest para testes unitários e Testing Library para testes de componentes React.

Para executar os testes:

```bash
npm run test
```

Para executar testes em modo watch:

```bash
npm run test -- --watch
```

## 📋 Decisões Técnicas Adotadas

Durante o desenvolvimento, foram tomadas as seguintes decisões técnicas para garantir qualidade, performance e manutenibilidade:

- **React 19**: Escolhido pela sua estabilidade e novos recursos como o React Compiler para otimização automática de componentes.
- **TypeScript**: Utilizado para tipagem estática, reduzindo erros em tempo de desenvolvimento e melhorando a documentação do código.
- **Vite**: Build tool rápido para desenvolvimento, com hot reload eficiente e build otimizado para produção.
- **Zustand para Gerenciamento de Estado**: Biblioteca leve e simples para estado global, evitando complexidade desnecessária comparada ao Redux.
- **React Hook Form + Zod**: Para validação de formulários robusta e em tempo real, com schemas declarativos.
- **Tailwind CSS + shadcn/ui**: Para design consistente e responsivo, com componentes reutilizáveis baseados em Radix UI.
- **Axios + React Query**: Para gerenciamento de requisições HTTP e cache de dados do servidor.
- **Estrutura Modular**: Separação clara entre componentes, páginas, stores e utilitários para facilitar manutenção.
- **Testes com Vitest**: Framework moderno e rápido para testes unitários e de integração.

## 🔮 Melhorias Futuras

O projeto pode ser expandido com as seguintes melhorias:

- **Integração com Backend Real**: Conectar a uma API RESTful ou GraphQL para autenticação e transações reais.
- **Autenticação Segura**: Implementar JWT ou OAuth para login real, com refresh tokens e proteção contra CSRF.
- **Banco de Dados**: Persistir dados em um banco como PostgreSQL ou MongoDB, com migrações e backups.
- **Segurança Avançada**: Adicionar criptografia de dados, rate limiting, e auditoria de logs.
- **Internacionalização (i18n)**: Suporte a múltiplos idiomas para expandir o público.
- **Progressive Web App (PWA)**: Tornar a aplicação instalável offline com service workers.
- **Testes E2E**: Adicionar Cypress ou Playwright para testes end-to-end.
- **Monitoramento**: Integrar ferramentas como Sentry para rastreamento de erros em produção.
- **Performance**: Implementar lazy loading, code splitting e otimização de imagens.
- **Acessibilidade**: Melhorar conformidade com WCAG para usuários com deficiências.


## 👥 Autor

- Dev Ana Karoline 
- Linkedin: <https://www.linkedin.com/in/ana-karoline-araujo/>
---

**Nota**: Esta é uma aplicação de demonstração e não representa um sistema bancário real. Todos os dados são simulados e não persistem em um banco de dados.
