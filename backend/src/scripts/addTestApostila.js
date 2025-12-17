import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Apostila from '../models/Apostila.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar .env da pasta backend
dotenv.config({ path: join(__dirname, '../../.env') });

async function addTestApostila() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    // Verificar se já existe apostila de teste
    const existingTest = await Apostila.findOne({ title: { $regex: /TESTE.*ATIVAÇÃO/i } });
    
    if (existingTest) {
      console.log('📚 Apostila de teste já existe:', existingTest.title);
      console.log('💰 Preço atual: R$', existingTest.price);
      return;
    }

    // Criar apostila de teste com preço baixo
    const testApostila = {
      title: "TESTE - Ativação MercadoPago - R$ 1,00",
      description: "Apostila de teste para ativar conta MercadoPago. Após ativação, esta apostila será removida.",
      longDescription: "Esta é uma apostila temporária criada apenas para processar um pagamento real e ativar a conta MercadoPago para PIX. Contém conteúdo de teste e será removida após a ativação.",
      price: 1.00,
      originalPrice: 1.00,
      category: "Vestibulares",
      cover: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop",
      pages: 1,
      rating: 5.0,
      reviews: 1,
      features: ["Apenas para teste", "Ativação MercadoPago", "Será removida"],
      downloadUrl: "https://example.com/test.pdf",
      isActive: true
    };

    const apostila = await Apostila.create(testApostila);
    console.log('✅ Apostila de teste criada:', apostila._id);
    console.log('💰 Preço: R$ 1,00');
    console.log('🎯 Use esta apostila para fazer o pagamento de ativação');

  } catch (error) {
    console.error('❌ Erro ao criar apostila de teste:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado do MongoDB');
  }
}

addTestApostila();