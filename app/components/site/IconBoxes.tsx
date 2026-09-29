import type { ComponentType } from 'react';

export interface IconBoxItem {
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  title: string;
  text: string;
  /** Texto destacado bajo la descripción (ej.: un teléfono o correo). */
  detail?: string;
  href?: string;
  external?: boolean;
}

/** Fila de "Icon Box" (ícono en círculo, título y texto centrados). */
export default function IconBoxes({ items, columns = 4 }: { items: IconBoxItem[]; columns?: 3 | 4 }) {
  return (
    <div className={`icon-boxes icon-boxes--${columns}`}>
      {items.map(({ icon: Icon, title, text, detail, href, external }, index) => {
        const content = (
          <>
            <span className="icon-box-icon">
              <Icon aria-hidden="true" />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
            {detail && <strong className="icon-box-detail">{detail}</strong>}
          </>
        );
        const style = { transitionDelay: `${index * 90}ms` };
        return href ? (
          <a
            key={title}
            href={href}
            className="icon-box reveal"
            style={style}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {content}
          </a>
        ) : (
          <div key={title} className="icon-box reveal" style={style}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
