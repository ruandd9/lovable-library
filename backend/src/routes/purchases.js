import express from 'express';
import Purchase from '../models/Purchase.js';
import User from '../models/User.js';
import Apostila from '../models/Apostila.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/purchases
// @desc    Realizar compra de apostila
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { apostilaId, paymentMethod } = req.body;

    // Verificar se apostila existe
    const apostila = await Apostila.findById(apostilaId);
    if (!apostila) {
      return res.status(404).json({
        success: false,
        message: 'Apostila não encontrada'
      });
    }

    // Verificar se usuário já comprou
    const user = await User.findById(req.user._id);
    if (user.purchasedApostilas.includes(apostilaId)) {
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
      paymentMethod: paymentMethod || 'credit_card',
      status: 'completed'
    });

    // Adicionar apostila às compras do usuário
    user.purchasedApostilas.push(apostilaId);
    await user.save();

    const populatedPurchase = await Purchase.findById(purchase._id)
      .populate('apostila')
      .populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Compra realizada com sucesso!',
      data: populatedPurchase
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao processar compra',
      error: error.message
    });
  }
});

// @route   GET /api/purchases/user
// @desc    Obter compras do usuário logado
// @access  Private
router.get('/user', protect, async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user._id })
      .populate('apostila')
      .sort({ purchaseDate: -1 });

    res.json({
      success: true,
      count: purchases.length,
      data: purchases
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar compras',
      error: error.message
    });
  }
});

// @route   GET /api/purchases/:id
// @desc    Obter detalhes de uma compra
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id)
      .populate('apostila')
      .populate('user', 'name email');

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: 'Compra não encontrada'
      });
    }

    // Verificar se a compra pertence ao usuário
    if (purchase.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado'
      });
    }

    res.json({
      success: true,
      data: purchase
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar compra',
      error: error.message
    });
  }
});

export default router;
