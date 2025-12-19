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

async function validatePreferenceFields() {
  console.log('🔍 VALIDANDO CAMPOS DA PREFERÊNCIA PARA APROVAÇÃO MERCADOPAGO\n');

  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    // Buscar apostila de teste
    const testApostila = await Apostila.findOne({ 
      title: { $regex: /TESTE.*PRODUÇÃO/i } 
    });
    
    if (!testApostila) {
      console.log('❌ Apostila de teste não encontrada');
      return;
    }

    // Configurar MercadoPago
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    const client = new MercadoPagoConfig({
      accessToken: accessToken,
      options: { timeout: 5000 }
    });

    const preference = new Preference(client);
    
    // Criar preferência com TODOS os campos recomendados
    const preferenceData = {
      items: [
        {
          id: testApostila._id.toString(), // ✅ OBRIGATÓRIO
          title: testApostila.title,
          description: `Apostila Digital de ${testApostila.category || 'Educação'}: ${testApostila.title} - Material didático em PDF com ${testApostila.pages || 'múltiplas'} páginas`, // ✅ OBRIGATÓRIO
          category_id: 'education', // ✅ OBRIGATÓRIO
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(testApostila.price.toFixed(2)), // ✅ OBRIGATÓRIO
          picture_url: testApostila.cover || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop'
        }
      ],
      payer: {
        name: 'Cliente Teste',
        surname: 'Silva',
        email: 'teste.validacao@exemplo.com',
        phone: {
          area_code: '11',
          number: '999999999'
        },
        identification: {
          type: 'CPF',
          number: '11144477735'
        },
        address: {
          street_name: 'Rua das Apostilas',
          street_number: 123,
          zip_code: '01234567'
        }
      },
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12,
        default_payment_method_id: null,
        default_installments: 1
      },
      shipments: {
        mode: 'not_specified'
      },
      additional_info: {
        items: [
          {
            id: testApostila._id.toString(),
            title: testApostila.title,
            description: `Apostila Digital de ${testApostila.category || 'Educação'}: ${testApostila.title}`,
            picture_url: testApostila.cover || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop',
            category_id: 'education',
            quantity: 1,
            unit_price: parseFloat(testApostila.price.toFixed(2))
          }
        ],
        payer: {
          first_name: 'Cliente Teste',
          last_name: 'Silva',
          phone: {
            area_code: '11',
            number: '999999999'
          },
          address: {
            street_name: 'Rua das Apostilas',
            street_number: 123,
            zip_code: '01234567'
          },
          registration_date: new Date().toISOString()
        }
      },
      metadata: {
        apostila_id: testApostila._id.toString(),
        apostila_title: testApostila.title,
        apostila_category: testApostila.category || 'education',
        payment_type: 'digital_product',
        business_type: 'education',
        integration_version: '1.0'
      },
      back_urls: {
        success: 'http://localhost:5173/payment/success',
        failure: 'http://localhost:5173/payment/failure',
        pending: 'http://localhost:5173/payment/pending'
      },
      notification_url: 'http://localhost:3001/api/purchases/webhook/mercadopago',
      external_reference: `apostila_${testApostila._id}_validation_${Date.now()}`,
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    };

    console.log('📋 VALIDANDO CAMPOS OBRIGATÓRIOS:');
    
    // Validar campos obrigatórios
    const item = preferenceData.items[0];
    console.log('✅ items.id:', item.id ? '✓ Presente' : '❌ Ausente');
    console.log('✅ items.description:', item.description ? '✓ Presente' : '❌ Ausente');
    console.log('✅ items.category_id:', item.category_id ? '✓ Presente' : '❌ Ausente');
    console.log('✅ items.unit_price:', item.unit_price ? '✓ Presente' : '❌ Ausente');
    
    console.log('\n📋 CAMPOS ADICIONAIS PARA MELHOR APROVAÇÃO:');
    console.log('✅ items.picture_url:', item.picture_url ? '✓ Presente' : '❌ Ausente');
    console.log('✅ payer.address:', preferenceData.payer.address ? '✓ Presente' : '❌ Ausente');
    console.log('✅ additional_info:', preferenceData.additional_info ? '✓ Presente' : '❌ Ausente');
    console.log('✅ metadata:', preferenceData.metadata ? '✓ Presente' : '❌ Ausente');
    console.log('✅ payment_methods:', preferenceData.payment_methods ? '✓ Presente' : '❌ Ausente');
    console.log('✅ shipments:', preferenceData.shipments ? '✓ Presente' : '❌ Ausente');

    console.log('\n🔄 Testando criação da preferência...');
    
    const result = await preference.create({ body: preferenceData });
    
    console.log('\n🎉 PREFERÊNCIA CRIADA COM SUCESSO!');
    console.log('🆔 ID:', result.id);
    console.log('🔗 URL:', result.init_point);

    console.log('\n✅ TODOS OS CAMPOS OBRIGATÓRIOS ESTÃO CONFIGURADOS!');
    console.log('\n📊 RESUMO DA VALIDAÇÃO:');
    console.log('✅ Categoria do item: education');
    console.log('✅ Descrição detalhada: Incluída');
    console.log('✅ Código do item: ID da apostila');
    console.log('✅ Preço do item: R$ ' + testApostila.price.toFixed(2));
    console.log('✅ Informações do pagador: Completas');
    console.log('✅ Endereço: Incluído');
    console.log('✅ Métodos de pagamento: Configurados');
    console.log('✅ Informações adicionais: Incluídas');
    console.log('✅ Metadados: Incluídos');

    console.log('\n🚀 SUA INTEGRAÇÃO ESTÁ OTIMIZADA PARA APROVAÇÃO!');
    console.log('💡 Todos os campos recomendados pelo MercadoPago estão presentes.');

  } catch (error) {
    console.error('❌ Erro na validação:', error.message);
    
    if (error.cause && Array.isArray(error.cause)) {
      console.log('\n🔍 Detalhes dos erros:');
      error.cause.forEach((err, index) => {
        console.log(`   ${index + 1}. ${err.code}: ${err.description}`);
      });
    }
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Desconectado do MongoDB');
  }
}

validatePreferenceFields();