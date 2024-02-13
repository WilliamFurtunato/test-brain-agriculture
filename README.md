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

Todas as rotas (com excessão da `users`) é necessário estar autenticado com um usuário admin. Portanto, não esquecer de rodar o comando `npx prisma db seed` para popular o banco com o usuário `admin`

### Session

#### POST Generate token

```
http://localhost:3333/sessions
```

##### Body raw (json)

```json
{
  "email": "admin@prisma.io",
  "password": "123456"
}
```

#### PATCH Refresh Token

```
http://localhost:3333/token/refresh
```

##### Body raw (json)

```json
{
  "email": "admin@prisma.io",
  "password": "123456"
}
```

### User

#### POST Create

```
http://localhost:3333/users
```

##### Body raw (json)

```json
{
  "email": "admin@prisma.io",
  "password": "123456"
}
```

### Rural Producer

#### POST Register

```
http://localhost:3333/producer
```

##### Body raw (json)

```json
{
  "document": "95.775.315/0001-17",
  "name": "John Doe",
  "farm_name": "xpto farm",
  "city": "Sao Paulo",
  "state": "SP",
  "total_hectares_farm": 10,
  "arable_hectares": 5,
  "vegetation_hectared": 3,
  "crops": [
    {
      "name": "SOYBEANS"
    },
    {
      "name": "CORN"
    },
    {
      "name": "COTTON"
    },
    {
      "name": "COFFEE"
    },
    {
      "name": "SUGARCANE"
    }
  ]
}
```

#### Delete Remove

```
http://localhost:3333/producer/{producerId}
```

#### PUT Update

```
http://localhost:3333/producer
```

##### Body raw (json)

```json
{
  "name": "John Doe",
  "farm_name": "xpto farm",
  "city": "Sao Paulo",
  "state": "SP",
  "total_hectares_farm": 10,
  "arable_hectares": 5,
  "vegetation_hectared": 3,
  "crops": [
    {
      "name": "SOYBEANS"
    },
    {
      "name": "CORN"
    },
    {
      "name": "COTTON"
    },
    {
      "name": "COFFEE"
    },
    {
      "name": "SUGARCANE"
    }
  ]
}
```

### Dashboard

#### GET Metrics

```
http://localhost:3333/metrics
```
