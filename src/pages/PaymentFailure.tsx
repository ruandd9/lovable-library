import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft, RefreshCw } from 'lucide-react';

const PaymentFailure: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-card rounded-3xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/20 flex items-center justify-center">
            <X className="w-10 h-10 text-destructive" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Pagamento Não Aprovado
          </h1>
          
          <p className="text-muted-foreground mb-6">
            Seu pagamento não foi processado. Tente novamente ou escolha outro método de pagamento.
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => navigate('/catalogo')}
              className="w-full gradient-primary text-primary-foreground rounded-xl h-12"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Tentar Novamente
            </Button>
            
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="w-full rounded-xl h-12"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar ao Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;