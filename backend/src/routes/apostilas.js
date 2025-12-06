import express from 'express';
import Apostila from '../models/Apostila.js';

const router = express.Router();

// @route   GET /api/apostilas
// @desc    Listar todas as apostilas
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'Todos') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const apostilas = await Apostila.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: apostilas.length,
      data: apostilas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar apostilas',
      error: error.message
    });
  }
});

// @route   GET /api/apostilas/:id
// @desc    Obter detalhes de uma apostila
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const apostila = await Apostila.findById(req.params.id);

    if (!apostila) {
      return res.status(404).json({
        success: false,
        message: 'Apostila não encontrada'
      });
    }

    res.json({
      success: true,
      data: apostila
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar apostila',
      error: error.message
    });
  }
});

// @route   GET /api/apostilas/category/:category
// @desc    Listar apostilas por categoria
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const apostilas = await Apostila.find({ category });

    res.json({
      success: true,
      count: apostilas.length,
      data: apostilas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar apostilas',
      error: error.message
    });
  }
});

export default router;
