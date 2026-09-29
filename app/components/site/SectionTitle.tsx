interface Props {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  as?: 'h1' | 'h2';
}

/** Título de sección con línea divisoria, al estilo del widget "Heading" + "Divider" de Elementor. */
export default function SectionTitle({ title, subtitle, align = 'center', as: Tag = 'h2' }: Props) {
  return (
    <div className={`section-title section-title--${align} reveal`}>
      <Tag>{title}</Tag>
      <span className="section-divider" aria-hidden="true" />
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
