import { SITE, whatsappUrl } from './site';

/**
 * Compatibilidad con el documento de cotización (/cotizacion).
 * Los datos reales viven en lib/site.ts.
 */
export const COMPANY_INFO = {
  name: SITE.name,
  shortName: SITE.shortName,
  location: `${SITE.city} · Chile`,
  email: SITE.email,
  phoneDisplay: SITE.phoneDisplay,
  whatsappNumber: SITE.whatsappNumber,
  whatsappUrl: whatsappUrl(),
  pelletWhatsappUrl: whatsappUrl('Hola, me gustaría consultar por disponibilidad y valores de pellet.'),
};
