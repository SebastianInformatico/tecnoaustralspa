import Image from 'next/image';

const items = [
  {
    code: 'ECG-120',
    name: 'Electrocardiografo digital',
    detail: 'Registro ECG de 12 derivaciones para consulta clinica.',
    quantity: 1,
    price: 890000,
  },
  {
    code: 'ACC-ECG',
    name: 'Set de electrodos y cables paciente',
    detail: 'Kit compatible para continuidad de uso.',
    quantity: 2,
    price: 42000,
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value);

export default function QuotePage() {
  const subtotal = items.reduce((total, item) => total + item.quantity * item.price, 0);
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + tax;

  return (
    <main className="quote-document">
      <div className="quote-toolbar">
        <a href="/">Volver al sitio</a>
        <button type="button" onClick={() => window.print()}>
          Guardar como PDF
        </button>
      </div>
      <article className="quote-paper">
        <header className="quote-document-header">
          <div className="quote-company">
            <Image
              src="/images/logo-tecno-salud-austral.png"
              alt="Tecno Salud Austral SPA"
              width={180}
              height={180}
            />
            <div>
              <p className="quote-kicker">SOLUCIONES CARDIOLOGICAS</p>
              <p>Equipamiento, accesorios e insumos para salud.</p>
            </div>
          </div>
          <div className="quote-meta">
            <span>COTIZACION</span>
            <strong>N° TSA-2026-001</strong>
            <p>08 de septiembre de 2026</p>
            <p>Vigencia: 15 dias</p>
          </div>
        </header>

        <section className="quote-intro">
          <div>
            <p className="quote-label">PREPARADA PARA</p>
            <h1>Centro Medico Austral</h1>
            <p>Atencion: Departamento de adquisiciones</p>
            <p>Puerto Montt, Chile</p>
          </div>
          <div className="quote-reference">
            <p className="quote-label">REFERENCIA</p>
            <p>Solicitud de equipamiento cardiologico para consulta y monitoreo.</p>
            <p className="quote-status">● Propuesta comercial</p>
          </div>
        </section>

        <section className="quote-table-wrap">
          <table className="quote-table">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Producto / servicio</th>
                <th>Cant.</th>
                <th>Precio unitario</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.code}>
                  <td className="quote-code">{item.code}</td>
                  <td>
                    <strong>{item.name}</strong>
                    <span>{item.detail}</span>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>{formatCurrency(item.quantity * item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="quote-summary">
          <div className="quote-note">
            <p className="quote-label">NOTA COMERCIAL</p>
            <p>Esta propuesta considera orientacion segun el uso previsto y disponibilidad al momento de confirmar la compra.</p>
          </div>
          <dl>
            <div><dt>Subtotal neto</dt><dd>{formatCurrency(subtotal)}</dd></div>
            <div><dt>IVA (19%)</dt><dd>{formatCurrency(tax)}</dd></div>
            <div className="quote-total"><dt>Total</dt><dd>{formatCurrency(total)}</dd></div>
          </dl>
        </section>

        <section className="quote-terms">
          <div>
            <p className="quote-label">CONDICIONES</p>
            <p>Valores expresados en pesos chilenos. Despacho y plazos se coordinan segun disponibilidad y ubicacion.</p>
          </div>
          <div>
            <p className="quote-label">CONTACTO COMERCIAL</p>
            <p>Tecno Salud Austral SPA</p>
            <p>Puerto Montt · Chile</p>
            <p>ventas@tecnosaludaustral.cl · +56 9 0000 0000</p>
          </div>
        </section>

        <footer className="quote-document-footer">
          <span>Gracias por considerar a Tecno Salud Austral.</span>
          <span>www.tecnosaludaustral.cl</span>
        </footer>
      </article>
    </main>
  );
}
