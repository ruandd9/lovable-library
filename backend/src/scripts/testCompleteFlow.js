import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import Apostila from '../models/Apostila.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar .env
dotenv.config({ path: join(__dirname, '../../.env') });

async function testCompleteFlow() {
  console.log('🧪 TESTANDO FLUXO COMPLETO - PREFERÊNCIA + RETORNO\n');

  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    // 1. Buscar apostila de teste
    const testApostila = await Apostila.findOne({ 
      title: { $regex: /TESTE.*PRODUÇÃO/i } 
    });
    
    if (!testApostila) {
      console.log('❌ Apostila de teste não encontrada');
      console.log('💡 Execute: node backend/src/scripts/resetTestEnvironment.js');
      return;
    }

    console.log('📚 Apostila de teste encontrada:');
    console.log('   ID:', testApostila._id);
    console.log('   Título:', testApostila.title);
    console.log('   Preço: R$', testApostila.price);

    // 2. Criar preferência de teste
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    const client = new MercadoPagoConfig({
      accessToken: accessToken,
      options: { timeout: 5000 }
    });

    const preference = new Preference(client);
    const externalReference = `apostila_${testApostila._id}_test_user_${Date.now()}`;
    
    const preferenceData = {
      items: [
        {
          id: testApostila._id.toString(), // ✅ Código do item (obrigatório)
          title: testApostila.title,
          description: `Apostila Digital de ${testApostila.category || 'Educação'}: ${testApostila.title} - Material didático em PDF com ${testApostila.pages || 'múltiplas'} páginas`, // ✅ Descrição detalhada (obrigatório)
          category_id: 'education', // ✅ Categoria do item (obrigatório)
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(testApostila.price.toFixed(2)), // ✅ Preço do item (obrigatório)
          picture_url: testApostila.cover || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop'
        }
      ],
      payer: {
        name: 'Cliente',
        surname: 'Teste',
        email: 'teste.fluxo@exemplo.com',
        phone: {
          area_code: '11',
          number: '999999999'
        },
        identification: {
          type: 'CPF',
          number: '11144477735'
        }
      },
      back_urls: {
        success: `http://localhost:5173/payment/success`,
        failure: `http://localhost:5173/payment/failure`,
        pending: `http://localhost:5173/payment/pending`
      },
      notification_url: `http://localhost:3001/api/purchases/webhook/mercadopago`,
      external_reference: externalReference,
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    };

    console.log('\n🔄 Criando preferência...');
    const result = await preference.create({ body: preferenceData });
    
    console.log('\n✅ PREFERÊNCIA CRIADA COM SUCESSO!');
    console.log('🆔 ID:', result.id);
    console.log('🔗 URL de Pagamento:', result.init_point);
    console.log('📋 Referência Externa:', externalReference);

    console.log('\n🎯 FLUXO COMPLETO DE TESTE:');
    console.log('1. 🔗 Abra esta URL no navegador:');
    console.log('   ' + result.init_point);
    console.log('2. 💳 Escolha PIX, Cartão ou Boleto');
    console.log('3. 💰 Pague R$ ' + testApostila.price.toFixed(2));
    console.log('4. ↩️  Será redirecionado de volta');
    console.log('5. ✅ Apostila será adicionada automaticamente');

    console.log('\n📋 URLs DE RETORNO:');
    console.log('✅ Sucesso: http://localhost:5173/payment/success');
    console.log('❌ Falha: http://localhost:5173/payment/failure');
    console.log('⏳ Pendente: http://localhost:5173/payment/pending');

    console.log('\n🔍 PARÂMETROS DE RETORNO ESPERADOS:');
    console.log('- payment_id: ID do pagamento no MercadoPago');
    console.log('- status: approved/pending/rejected');
    console.log('- external_reference:', externalReference);
    console.log('- preference_id:', result.id);

    console.log('\n💡 COMO VERIFICAR SE FUNCIONOU:');
    console.log('1. Após pagar, verifique se foi redirecionado');
    console.log('2. Vá para /dashboard');
    console.log('3. A apostila deve aparecer na biblioteca');
    console.log('4. Deve conseguir abrir/baixar a apostila');

    console.log('\n🚨 IMPORTANTE:');
    console.log('- Este é um pagamento REAL com valor baixo');
    console.log('- Use dados de teste do MercadoPago');
    console.log('- Monitore os logs do backend');

  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Desconectado do MongoDB');
  }
}

testCompleteFlow();