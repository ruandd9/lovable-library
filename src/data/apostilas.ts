export interface Apostila {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  cover: string;
  pages: number;
  rating: number;
  reviews: number;
  features: string[];
  isPurchased?: boolean;
}

export const apostilas: Apostila[] = [
  {
    id: "1",
    title: "Matemática Completa para Concursos",
    description: "Material completo com teoria e mais de 500 exercícios resolvidos. Ideal para concursos públicos de nível médio e superior.",
    price: 49.90,
    originalPrice: 89.90,
    category: "Concursos",
    cover: "/apostila-matematica.jpg",
    pages: 320,
    rating: 4.8,
    reviews: 234,
    features: ["500+ exercícios", "Gabarito comentado", "Atualizada 2024"],
  },
  {
    id: "2",
    title: "Português - Gramática e Redação",
    description: "Domine a língua portuguesa com teoria clara e exercícios práticos. Inclui técnicas de redação para vestibulares.",
    price: 39.90,
    originalPrice: 69.90,
    category: "Vestibulares",
    cover: "/apostila-portugues.jpg",
    pages: 280,
    rating: 4.9,
    reviews: 189,
    features: ["Gramática completa", "Redação nota 1000", "Exercícios ENEM"],
  },
  {
    id: "3",
    title: "Direito Constitucional Esquematizado",
    description: "Apostila com mapas mentais e resumos objetivos. Perfeita para OAB e concursos jurídicos.",
    price: 59.90,
    originalPrice: 99.90,
    category: "Direito",
    cover: "/apostila-direito.jpg",
    pages: 420,
    rating: 4.7,
    reviews: 156,
    features: ["Mapas mentais", "Súmulas atualizadas", "Questões OAB"],
  },
  {
    id: "4",
    title: "Informática para Iniciantes",
    description: "Aprenda do básico ao avançado com linguagem simples. Inclui Windows, Office e Internet.",
    price: 29.90,
    originalPrice: 49.90,
    category: "Concursos",
    cover: "/apostila-informatica.jpg",
    pages: 180,
    rating: 4.6,
    reviews: 312,
    features: ["Passo a passo", "Exercícios práticos", "Dicas para provas"],
  },
  {
    id: "5",
    title: "Raciocínio Lógico Descomplicado",
    description: "Técnicas e macetes para resolver qualquer questão de lógica. Material objetivo e direto ao ponto.",
    price: 44.90,
    originalPrice: 79.90,
    category: "Concursos",
    cover: "/apostila-logica.jpg",
    pages: 240,
    rating: 4.8,
    reviews: 278,
    features: ["Macetes exclusivos", "300+ questões", "Vídeo-aulas bônus"],
  },
  {
    id: "6",
    title: "Administração Pública - Teoria e Prática",
    description: "Conteúdo atualizado sobre gestão pública, políticas e governança. Essencial para concursos administrativos.",
    price: 54.90,
    originalPrice: 89.90,
    category: "Concursos",
    cover: "/apostila-admin.jpg",
    pages: 350,
    rating: 4.5,
    reviews: 98,
    features: ["Casos práticos", "Legislação atualizada", "Resumos"],
  },
];

export const categories = [
  "Todos",
  "Concursos",
  "Vestibulares",
  "Direito",
  "ENEM",
];
