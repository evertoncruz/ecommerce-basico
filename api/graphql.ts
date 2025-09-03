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

// Inicialização do Express
const app = express();

// Inicia o servidor Apollo de forma assíncrona e aplica o middleware.
// Esta função é chamada uma única vez.
async function startApolloServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/' });
}

// Chama a função de inicialização do servidor.
startApolloServer();

// Exporta o app do Express, que agora já tem o middleware do Apollo aplicado.
export default app;
