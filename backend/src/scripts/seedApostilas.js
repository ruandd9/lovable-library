import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Apostila from '../models/Apostila.js';

dotenv.config();

const apostilas = [
  {
    title: "Matemática Completa para Concursos",
    description: "Material completo com teoria e mais de 500 exercícios resolvidos. Ideal para concursos públicos de nível médio e superior.",
    longDescription: "Esta apostila foi desenvolvida especialmente para candidatos que desejam dominar a matemática exigida nos principais concursos públicos do Brasil. Com uma abordagem didática e progressiva, o material cobre desde os fundamentos básicos até os tópicos mais avançados, sempre com foco na resolução prática de questões.",
    price: 49.90,
    originalPrice: 89.90,
    category: "Concursos",
    cover: "/covers/matematica-cover.jpg",
    pages: 320,
    rating: 4.8,
    reviews: 234,
    features: ["500+ exercícios", "Gabarito comentado", "Atualizada 2024", "Mapas mentais"],
    author: "Prof. Carlos Eduardo",
    lastUpdate: "Dezembro 2024",
    language: "Português",
    level: "Médio/Superior",
    topics: ["Aritmética", "Álgebra", "Geometria", "Estatística", "Probabilidade", "Matemática Financeira"]
  },
  {
    title: "Português - Gramática e Redação",
    description: "Domine a língua portuguesa com teoria clara e exercícios práticos. Inclui técnicas de redação para vestibulares.",
    longDescription: "A apostila de Português mais completa do mercado, elaborada por professores especialistas com anos de experiência em preparação para concursos e vestibulares.",
    price: 39.90,
    originalPrice: 69.90,
    category: "Vestibulares",
    cover: "/covers/portugues-cover.jpg",
    pages: 280,
    rating: 4.9,
    reviews: 189,
    features: ["Gramática completa", "Redação nota 1000", "Exercícios ENEM", "Técnicas de interpretação"],
    author: "Profa. Ana Paula Santos",
    lastUpdate: "Novembro 2024",
    language: "Português",
    level: "Médio/Superior",
    topics: ["Morfologia", "Sintaxe", "Semântica", "Redação", "Interpretação", "Literatura"]
  },
  {
    title: "Direito Constitucional Esquematizado",
    description: "Apostila com mapas mentais e resumos objetivos. Perfeita para OAB e concursos jurídicos.",
    longDescription: "Material indispensável para quem busca aprovação em concursos da área jurídica ou no exame da OAB.",
    price: 59.90,
    originalPrice: 99.90,
    category: "Direito",
    cover: "/covers/direito-cover.jpg",
    pages: 420,
    rating: 4.7,
    reviews: 156,
    features: ["Mapas mentais", "Súmulas atualizadas", "Questões OAB", "Jurisprudência STF/STJ"],
    author: "Dr. Ricardo Mendes",
    lastUpdate: "Dezembro 2024",
    language: "Português",
    level: "Superior",
    topics: ["Princípios Fundamentais", "Direitos e Garantias", "Organização do Estado", "Poderes", "Controle de Constitucionalidade"]
  },
  {
    title: "Informática para Iniciantes",
    description: "Aprenda do básico ao avançado com linguagem simples. Inclui Windows, Office e Internet.",
    longDescription: "Apostila perfeita para quem está começando ou precisa revisar conceitos de informática para concursos.",
    price: 29.90,
    originalPrice: 49.90,
    category: "Concursos",
    cover: "/covers/informatica-cover.jpg",
    pages: 180,
    rating: 4.6,
    reviews: 312,
    features: ["Passo a passo", "Exercícios práticos", "Dicas para provas", "Screenshots atualizados"],
    author: "Prof. Marcos Silva",
    lastUpdate: "Outubro 2024",
    language: "Português",
    level: "Básico/Médio",
    topics: ["Windows 11", "Office 365", "Internet", "Segurança", "Hardware", "Redes"]
  },
  {
    title: "Raciocínio Lógico Descomplicado",
    description: "Técnicas e macetes para resolver qualquer questão de lógica. Material objetivo e direto ao ponto.",
    longDescription: "Se você tem dificuldade com raciocínio lógico, esta apostila foi feita para você!",
    price: 44.90,
    originalPrice: 79.90,
    category: "Concursos",
    cover: "/covers/logica-cover.jpg",
    pages: 240,
    rating: 4.8,
    reviews: 278,
    features: ["Macetes exclusivos", "300+ questões", "Vídeo-aulas bônus", "Resolução comentada"],
    author: "Prof. Lucas Ferreira",
    lastUpdate: "Novembro 2024",
    language: "Português",
    level: "Médio",
    topics: ["Proposições", "Tabela-Verdade", "Sequências", "Matrizes Lógicas", "Probabilidade", "Análise Combinatória"]
  },
  {
    title: "Administração Pública - Teoria e Prática",
    description: "Conteúdo atualizado sobre gestão pública, políticas e governança. Essencial para concursos administrativos.",
    longDescription: "Apostila completa de Administração Pública, abordando desde os conceitos fundamentais até as tendências mais recentes em gestão governamental.",
    price: 54.90,
    originalPrice: 89.90,
    category: "Concursos",
    cover: "/covers/admin-cover.jpg",
    pages: 350,
    rating: 4.5,
    reviews: 98,
    features: ["Casos práticos", "Legislação atualizada", "Resumos", "Questões comentadas"],
    author: "Profa. Juliana Costa",
    lastUpdate: "Dezembro 2024",
    language: "Português",
    level: "Superior",
    topics: ["Gestão Pública", "Políticas Públicas", "Governança", "Licitações", "Orçamento Público", "Controle"]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    // Limpar apostilas existentes
    await Apostila.deleteMany({});
    console.log('🗑️  Apostilas antigas removidas');

    // Inserir novas apostilas
    await Apostila.insertMany(apostilas);
    console.log('✅ Apostilas inseridas com sucesso!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error);
    process.exit(1);
  }
};

seedDatabase();
