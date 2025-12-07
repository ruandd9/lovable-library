# Guia de Produção - Visualizador de PDF

## ✅ Abordagem Atual (Funciona)

A solução atual com `public/pdfs/` funciona em produção e é adequada para:
- Poucos PDFs (até 20-30 arquivos)
- PDFs públicos ou com autenticação básica
- Projetos pequenos/médios

## 🚀 Preparação para Deploy

### 1. Verificar Arquivos Necessários

Certifique-se de que estes arquivos estão commitados:
```
public/
  pdfs/
    teste.pdf          # Seus PDFs
  pdf.worker.min.mjs   # Worker do PDF.js
```

### 2. Build de Produção

```bash
npm run build
```

O Vite vai:
- Copiar `public/` para `dist/`
- Os PDFs estarão em `dist/pdfs/`
- O worker em `dist/pdf.worker.min.mjs`

### 3. Deploy

Funciona em qualquer plataforma:
- **Vercel**: ✅ Funciona direto
- **Netlify**: ✅ Funciona direto
- **AWS S3 + CloudFront**: ✅ Funciona direto
- **Heroku**: ✅ Funciona direto

## 🔒 Segurança em Produção

### Problema: PDFs Públicos
Com a abordagem atual, qualquer pessoa com a URL pode acessar:
```
https://seusite.com/pdfs/teste.pdf
```

### Solução 1: URLs Assinadas (Backend)

Crie um endpoint no backend que gera URLs temporárias:

```javascript
// backend/src/routes/pdfs.js
import express from 'express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/pdf-url/:apostilaId', authMiddleware, async (req, res) => {
  try {
    const { apostilaId } = req.params;
    const userId = req.user.id;
    
    // Verificar se o usuário comprou a apostila
    const hasPurchased = req.user.purchasedApostilas.includes(apostilaId);
    
    if (!hasPurchased) {
      return res.status(403).json({ message: 'Você não possui esta apostila' });
    }
    
    // Gerar token temporário (válido por 1 hora)
    const token = jwt.sign(
      { userId, apostilaId },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // URL assinada
    const signedUrl = `/api/pdfs/view/${apostilaId}?token=${token}`;
    
    res.json({ url: signedUrl });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar URL' });
  }
});

// Endpoint para servir o PDF
router.get('/view/:apostilaId', async (req, res) => {
  try {
    const { token } = req.query;
    const { apostilaId } = req.params;
    
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.apostilaId !== apostilaId) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    
    // Servir o PDF
    const pdfPath = path.join(__dirname, '../../public/pdfs', `${apostilaId}.pdf`);
    res.sendFile(pdfPath);
  } catch (error) {
    res.status(403).json({ message: 'Token expirado ou inválido' });
  }
});

export default router;
```

No frontend:
```typescript
// src/services/api.ts
export const pdfsAPI = {
  getSignedUrl: (apostilaId: string) => 
    api.get(`/pdfs/pdf-url/${apostilaId}`)
};

// src/components/PDFViewerModal.tsx
const [pdfUrl, setPdfUrl] = useState<string>('');

useEffect(() => {
  const fetchSignedUrl = async () => {
    if (apostila?.id) {
      const response = await pdfsAPI.getSignedUrl(apostila.id);
      setPdfUrl(response.data.url);
    }
  };
  fetchSignedUrl();
}, [apostila]);
```

### Solução 2: AWS S3 com URLs Pré-assinadas

```javascript
// backend/src/services/s3.js
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

export const getSignedPdfUrl = (apostilaId) => {
  const params = {
    Bucket: 'seu-bucket',
    Key: `pdfs/${apostilaId}.pdf`,
    Expires: 3600 // 1 hora
  };
  
  return s3.getSignedUrl('getObject', params);
};
```

### Solução 3: Cloudflare Workers (Proxy)

```javascript
// Cloudflare Worker
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')
  
  // Verificar token
  if (!isValidToken(token)) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // Buscar PDF do S3
  const pdfResponse = await fetch(`https://s3.amazonaws.com/bucket/pdfs/file.pdf`)
  
  return pdfResponse
}
```

## 📊 Monitoramento em Produção

### 1. Rastrear Downloads

```javascript
// backend/src/routes/pdfs.js
router.get('/view/:apostilaId', authMiddleware, async (req, res) => {
  // Registrar download
  await Download.create({
    userId: req.user.id,
    apostilaId: req.params.apostilaId,
    timestamp: new Date()
  });
  
  // Servir PDF
  res.sendFile(pdfPath);
});
```

### 2. Analytics

```typescript
// src/components/PDFViewer.tsx
useEffect(() => {
  // Rastrear visualização
  analytics.track('PDF Viewed', {
    apostilaId: apostila.id,
    page: pageNumber
  });
}, [pageNumber]);
```

## 💰 Custos Estimados

### Opção 1: Public Folder (Atual)
- **Custo**: R$ 0
- **Limite**: Tamanho do deploy (geralmente 100-500MB)

### Opção 2: AWS S3 + CloudFront
- **Armazenamento**: ~R$ 0,10/GB/mês
- **Transferência**: ~R$ 0,30/GB
- **Exemplo**: 100 PDFs (5GB) + 1000 downloads/mês = ~R$ 2-5/mês

### Opção 3: Cloudinary
- **Free Tier**: 25GB armazenamento + 25GB bandwidth
- **Pago**: A partir de $89/mês

## 🎯 Recomendação Final

### Para Começar (0-100 usuários)
✅ Use a abordagem atual (`public/pdfs/`)
- Simples
- Sem custos
- Funciona perfeitamente

### Para Crescer (100-1000 usuários)
✅ Migre para AWS S3 + URLs assinadas
- Escalável
- Seguro
- Baixo custo

### Para Escala (1000+ usuários)
✅ AWS S3 + CloudFront + URLs assinadas
- CDN global
- Alta performance
- Controle total

## 📝 Checklist de Deploy

- [ ] PDFs na pasta `public/pdfs/`
- [ ] Worker copiado: `public/pdf.worker.min.mjs`
- [ ] Versões sincronizadas: `pdfjs-dist@5.4.296`
- [ ] Build testado: `npm run build`
- [ ] Preview testado: `npm run preview`
- [ ] URLs corretas no banco de dados
- [ ] CORS configurado (se usar CDN externo)
- [ ] Autenticação implementada (se necessário)
- [ ] Monitoramento configurado (opcional)

## 🔧 Troubleshooting em Produção

### PDF não carrega
1. Verificar console do navegador
2. Verificar se o arquivo existe no build
3. Verificar CORS (se usar CDN)
4. Verificar versões do pdfjs-dist

### Worker não carrega
1. Verificar se `pdf.worker.min.mjs` está no build
2. Verificar caminho no código
3. Verificar console para erros

### Performance lenta
1. Usar CDN (CloudFront, Cloudflare)
2. Comprimir PDFs (ghostscript, Adobe Acrobat)
3. Lazy loading de páginas
4. Cache agressivo
