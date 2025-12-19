# Como testar Webhooks localmente

## 1. Instalar ngrok
```bash
# Baixe em: https://ngrok.com/
# Ou instale via npm:
npm install -g ngrok
```

## 2. Expor seu localhost
```bash
ngrok http 3001
```

## 3. Configurar no MercadoPago
- URL do Webhook: `https://sua-url-ngrok.ngrok.io/api/purchases/webhook/mercadopago`
- Eventos: payment.created, payment.updated

## 4. Testar
1. Crie um pagamento PIX no seu sistema
2. Pague usando o app MercadoPago com a conta de teste
3. O webhook será chamado automaticamente
4. Veja os logs no seu backend

## Contas de Teste
- **Comprador**: TESTUSER1022520669771120901 | Senha: VvKcPgspno
- **Vendedor**: TESTUSER2289738191894730009 | Senha: qtqObn7YLM