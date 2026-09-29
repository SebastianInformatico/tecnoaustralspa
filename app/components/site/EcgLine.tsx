/** Trazo ECG del isotipo, usado como detalle gráfico de la marca. */
export default function EcgLine({ className = '' }: { className?: string }) {
  return (
    <svg className={`ecg-line ${className}`} viewBox="0 0 240 40" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 22h70l8-2 7 2h10l6-16 8 30 7-20 5 6h22l8-3 7 3h82" />
    </svg>
  );
}
