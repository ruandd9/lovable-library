import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen } from 'lucide-react';

const PaymentPending: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-card rounded-3xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-warning/20 flex items-center justify-center">
            <Clock className="w-10 h-10 text-warning" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Pagamento Pendente
          </h1>
          
          <p className="text-muted-foreground mb-6">
            Seu pagamento está sendo processado. Você receberá uma confirmação em breve.
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => navigate('/dashboard')}
              className="w-full gradient-primary text-primary-foreground rounded-xl h-12"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Ir para Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPending;