# Visualizador de PDF - Guia de Uso

## 📚 Apostila de Física com PDF

Foi adicionada uma nova apostila de **Física Completa para ENEM e Vestibulares** ao catálogo com visualizador de PDF integrado.

## ✨ Funcionalidades

### Visualizador de PDF
- **Navegação de páginas**: Botões anterior/próxima e navegação direta
- **Zoom**: Controles de zoom in/out (50% a 200%)
- **Tela cheia**: Modo fullscreen para melhor visualização
- **Download**: Baixar o PDF para estudo offline
- **Interface moderna**: Design responsivo e intuitivo

### Como Usar

1. **Acesse o Catálogo**: Vá para `/catalogo`
2. **Encontre a Apostila de Física**: ID 7 - "Física Completa para ENEM e Vestibulares"
3. **Compre a Apostila**: Clique em "Comprar" e complete o pagamento
4. **Acesse o Dashboard**: Após a compra, vá para `/dashboard`
5. **Clique em "Continuar"**: O botão abrirá o visualizador de PDF em modal

## 🔧 Componentes Criados

### 1. PDFViewer (`src/components/PDFViewer.tsx`)
Componente principal que renderiza o PDF com controles:
- Navegação de páginas
- Controles de zoom
- Modo fullscreen
- Botão de download
- Barra de navegação inferior

### 2. PDFViewerModal (`src/components/PDFViewerModal.tsx`)
Modal que envolve o PDFViewer:
- Animações suaves de entrada/saída
- Header com título e autor
- Botão de fechar
- Backdrop com blur

### 3. Integração no Dashboard
O Dashboard foi atualizado para:
- Importar o PDFViewerModal
- Abrir o modal ao clicar em "Continuar"
- Passar a apostila selecionada para o visualizador

## 📁 Estrutura de Arquivos

```
src/
├── components/
│   ├── PDFViewer.tsx          # Visualizador de PDF
│   └── PDFViewerModal.tsx     # Modal do visualizador
├── data/
│   └── apostilas.ts           # Apostila de Física adicionada (ID: 7)
└── pages/
    └── Dashboard.tsx          # Integração do visualizador

public/
└── pdfs/
    └── teste.pdf.pdf          # PDF de exemplo
```

## 🎨 Personalização

### Adicionar Mais PDFs

1. Coloque o PDF em `public/pdfs/`
2. Adicione a apostila em `src/data/apostilas.ts`:

```typescript
{
  id: "8",
  title: "Sua Apostila",
  // ... outros campos
  pdfUrl: "/pdfs/seu-arquivo.pdf", // Caminho relativo
}
```

### Customizar o Visualizador

Edite `src/components/PDFViewer.tsx` para:
- Alterar limites de zoom (min/max)
- Modificar cores e estilos
- Adicionar mais controles
- Ajustar layout

## 📦 Dependências

- `react-pdf`: Renderização de PDFs
- `pdfjs-dist`: Worker do PDF.js
- `framer-motion`: Animações
- `lucide-react`: Ícones

## 🚀 Próximos Passos

- [ ] Adicionar marcadores/favoritos
- [ ] Salvar progresso de leitura
- [ ] Modo noturno para leitura
- [ ] Anotações no PDF
- [ ] Busca de texto no PDF
- [ ] Impressão de páginas específicas

## 💡 Dicas

- O PDF é carregado sob demanda (lazy loading)
- Use o modo fullscreen para melhor experiência
- O zoom é persistente durante a navegação
- Funciona em dispositivos móveis e desktop
