import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar .env
dotenv.config({ path: join(__dirname, '../../.env') });

async function createSimplePreference() {
  console.log('🚀 CRIANDO PREFERÊNCIA DE PAGAMENTO SIMPLES\n');

  try {
    // 1. Configurar MercadoPago
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    
    if (!accessToken) {
      console.log('❌ MERCADOPAGO_ACCESS_TOKEN não encontrado no .env');
      return;
    }

    console.log('🔑 Token encontrado:', accessToken.substring(0, 20) + '...');
    
    const client = new MercadoPagoConfig({
      accessToken: accessToken,
      options: {
        timeout: 5000
      }
    });

    // 2. Criar preferência
    const preference = new Preference(client);
    
    const preferenceData = {
      items: [
        {
          id: 'apostila_001',
          title: 'Apostila de Teste - Física',
          description: 'Apostila digital de física para teste',
          category_id: 'education',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: 2.00
        }
      ],
      payer: {
        name: 'João',
        surname: 'Silva',
        email: 'joao.teste@exemplo.com',
        phone: {
          area_code: '11',
          number: '999999999'
        },
        identification: {
          type: 'CPF',
          number: '11144477735' // CPF de teste válido
        }
      },
      back_urls: {
        success: 'http://localhost:5173/payment/success',
        failure: 'http://localhost:5173/payment/failure',
        pending: 'http://localhost:5173/payment/pending'
      },
      notification_url: 'http://localhost:3001/api/purchases/webhook/mercadopago',
      external_reference: `test_${Date.now()}`,
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutos
    };

    console.log('📋 Dados da preferência:');
    console.log('   Produto:', preferenceData.items[0].title);
    console.log('   Preço: R$', preferenceData.items[0].unit_price);
    console.log('   Cliente:', preferenceData.payer.name, preferenceData.payer.surname);
    console.log('   Email:', preferenceData.payer.email);

    console.log('\n🔄 Criando preferência...');
    
    const result = await preference.create({ body: preferenceData });
    
    console.log('\n✅ PREFERÊNCIA CRIADA COM SUCESSO!');
    console.log('🆔 ID:', result.id);
    console.log('🔗 URL de Pagamento:', result.init_point);
    console.log('📱 URL Sandbox:', result.sandbox_init_point || 'N/A');
    console.log('📋 Referência Externa:', result.external_reference);
    
    console.log('\n🎯 TESTE AGORA:');
    console.log('1. Abra esta URL no navegador:');
    console.log('   ' + result.init_point);
    console.log('2. Escolha PIX, Cartão ou Boleto');
    console.log('3. Complete o pagamento');
    console.log('4. Será redirecionado de volta');

    console.log('\n💡 MÉTODOS DISPONÍVEIS:');
    console.log('✅ PIX - Pagamento instantâneo');
    console.log('✅ Cartão de Crédito - Até 12x');
    console.log('✅ Boleto Bancário - 3 dias úteis');

    return result;

  } catch (error) {
    console.error('❌ ERRO ao criar preferência:', error.message);
    
    if (error.cause && Array.isArray(error.cause)) {
      console.log('\n🔍 Detalhes do erro:');
      error.cause.forEach((err, index) => {
        console.log(`   ${index + 1}. ${err.code}: ${err.description}`);
      });
    }

    // Sugestões baseadas no erro
    if (error.message.includes('Invalid users')) {
      console.log('\n💡 SOLUÇÃO:');
      console.log('   - Verifique se a conta MercadoPago está ativa');
      console.log('   - Confirme se as credenciais estão corretas');
      console.log('   - Tente usar credenciais de teste primeiro');
    } else if (error.message.includes('Invalid access_token')) {
      console.log('\n💡 SOLUÇÃO:');
      console.log('   - Verifique se o ACCESS_TOKEN está correto');
      console.log('   - Confirme se não há espaços extras');
      console.log('   - Gere um novo token se necessário');
    }
  }
}

createSimplePreference();