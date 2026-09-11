/**
 * Constantes y configuración de contacto de Tecno Salud Austral SPA.
 * Centralizar estos datos previene inconsistencias, enlaces rotos y facilita su mantenimiento.
 */
export const COMPANY_INFO = {
  name: 'Tecno Salud Austral SPA',
  shortName: 'Tecno Salud Austral',
  location: 'Puerto Montt · Chile',
  email: 'ventas@tecnosaludaustral.cl',
  phoneDisplay: '+56 9 0000 0000',
  // Reemplazar 56900000000 con el número real de atención cuando esté disponible
  whatsappNumber: '56900000000',
  get whatsappUrl() {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(
      'Hola, me gustaría solicitar información y cotización sobre sus equipos e insumos.'
    )}`;
  },
  get pelletWhatsappUrl() {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(
      'Hola, me gustaría consultar por disponibilidad y valores de pellet.'
    )}`;
  },
};
