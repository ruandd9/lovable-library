# Como Atualizar PDFs em Produção

## 🔴 Problema da Abordagem Atual

Com PDFs na pasta `public/`:
- ❌ Precisa fazer novo deploy para atualizar PDF
- ❌ Downtime durante o deploy
- ❌ Não pode atualizar só o PDF
- ❌ Usuários podem ter versão antiga em cache

## ✅ Solução 1: Backend Serve os PDFs (Recomendado)

### Estrutura
```
backend/
  uploads/
    pdfs/
      fisica-v1.pdf
      fisica-v2.pdf  # Nova versão
```

### Implementação

#### 1. Criar Rota no Backend

```javascript
// backend/src/routes/pdfs.js
import express from 'express';
import path from 'path';
import fs from 'fs';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Servir PDF (com autenticação)
router.get('/:apostilaId', authMiddleware, async (req, res) => {
  try {
    const { apostilaId } = req.params;
    const userId = req.user.id;
    
    // Verificar se usuário comprou
    const hasPurchased = req.user.purchasedApostilas.includes(apostilaId);
    if (!hasPurchased) {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    
    // Buscar apostila no banco
    const apostila = await Apostila.findById(apostilaId);
    if (!apostila || !apostila.pdfPath) {
      return res.status(404).json({ message: 'PDF não encontrado' });
    }
    
    // Caminho do arquivo
    const pdfPath = path.join(__dirname, '../../uploads/pdfs', apostila.pdfPath);
    
    // Verificar se existe
    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ message: 'Arquivo não encontrado' });
    }
    
    // Registrar acesso (analytics)
    await PdfAccess.create({
      userId,
      apostilaId,
      timestamp: new Date()
    });
    
    // Servir arquivo
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${apostila.title}.pdf"`);
    res.sendFile(pdfPath);
    
  } catch (error) {
    console.error('Erro ao servir PDF:', error);
    res.status(500).json({ message: 'Erro ao carregar PDF' });
  }
});

export default router;
```

#### 2. Atualizar Modelo de Apostila

```javascript
// backend/src/models/Apostila.js
const apostilaSchema = new mongoose.Schema({
  // ... campos existentes
  pdfPath: {
    type: String  // Nome do arquivo: "fisica-v2.pdf"
  },
  pdfVersion: {
    type: String,
    default: '1.0'
  },
  pdfUpdatedAt: {
    type: Date,
    default: Date.now
  }
});
```

#### 3. Criar Rota de Upload (Admin)

```javascript
// backend/src/routes/admin.js
import multer from 'multer';
import path from 'path';

