import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Apostila from '../models/Apostila.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar .env da pasta backend
dotenv.config({ path: join(__dirname, '../../.env') });

async function addMultipleTestApostilas() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    // Remover apostilas de teste antigas
    await Apostila.deleteMany({ 
      title: { $regex: /TESTE/i } 
    });
    console.log('🗑️ Apostilas de teste antigas removidas');

    // Criar múltiplas apostilas de teste com preços diferentes
    const testApostilas = [
      {
        title: "TESTE A - PIX R$ 1,50",
        price: 1.50,
        cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop"
      },
      {
        title: "TESTE B - PIX R$ 2,75", 
        price: 2.75,
        cover: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop"
      },
      {
        title: "TESTE C - PIX R$ 3,25",
        price: 3.25,
        cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=600&fit=crop"
      },
      {
        title: "TESTE D - PIX R$ 4,80",
        price: 4.80,
        cover: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=600&fit=crop"
      }
    ];

    const apostilasCompletas = testApostilas.map(apostila => ({
      ...apostila,
      description: `Apostila de teste para validar PIX único - ${apostila.title}`,
      longDescription: `Esta é uma apostila de teste criada para validar se o MercadoPago gera PIX únicos com preços base diferentes. Valor: R$ ${apostila.price}`,
      originalPrice: apostila.price,
      category: "Vestibulares",
      pages: 5,
      rating: 5.0,
      reviews: 1,
      features: ["Teste PIX único", "Valor base diferente", "Validação MercadoPago"],
      author: "Sistema de Testes",
      lastUpdate: "Dezembro 2024",
      language: "Português",
      level: "Teste",
      topics: ["PIX único", "Teste MercadoPago"],
      pdfUrl: "/pdfs/teste.pdf",
      isActive: true
    }));

    const result = await Apostila.insertMany(apostilasCompletas);
    
    console.log('✅ Apostilas de teste criadas com sucesso!');
    console.log('📚 Total criadas:', result.length);
    
    result.forEach((apostila, index) => {
      console.log(`${index + 1}. ${apostila.title} - R$ ${apostila.price} (ID: ${apostila._id})`);
    });

    console.log('');
    console.log('🎯 TESTE AGORA:');
    console.log('1. Cada apostila deve gerar PIX com valor base diferente');
    console.log('2. Mesmo usuário comprando apostilas diferentes = PIX diferentes');
    console.log('3. Usuários diferentes na mesma apostila = PIX únicos');

  } catch (error) {
    console.error('❌ Erro ao criar apostilas de teste:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado do MongoDB');
  }
}

addMultipleTestApostilas();