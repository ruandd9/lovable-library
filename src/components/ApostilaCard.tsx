import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Apostila } from '@/data/apostilas';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Star, BookOpen, Lock, Check, ShoppingCart } from 'lucide-react';

interface ApostilaCardProps {
  apostila: Apostila;
  onPurchase?: (apostila: Apostila) => void;
}

const ApostilaCard: React.FC<ApostilaCardProps> = ({ apostila, onPurchase }) => {
  const { user, hasPurchased } = useAuth();
  const navigate = useNavigate();
  const isPurchased = hasPurchased(apostila.id);
  
  const discount = apostila.originalPrice 
    ? Math.round(((apostila.originalPrice - apostila.price) / apostila.originalPrice) * 100)
    : 0;

  const handleAction = () => {
    if (isPurchased) {
      navigate(`/dashboard?apostila=${apostila.id}`);
    } else if (user) {
      onPurchase?.(apostila);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="w-20 h-20 text-primary/30" />
        </div>
        
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full">
            -{discount}%
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 bg-card/90 backdrop-blur-sm text-foreground text-xs font-medium rounded-full">
          {apostila.category}
        </div>

        {/* Purchased Overlay */}
        {isPurchased && (
          <div className="absolute inset-0 bg-success/20 backdrop-blur-[2px] flex items-center justify-center">
            <div className="bg-success text-success-foreground px-4 py-2 rounded-full flex items-center gap-2 font-semibold">
              <Check className="w-4 h-4" />
              Adquirido
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-bold text-foreground text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
            {apostila.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {apostila.description}
          </p>
        </div>

        {/* Rating & Pages */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-warning">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-semibold text-foreground">{apostila.rating}</span>
            <span className="text-muted-foreground">({apostila.reviews})</span>
          </div>
          <span className="text-muted-foreground">{apostila.pages} páginas</span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {apostila.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-lg"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Price & Action */}
        <div className="flex items-end justify-between pt-2 border-t border-border">
          <div>
            {apostila.originalPrice && (
              <span className="text-muted-foreground line-through text-sm">
                R$ {apostila.originalPrice.toFixed(2)}
              </span>
            )}
            <p className="text-2xl font-bold text-primary">
              R$ {apostila.price.toFixed(2)}
            </p>
          </div>
          
          <Button
            onClick={handleAction}
            className={`gap-2 rounded-xl ${
              isPurchased 
                ? 'bg-success hover:bg-success/90 text-success-foreground'
                : 'gradient-primary text-primary-foreground shadow-md hover:shadow-glow'
            }`}
          >
            {isPurchased ? (
              <>
                <BookOpen className="w-4 h-4" />
                Acessar
              </>
            ) : user ? (
              <>
                <ShoppingCart className="w-4 h-4" />
                Comprar
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Ver mais
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApostilaCard;
