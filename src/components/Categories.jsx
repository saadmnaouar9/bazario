import { ArrowUpRight } from 'lucide-react'
import { CATEGORIES } from '../data/store'
import { Container, Reveal, SectionHeading } from './ui'

export default function Categories({ onSelect }) {
  return (
    <section id="categories" className="bg-cream py-24">
      <Container>
        <SectionHeading
          eyebrow="Categories"
          title="Shop by category"
          text="From salon-grade styling tools to everyday skincare — everything for your beauty routine."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={i * 90}>
              <a
                href="#shop"
                onClick={() => onSelect(c.id)}
                className="group relative block aspect-[3/4] overflow-hidden rounded-3xl bg-navy shadow-[0_10px_40px_-18px_rgba(11,18,37,.5)]"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/15 to-transparent transition group-hover:from-navy/95" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                  <div>
                    <h3 className="text-2xl font-bold">{c.name}</h3>
                    <p className="mt-1 text-sm text-white/70">{c.count} products</p>
                  </div>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15 backdrop-blur transition duration-300 group-hover:rotate-45 group-hover:bg-brand">
                    <ArrowUpRight size={22} />
                  </span>
                </div>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand transition duration-500 group-hover:scale-x-100" />
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
