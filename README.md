# T4

## Descrição do Projeto

Este projeto é composto por dois módulos principais: um **frontend** desenvolvido em React e um **backend** Java distribuído como um arquivo `.jar`. O frontend utiliza TypeScript, Bootstrap e bibliotecas de testes, enquanto o backend deve ser executado separadamente para garantir o funcionamento completo da aplicação.

## Estrutura do Repositório

/
├── executavel/
│   └── pl.jar
├── petlovers-frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
├── README.md
└── ...

## Dependências para o projeto

| Dependência | Versão |
| :--- | :--- |
| **Node.js** | **16.x (recomendado)** |
| React | ^19.1.0 |
| React DOM | ^19.1.0 |
| React Scripts | 5.0.1 |
| TypeScript | ^4.9.5 |
| Axios | ^1.10.0 |
| Bootstrap | ^5.3.7 |
| @testing-library/react | ^16.3.0 |
| @testing-library/jest-dom | ^6.6.3 |
| @types/react | ^19.1.8 |
| @types/react-dom | ^19.1.6 |
| @types/node | ^16.18.126 |
| web-vitals | ^2.1.4 |

**Atenção:** ⚠️ O projeto usa `react-scripts@5.0.1`, que é mais estável com **Node.js na versão 16.x**. Versões mais novas do Node (como 18.x ou superiores) podem causar erros de compatibilidade durante a instalação ou execução.

### Backend

- **Java:** Recomendado Java 17 ou superior (verifique a versão utilizada no desenvolvimento do `.jar`)
- **Arquivo:** `pl.jar` (localizado em `/executavel`)

## Pré-requisitos

- **Node.js:** Versão 16.x (obrigatório para o frontend)
- **npm:** Compatível com Node 16.x
- **Java:** Versão 17 ou superior (para executar o backend `.jar`)

## Instalação

1.  **Clone o repositório:**
git clone https://github.com/tuzzooz/T4.git


2.  **Acesse o diretório do projeto:**
cd T3


### 2. Instale as dependências do frontend: cd petlovers-frontend

e então, dê um: npm install

## Como Rodar o Projeto

### 1. Inicie o backend

Abra um terminal na pasta `executavel` e execute: cd executavel

então, use: java -jar pl.jar

O backend estará rodando e aguardando as requisições do frontend.

### 2. Inicie o frontend

Abra outro terminal na pasta `petlovers-frontend` e execute:

cd petlovers-frontend

e então, para rodar use: npm start


## Observações Importantes

- Certifique-se de que o backend esteja rodando antes de iniciar o frontend, pois a comunicação entre ambos é essencial para o funcionamento da aplicação.
- Caso utilize uma versão diferente da 16.x do Node.js, podem ocorrer erros de incompatibilidade.