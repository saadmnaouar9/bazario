import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import { NAV_LINKS, STORE } from '../data/store'
import { Container, Logo } from './ui'

const svg = (children) => (props) => (
  <svg viewBox="0 0 24 24" width={props.size} height={props.size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)
const Instagram = svg(<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></>)
const Facebook = svg(<path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5v4h3v7h4v-7h3l1-4h-4V7.5c0-.3.2-.5.5-.5H15z" />)
const Twitter = svg(<path d="M4 4l16 16M20 4L4 20" />)
const Youtube = svg(<><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" /></>)

const SOCIAL = [
  [Instagram, 'Instagram'],
  [Facebook, 'Facebook'],
  [Twitter, 'X (Twitter)'],
  [Youtube, 'YouTube'],
]

const col = 'text-white/65 transition hover:text-amber'

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy pt-20 text-white">
      <Container>
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo light className="h-24 w-auto" />
            <p className="mt-5 max-w-xs leading-relaxed text-white/60">
              Premium hair styling tools, cosmetics and skincare for women — delivered fast to your door.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL.map(([Icon, label]) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-brand"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-semibold">Navigate</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={col}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-semibold">Customer care</h4>
            <ul className="space-y-3">
              {['Shipping & delivery', 'Returns & refunds', 'Track my order', 'FAQs', 'Privacy policy'].map((t) => (
                <li key={t}>
                  <a href="#" className={col}>{t}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-semibold">Contact us</h4>
            <ul className="space-y-4 text-white/65">
              <li className="flex gap-3">
                <MapPin size={19} className="mt-0.5 shrink-0 text-orange" /> {STORE.address}
              </li>
              <li>
                <a href={`tel:${STORE.phone.replace(/[^+\d]/g, '')}`} className={`${col} flex gap-3`}>
                  <Phone size={19} className="shrink-0 text-orange" /> {STORE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${STORE.email}`} className={`${col} flex gap-3`}>
                  <Mail size={19} className="shrink-0 text-orange" /> {STORE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {STORE.name}. All rights reserved.</p>
          <a href="#home" className="inline-flex items-center gap-2 transition hover:text-amber">
            Back to top <ArrowUp size={16} />
          </a>
        </div>
      </Container>
    </footer>
  )
}
