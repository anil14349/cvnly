import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Twitter, 
  Facebook, 
  Instagram 
} from 'lucide-react';

export const SOCIAL_LINK_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  phone: Phone,
  location: MapPin,
  website: Globe,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram
}; 