// Configurar multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/pdfs/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos PDF são permitidos'));
    }
  },
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// Rota para atualizar PDF
router.post('/apostilas/:id/upload-pdf', 
  authMiddleware, 
  adminMiddleware, 
  upload.single('pdf'), 
  async (req, res) => {
    try {
      const { id } = req.params;
      const apostila = await Apostila.findById(id);
      
      if (!apostila) {
        return res.status(404).json({ message: 'Apostila não encontrada' });
      }
      
      // Deletar PDF antigo (opcional)
      if (apostila.pdfPath) {
        const oldPath = path.join(__dirname, '../../uploads/pdfs', apostila.pdfPath);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      
      // Atualizar com novo PDF
      apostila.pdfPath = req.file.filename;
      apostila.pdfVersion = req.body.version || '1.0';
      apostila.pdfUpdatedAt = new Date();
      await apostila.save();
      
      res.json({
        message: 'PDF atualizado com sucesso',
        apostila
      });
      
    } catch (error) {
      res.status(500).json({ message: 'Erro ao fazer upload' });
    }
});
```

#### 4. Atualizar Frontend

```typescript
// src/data/apostilas.ts
{
  id: "7",
  title: "Física Completa",
  // Agora aponta para o backend
  pdfUrl: `${import.meta.env.VITE_API_URL}/api/pdfs/7`
}
```

### Como Atualizar PDF Agora:

1. **Via API (Postman/Insomnia)**
   ```bash
   POST http://localhost:3001/api/admin/apostilas/7/upload-pdf
   Headers: Authorization: Bearer {admin_token}
   Body: form-data
     - pdf: [arquivo.pdf]
     - version: "2.0"
   ```

2. **Via Interface Admin (criar depois)**
   - Login como admin
   - Ir em "Gerenciar Apostilas"
   - Clicar em "Atualizar PDF"
   - Fazer upload do novo arquivo
   - ✅ Pronto! Sem redeploy!

---

## ✅ Solução 2: AWS S3 (Mais Profissional)

### Vantagens
- ✅ Upload direto via dashboard AWS
- ✅ Versionamento automático
- ✅ CDN global (CloudFront)
- ✅ Sem redeploy necessário

### Implementação

```javascript
// backend/src/services/s3.js
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

export const uploadPdfToS3 = async (file, apostilaId) => {
  const params = {
    Bucket: 'seu-bucket',
    Key: `pdfs/${apostilaId}.pdf`,
    Body: file.buffer,
    ContentType: 'application/pdf',
    // Versionamento automático
    Metadata: {
      version: new Date().toISOString()
    }
  };
  
  const result = await s3.upload(params).promise();
  return result.Location;
};

export const getSignedPdfUrl = (apostilaId) => {
  const params = {
    Bucket: 'seu-bucket',
    Key: `pdfs/${apostilaId}.pdf`,
    Expires: 3600 // 1 hora
  };
  
  return s3.getSignedUrl('getObject', params);
};
```

### Como Atualizar no S3:

**Opção 1: Via AWS Console**
1. Acesse AWS S3
2. Vá no bucket
3. Upload do novo PDF (mesmo nome)
4. ✅ Pronto! Atualizado instantaneamente

**Opção 2: Via AWS CLI**
```bash
aws s3 cp fisica-nova.pdf s3://seu-bucket/pdfs/fisica.pdf
```

**Opção 3: Via Interface Admin**
```javascript
// Upload direto do admin para S3
router.post('/apostilas/:id/upload-pdf', async (req, res) => {
  const url = await uploadPdfToS3(req.file, req.params.id);
  
  await Apostila.findByIdAndUpdate(req.params.id, {
    pdfUrl: url,
    pdfUpdatedAt: new Date()
  });
  
  res.json({ message: 'PDF atualizado', url });
});
```

---

## ✅ Solução 3: Cloudinary

### Vantagens
- ✅ Interface visual simples
- ✅ Upload via drag & drop
- ✅ Transformações automáticas
- ✅ Free tier generoso

### Implementação

```javascript
// backend/src/services/cloudinary.js
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadPdf = async (file) => {
  const result = await cloudinary.v2.uploader.upload(file.path, {
    resource_type: 'raw',
    folder: 'apostilas',
    public_id: `fisica-${Date.now()}`
  });
  
  return result.secure_url;
};
```

### Como Atualizar no Cloudinary:

1. Acesse dashboard Cloudinary
2. Vá em "Media Library"
3. Upload novo PDF
4. Copie a URL
5. Atualize no banco de dados

---

## 📊 Comparação das Soluções

| Solução | Facilidade | Custo | Redeploy? | Versionamento |
|---------|-----------|-------|-----------|---------------|
| Public Folder | ⭐⭐⭐⭐⭐ | Grátis | ✅ Sim | ❌ Não |
| Backend | ⭐⭐⭐⭐ | Grátis | ❌ Não | ✅ Sim |
| AWS S3 | ⭐⭐⭐ | ~R$2/mês | ❌ Não | ✅ Sim |
| Cloudinary | ⭐⭐⭐⭐ | Grátis/Pago | ❌ Não | ✅ Sim |

## 🎯 Recomendação

### Para Agora (MVP)
✅ **Backend serve PDFs**
- Sem redeploy
- Controle total
- Grátis
- Fácil de implementar

### Para Escala
✅ **AWS S3 + CloudFront**
- Performance global
- Versionamento automático
- Baixo custo
- Profissional

## 🔧 Implementação Rápida (Backend)

Quer que eu implemente a solução do backend agora? Posso criar:
1. Rota para servir PDFs
2. Rota de upload (admin)
3. Atualizar modelo
4. Atualizar frontend

É só pedir! 🚀
