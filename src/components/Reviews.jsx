import { Quote } from 'lucide-react'
import { REVIEWS } from '../data/store'
import { Container, Reveal, SectionHeading, Stars } from './ui'

export default function Reviews() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading eyebrow="Testimonials" title="Loved by customers" text="Real words from real people who shop with us." />
        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 100}>
              <figure className="relative flex h-full flex-col rounded-3xl border border-navy/[.07] bg-white p-8 shadow-[0_10px_40px_-20px_rgba(11,18,37,.25)] transition duration-300 hover:-translate-y-1 hover:border-orange/30">
                <Quote size={44} className="absolute right-6 top-6 fill-orange/10 text-orange/10" />
                <Stars value={r.rating} size={18} />
                <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-navy/80">“{r.text}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-brand font-display text-lg font-bold text-white">
                    {r.name[0]}
                  </span>
                  <span>
                    <span className="block font-semibold">{r.name}</span>
                    <span className="text-sm text-navy/50">{r.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
