import mongoose from 'mongoose';

const apostilaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória']
  },
  longDescription: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Preço é obrigatório'],
    min: [0, 'Preço não pode ser negativo']
  },
  originalPrice: {
    type: Number
  },
  category: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
    enum: ['Concursos', 'Vestibulares', 'Direito', 'ENEM']
  },
  cover: {
    type: String,
    required: [true, 'Imagem de capa é obrigatória']
  },
  pages: {
    type: Number,
    required: [true, 'Número de páginas é obrigatório']
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  features: [{
    type: String
  }],
  author: {
    type: String
  },
  lastUpdate: {
    type: String
  },
  language: {
    type: String,
    default: 'Português'
  },
  level: {
    type: String
  },
  topics: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Apostila = mongoose.model('Apostila', apostilaSchema);

export default Apostila;
