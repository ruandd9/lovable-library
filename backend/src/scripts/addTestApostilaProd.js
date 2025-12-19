import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Apostila from '../models/Apostila.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar .env da pasta backend
dotenv.config({ path: join(__dirname, '../../.env') });

async function addTestApostilaProd() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    // Verificar se já existe apostila de teste em produção
    const existingTest = await Apostila.findOne({ 
      title: { $regex: /TESTE.*PRODUÇÃO/i } 
    });
    
    if (existingTest) {
      console.log('📚 Apostila de teste de produção já existe:', existingTest.title);
      console.log('💰 Preço atual: R$', existingTest.price);
      console.log('🆔 ID:', existingTest._id);
      return;
    }

    // Criar apostila de teste para produção com preço baixo
    const testApostilaProd = {
      title: "TESTE PRODUÇÃO - Validação PIX Real - R$ 1,00",
      description: "Apostila de teste para validar PIX em produção. Use para testar pagamentos reais com valor baixo.",
      longDescription: "Esta é uma apostila de teste criada especificamente para validar o funcionamento do PIX em ambiente de produção. Contém conteúdo de demonstração e serve para testar o fluxo completo de pagamento com valores baixos. Após a validação, pode ser removida ou mantida para testes futuros.",
      price: 1.00,
      originalPrice: 1.00,
      category: "Vestibulares",
      cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop",
      pages: 5,
      rating: 5.0,
      reviews: 1,
      features: [
        "Teste de PIX real", 
        "Valor baixo para validação", 
        "Conteúdo de demonstração",
        "Fluxo completo de pagamento"
      ],
      author: "Sistema de Testes",
      lastUpdate: "Dezembro 2024",
      language: "Português",
      level: "Teste",
      topics: [
        "Validação de PIX", 
        "Teste de produção", 
        "Fluxo de pagamento", 
        "Integração MercadoPago"
      ],
      pdfUrl: "/pdfs/teste-producao.pdf",
      isActive: true
    };

    const apostila = await Apostila.create(testApostilaProd);
    console.log('✅ Apostila de teste para PRODUÇÃO criada com sucesso!');
    console.log('🆔 ID:', apostila._id);
    console.log('💰 Preço: R$ 1,00');
    console.log('🎯 Título:', apostila.title);
    console.log('');
    console.log('📋 INSTRUÇÕES:');
    console.log('1. Use esta apostila para testar PIX real em produção');
    console.log('2. Valor baixo (R$ 1,00) para minimizar custos de teste');
    console.log('3. Teste com diferentes usuários/contas');
    console.log('4. Valide que cada pagamento é independente');
    console.log('5. Remova após validação se desejar');

  } catch (error) {
    console.error('❌ Erro ao criar apostila de teste para produção:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado do MongoDB');
  }
}

addTestApostilaProd();