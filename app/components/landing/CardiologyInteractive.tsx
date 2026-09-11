import Image from 'next/image';

export default function CardiologyInteractive() {
  return (
    <section id="cardiologia" className="cardiology-interactive" aria-label="Experiencia digital Tecno Salud Austral">
      <div className="shell cardiology-phone-only">
        <div className="cardiology-feature cardiology-phone-card" data-reveal>
          <div className="cardiology-feature-image">
            <Image
              src="/images/mobile-clinical-experience.png"
              alt="Profesional de salud visualizando la página de Tecno Salud Austral en un iPhone"
              width={716}
              height={716}
              sizes="(max-width: 760px) 100vw, 1180px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
