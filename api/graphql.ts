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

// Configuração do Apollo Server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

// Inicialização e exportação como uma função Vercel
const startServer = async () => {
  await apolloServer.start();
  const app = express();
  apolloServer.applyMiddleware({ app: app as express.Application, path: '/' });

  // Retorna a função de handler do express
  return (req: Request, res: Response) => app(req, res);
};

export default startServer();
