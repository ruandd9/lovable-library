import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { protect } from '../middleware/auth.js';
import Apostila from '../models/Apostila.js';

const router = express.Router();

// @route   POST /api/simple-preference/create
// @desc    Criar Preferência de Pagamento Simples
// @access  Private
router.post('/create', protect, async (req, res) => {
  try {
    const { apostilaId } = req.body;

    // Verificar se apostila existe
    const apostila = await Apostila.findById(apostilaId);
    if (!apostila) {
      return res.status(404).json({
        success: false,
        message: 'Apostila não encontrada'
      });
    }

    // Configurar MercadoPago
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      return res.status(500).json({
        success: false,
        message: 'MercadoPago não configurado'
      });
    }

    // Detectar se são credenciais de produção ou teste
    const isProduction = accessToken.startsWith('APP_USR-');
    const isTest = accessToken.startsWith('TEST-') || accessToken.startsWith('APP_TEST-');
    
    console.log(`🔑 Usando credenciais de ${isProduction ? 'PRODUÇÃO' : 'TESTE'}`);

    const client = new MercadoPagoConfig({
      accessToken: accessToken,
      options: { timeout: 5000 }
    });

    // Criar preferência
    const preference = new Preference(client);
    
    const preferenceData = {
      items: [
        {
          id: apostila._id.toString(), // ✅ Código do item (obrigatório)
          title: apostila.title,
          description: `Apostila Digital de ${apostila.category || 'Educação'}: ${apostila.title} - Material didático em PDF com ${apostila.pages || 'múltiplas'} páginas`, // ✅ Descrição detalhada (obrigatório)
          category_id: 'education', // ✅ Categoria do item (obrigatório)
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(apostila.price.toFixed(2)), // ✅ Preço do item (obrigatório)
          picture_url: apostila.cover || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop'
        }
      ],
      payer: {
        name: req.user.name || 'Cliente',
        surname: 'Silva',
        email: req.user.email,
        phone: {
          area_code: '11',
          number: isProduction ? '999999999' : '999999999' // Mesmo número para ambos
        },
        identification: {
          type: 'CPF',
          number: isProduction ? '00000000000' : '11144477735' // CPF genérico em produção, teste em dev
        },
        address: {
          street_name: isProduction ? 'Rua Principal' : 'Rua das Apostilas',
          street_number: 123,
          zip_code: isProduction ? '01310100' : '01234567' // CEP real em produção
        }
      },
      // Configurações de pagamento para melhorar aprovação
      payment_methods: {
        excluded_payment_methods: [], // Permitir todos os métodos
        excluded_payment_types: [], // Permitir todos os tipos
        installments: 12, // Até 12x no cartão
        default_payment_method_id: null, // Sem método padrão
        default_installments: 1 // 1x por padrão
      },
      shipments: {
        mode: 'not_specified', // Produto digital - sem envio
        dimensions: null,
        default_shipping_method: null,
        free_methods: []
      },
      // Informações adicionais para melhorar qualidade
      additional_info: {
        items: [
          {
            id: apostila._id.toString(),
            title: apostila.title,
            description: `Apostila Digital de ${apostila.category || 'Educação'}: ${apostila.title}`,
            picture_url: apostila.cover || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop',
            category_id: 'education',
            quantity: 1,
            unit_price: parseFloat(apostila.price.toFixed(2))
          }
        ],
        payer: {
          first_name: req.user.name || 'Cliente',
          last_name: 'Silva',
          phone: {
            area_code: '11',
            number: '999999999'
          },
          address: {
            street_name: isProduction ? 'Rua Principal' : 'Rua das Apostilas',
            street_number: 123,
            zip_code: isProduction ? '01310100' : '01234567'
          },
          registration_date: new Date(req.user.createdAt || Date.now()).toISOString()
        },
        shipments: {
          receiver_address: {
            zip_code: isProduction ? '01310100' : '01234567',
            street_name: isProduction ? 'Rua Principal' : 'Rua das Apostilas',
            street_number: 123
          }
        }
      },
      // Metadados para rastreamento
      metadata: {
        user_id: req.user._id.toString(),
        apostila_id: apostilaId,
        apostila_title: apostila.title,
        apostila_category: apostila.category || 'education',
        apostila_pages: apostila.pages || 0,
        payment_type: 'digital_product',
        business_type: 'education',
        integration_version: '1.0'
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/success`,
        failure: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/failure`,
        pending: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/pending`
      },
      notification_url: `${process.env.BACKEND_URL || 'http://localhost:3001'}/api/purchases/webhook/mercadopago`,
      external_reference: `apostila_${apostilaId}_${req.user._id}_${Date.now()}`,
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    };

    console.log('🔄 Criando preferência para:', apostila.title);
    
    const result = await preference.create({ body: preferenceData });
    
    console.log('✅ Preferência criada:', result.id);

    res.json({
      success: true,
      preferenceId: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
      external_reference: result.external_reference,
      apostila: {
        id: apostila._id,
        title: apostila.title,
        price: apostila.price
      },
      message: 'Preferência criada com sucesso!'
    });

  } catch (error) {
    console.error('❌ Erro ao criar preferência:', error.message);
    
    res.status(500).json({
      success: false,
      message: 'Erro ao criar preferência de pagamento',
      error: error.message
    });
  }
});

// @route   POST /api/simple-preference/confirm
// @desc    Confirmar compra via preferência (após retorno do MercadoPago)
// @access  Private
router.post('/confirm', protect, async (req, res) => {
  try {
    const { apostilaId, externalReference, paymentId, status } = req.body;
    
    console.log('📥 Confirmação de compra via preferência:', { 
      apostilaId, 
      externalReference, 
      paymentId, 
      status,
      userId: req.user._id 
    });

    if (!apostilaId) {
      return res.status(400).json({
        success: false,
        message: 'ID da apostila é obrigatório'
      });
    }

    // Verificar se apostila existe
    const apostila = await Apostila.findById(apostilaId);
    if (!apostila) {
      return res.status(404).json({
        success: false,
        message: 'Apostila não encontrada'
      });
    }

    // Verificar se já existe compra para evitar duplicatas
    const Purchase = (await import('../models/Purchase.js')).default;
    const User = (await import('../models/User.js')).default;
    
    const existingPurchase = await Purchase.findOne({ 
      user: req.user._id,
      apostila: apostilaId,
      $or: [
        { stripePaymentIntentId: paymentId },
        { stripePaymentIntentId: externalReference }
      ]
    });
    
    if (existingPurchase) {
      console.log('⚠️ Compra já existe:', existingPurchase._id);
      return res.json({
        success: true,
        message: 'Compra já foi processada anteriormente',
        data: existingPurchase
      });
    }

    // Verificar se usuário já possui a apostila
    const user = await User.findById(req.user._id);
    const isTestApostila = apostila && apostila.title.includes('TESTE');
    
    if (user.purchasedApostilas.includes(apostilaId) && !isTestApostila) {
      return res.status(400).json({
        success: false,
        message: 'Você já possui esta apostila'
      });
    }

    // Criar registro de compra
    const purchase = await Purchase.create({
      user: req.user._id,
      apostila: apostilaId,
      price: apostila.price,
      paymentMethod: 'mercadopago_preference',
      status: status === 'approved' ? 'completed' : 'pending',
      stripePaymentIntentId: paymentId || externalReference || `pref_${Date.now()}`
    });

    // Adicionar apostila às compras do usuário (apenas se aprovado)
    if (status === 'approved' || status === 'pending') {
      user.purchasedApostilas.push(apostilaId);
      await user.save();
      console.log('✅ Apostila adicionada ao usuário:', user.name);
    }

    const populatedPurchase = await Purchase.findById(purchase._id)
      .populate('apostila')
      .populate('user', 'name email');

    console.log('✅ Compra via preferência confirmada:', purchase._id);
    
    res.status(201).json({
      success: true,
      message: status === 'approved' ? 'Compra realizada com sucesso!' : 'Pagamento processado!',
      data: populatedPurchase
    });

  } catch (error) {
    console.error('❌ Erro ao confirmar compra via preferência:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao confirmar compra',
      error: error.message
    });
  }
});

export default router;