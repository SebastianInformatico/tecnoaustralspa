/**
 * Catálogo de líneas de producto.
 * Para agregar una línea nueva basta con sumar un objeto a PRODUCT_LINES:
 * la página /productos, su ficha y el formulario de cotización se generan solos.
 */

export type FamilyId = 'equipos' | 'insumos';

export interface Family {
  id: FamilyId;
  name: string;
  short: string;
  description: string;
}

export interface ProductLine {
  slug: string;
  /** Código interno: aparece solo en el correo de cotización, no en el sitio. */
  code: string;
  name: string;
  /** Nombre corto para la barra de categorías. */
  navLabel: string;
  family: FamilyId;
  /** Una línea para tarjetas y listados. */
  summary: string;
  /** Párrafo introductorio de la ficha. */
  description: string;
  /** Dónde se usa habitualmente. */
  settings: string[];
  /** Qué conviene definir antes de cotizar. */
  considerations: string[];
  /** Líneas complementarias (slugs). */
  related: string[];
}

export const FAMILIES: Family[] = [
  {
    id: 'equipos',
    name: 'Equipos médicos',
    short: 'Equipos',
    description: 'Electrocardiógrafos, Holter y monitores de paciente.',
  },
  {
    id: 'insumos',
    name: 'Insumos y accesorios',
    short: 'Insumos',
    description: 'Electrodos, cables, manguitos, sensores y consumibles para equipos.',
  },
];

export const PRODUCT_LINES: ProductLine[] = [
  {
    slug: 'electrocardiografos',
    code: 'ECG',
    name: 'Electrocardiógrafos',
    navLabel: 'Electrocardiógrafos',
    family: 'equipos',
    summary: 'Registro ECG en reposo para consulta, urgencia y chequeo preventivo.',
    description:
      'Equipos para obtener el trazado electrocardiográfico del paciente en reposo, con impresión o respaldo digital según el modelo. Te ayudamos a elegir el número de canales y el formato que calzan con tu flujo de atención.',
    settings: ['Consultas y especialistas', 'Servicios de urgencia', 'Centros de salud primaria', 'Medicina preventiva y ocupacional'],
    considerations: [
      'Número de canales o derivaciones que necesitas registrar.',
      'Si requieres impresión en papel, respaldo digital o ambos.',
      'Uso fijo en box o traslado entre salas (batería, carro).',
      'Volumen aproximado de exámenes diarios.',
    ],
    related: ['electrodos-y-cables', 'accesorios-ecg'],
  },
  {
    slug: 'holter-ecg',
    code: 'H-ECG',
    name: 'Holter ECG',
    navLabel: 'Holter ECG',
    family: 'equipos',
    summary: 'Registro prolongado de la actividad cardíaca durante la rutina del paciente.',
    description:
      'Grabadoras portátiles que registran el ritmo cardíaco durante 24 horas o más mientras el paciente realiza sus actividades habituales. Incluyen software de análisis según el modelo.',
    settings: ['Cardiología', 'Medicina interna', 'Centros de diagnóstico', 'Seguimiento ambulatorio'],
    considerations: [
      'Duración de registro requerida (24 h, 48 h o más).',
      'Número de canales de registro.',
      'Software de análisis y cómo entregarás los informes.',
      'Cantidad de grabadoras para tu agenda de exámenes.',
    ],
    related: ['electrodos-y-cables', 'accesorios-ecg'],
  },
  {
    slug: 'holter-de-presion',
    code: 'MAPA',
    name: 'Holter de presión',
    navLabel: 'Holter de presión',
    family: 'equipos',
    summary: 'Monitoreo ambulatorio de presión arterial (MAPA) para revisión clínica.',
    description:
      'Equipos que miden la presión arterial en intervalos programados durante el día y la noche, para evaluar el comportamiento real del paciente fuera de la consulta.',
    settings: ['Cardiología', 'Medicina general', 'Nefrología', 'Control de hipertensión'],
    considerations: [
      'Tamaños de manguito necesarios (adulto, obeso, pediátrico).',
      'Software de lectura e informe.',
      'Cantidad de equipos según la demanda de exámenes.',
    ],
    related: ['manguitos-y-sensores', 'accesorios-ecg'],
  },
  {
    slug: 'monitores',
    code: 'MON',
    name: 'Monitores de paciente',
    navLabel: 'Monitores',
    family: 'equipos',
    summary: 'Visualización continua de signos vitales en entornos de atención.',
    description:
      'Monitores multiparámetro para seguir en tiempo real parámetros como ECG, SpO₂, presión no invasiva y temperatura, según la configuración del equipo.',
    settings: ['Urgencias y reanimación', 'Procedimientos', 'Salas de recuperación', 'Traslados'],
    considerations: [
      'Parámetros que necesitas monitorizar.',
      'Montaje: sobre mesa, riel, pedestal o portátil.',
      'Pacientes adultos, pediátricos o ambos.',
    ],
    related: ['manguitos-y-sensores', 'electrodos-y-cables'],
  },
  {
    slug: 'electrodos-y-cables',
    code: 'ECG+',
    name: 'Electrodos y cables paciente',
    navLabel: 'Electrodos y cables',
    family: 'insumos',
    summary: 'Conexión estable entre el paciente y el equipo para una buena señal.',
    description:
      'Electrodos desechables, cables paciente y latiguillos para electrocardiógrafos, Holter y monitores. Verificamos la compatibilidad con tu equipo antes de despachar.',
    settings: ['Toma de ECG', 'Exámenes Holter', 'Monitoreo continuo'],
    considerations: [
      'Marca y modelo del equipo donde se usarán.',
      'Tipo de conector (broche, pinza, banana).',
      'Consumo mensual estimado para programar reposiciones.',
    ],
    related: ['electrocardiografos', 'holter-ecg'],
  },
  {
    slug: 'manguitos-y-sensores',
    code: 'NIBP',
    name: 'Manguitos y sensores',
    navLabel: 'Manguitos y sensores',
    family: 'insumos',
    summary: 'Accesorios de medición para presión, oximetría y temperatura.',
    description:
      'Manguitos de presión en distintas tallas, sensores de SpO₂ y sondas de temperatura para monitores y equipos de medición.',
    settings: ['Monitoreo de pacientes', 'Holter de presión', 'Box de atención'],
    considerations: [
      'Equipo y conector con el que deben ser compatibles.',
      'Tallas de manguito que usa tu población de pacientes.',
      'Si prefieres accesorios reutilizables o desechables.',
    ],
    related: ['monitores', 'holter-de-presion'],
  },
  {
    slug: 'accesorios-ecg',
    code: 'SUP',
    name: 'Accesorios y consumibles',
    navLabel: 'Accesorios',
    family: 'insumos',
    summary: 'Papel de registro, gel, baterías y repuestos para la operación diaria.',
    description:
      'Todo lo que se consume alrededor de los equipos: papel térmico para electrocardiógrafo, gel conductor, baterías, pilas para Holter y otros repuestos de uso recurrente.',
    settings: ['Operación diaria de consultas', 'Reposición programada', 'Bodegas de insumos clínicos'],
    considerations: [
      'Modelo del equipo para el formato de papel o batería.',
      'Frecuencia de reposición que te acomoda.',
    ],
    related: ['electrocardiografos', 'holter-ecg'],
  },
];

export const getLine = (slug: string) => PRODUCT_LINES.find((line) => line.slug === slug);
export const getFamily = (id: FamilyId) => FAMILIES.find((family) => family.id === id)!;
export const linesByFamily = (id: FamilyId) => PRODUCT_LINES.filter((line) => line.family === id);
