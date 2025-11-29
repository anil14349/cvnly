import { useState } from 'react';
import { SocialLink } from '../types/common';

const initialLinks: SocialLink[] = [
  {
    id: '1',
    type: 'email',
    value: 'john.doe@example.com'
  },
  {
    id: '2',
    type: 'phone',
    value: '+1 (555) 123-4567'
  },
  {
    id: '3',
    type: 'linkedin',
    value: 'linkedin.com/in/johndoe'
  }
];

export const useSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialLinks);

  const addSocialLink = (type: 'phone' | 'email' | 'linkedin' | 'github' | 'location') => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      type: type,
      value: ''
    };
    setSocialLinks([...socialLinks, newLink]);
  };

  const updateSocialLink = (id: string, value: string) => {
    setSocialLinks(socialLinks.map(link =>
      link.id === id ? { ...link, value } : link
    ));
  };

  const deleteSocialLink = (id: string) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  return {
    socialLinks,
    setSocialLinks,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink
  };
};

