// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import App from './App';
import { CartProvider } from './context/CartContext';
import './styles/app.css';

// Cria uma instância do Apollo Client
// A URL 'http://localhost:4000/graphql' é onde o seu servidor backend está rodando
import { HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache(), // O cache gerencia os dados das suas queries
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Envolve toda a aplicação com o ApolloProvider para que os componentes
// possam acessar os dados do GraphQL
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CartProvider>
        <App />
      </CartProvider>
    </ApolloProvider>
  </React.StrictMode>
);