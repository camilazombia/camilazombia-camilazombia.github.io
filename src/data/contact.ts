export const whatsappNumber = '573026572608';
export const whatsappDisplay = '+57 302 657 2608';

export function whatsappUrl(language: 'es' | 'en') {
  const message = language === 'es'
    ? 'Hola Camila, me gustaría conversar contigo sobre un proyecto.'
    : 'Hi Camila, I would like to talk with you about a project.';
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
