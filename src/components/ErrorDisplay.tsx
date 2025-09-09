// components/ErrorDisplay.tsx - Moderne error handling komponent
import React from 'react';
import { 
  WifiOff, 
  Server, 
  Clock, 
  RefreshCw,
  Shield,
  Database,
  AlertCircle,
  XCircle
} from 'lucide-react';

export interface ErrorDisplayProps {
  error: string | Error;
  onRetry?: () => void;
  onDismiss?: () => void;
  loading?: boolean;
  variant?: 'default' | 'minimal' | 'detailed';
  className?: string;
}

interface ErrorConfig {
  type: 'network' | 'server' | 'auth' | 'parsing' | 'timeout' | 'unknown';
  title: string;
  message: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  borderColor: string;
  retryable: boolean;
  severity: 'low' | 'medium' | 'high';
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
  error, 
  onRetry, 
  onDismiss,
  loading = false,
  variant = 'default',
  className = '' 
}) => {
  const errorString = error instanceof Error ? error.message : error;
  
  const classifyError = (errorMessage: string): ErrorConfig => {
    const message = errorMessage.toLowerCase();
    
    // Strukturert error matching med moderne patterns
    const errorPatterns: Array<{ pattern: RegExp | string; config: Omit<ErrorConfig, 'icon'> }> = [
      {
        pattern: /network|fetch.*failed|connection.*refused|cors/i,
        config: {
          type: 'network',
          title: 'Nettverksfeil',
          message: 'Kunne ikke koble til serveren. Sjekk internettforbindelsen din.',
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-800',
          borderColor: 'border-orange-200',
          retryable: true,
          severity: 'medium'
        }
      },
      {
        pattern: /parsing column.*datetime|error parsing/i,
        config: {
          type: 'parsing',
          title: 'Dataformat-problem',
          message: 'NIF API har for øyeblikket problemer med dato-håndtering. Dette er et midlertidig problem på deres servere.',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-800',
          borderColor: 'border-purple-200',
          retryable: true,
          severity: 'medium'
        }
      },
      {
        pattern: /401|unauthorized|authentication|invalid.*credentials/i,
        config: {
          type: 'auth',
          title: 'Autorisasjonsfeil',
          message: 'Tilgang nektet. Sjekk API-nøkler eller logg inn på nytt.',
          bgColor: 'bg-red-50',
          textColor: 'text-red-800',
          borderColor: 'border-red-200',
          retryable: false,
          severity: 'high'
        }
      },
      {
        pattern: /500|internal.*server.*error|server.*error/i,
        config: {
          type: 'server',
          title: 'Serverfeil',
          message: 'Det oppstod en feil på serveren. Problemet ligger hos tjenesteleverandøren.',
          bgColor: 'bg-red-50',
          textColor: 'text-red-800',
          borderColor: 'border-red-200',
          retryable: true,
          severity: 'high'
        }
      },
      {
        pattern: /timeout|timed.*out/i,
        config: {
          type: 'timeout',
          title: 'Forespørsel tok for lang tid',
          message: 'Serveren svarte ikke i tide. Prøv igjen om litt.',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-800',
          borderColor: 'border-yellow-200',
          retryable: true,
          severity: 'medium'
        }
      }
    ];

    for (const { pattern, config } of errorPatterns) {
      if (typeof pattern === 'string' ? message.includes(pattern) : pattern.test(message)) {
        return { ...config, icon: getErrorIcon(config.type) };
      }
    }

    // Default unknown error
    return {
      type: 'unknown',
      title: 'Ukjent feil',
      message: 'En uventet feil oppstod. Prøv å oppdatere siden eller kontakt support hvis problemet vedvarer.',
      icon: getErrorIcon('unknown'),
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-200',
      retryable: true,
      severity: 'medium'
    };
  };

  const getErrorIcon = (type: ErrorConfig['type']): React.ReactNode => {
    const iconProps = { className: "w-5 h-5 flex-shrink-0" };
    
    switch (type) {
      case 'network': return <WifiOff {...iconProps} />;
      case 'server': return <Server {...iconProps} />;
      case 'auth': return <Shield {...iconProps} />;
      case 'parsing': return <Database {...iconProps} />;
      case 'timeout': return <Clock {...iconProps} />;
      default: return <AlertCircle {...iconProps} />;
    }
  };

  const errorConfig = classifyError(errorString);

  // Minimal variant for inline errors
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-2 text-sm ${errorConfig.textColor} ${className}`}>
        {errorConfig.icon}
        <span>{errorConfig.title}</span>
        {onRetry && errorConfig.retryable && (
          <button
            onClick={onRetry}
            disabled={loading}
            className="ml-2 text-xs underline hover:no-underline disabled:opacity-50"
          >
            {loading ? 'Prøver...' : 'Prøv igjen'}
          </button>
        )}
      </div>
    );
  }

  // Detailed variant with full error info
  const isDetailed = variant === 'detailed';

  return (
    <div className={`rounded-xl border ${errorConfig.borderColor} ${errorConfig.bgColor} p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${errorConfig.bgColor} ${errorConfig.textColor}`}>
            {errorConfig.icon}
          </div>
          <div>
            <h3 className={`font-semibold ${errorConfig.textColor}`}>
              {errorConfig.title}
            </h3>
            {isDetailed && (
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  errorConfig.severity === 'high' ? 'bg-red-100 text-red-700' :
                  errorConfig.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {errorConfig.severity === 'high' ? 'Kritisk' :
                   errorConfig.severity === 'medium' ? 'Moderat' : 'Lav'}
                </span>
                <span className="text-xs text-gray-500">
                  {errorConfig.type.charAt(0).toUpperCase() + errorConfig.type.slice(1)}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`p-1 rounded-full hover:bg-white/50 transition-colors ${errorConfig.textColor}`}
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Message */}
      <div className={`mt-4 ${errorConfig.textColor}/80`}>
        <p className="text-sm leading-relaxed">{errorConfig.message}</p>
        
        {isDetailed && (
          <details className="mt-3">
            <summary className="text-xs cursor-pointer hover:underline">
              Tekniske detaljer
            </summary>
            <pre className="mt-2 text-xs bg-white/50 p-3 rounded-lg overflow-x-auto font-mono">
              {errorString}
            </pre>
          </details>
        )}
      </div>

      {/* Actions */}
      {(onRetry && errorConfig.retryable) && (
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={onRetry}
            disabled={loading}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
              transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              ${errorConfig.severity === 'high' 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : errorConfig.severity === 'medium'
                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }
            `}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Prøver igjen...' : 'Prøv igjen'}
          </button>
          
          {isDetailed && (
            <span className="text-xs text-gray-500">
              {errorConfig.retryable ? 'Automatisk retry anbefalt' : 'Manuell handling kreves'}
            </span>
          )}
        </div>
      )}

      {/* Help text for specific errors */}
      {errorConfig.type === 'network' && (
        <div className="mt-4 p-3 bg-white/50 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>Feilsøking:</strong> Sjekk at du er koblet til internett, eller prøv å laste siden på nytt.
          </p>
        </div>
      )}
      
      {errorConfig.type === 'parsing' && (
        <div className="mt-4 p-3 bg-white/50 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>Status:</strong> Dette er et kjent problem hos NIF API. De jobber med en løsning.
          </p>
        </div>
      )}
    </div>
  );
};

export default ErrorDisplay;