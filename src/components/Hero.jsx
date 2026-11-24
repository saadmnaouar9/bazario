import { ArrowRight, ChevronDown, Star, Truck } from 'lucide-react'
import { Container } from './ui'

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-navy text-white">
      <img
        src="/img/hero.jpg"
        alt=""
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_35%]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/10 lg:via-navy/70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
      <div className="absolute -left-32 top-1/3 -z-10 h-96 w-96 rounded-full bg-orange/30 blur-[120px]" />

      <Container className="flex min-h-[min(calc(100svh-7.25rem),780px)] flex-col justify-center py-20 lg:min-h-[680px]">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber" /> New women’s collection is here
          </span>
          <h1 className="mt-6 text-[2.1rem] font-extrabold leading-[1.1] min-[420px]:text-5xl sm:text-6xl lg:text-7xl">
            <span className="whitespace-nowrap">Everything she loves,</span>
            <br />
            <span className="text-brand">all in one place.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
            Discover premium products for women — beauty, makeup, skincare, hair care and styling tools — carefully selected and delivered to your door in days.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#shop"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 font-semibold shadow-brand transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Shop Now <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </a>
            <a
              href="#categories"
              className="inline-flex items-center gap-2 rounded-full border border-white/35 px-8 py-4 font-semibold backdrop-blur transition hover:border-amber hover:bg-white/10 hover:text-amber"
            >
              Discover More
            </a>
          </div>

          <dl className="mt-14 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            {[
              ['50K+', 'Happy customers'],
              ['4.9', 'Average rating'],
              ['2–4 days', 'Delivery'],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl font-bold text-amber">{n}</dt>
                <dd className="text-white/60">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      {/* floating glass cards */}
      <div className="pointer-events-none absolute bottom-16 right-[6%] hidden animate-float items-center gap-3 rounded-2xl border border-white/20 bg-white/15 p-4 pr-6 backdrop-blur-xl lg:flex">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand">
          <Truck size={22} />
        </span>
        <div>
          <p className="font-display font-semibold">Free express shipping</p>
          <p className="flex items-center gap-1 text-sm text-white/70">
            <Star size={13} className="fill-amber text-amber" /> Rated 4.9 by 12,000+ buyers
          </p>
        </div>
      </div>

      <a href="#categories" aria-label="Scroll down" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/60 hover:text-amber md:block">
        <ChevronDown className="animate-bounce" />
      </a>
    </section>
  )
}
