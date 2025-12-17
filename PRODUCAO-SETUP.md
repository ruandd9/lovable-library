# 🚀 Configuração para Produção - PIX MercadoPago

## ✅ O que já está configurado corretamente:

### 🔒 **Proteções de Segurança**:
- ✅ Botões de simulação **NÃO aparecem** em produção (`import.meta.env.DEV`)
- ✅ Endpoints de simulação **bloqueados** em produção (`NODE_ENV !== 'development'`)
- ✅ Apenas pagamentos `approved` são aceitos em produção
- ✅ Logs de debug adequados para monitoramento

### 🎯 **Fluxo em Produção**:
1. **Cliente cria pagamento PIX** → Sistema gera QR Code real
2. **Cliente paga pelo app** → MercadoPago processa pagamento
3. **Sistema detecta aprovação** via polling (3s) ou webhook
4. **Compra é confirmada** automaticamente
5. **Apostila liberada** para o usuário

## 🔧 **Configurações necessárias para Produção**:

### 1. **Credenciais de Produção**:
```env
# backend/.env (PRODUÇÃO)
NODE_ENV=production
MERCADOPAGO_ACCESS_TOKEN=APP_USR-sua-chave-de-producao
MERCADOPAGO_PUBLIC_KEY=APP_USR-sua-chave-publica-producao
```

```env
# .env (FRONTEND PRODUÇÃO)
VITE_MERCADOPAGO_PUBLIC_KEY=APP_USR-sua-chave-publica-producao
```

### 2. **Webhooks (Recomendado)**:
- **URL**: `https://seu-dominio.com/api/purchases/webhook/mercadopago`
- **Eventos**: `payment.created`, `payment.updated`
- **Benefício**: Notificação instantânea (sem polling)

### 3. **Variáveis de Ambiente**:
```env
NODE_ENV=production
FRONTEND_URL=https://seu-dominio.com
```

## 🧪 **Teste em Produção**:

### Fluxo Real:
1. **Crie pagamento PIX** no sistema
2. **Pague com PIX real** (valor baixo para teste)
3. **Sistema detecta automaticamente** em ~3 segundos
4. **Compra é processada** e apostila liberada

### Monitoramento:
- Logs mostram status do pagamento
- Polling funciona automaticamente
- Webhooks (se configurados) notificam instantaneamente

## 🔍 **Diferenças Desenvolvimento vs Produção**:

| Funcionalidade | Desenvolvimento | Produção |
|---|---|---|
| Botões de simulação | ✅ Visíveis | ❌ Ocultos |
| Status aceitos | `pending`, `approved` | Apenas `approved` |
| Endpoints de simulação | ✅ Funcionam | ❌ Bloqueados (403) |
| Credenciais | Teste (TEST-) | Produção (APP_USR-) |
| Polling | 3 segundos | 3 segundos |
| Webhooks | Opcional | Recomendado |

## ✅ **Garantias para Produção**:

1. **Segurança**: Simulações bloqueadas automaticamente
2. **Confiabilidade**: Apenas pagamentos realmente aprovados são aceitos
3. **Monitoramento**: Logs detalhados para debug
4. **Performance**: Polling otimizado + webhooks opcionais
5. **UX**: Interface limpa sem botões de teste

## 🚀 **Deploy Checklist**:

- [ ] Credenciais de produção configuradas
- [ ] `NODE_ENV=production` definido
- [ ] Webhooks configurados (opcional)
- [ ] Teste com pagamento real pequeno
- [ ] Monitoramento de logs ativo
- [ ] Backup do banco de dados

**O sistema está 100% pronto para produção!** 🎉