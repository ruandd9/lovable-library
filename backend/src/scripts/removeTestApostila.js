import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Apostila from '../models/Apostila.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar .env da pasta pasta backend
dotenv.config({ path: join(__dirname, '../../.env') });

async function removeTestApostila() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    // Buscar apostilas de teste
    const testApostilas = await Apostila.find({ 
      title: { $regex: /TESTE/i } 
    });

    if (testApostilas.length === 0) {
      console.log('📚 Nenhuma apostila de teste encontrada');
      return;
    }

    console.log(`🔍 Encontradas ${testApostilas.length} apostilas de teste:`);
    testApostilas.forEach((apostila, index) => {
      console.log(`${index + 1}. ${apostila.title} (R$ ${apostila.price})`);
    });

    // Remover todas as apostilas de teste
    const result = await Apostila.deleteMany({ 
      title: { $regex: /TESTE/i } 
    });

    console.log(`✅ Removidas ${result.deletedCount} apostilas de teste`);
    
    // Mostrar estatísticas finais
    const totalApostilas = await Apostila.countDocuments();
    console.log(`📊 Total de apostilas restantes: ${totalApostilas}`);

  } catch (error) {
    console.error('❌ Erro ao remover apostilas de teste:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado do MongoDB');
  }
}

removeTestApostila();