import { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'
import logoDark from '../assets/logo.png'
import logoLight from '../assets/logo-light.png'
import { STORE } from '../data/store'

export const WHATSAPP_URL = `https://wa.me/${STORE.whatsapp}`

/** Official WhatsApp glyph. */
export function WhatsAppIcon({ size = 24, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

/** Displays the original logo file, un-altered, trimmed to its artwork via CSS crop only. */
export function Logo({ className = 'h-14', light = false }) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden ${className}`}
      style={{ aspectRatio: '1470 / 1020' }}
      role="img"
      aria-label="Bazario"
    >
      <img
        src={light ? logoLight : logoDark}
        alt=""
        draggable="false"
        className="absolute max-w-none select-none"
        style={{ width: `${(1600 / 1470) * 100}%`, left: `-${(62 / 1470) * 100}%`, top: `-${(252 / 1020) * 100}%` }}
      />
    </span>
  )
}

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

export function SectionHeading({ eyebrow, title, text, align = 'center' }) {
  return (
    <Reveal className={`mb-12 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange">
        <span className="h-px w-6 bg-brand" /> {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-base text-navy/60 sm:text-lg">{text}</p>}
    </Reveal>
  )
}

export function Stars({ value, size = 14 }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= Math.round(value) ? 'fill-amber text-amber' : 'fill-navy/10 text-navy/10'}
        />
      ))}
    </span>
  )
}

export const money = (n) => `${n.toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0 })} DH`

export const Container = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>
)
