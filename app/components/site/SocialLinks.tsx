import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './BrandIcons';
import { SOCIAL, whatsappUrl } from '@/lib/site';

const NETWORKS = [
  { key: 'whatsapp', label: 'WhatsApp', icon: WhatsAppIcon, url: whatsappUrl() },
  { key: 'instagram', label: 'Instagram', icon: InstagramIcon, url: SOCIAL.instagram },
  { key: 'facebook', label: 'Facebook', icon: FacebookIcon, url: SOCIAL.facebook },
] as const;

/** Logos de redes. Las que aún no tienen cuenta se muestran sin enlace. */
export default function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`social-links ${className}`}>
      {NETWORKS.map(({ key, label, icon: Icon, url }) => (
        <li key={key}>
          {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
              <Icon aria-hidden="true" />
            </a>
          ) : (
            <span title={`${label} (próximamente)`} aria-label={`${label}, próximamente`} role="img">
              <Icon aria-hidden="true" />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
