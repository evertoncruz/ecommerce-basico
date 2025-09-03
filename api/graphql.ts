import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import express from 'express';
import type { Request, Response } from 'express';

// Dados de mock para simular um banco de dados
const products = [
  {
    id: 1,
    title: 'Camiseta React',
    price: 29.99,
    description: 'Camiseta de alta qualidade com o logo do React.',
    category: 'roupas',
    image: 'https://placehold.co/600x400/png?text=Camiseta+React',
    rating: {
      rate: 4.5,
      count: 120,
    },
  },
  {
    id: 2,
    title: 'Moletom Vitest',
    price: 59.99,
    description: 'Moletom confortável para programar.',
    category: 'roupas',
    image: 'https://placehold.co/600x400/png?text=Moletom+Vitest',
    rating: {
      rate: 4.8,
      count: 90,
    },
  },
  {
    id: 3,
    title: 'Caneca Apollo',
    price: 15.00,
    description: 'Caneca estilosa para seu café ou chá.',
    category: 'casa',
    image: 'https://placehold.co/600x400/png?text=Caneca+Apollo',
    rating: {
      rate: 4.2,
      count: 55,
    },
  },
];

// O esquema GraphQL define a estrutura dos dados
const typeDefs = `
  type Rating {
    rate: Float
    count: Int
  }

  type Product {
    id: ID!
    title: String!
    price: Float!
    description: String!
    category: String!
    image: String!
    rating: Rating
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }
`;

// Os resolvers fornecem as funções para as queries
const resolvers = {
  Query: {
    products: () => products,
    product: (_: any, { id }: { id: string }) => {
      return products.find(p => p.id === parseInt(id, 10));
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

// A variável global que armazenará o handler da nossa API.
let apiHandler: express.Application;

// Função assíncrona para iniciar o servidor, mas que é chamada apenas uma vez.
async function startApolloServer() {
  if (!apolloServer) {
    throw new Error('Apollo Server not initialized');
  }

  // Se o handler já existe, o servidor já foi iniciado.
  if (!apiHandler) {
    await apolloServer.start();
    apiHandler = express();
    apolloServer.applyMiddleware({ app: apiHandler as express.Application, path: '/' });
  }

  return apiHandler;
}

// Exporta uma função assíncrona para lidar com a requisição.
export default async (req: Request, res: Response) => {
  const handler = await startApolloServer();
  handler(req, res);
};
