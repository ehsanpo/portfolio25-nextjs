import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Award, Calendar, ExternalLink, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

interface CertificationCardProps {
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  logo?: string;
  description?: string;
  skills?: string[];
  status?: 'active' | 'expired' | 'pending';
  variant?: 'default' | 'glass' | 'gradient';
  showVerification?: boolean;
  className?: string;
}

export function CertificationCard({
  title,
  issuer,
  issueDate,
  expiryDate,
  credentialId,
  credentialUrl,
  logo,
  description,
  skills = [],
  status = 'active',
  variant = 'default',
  showVerification = true,
  className,
}: CertificationCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-success-500" />;
      case 'expired':
        return <AlertCircle className="w-4 h-4 text-error-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-success-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'expired':
        return <Badge variant="error">Expired</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge variant="success">Active</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const isExpiringSoon = () => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const threeMonthsFromNow = new Date(now.getTime() + (90 * 24 * 60 * 60 * 1000));
    return expiry <= threeMonthsFromNow && expiry > now;
  };

  return (
    <Card 
      variant={variant} 
      hover 
      padding="lg" 
      className={cn('relative overflow-hidden', className)}
    >
      {/* Header with Logo and Title */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="flex-shrink-0">
          {logo ? (
            <img
              src={logo}
              alt={`${issuer} logo`}
              className="w-16 h-16 rounded-lg object-cover border border-border/50"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/30 flex items-center justify-center">
              <Award className="w-8 h-8 text-primary-500" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold font-basement text-foreground text-lg mb-1 truncate">
                {title}
              </h3>
              <p className="text-muted-foreground font-kabel mb-2">
                {issuer}
              </p>
              
              {/* Status and Verification */}
              <div className="flex items-center space-x-2 mb-2">
                {getStatusIcon()}
                {getStatusBadge()}
                {showVerification && (
                  <Badge variant="primary" className="text-xs">
                    Verified
                  </Badge>
                )}
                {isExpiringSoon() && (
                  <Badge variant="warning" className="text-xs">
                    Expires Soon
                  </Badge>
                )}
              </div>
            </div>

            {/* External Link */}
            {credentialUrl && (
              <a
                href={credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass-card hover:bg-primary-500/10 transition-all duration-300 hover:scale-110 group flex-shrink-0"
                aria-label="View credential"
              >
                <ExternalLink className="w-5 h-5 text-primary-500 group-hover:text-primary-400" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-muted-foreground font-kabel mb-4 leading-relaxed">
          {description}
        </p>
      )}

      {/* Date Information */}
      <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground font-kabel">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Issued: {formatDate(issueDate)}</span>
        </div>
        {expiryDate && (
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Expires: {formatDate(expiryDate)}</span>
          </div>
        )}
      </div>

      {/* Credential ID */}
      {credentialId && (
        <div className="mb-4">
          <p className="text-xs text-muted-foreground font-kabel">
            Credential ID: <code className="bg-muted/50 px-2 py-1 rounded text-foreground">{credentialId}</code>
          </p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium font-basement text-foreground mb-2">Skills Validated</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="neutral" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
}