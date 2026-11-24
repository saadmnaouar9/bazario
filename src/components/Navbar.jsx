import { useEffect, useMemo, useRef, useState } from 'react'
import { Heart, Menu, Search, ShoppingBag, X, Plus, ArrowRight } from 'lucide-react'
import { NAV_LINKS, PRODUCTS, STORE } from '../data/store'
import { useStore } from '../context/StoreContext'
import { Container, Logo, money } from './ui'

function SearchOverlay({ onClose }) {
  const [q, setQ] = useState('')
  const { addToCart } = useStore()
  const input = useRef()

  useEffect(() => {
    input.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    return term ? PRODUCTS.filter((p) => (p.name + p.category).toLowerCase().includes(term)) : PRODUCTS.slice(0, 4)
  }, [q])

  return (
    <div className="fixed inset-0 z-[70] animate-fade-in bg-navy/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="mx-auto mt-20 w-[calc(100%-2.5rem)] max-w-2xl animate-pop overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-navy/10 px-5">
          <Search size={20} className="text-orange" />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, categories…"
            className="h-16 flex-1 bg-transparent text-lg outline-none placeholder:text-navy/35"
          />
          <button onClick={onClose} aria-label="Close search" className="rounded-full p-2 hover:bg-navy/5">
            <X size={20} />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-3">
          <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-widest text-navy/40">
            {q ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Popular right now'}
          </p>
          {results.length === 0 && <p className="px-3 py-8 text-center text-navy/50">Nothing found for “{q}”.</p>}
          {results.map((p) => (
            <div key={p.id} className="flex items-center gap-4 rounded-2xl p-3 transition hover:bg-cream">
              <img src={p.image} alt={p.name} className="h-14 w-14 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{p.name}</p>
                <p className="text-sm capitalize text-navy/50">{p.category}</p>
              </div>
              <span className="font-display font-semibold">{money(p.price)}</span>
              <button
                onClick={() => addToCart(p)}
                aria-label={`Add ${p.name} to cart`}
                className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white transition hover:scale-110"
              >
                <Plus size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Navbar() {
  const { count, wishlist, openCart } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1))
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => document.getElementById(id) && io.observe(document.getElementById(id)))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menu || search ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [menu, search])

  const iconBtn = 'relative grid h-11 w-11 place-items-center rounded-full transition hover:bg-orange/10 hover:text-orange'
  const badge =
    'absolute right-0.5 top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-bold text-white'

  return (
    <>
      <div className="bg-navy text-center text-xs font-medium text-white sm:text-sm">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2 px-4">
          <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Offer</span>
          Free shipping on orders over {STORE.freeShippingThreshold} {STORE.currency} · Use code <b className="text-amber">WELCOME10</b> for 10% off
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/85 shadow-[0_8px_30px_-12px_rgba(11,18,37,.2)] backdrop-blur-xl' : 'bg-white'
        }`}
      >
        <Container className="flex h-20 items-center justify-between gap-6">
          <a href="#home" aria-label="Bazario home" className="transition hover:scale-[1.03]">
            <Logo className="h-[4.25rem] w-auto" />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-4 py-2 text-[15px] font-medium transition hover:text-orange ${
                  active === l.href ? 'text-orange' : 'text-navy/75'
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand transition-transform ${
                    active === l.href ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button className={iconBtn} onClick={() => setSearch(true)} aria-label="Search">
              <Search size={21} />
            </button>
            <a href="#shop" className={`${iconBtn} hidden sm:grid`} aria-label="Wishlist">
              <Heart size={21} />
              {wishlist.length > 0 && <span className={badge}>{wishlist.length}</span>}
            </a>
            <button className={iconBtn} onClick={openCart} aria-label="Open cart">
              <ShoppingBag size={21} />
              {count > 0 && <span key={count} className={`${badge} animate-pop`}>{count}</span>}
            </button>
            <button className={`${iconBtn} lg:hidden`} onClick={() => setMenu(true)} aria-label="Open menu">
              <Menu size={23} />
            </button>
          </div>
        </Container>
      </header>

      {search && <SearchOverlay onClose={() => setSearch(false)} />}

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${menu ? '' : 'pointer-events-none'}`}>
        <div
          onClick={() => setMenu(false)}
          className={`absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity ${menu ? 'opacity-100' : 'opacity-0'}`}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-white p-6 shadow-2xl transition-transform duration-300 ${
            menu ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo className="h-16 w-auto" />
            <button onClick={() => setMenu(false)} aria-label="Close menu" className={iconBtn}>
              <X size={23} />
            </button>
          </div>
          <nav className="mt-8 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenu(false)}
                className={`flex items-center justify-between rounded-2xl px-4 py-4 font-display text-xl font-semibold transition hover:bg-cream hover:text-orange ${
                  active === l.href ? 'bg-cream text-orange' : ''
                }`}
              >
                {l.label} <ArrowRight size={18} className="opacity-40" />
              </a>
            ))}
          </nav>
          <a
            href="#shop"
            onClick={() => setMenu(false)}
            className="mt-auto rounded-full bg-brand py-4 text-center font-semibold text-white shadow-brand"
          >
            Shop Now
          </a>
        </aside>
      </div>
    </>
  )
}
