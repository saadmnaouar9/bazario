import { useEffect } from 'react'
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, Truck, X } from 'lucide-react'
import { STORE } from '../data/store'
import { useStore } from '../context/StoreContext'
import { money } from './ui'

export function CartDrawer() {
  const { cartOpen, closeCart, items, subtotal, changeQty, removeItem, clearCart, notify } = useStore()

  useEffect(() => {
    if (!cartOpen) return
    const onKey = (e) => e.key === 'Escape' && closeCart()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [cartOpen, closeCart])

  if (!cartOpen) return null

  const left = Math.max(0, STORE.freeShippingThreshold - subtotal)
  const progress = Math.min(100, (subtotal / STORE.freeShippingThreshold) * 100)

  const checkout = () => {
    clearCart()
    closeCart()
    notify('Order placed — thank you! (demo checkout)')
  }

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="absolute inset-0 animate-fade-in bg-navy/60 backdrop-blur-sm" onClick={closeCart} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md animate-slide-in flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-navy/10 px-6 py-5">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <ShoppingBag size={22} className="text-orange" /> Your cart
          </h2>
          <button onClick={closeCart} aria-label="Close cart" className="rounded-full p-2 hover:bg-navy/5">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-24 w-24 place-items-center rounded-full bg-cream text-orange">
              <ShoppingBag size={40} />
            </span>
            <h3 className="mt-6 text-xl font-semibold">Your cart is empty</h3>
            <p className="mt-2 text-navy/55">Looks like you haven’t added anything yet.</p>
            <a
              href="#shop"
              onClick={closeCart}
              className="mt-7 rounded-full bg-brand px-8 py-3.5 font-semibold text-white shadow-brand"
            >
              Start shopping
            </a>
          </div>
        ) : (
          <>
            <div className="border-b border-navy/10 bg-cream px-6 py-4 text-sm">
              <p className="flex items-center gap-2 font-medium">
                {left > 0 ? (
                  <>
                    <Truck size={17} className="text-orange" /> Add <b>{money(left)}</b> more for free shipping
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={17} className="text-orange" /> You’ve unlocked free shipping!
                  </>
                )}
              </p>
              <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-navy/10">
                <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
              {items.map((i) => (
                <li key={i.id} className="flex gap-4">
                  <img src={i.image} alt={i.name} className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold leading-snug">{i.name}</h3>
                      <button
                        onClick={() => removeItem(i.id)}
                        aria-label={`Remove ${i.name}`}
                        className="text-navy/35 transition hover:text-flame"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                    <p className="text-sm capitalize text-navy/50">{i.category}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="inline-flex items-center rounded-full border border-navy/15">
                        <button onClick={() => changeQty(i.id, -1)} aria-label="Decrease quantity" className="p-2 hover:text-orange">
                          <Minus size={15} />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold tabular-nums">{i.qty}</span>
                        <button onClick={() => changeQty(i.id, 1)} aria-label="Increase quantity" className="p-2 hover:text-orange">
                          <Plus size={15} />
                        </button>
                      </div>
                      <span className="font-display text-lg font-bold">{money(i.price * i.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-4 border-t border-navy/10 p-6">
              <div className="flex items-center justify-between text-lg">
                <span className="text-navy/60">Subtotal</span>
                <span className="font-display text-2xl font-bold">{money(subtotal)}</span>
              </div>
              <p className="text-sm text-navy/50">Taxes and shipping calculated at checkout.</p>
              <button
                onClick={checkout}
                className="w-full rounded-full bg-brand py-4 text-lg font-semibold text-white shadow-brand transition hover:brightness-110 active:scale-[.99]"
              >
                Checkout
              </button>
              <button onClick={closeCart} className="w-full text-sm font-medium text-navy/60 hover:text-orange">
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export function Toast() {
  const { toast } = useStore()
  if (!toast) return null
  return (
    <div
      key={toast.key}
      role="status"
      className="fixed bottom-6 left-1/2 z-[90] flex -translate-x-1/2 animate-pop items-center gap-3 rounded-full bg-navy py-3.5 pl-4 pr-6 text-sm font-medium text-white shadow-2xl"
    >
      <span className="grid h-6 w-6 place-items-center rounded-full bg-brand">
        <CheckCircle2 size={15} />
      </span>
      {toast.message}
    </div>
  )
}
