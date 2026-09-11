import Image from 'next/image';
import { ArrowUpRight, FileText, Mail, MousePointer2 } from 'lucide-react';

const serviceSteps = [
  [
    'Escuchamos el requerimiento',
    'Especialidad, entorno de uso y frecuencia de atención.',
  ],
  [
    'Revisamos la categoría',
    'Equipo, accesorios e insumos que forman parte de la solicitud.',
  ],
  [
    'Confirmamos disponibilidad',
    'Alternativas y condiciones a través del canal comercial.',
  ],
];

export default function MedicalDigitalExperience() {
  return (
    <section className="commercial-process" aria-labelledby="process-title">
      <div className="shell process-heading" data-reveal aria-hidden="true">
        <p className="eyebrow">CÓMO COTIZAMOS</p>
        <h2 id="process-title">No necesitas llegar con un modelo definido.</h2>
        <p>
          Conocer el uso previsto nos permite orientar la consulta y evitar una
          cotización desconectada de la realidad clínica.
        </p>
      </div>
      <div className="shell process-scene" aria-label="Cliente revisando una cotización en su computador">
        <div className="process-person" aria-hidden="true">
          <Image
            src="/images/clinical-professional.png"
            alt=""
            fill
            sizes="220px"
          />
        </div>
        <div className="process-laptop" aria-hidden="true">
          <div className="laptop-screen">
            <div className="mail-bar">
              <Mail /> <span>Bandeja de entrada</span><i />
            </div>
            <div className="mail-message">
              <div className="mail-avatar">T</div>
              <div>
                <b>Tecno Salud Austral</b>
                <span>Cotización para tu requerimiento</span>
                <small>Electrocardiógrafo · accesorios ECG</small>
              </div>
              <FileText className="mail-file" />
            </div>
            <MousePointer2 className="mail-cursor" />
          </div>
          <div className="laptop-base" />
        </div>
        <span className="process-scene-label">COTIZACIÓN RECIBIDA · 09:42</span>
      </div>
      <div className="shell process-list">
        {serviceSteps.map(([title, description]) => (
          <article key={title} data-reveal>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
        <a href="#cotizar">
          Iniciar consulta <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
