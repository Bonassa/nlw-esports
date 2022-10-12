# Criação do backend em Node JS:

## 1) npm init -y
-y para dar yes em tudo
Criação do arquivo package.json

## 2) npm install express
Instalação do express

## 3) Criação do src
Alteração do package.json main para o src/server.js

## 4) Rodar (node src/server.js)

## 5) Para utilizar o ECMAScript Module
Adicionar no package.json o type: "module"
Alterar a extensão do server.js para server.mjs

## 6) Instalação do TypeScript
TypeScript adiciona tipagens ao JS, e é bom porque ele funciona quase como um teste automatizado verificando possíveis falhas

``` Instalar
  npm i typescript -D
```
O Node não interpreta TS, por isso podemos utilizar ele apenas em desenvolvimento.

Também devemos mudar a extensão para .ts

## 7) Criando script para rodar o TS
Primeiro rodamos o comando para criar o tsconfig.json

``` TSConfig
  npx tsc --init
```

No arquivo package.json, na aba script criamos um script build para converter o ts para js

``` Rodar Script
  npm run build
```

Precisamos alterar o tsconfig.json o module por conta de termos utilizado o import ECMAScript para "ES2020"

## 8) Separar código JS do TS
No tsconfig.json descomente as linhas root dir e out dir especificando onde está o código ts, e onde será gerado o código js

## 9) Bibliotecas sem suporte nativo ao TS
Quando uma biblioteca não tem suporte nativo ao TS, é apresentado um aviso ..., no site do npm é possível ver se a biblioteca
tem esse suporte ou não, e caso não tenha é apontado qual pacote de types deve ser instalado.

Aqui vamos instalar os types do express como dependencia de desenvolvimento

``` bash
  npm i --save-dev @types/express
```

## 10) Instalando pacote para fast refrash com o TS
Vamos instalar um pacote chamado ts-node-dev para fazer o fast refrash das aplicações enquanto escrevemos o TS

``` Instalando como dependecia de desenvolvimento
  npm i ts-node-dev -D
```

Vamos precisar alterar algumas coisas dos arquivos package e tsconfig

package.json:
  Adicionar o script "dev": "tsnd src/server.ts"
  Apagar o "type": "module"

tsconfig.json:
  Voltar o "module" para "CommonJS"

Assim voltando ao padrão de criação do projeto

## Banco de Dados
Para utilizar um banco de dados podemos utilizar em 3 níveis de abstração
1) Driver Nativo (Escreve em SQL) mais baixo nível
2) Query Builder (Escreve em Javascript que depois é compilado para SQL)
3) ORM (Object Relational Maper) Faz uma relação das entidades do banco com uma classe - Método mais fácil

### ORM - Prisma (https://www.prisma.io/docs/getting-started/quickstart)

``` Instalando o Prisma como dependência de desenvolvimento
  npm install prisma --save-dev

  npx prisma init --datasource-provider (BANCO DE DADOS UTILIZADO)
```

Instalando o Cliente do Prisma no Backend

``` Instalando o Prisma Client
  npm install @prisma/client
```

A chave de acesso ao banco de dados está no arquivo `.env`, como este projeto não está em produção, a chave se encontra abaixo

```.env title=".env"
  DATABASE_URL="file:../src/database/db.sqlite"
```

## Biblioteca CORS para bloquear acessos de front-end indesejados
Sem essa biblioteca nenhum front end poderia acessar nossa API

``` Instalando o Cors
  npm install cors

  npm install @types/cors -D
```
