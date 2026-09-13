export const CONTACT_CONFIG = {
  whatsappNumber: '+2250101682535',
  whatsappNumberDisplay: '+225 01 01 68 25 35',
  whatsappRaw: '2250101682535',
  email: 'redaction@epiqure-sante.ci',
  getWhatsAppUrl: (message?: string) => {
    const baseUrl = 'https://wa.me/2250101682535';
    if (!message || !message.trim()) return baseUrl;
    return `${baseUrl}?text=${encodeURIComponent(message.trim())}`;
  },
};
