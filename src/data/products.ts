export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Camiseta React",
    price: 59.90,
    image: "https://via.placeholder.com/300x200.png?text=Camiseta+React",
    description: "Uma camiseta de algodão, perfeita para quem ama React.",
    category: "roupas",
    rating: {
      rate: 4.5,
      count: 120,
    },
  },
  {
    id: 2,
    title: "Caneca Node.js",
    price: 35.50,
    image: "https://via.placeholder.com/300x200.png?text=Caneca+Node.js",
    description: "Caneca de cerâmica, ideal para um bom café enquanto você codifica.",
    category: "acessórios",
    rating: {
      rate: 4.8,
      count: 90,
    },
  },
  {
    id: 3,
    title: "Mousepad TypeScript",
    price: 25.00,
    image: "https://via.placeholder.com/300x200.png?text=Mousepad+TypeScript",
    description: "Mousepad com a logo do TypeScript, para programadores de alto nível.",
    category: "eletrônicos",
    rating: {
      rate: 4.2,
      count: 75,
    },
  },
];