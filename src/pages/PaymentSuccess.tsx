import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Check, BookOpen, ArrowRight, Loader2 } from 'lucide-react';
import { purchasesAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    const processPayment = async () => {
      try {
        // Extrair parâmetros da URL
        const paymentId = searchParams.get('payment_id');
        const status = searchParams.get('status');
        const externalReference = searchParams.get('external_reference');
        const preferenceId = searchParams.get('preference_id');

        console.log('🎉 Retorno do pagamento:', {
          paymentId,
          status,
          externalReference,
          preferenceId
        });

        if (status === 'approved' && externalReference) {
          // Extrair apostilaId da external_reference
          // Formato: apostila_ID_userId_timestamp
          const parts = externalReference.split('_');
          const apostilaId = parts[1];

          if (apostilaId) {
            // Confirmar a compra no backend
            await purchasesAPI.confirmSimplePreference(
              apostilaId,
              externalReference,
              paymentId || undefined,
              status
            );

            // Atualizar usuário no localStorage
            if (user) {
              const updatedUser = {
                ...user,
                purchasedApostilas: [...user.purchasedApostilas, apostilaId],
              };
              localStorage.setItem('auth_user', JSON.stringify(updatedUser));
            }

            setPaymentData({
              status: 'success',
              paymentId,
              apostilaId
            });

            toast({
              title: 'Pagamento aprovado!',
              description: 'Sua apostila já está disponível na biblioteca.',
            });
          }
        } else if (status === 'pending') {
          setPaymentData({
            status: 'pending',
            paymentId
          });

          toast({
            title: 'Pagamento pendente',
            description: 'Aguardando confirmação do pagamento.',
          });
        } else {
          setPaymentData({
            status: 'error',
            paymentId
          });

          toast({
            title: 'Erro no pagamento',
            description: 'Houve um problema com seu pagamento.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Erro ao processar retorno:', error);
        setPaymentData({
          status: 'error'
        });

        toast({
          title: 'Erro ao processar',
          description: 'Não foi possível processar o retorno do pagamento.',
          variant: 'destructive',
        });
      } finally {
        setIsProcessing(false);
      }
    };

    processPayment();
  }, [searchParams, user, toast]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">Processando pagamento...</h2>
          <p className="text-muted-foreground">Aguarde enquanto confirmamos seu pagamento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-card rounded-3xl shadow-xl p-8 text-center">
          {paymentData?.status === 'success' && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center">
                <Check className="w-10 h-10 text-success" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Pagamento Aprovado!
              </h1>
              <p className="text-muted-foreground mb-6">
                Sua compra foi processada com sucesso. A apostila já está disponível na sua biblioteca.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="w-full gradient-primary text-primary-foreground rounded-xl h-12"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Ir para Biblioteca
                </Button>
                <Button
                  onClick={() => navigate('/catalogo')}
                  variant="outline"
                  className="w-full rounded-xl h-12"
                >
                  Continuar Comprando
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </>
          )}

          {paymentData?.status === 'pending' && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-warning/20 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-warning animate-spin" />
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
            </>
          )}

          {paymentData?.status === 'error' && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/20 flex items-center justify-center">
                <ArrowRight className="w-10 h-10 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Erro no Pagamento
              </h1>
              <p className="text-muted-foreground mb-6">
                Houve um problema com seu pagamento. Tente novamente.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/catalogo')}
                  className="w-full gradient-primary text-primary-foreground rounded-xl h-12"
                >
                  Tentar Novamente
                </Button>
              </div>
            </>
          )}

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              ID do Pagamento: {paymentData?.paymentId || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;