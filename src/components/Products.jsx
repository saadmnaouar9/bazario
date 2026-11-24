import { useState } from 'react'
import { Check, Heart, ShoppingBag } from 'lucide-react'
import { PRODUCTS, PRODUCT_FILTERS } from '../data/store'
import { useStore } from '../context/StoreContext'
import { Container, Reveal, SectionHeading, Stars, money } from './ui'

function ProductCard({ p }) {
  const { addToCart, toggleWishlist, wishlist } = useStore()
  const [added, setAdded] = useState(false)
  const liked = wishlist.includes(p.id)
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0

  const add = () => {
    addToCart(p)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy/[.07] bg-white transition duration-300 hover:-translate-y-1.5 hover:border-orange/30 hover:shadow-[0_24px_50px_-20px_rgba(252,118,3,.35)]">
      <div className="relative aspect-square overflow-hidden bg-cream">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          style={p.zoom ? { scale: p.zoom } : undefined}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        {p.badge && (
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
              p.badge === 'Sale' ? 'bg-flame text-white' : 'bg-navy text-white'
            }`}
          >
            {p.badge === 'Sale' ? `-${discount}%` : p.badge}
          </span>
        )}
        <button
          onClick={() => toggleWishlist(p)}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={liked}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:scale-110"
        >
          <Heart size={19} className={`transition ${liked ? 'fill-flame text-flame' : 'text-navy'}`} />
        </button>
        <button
          onClick={add}
          className="absolute inset-x-4 bottom-4 hidden translate-y-4 items-center justify-center gap-2 rounded-full bg-navy/90 py-3 text-sm font-semibold text-white opacity-0 backdrop-blur transition duration-300 hover:bg-orange group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
        >
          <ShoppingBag size={16} /> Quick add
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange">{p.category}</p>
        <h3 className="mt-1.5 text-lg font-semibold leading-snug">{p.name}</h3>
        {p.description && <p className="mt-1.5 text-sm leading-snug text-navy/60">{p.description}</p>}
        {p.reviews > 0 && (
          <div className="mt-2 flex items-center gap-2 text-sm text-navy/50">
            <Stars value={p.rating} /> <span>({p.reviews})</span>
          </div>
        )}
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <p className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold">{money(p.price)}</span>
            {p.oldPrice && <span className="text-sm text-navy/40 line-through">{money(p.oldPrice)}</span>}
          </p>
          <button
            onClick={add}
            aria-label={`Add ${p.name} to cart`}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition active:scale-95 ${
              added ? 'bg-navy' : 'bg-brand shadow-brand hover:brightness-110'
            }`}
          >
            {added ? <Check size={16} /> : <ShoppingBag size={16} />}
            {added ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Products({ filter, setFilter }) {
  const list = PRODUCTS.filter((p) => filter === 'all' || p.category === filter)

  return (
    <section id="shop" className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Featured"
          title="Trending right now"
          text="Our most-loved beauty and hair essentials, picked by thousands of customers."
        />
        <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
          {PRODUCT_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                filter === f.id ? 'bg-brand text-white shadow-brand' : 'bg-navy/5 text-navy/70 hover:bg-orange/10 hover:text-orange'
              }`}
            >
              {f.label}
            </button>
          ))}
        </Reveal>

        {list.length === 0 ? (
          <p className="rounded-3xl bg-cream py-16 text-center text-navy/60">
            New arrivals in this category are coming soon.{' '}
            <button onClick={() => setFilter('all')} className="font-semibold text-orange underline">
              View all products
            </button>
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 80}>
                <ProductCard p={p} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
