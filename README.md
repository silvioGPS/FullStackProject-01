# Conversor de Moedas

Aplicação de página única (SPA) desenvolvida em React para converter moedas utilizando cotações reais fornecidas pela API Exchangerate.host. Projeto desenvolvido para a disciplina de Programação Web Fullstack.

## Funcionalidades

- Conversão entre Real, Dólar e Euro
- Consulta de cotações reais
- Indicador visual durante o carregamento
- Mensagem amigável em caso de erro
- Opção de tentar novamente
- Interface responsiva para computador e celular

## Tecnologias utilizadas

- React
- Vite
- Axios
- Material UI (MUI)
- Exchangerate.host API

## Pré-requisitos

Antes de iniciar, é necessário ter instalado:

- Node.js 20.19 ou superior
- npm
- Git

## Como executar o projeto

Clone a branch `develop` do repositório:

```bash
git clone --branch develop https://github.com/silvioGPS/FullStackProject-01.git
cd FullStackProject-01
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir do exemplo.

No Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

No Linux ou macOS:

```bash
cp .env.example .env
```

Crie uma chave de acesso gratuita no site da [Exchangerate.host](https://exchangerate.host/) e coloque-a no arquivo `.env`:

```env
VITE_API_KEY_EXCHANGERATES=sua_chave_aqui
```

A chave é necessária para consultar o endpoint `/live` da API. O arquivo `.env` está protegido pelo `.gitignore` e não deve ser enviado ao GitHub.

Inicie o projeto:

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:5173
```

## Estrutura do projeto

```text
src/
├── api/
│   └── exchangerate.js
├── assets/
├── components/
│   └── CurrencyConverter.jsx
├── hooks/
│   └── useExchangeRates.js
├── reducers/
│   └── currencyReducer.js
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

A estrutura foi separada por responsabilidade:

- `api/`: configura o Axios e realiza a comunicação com a Exchangerate.host.
- `components/`: contém os componentes visuais da aplicação.
- `hooks/`: concentra a lógica que conecta a interface, o estado e a API.
- `reducers/`: controla as alterações de estado da conversão.
- `assets/`: armazena arquivos estáticos utilizados pela aplicação.
- `App.jsx`: organiza a tela principal.
- `main.jsx`: inicializa a aplicação React.

Essa separação evita que interface, regras de estado e acesso à API fiquem misturados no mesmo arquivo, facilitando a manutenção e a localização de cada responsabilidade.

## Fluxo de dados

O fluxo da conversão acontece da seguinte forma:

1. O usuário informa o valor e escolhe as moedas no componente `CurrencyConverter`.
2. O componente chama a função `convert` do hook `useExchangeRates`.
3. O hook utiliza `useReducer` para controlar `loading`, erro e resultado.
4. O hook chama o serviço `src/api/exchangerate.js`.
5. O serviço faz uma requisição ao endpoint `/live` da Exchangerate.host.
6. O resultado ou o erro retorna ao hook.
7. O reducer atualiza o estado e a interface exibe a resposta ao usuário.

```text
Interface → useExchangeRates → useReducer → exchangerate.js → Exchangerate.host
```

## Decisões técnicas

### useReducer

O hook `useReducer` foi escolhido para centralizar estados relacionados, como moedas, valor, carregamento, erro e resultado. Isso evita vários estados separados e deixa as mudanças previsíveis por meio de ações.

### Material UI

O Material UI foi escolhido para fornecer componentes visuais acessíveis e consistentes, como campos, botões, indicadores de carregamento e alertas. A biblioteca também facilita a criação de um layout responsivo.

### Axios

O Axios é usado para realizar a requisição HTTP, configurar o endereço base da API e tratar timeout e erros de resposta.

## Scripts disponíveis

| Comando | Função |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm run lint` | Analisa o código |
| `npm run preview` | Visualiza localmente a versão de produção |

## Uso de ferramentas de IA

Ferramentas de inteligência artificial foram usadas como apoio durante o desenvolvimento.

### Claude (Anthropic)

A equipe utilizou o Claude para:

- organizar tarefas em um quadro Kanban;
- validar endpoints e documentar respostas da API;
- discutir a escolha do hook;
- gerar um rascunho inicial do reducer e do mock da API;
- revisar tratamento de timeout;
- auxiliar na reorganização das pastas.

### ChatGPT/Codex (OpenAI)

A equipe utilizou o ChatGPT/Codex para:

- apoiar a integração e a estilização da interface com Material UI;
- revisar o comportamento responsivo da aplicação;
- auxiliar no diagnóstico de problemas de configuração;
- revisar a organização e a clareza da documentação.
=======

