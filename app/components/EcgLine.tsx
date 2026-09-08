type EcgLineProps = { className?: string };

export default function EcgLine({ className = '' }: EcgLineProps) {
  return <svg aria-hidden="true" className={`ecg-line ${className}`} viewBox="0 0 960 132" fill="none" preserveAspectRatio="none"><path d="M0 70H132L153 70L173 49L194 101L218 17L246 114L273 69H395L418 70L436 54L454 89L474 32L497 105L520 70H675L697 70L715 52L735 91L756 29L782 107L808 70H960" /></svg>;
}
