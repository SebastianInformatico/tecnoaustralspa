import Header from './Header';
import Footer from './Footer';
import PageEffects from './PageEffects';
import CtaBand from './CtaBand';

interface Props {
  children: React.ReactNode;
  /** Franja "¿Necesitas cotizar?" antes del footer. */
  cta?: boolean;
}

/** Estructura común de todas las páginas públicas: header, contenido, CTA y footer. */
export default function SiteFrame({ children, cta = true }: Props) {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">{children}</main>
      {cta && (
        <CtaBand
          title="¿Necesitas una cotización?"
          text="Agrega los productos que necesitas y te respondemos por correo con valores, disponibilidad y plazo de despacho."
          buttonLabel="Solicitar cotización"
          buttonHref="/cotizar"
        />
      )}
      <Footer />
      <PageEffects />
    </>
  );
}
