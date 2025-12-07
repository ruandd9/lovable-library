# Como Testar o Visualizador de PDF

## Passos para Testar

### 1. Verificar se o Backend está Rodando
O backend deve estar rodando na porta 3001. Você pode verificar acessando:
```
http://localhost:3001/api/apostilas
```

### 2. Fazer Login ou Criar Conta
- Acesse: `http://localhost:5173/login`
- Faça login ou crie uma nova conta

### 3. Comprar a Apostila de Física
- Vá para o Catálogo: `http://localhost:5173/catalogo`
- Procure pela apostila: **"Física Completa - Mecânica, Termodinâmica e Eletromagnetismo"**
- Clique em "Comprar"
- Escolha o método de pagamento (PIX ou Cartão)
- Complete a compra

### 4. Acessar o Dashboard
- Após a compra, vá para: `http://localhost:5173/dashboard`
- Você verá a apostila de Física na lista de "Minhas Apostilas"

### 5. Abrir o Visualizador de PDF
- Clique no botão **"Continuar"** na apostila de Física
- O modal do visualizador deve abrir com o PDF

## O que Verificar no Console

Abra o Console do Navegador (F12) e verifique os logs:

```
PDFViewerModal - isOpen: true
PDFViewerModal - apostila: {id: "...", title: "...", pdfUrl: "/pdfs/teste.pdf.pdf"}
PDFViewerModal - pdfUrl: /pdfs/teste.pdf.pdf
PDFViewer - pdfUrl: /pdfs/teste.pdf.pdf
PDFViewer - title: Física Completa...
PDF carregado com sucesso! Páginas: X
```

## Possíveis Problemas

### PDF não carrega
1. **Verifique se o arquivo existe**: `public/pdfs/teste.pdf.pdf`
2. **Verifique o console**: Procure por erros de CORS ou 404
3. **Verifique a URL**: Deve ser `/pdfs/teste.pdf.pdf` (relativo ao public)

### Modal não abre
1. **Verifique se a apostila tem pdfUrl**: Olhe no console os logs
2. **Verifique se comprou a apostila**: Só apostilas compradas aparecem no Dashboard

### Apostila não aparece no Dashboard
1. **Verifique se o backend está rodando**
2. **Verifique se fez o seed**: Execute `node src/scripts/seedApostilas.js` no backend
3. **Verifique se comprou a apostila**: Faça uma nova compra

## Comandos Úteis

### Reiniciar o Seed (Backend)
```bash
cd backend
node src/scripts/seedApostilas.js
```

### Verificar Apostilas no Banco
```bash
# No MongoDB Compass ou mongosh
db.apostilas.find({})
```

### Limpar LocalStorage (se necessário)
No Console do Navegador:
```javascript
localStorage.clear()
location.reload()
```
