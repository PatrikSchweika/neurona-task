# Neurona Task

## Introduction

The application is a simple patient management system. 
It allows users to create patients and add diagnoses to them.

The systems consist of the following libraries:

- Database (Postgres)
- Backend (ASP.NET core)
  - `HotChocolate` - GraphQL server 
  - `FluentValidations` - Validation library
  - `EntityFrameworkCore`- Object Relational Mapping
- Frontend (Next.js React app)
  - `TailwindCSS` - CSS framework
  - `Ant Design` - UI library
  - `Apollo client` - GraphQL client
  - `GraphQL Code Generator` - Code generation for GraphQL queries
  - `Zod` - Type validation library
  - `React hook form` - Form library

The whole system can be run locally or in a dockerized environment.

## Setup

### Database

1. Install a [Postgres database](https://www.postgresql.org/) and [pgAdmin](https://www.pgadmin.org/) (management tool for Postgres).

2. Create a database named `neurona_db`.

3. Add the following connection string to the `Server/NeuronaTask.Server/appsettings.development.json` file:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=neurona_db;Username=USERNAME;Password=PASSWORD"
  }
}
```

Where `USERNAME` and `PASSWORD` are the credentials of your Postgres database.

---

If you do not wish to install a Postgres database locally, you can run the dockerized Postgres database in `docker-compose.yml` via:

```shell
docker-compose up db
```

The connection string will be `Host=localhost;Database=neurona_db;Username=admin;Password=password`.

### Server

1. Install [.NET 9](https://dotnet.microsoft.com/download/dotnet/9.0).

2. Change to the `Server` directory.

3. Install dependencies via:

```shell
dotnet restore
```

4. Run the server in development mode via:

```shell
dotnet run -p NeuronaTask.Server
```

5. The GraphQL server will be available at http://localhost:5205/graphql.

### Client

1. Install Node.js v24

2. Install dependencies via:

```shell
npm install
```

3. Create `.env.development` file in the client directory and add the following variables:

```dotenv
NEXT_PUBLIC_GRAPHQL_URI=http://localhost:5205/graphql
```

4. Run the client in development mode via:

```shell
npm run dev
```

5. The client will be available at http://localhost:3000.

#### Updating GraphQL generated types

To update the GraphQL generated types, run the server locally and execute the following command in the `client` directory:

```shell
npm run codegen
```

## How to run a dockerized application

To run a dockerized application, execute the following command in the root of the project:

```shell
docker-compose up
```

The docker-compose file will build and run a Postgres database, server and a client. The GraphQL server will be available at http://localhost:8080/graphql and the client at http://localhost:3000.