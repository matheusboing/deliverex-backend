<h1 align="center">DELIVEREX <img src="https://img.shields.io/badge/-backend-yellowgreen" /></h1></h1>
<h4 align="center"> :ticket: Um modesto e moderno gerenciador de pedidos. :ticket: </h4>

## Observação
:heavy_exclamation_mark: Este projeto contém 2 partes, [frontend](https://github.com/matheusboing/deliverex-frontend) e backend. Este é o repositório do backend, construído com AdonisJS 5

## :computer: Como rodar?
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### Clone este repositório:
`$ git clone https://github.com/matheusboing/deliverex-backend.git`

#### Acesse a pasta do projeto no terminal/cmd:
`$ cd deliverex-backend`

#### Instale as dependências:
`$ npm install`

#### Defina as variáveis de ambiente:
:point_right: Copie e cole o arquivo `.env.example` no mesmo diretório\
:point_right: Retire o sufixo do nome do arquivo e deixe como `.env`\
:point_right: Defina os valores das variáveis que estão no arquivo

|Variável|Descrição|
|--------|---------|
|PORT|Porta que a aplicação será executada<br>`'3333' por exemplo`|
|HOST|Onde a aplicação será executada<br>`Geralmente '0.0.0.0'`|       
|NODE_ENV|Ambiente em que a aplicação será executada<br>`Pode ser 'production' ou 'development'`|
|APP_KEY|Chave de segurança da aplicação<br>`Use uma senha aleatória (mín. 16 caracteres)`|
|DB_CONNECTION|Tipo de banco de dados<br>`Use 'mysql' ou 'sqlite' por exemplo`|
|MYSQL_HOST|Endereço de conexão ao banco de dados<br>`Geralmente 'localhost'`|
|MYSQL_PORT|Porta de conexão ao banco de dados<br>`Geralmente '3306'`|
|MYSQL_USER|Usuário de conexão ao banco de dados<br>`Geralmente 'root'`|
|MYSQL_PASSWORD|Senha de conexão ao banco de dados<br>`Geralmente 'root'`|
|MYSQL_DB_NAME|Nome do banco de dados<br>`Use 'deliverex' por exemplo`|

#### Execute as migrations para criar as tabelas no banco:
>_Certifique-se de que o banco de dados exista antes de executar o comando_

`$ node ace migration:run`

#### Execute a aplicação em modo de desenvolvimento:
`$ npm run dev`

### O servidor inciará na porta `3333`

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [AdonisJS](https://preview.adonisjs.com/blog/introducing-adonisjs-v5/)
- [NodeJS](https://nodejs.org/en/)

## Autor
Feito com :heart: por Matheus Boing, com uma ajudinha de [Lucas Samuel](https://github.com/lucasskluser) :blush:


[<img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/matheusboing/)
