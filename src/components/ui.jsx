import { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'
import logoDark from '../assets/logo.png'
import logoLight from '../assets/logo-light.png'

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
