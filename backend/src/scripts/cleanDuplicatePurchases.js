import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Purchase from '../models/Purchase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar .env da pasta backend
dotenv.config({ path: join(__dirname, '../../.env') });

async function cleanDuplicatePurchases() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    // Encontrar compras duplicadas com o mesmo paymentIntentId
    const duplicates = await Purchase.aggregate([
      {
        $group: {
          _id: {
            stripePaymentIntentId: "$stripePaymentIntentId",
            user: "$user"
          },
          count: { $sum: 1 },
          docs: { $push: "$_id" }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ]);

    console.log(`🔍 Encontradas ${duplicates.length} compras duplicadas`);

    let removedCount = 0;
    for (const duplicate of duplicates) {
      // Manter apenas a primeira compra, remover as outras
      const docsToRemove = duplicate.docs.slice(1);
      
      console.log(`🗑️ Removendo ${docsToRemove.length} compras duplicadas para payment: ${duplicate._id.stripePaymentIntentId}`);
      
      await Purchase.deleteMany({ _id: { $in: docsToRemove } });
      removedCount += docsToRemove.length;
    }

    console.log(`✅ Limpeza concluída! Removidas ${removedCount} compras duplicadas`);
    
    // Mostrar estatísticas finais
    const totalPurchases = await Purchase.countDocuments();
    console.log(`📊 Total de compras restantes: ${totalPurchases}`);

  } catch (error) {
    console.error('❌ Erro ao limpar compras duplicadas:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado do MongoDB');
  }
}

cleanDuplicatePurchases();