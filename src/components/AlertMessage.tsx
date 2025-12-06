import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

interface AlertMessageProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ type, title, message, onClose }) => {
  const configs = {
    success: {
      icon: CheckCircle,
      bgClass: 'bg-success/10 border-success/20',
      iconClass: 'text-success',
      titleClass: 'text-success',
    },
    error: {
      icon: XCircle,
      bgClass: 'bg-destructive/10 border-destructive/20',
      iconClass: 'text-destructive',
      titleClass: 'text-destructive',
    },
    warning: {
      icon: AlertCircle,
      bgClass: 'bg-warning/10 border-warning/20',
      iconClass: 'text-warning',
      titleClass: 'text-warning',
    },
    info: {
      icon: Info,
      bgClass: 'bg-primary/10 border-primary/20',
      iconClass: 'text-primary',
      titleClass: 'text-primary',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className={`${config.bgClass} border rounded-2xl p-4 animate-fade-in`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${config.iconClass} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`font-semibold ${config.titleClass} mb-1`}>{title}</h4>
          )}
          <p className="text-foreground text-sm">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-foreground/10 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertMessage;
