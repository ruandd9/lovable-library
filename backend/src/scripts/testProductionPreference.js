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

async function testProductionPreference() {
  console.log('🚀 TESTANDO PREFERÊNCIA COM CREDENCIAIS DE PRODUÇÃO\n');

  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    // Verificar credenciais
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      console.log('❌ MERCADOPAGO_ACCESS_TOKEN não encontrado');
      return;
    }

    const isProduction = accessToken.startsWith('APP_USR-');
    const isTest = accessToken.startsWith('TEST-') || accessToken.startsWith('APP_TEST-');

    console.log('🔑 Tipo de credencial:', isProduction ? 'PRODUÇÃO' : 'TESTE');
    console.log('🔑 Token:', accessToken.substring(0, 20) + '...');

    if (!isProduction) {
      console.log('⚠️  ATENÇÃO: Você está usando credenciais de TESTE');
      console.log('💡 Para produção real, use credenciais APP_USR-');
    }

    // Buscar apostila de teste
    const testApostila = await Apostila.findOne({ 
      title: { $regex: /TESTE.*PRODUÇÃO/i } 
    });
    
    if (!testApostila) {
      console.log('❌ Apostila de teste não encontrada');
      return;
    }

    console.log('📚 Apostila encontrada:', testApostila.title);
    console.log('💰 Preço: R$', testApostila.price);

    // Configurar MercadoPago
    const client = new MercadoPagoConfig({
      accessToken: accessToken,
      options: { timeout: 5000 }
    });

    const preference = new Preference(client);
    
    // Dados apropriados para produção ou teste
    const preferenceData = {
      items: [
        {
          id: testApostila._id.toString(),
          title: testApostila.title,
          description: `Apostila Digital de Educação: ${testApostila.title} - Material didático em PDF`,
          category_id: 'education',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(testApostila.price.toFixed(2)),
          picture_url: testApostila.cover || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop'
        }
      ],
      payer: {
        name: 'Cliente Teste',
        surname: 'Silva',
        email: 'cliente.teste@exemplo.com',
        phone: {
          area_code: '11',
          number: '999999999'
        },
        identification: {
          type: 'CPF',
          number: isProduction ? '00000000000' : '11144477735' // CPF apropriado
        },
        address: {
          street_name: isProduction ? 'Rua Principal' : 'Rua das Apostilas',
          street_number: 123,
          zip_code: isProduction ? '01310100' : '01234567'
        }
      },
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12,
        default_installments: 1
      },
      shipments: {
        mode: 'not_specified'
      },
      back_urls: {
        success: 'http://localhost:5173/payment/success',
        failure: 'http://localhost:5173/payment/failure',
        pending: 'http://localhost:5173/payment/pending'
      },
      notification_url: 'http://localhost:3001/api/purchases/webhook/mercadopago',
      external_reference: `apostila_${testApostila._id}_prod_test_${Date.now()}`,
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    };

    console.log('\n📋 DADOS SENDO ENVIADOS:');
    console.log('🆔 Item ID:', preferenceData.items[0].id);
    console.log('📝 Descrição:', preferenceData.items[0].description);
    console.log('🏷️  Categoria:', preferenceData.items[0].category_id);
    console.log('💰 Preço:', preferenceData.items[0].unit_price);
    console.log('👤 CPF:', preferenceData.payer.identification.number);
    console.log('📍 CEP:', preferenceData.payer.address.zip_code);

    console.log('\n🔄 Criando preferência...');
    
    const result = await preference.create({ body: preferenceData });
    
    console.log('\n✅ PREFERÊNCIA CRIADA COM SUCESSO!');
    console.log('🆔 ID:', result.id);
    console.log('🔗 URL de Pagamento:', result.init_point);
    console.log('📋 Referência Externa:', result.external_reference);

    if (isProduction) {
      console.log('\n🚀 PRODUÇÃO - PAGAMENTO REAL!');
      console.log('💰 Valor: R$ ' + testApostila.price.toFixed(2));
      console.log('⚠️  Este será um pagamento REAL com dinheiro real');
      console.log('💳 Use seus dados reais para pagar');
    } else {
      console.log('\n🧪 TESTE - Use dados de teste do MercadoPago');
      console.log('💳 Cartão de teste: 4509 9535 6623 3704');
      console.log('📅 Validade: 11/25');
      console.log('🔒 CVV: 123');
    }

    console.log('\n🎯 TESTE AGORA:');
    console.log('1. Abra: ' + result.init_point);
    console.log('2. Escolha método de pagamento');
    console.log('3. Complete o pagamento');
    console.log('4. Verifique se retorna sem erro');

  } catch (error) {
    console.error('❌ Erro:', error.message);
    
    if (error.message.includes('test')) {
      console.log('\n💡 SOLUÇÃO PARA ERRO "TESTE":');
      console.log('1. Verifique se está usando credenciais de PRODUÇÃO');
      console.log('2. Remova dados de teste (CPF 11144477735)');
      console.log('3. Use dados reais ou genéricos');
      console.log('4. Certifique-se que não há "test" nos dados');
    }
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Desconectado do MongoDB');
  }
}

testProductionPreference();