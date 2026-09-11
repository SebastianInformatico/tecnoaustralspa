import Image from 'next/image';

const supplies = [
  { name: 'Insumos clínicos', code: 'SUMINISTRO', image: '/images/medical-supplies-general.png' },
  { name: 'Consumibles hospitalarios', code: 'INSUMOS', image: '/images/medical-consumables.png' },
  { name: 'Evaluación clínica', code: 'EQUIPAMIENTO', image: '/images/clinical-supplies.png' },
];

export default function MiniSupplyCarousel() {
  const items = [...supplies, ...supplies];

  return (
    <section className="mini-supply-strip" aria-label="Equipos e insumos cardiológicos destacados">
      <div className="shell mini-supply-header">
        <span>Equipamiento en movimiento</span>
        <small>INSUMOS · EQUIPAMIENTO · SUMINISTRO</small>
      </div>
      <div className="mini-supply-viewport">
        <div className="mini-supply-track">
          {items.map((supply, index) => (
            <article className="mini-supply-card" key={`${supply.code}-${index}`}>
              <div className="mini-supply-image">
                <Image src={supply.image} alt="" width={220} height={140} sizes="180px" />
              </div>
              <div>
                <small>{supply.code}</small>
                <strong>{supply.name}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
