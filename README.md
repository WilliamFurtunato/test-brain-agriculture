# Test - Brain Agriculture

## Sobre o desafio

Criar uma aplicação para cadastro de produtores rurais.

## Instruções

1. Clone o repositório
2. Execute `npm install` para instalar as dependências
3. Execute `docker-compose up -d` para criar o container do banco de dados
4. Execute `npx prisma migrate deploy` para rodar as migrations e criar as tabelas no banco de dados
5. Execute `npx prisma db seed` para popular o banco de dados com dados mockados
6. Execute `npm run build` para realizar o build do projeto
7. Execute `npm run start` para inicializar o serviço.

**Atenção**: Criar o arquivo .env e substituir as variáveis de acordo com o .env.example

## Dicas

- Execute `npx prisma studio` para acessar o banco de dados através de interface gráfica
- Execute `npm run test` para rodar os testes unitários
- Execute `npm run test:e2e` para rodar os testes end-to-end
- Execute `npm run start:dev` para rodar os testes end-to-end

## Rotas

É possível importar a collection no Postman através do arquivo: [Collection](./collection.json)
