import { useState } from 'react'
import { ArrowRight, BadgePercent, CheckCircle2, Gift, Sparkles } from 'lucide-react'
import { Container, Reveal } from './ui'

const PERKS = [
  [BadgePercent, '10% off your first order'],
  [Sparkles, 'Early access to new arrivals'],
  [Gift, 'Private offers & beauty tips'],
]

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | done

  const submit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return setStatus('error')
    setStatus('done')
    setEmail('')
  }

  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy text-white">
            {/* brand glows + dotted texture */}
            <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-brand opacity-70 blur-[90px]" />
            <div className="absolute -bottom-32 left-1/4 -z-10 h-72 w-72 rounded-full bg-flame/40 blur-[110px]" />
            <div
              className="absolute inset-0 -z-10 opacity-[.18]"
              style={{
                backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                backgroundSize: '22px 22px',
                maskImage: 'linear-gradient(to left, #000, transparent 70%)',
                WebkitMaskImage: 'linear-gradient(to left, #000, transparent 70%)',
              }}
            />

            <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:p-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-amber" /> Newsletter
                </span>
                <h2 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
                  Get <span className="text-brand">10% off</span>
                  <br />
                  your first order
                </h2>
                <ul className="mt-7 space-y-3">
                  {PERKS.map(([Icon, text]) => (
                    <li key={text} className="flex items-center gap-3 text-white/80">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-amber">
                        <Icon size={18} />
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/15 bg-white/[.07] p-6 backdrop-blur-xl sm:p-8">
                {status === 'done' ? (
                  <div className="animate-pop py-6 text-center">
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand shadow-brand">
                      <CheckCircle2 size={30} />
                    </span>
                    <h3 className="mt-5 text-2xl font-bold">You’re in!</h3>
                    <p className="mt-2 text-white/70">
                      Check your inbox for your code <b className="text-amber">WELCOME10</b>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <h3 className="text-xl font-bold">Join the Bazario list</h3>
                    <p className="mt-1.5 text-sm text-white/60">No spam — just the good stuff. Unsubscribe anytime.</p>
                    <label htmlFor="nl-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="nl-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setStatus('idle')
                      }}
                      placeholder="Enter your email address"
                      aria-invalid={status === 'error'}
                      className={`mt-6 h-14 w-full rounded-full border-2 bg-white px-6 text-navy outline-none transition placeholder:text-navy/40 focus:border-amber ${
                        status === 'error' ? 'border-flame' : 'border-transparent'
                      }`}
                    />
                    {status === 'error' && (
                      <p className="mt-2 pl-4 text-sm font-medium text-amber">Please enter a valid email address.</p>
                    )}
                    <button className="group mt-4 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand font-semibold shadow-brand transition hover:-translate-y-0.5 hover:brightness-110 active:scale-[.99]">
                      Subscribe <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
