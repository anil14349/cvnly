import { FontOptions } from './common';

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  url?: string;
  validUntil?: string;
  credentialId?: string;
}

export interface CertificationSectionProps {
  index: number;
  moveSection: (index: number, direction: 'up' | 'down') => void;
  deleteSection: (index: number) => void;
  sectionsLength: number;
  fontOptions: FontOptions;
  certifications: Certification[];
  addCertification: () => void;
  deleteCertification: (id: string) => void;
  updateCertification: (id: string, field: string, value: string) => void;
  expiryDate?: string;
  title?: string;
  onTitleChange?: (newTitle: string) => void;
} 