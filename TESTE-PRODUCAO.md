# 🚀 Guia de Teste em Produção

## ✅ **Apostila de Teste Criada:**

- **📚 Título**: "TESTE PRODUÇÃO - Validação PIX Real - R$ 2,00"
- **💰 Preço**: R$ 2,00 (valor baixo para testes)
- **🆔 ID**: `694493a615e17177951f9d2d`

---

## 🎯 **Como Testar em Produção:**

### **1. Preparação:**
```bash
# No servidor de produção, execute:
cd backend
node src/scripts/addTestApostilaProd.js
```

### **2. Cenários de Teste:**

#### **🧪 Teste A - Usuário Individual:**
1. **Crie uma conta** no site de produção
2. **Compre a apostila de teste** (R$ 2,00)
3. **Pague o PIX** com seu celular
4. **Verifique** se a apostila foi liberada
5. **Confirme** que aparece em "Minhas Compras"

#### **🧪 Teste B - Múltiplos Usuários:**
1. **Crie 2-3 contas diferentes**
2. **Em cada conta**, tente comprar a mesma apostila
3. **Cada uma deve gerar PIX diferente**
4. **Pague apenas 1 PIX**
5. **Verifique** que só quem pagou recebeu

#### **🧪 Teste C - Pagamentos Simultâneos:**
1. **2 usuários diferentes**
2. **Compram ao mesmo tempo**
3. **PIX gerados devem ser únicos**
4. **Pagamentos independentes**

---

## 🔍 **O que Validar:**

### **✅ PIX Funcionando:**
- [ ] QR Code é gerado
- [ ] Código copia e cola funciona
- [ ] Não aparece "modo teste"
- [ ] Valor correto (R$ 2,00)

### **✅ Pagamentos Únicos:**
- [ ] Cada usuário gera PIX diferente
- [ ] IDs de pagamento únicos
- [ ] Sem interferência entre contas

### **✅ Fluxo Completo:**
- [ ] Pagamento é detectado automaticamente
- [ ] Apostila é liberada corretamente
- [ ] Aparece em "Minhas Compras"
- [ ] PDF pode ser acessado

---

## 📊 **Logs para Monitorar:**

### **No servidor, observe:**
```bash
# Logs do backend mostrarão:
🔄 Criando pagamento PIX...
✅ Pagamento PIX criado com sucesso: [ID_ÚNICO]
🔍 Dados do PIX retornados: { qr_code: 'Presente' }
📊 Status do pagamento: pending → approved
✅ Compra confirmada
```

### **IDs devem ser diferentes:**
- Usuário 1: `138507286593`
- Usuário 2: `138507286594`
- Usuário 3: `138507286595`

---

## 🛠️ **Comandos Úteis:**

### **Adicionar apostila de teste:**
```bash
cd backend
node src/scripts/addTestApostilaProd.js
```

### **Remover apostila de teste:**
```bash
cd backend
node src/scripts/removeTestApostila.js
```

### **Ver logs em tempo real:**
```bash
# No servidor
tail -f logs/app.log
# ou
pm2 logs
```

---

## 🎯 **Resultados Esperados:**

### **✅ Sucesso:**
- PIX únicos para cada usuário
- Pagamentos independentes
- Detecção automática funciona
- Apostilas liberadas corretamente

### **❌ Problemas Possíveis:**
- Mesmo ID para usuários diferentes
- Pagamento de um libera para outro
- PIX não é detectado
- Apostila não é liberada

---

## 🚨 **Após os Testes:**

### **Se tudo funcionou:**
```bash
# Remover apostila de teste
node src/scripts/removeTestApostila.js

# Sistema está pronto para produção! 🎉
```

### **Se houve problemas:**
1. **Documente** os erros encontrados
2. **Colete logs** específicos
3. **Teste novamente** após correções

---

## 💡 **Dicas Importantes:**

1. **Use valores baixos** (R$ 2,00) para minimizar custos
2. **Teste com contas reais** diferentes
3. **Monitore logs** em tempo real
4. **Documente** todos os resultados
5. **Remova apostila de teste** após validação

---

## 📞 **Checklist Final:**

- [ ] Apostila de teste criada
- [ ] Testado com múltiplos usuários
- [ ] PIX únicos confirmados
- [ ] Pagamentos independentes
- [ ] Fluxo completo funcionando
- [ ] Logs monitorados
- [ ] Apostila de teste removida
- [ ] **Sistema validado para produção!** ✅

**Agora você pode testar com segurança em produção!** 🚀