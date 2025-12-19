import React, { useState } from 'react';
import { Apostila } from '@/data/apostilas';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { X, Loader2, ExternalLink, ShieldCheck, BookOpen } from 'lucide-react';
import { purchasesAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface SimplePreferenceModalProps {
  apostila: Apostila | null;
  isOpen: boolean;
  onClose: () => void;
}

const SimplePreferenceModal: React.FC<SimplePreferenceModalProps> = ({ apostila, isOpen, onClose }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [preferenceUrl, setPreferenceUrl] = useState<string | null>(null);

  if (!isOpen || !apostila) return null;

  const handleCreatePreference = async () => {
    if (!user) {
      toast({
        title: 'Erro',
        description: 'Você precisa estar logado para comprar.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      console.log('🔄 Criando preferência para apostila:', apostila.id);
      
      const response = await purchasesAPI.createSimplePreference(apostila.id);
      const data = response.data;
      
      console.log('✅ Preferência criada:', data);
      
      setPreferenceUrl(data.init_point);
      
      toast({
        title: 'Preferência criada!',
        description: 'Clique no botão para ir ao MercadoPago.',
      });
      
    } catch (error: any) {
      console.error('❌ Erro ao criar preferência:', error);
      toast({
        title: 'Erro na compra',
        description: error.response?.data?.message || 'Não foi possível processar a compra.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoToPayment = () => {
    if (preferenceUrl) {
      window.open(preferenceUrl, '_blank');
      toast({
        title: 'Redirecionado!',
        description: 'Complete o pagamento na nova aba.',
      });
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      setPreferenceUrl(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-3xl shadow-xl max-w-md w-full overflow-hidden animate-scale-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isProcessing}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Header */}
        <div className="p-6 pb-0">
          <h3 className="text-xl font-bold text-foreground mb-1">Pagamento MercadoPago</h3>
          <p className="text-muted-foreground text-sm">PIX, Cartão ou Boleto</p>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="flex gap-4 p-4 bg-secondary/50 rounded-2xl mb-6">
            <div className="w-16 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-8 h-8 text-primary/50" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground text-sm leading-tight mb-1 line-clamp-2">
                {apostila.title}
              </h4>
              <p className="text-muted-foreground text-xs">{apostila.pages} páginas</p>
              <p className="text-primary font-bold text-lg mt-1">
                R$ {apostila.price.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Status */}
          {preferenceUrl ? (
            <div className="bg-success/10 border border-success/20 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-5 h-5 text-success" />
                <span className="font-medium text-success">Pronto para Pagamento!</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Sua preferência foi criada. Clique no botão abaixo para ir ao MercadoPago.
              </p>
              <Button
                onClick={handleGoToPayment}
                className="w-full gradient-primary text-primary-foreground"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Ir para MercadoPago
              </Button>
            </div>
          ) : (
            <div className="bg-muted/50 rounded-2xl p-4 mb-6">
              <h3 className="font-medium text-sm mb-2">Métodos Disponíveis:</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• PIX - Pagamento instantâneo</li>
                <li>• Cartão de Crédito - Até 12x</li>
                <li>• Boleto Bancário - 3 dias úteis</li>
              </ul>
            </div>
          )}

          {/* Security Badge */}
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-6">
            <ShieldCheck className="w-4 h-4 text-success" />
            <span>Pagamento seguro processado pelo MercadoPago</span>
          </div>

          {/* Action Buttons */}
          {!preferenceUrl ? (
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isProcessing}
                className="flex-1 rounded-xl"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreatePreference}
                disabled={isProcessing}
                className="flex-1 gradient-primary text-primary-foreground rounded-xl shadow-md hover:shadow-glow"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Criando...
                  </>
                ) : (
                  `Pagar R$ ${apostila.price.toFixed(2)}`
                )}
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={handleClose}
              className="w-full rounded-xl"
            >
              Fechar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimplePreferenceModal;