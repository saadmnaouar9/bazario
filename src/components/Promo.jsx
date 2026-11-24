import { useEffect, useState } from 'react'
import { ArrowRight, Copy, Check } from 'lucide-react'
import { Container, Reveal } from './ui'

const pad = (n) => String(n).padStart(2, '0')

function useCountdown() {
  // Rolling 3-day promo window; replace with a real end date when going live.
  const [end] = useState(() => Date.now() + 3 * 24 * 3600 * 1000 + 5 * 3600 * 1000)
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const s = Math.max(0, Math.floor((end - now) / 1000))
  return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60]
}

export default function Promo() {
  const [d, h, m, s] = useCountdown()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText('BAZ25')
    } catch {
      /* clipboard unavailable — still show feedback */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section className="px-5 pb-24 sm:px-8">
      <Reveal>
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-brand text-white shadow-[0_30px_70px_-30px_rgba(254,54,3,.6)]">
          <img
            src="/img/promo.jpg"
            alt=""
            loading="lazy"
            className="absolute inset-y-0 right-0 -z-10 h-full w-full object-cover opacity-30 mix-blend-multiply md:w-3/5 md:opacity-100 md:mix-blend-normal"
            style={{ maskImage: 'linear-gradient(to right, transparent, #000 45%)', WebkitMaskImage: 'linear-gradient(to right, transparent, #000 45%)' }}
          />
          <div className="absolute -left-20 -top-20 -z-10 h-72 w-72 rounded-full bg-white/15 blur-3xl" />

          <div className="max-w-xl p-8 sm:p-12 lg:p-16">
            <span className="rounded-full bg-navy px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]">Limited time</span>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Up to 40% off
              <br />
              on beauty favourites
            </h2>
            <p className="mt-4 max-w-md text-lg text-white/90">
              Hair tools, hair care, makeup and skincare — our biggest beauty event of the year.
            </p>

            <div className="mt-7 flex gap-3">
              {[
                [d, 'Days'],
                [h, 'Hrs'],
                [m, 'Min'],
                [s, 'Sec'],
              ].map(([v, l]) => (
                <div key={l} className="w-[4.25rem] rounded-2xl bg-navy/85 py-3 text-center backdrop-blur">
                  <div className="font-display text-2xl font-bold tabular-nums">{pad(v)}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/60">{l}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#shop"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-navy shadow-xl transition hover:-translate-y-0.5 hover:bg-navy hover:text-white"
              >
                Shop the Sale <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </a>
              <button
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-white/70 px-5 py-3.5 font-semibold transition hover:bg-white/15"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Code copied!' : 'Code: BAZ25'}
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
