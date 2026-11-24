import { Gem, Headset, ShieldCheck, Truck } from 'lucide-react'
import { FEATURES } from '../data/store'
import { Container, Reveal, SectionHeading } from './ui'

const ICONS = { Truck, ShieldCheck, Gem, Headset }

export default function Features() {
  return (
    <section id="why-us" className="bg-navy py-24 text-white">
      <Container>
        <SectionHeading
          eyebrow="About Us"
          title={<>Why shop with <span className="text-brand">Bazario</span></>}
          text={<span className="text-white/60">We obsess over the details so every order feels effortless.</span>}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon, title, text }, i) => {
            const Icon = ICONS[icon]
            return (
              <Reveal key={title} delay={i * 90}>
                <div className="group h-full rounded-3xl border border-white/10 bg-white/[.04] p-7 transition duration-300 hover:-translate-y-1 hover:border-orange/50 hover:bg-white/[.07]">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand shadow-brand transition group-hover:rotate-6 group-hover:scale-110">
                    <Icon size={26} />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                  <p className="mt-2 leading-relaxed text-white/60">{text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
