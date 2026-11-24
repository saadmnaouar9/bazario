import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { PRODUCTS } from '../data/store'

const Ctx = createContext(null)
export const useStore = () => useContext(Ctx)

const load = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const found = state.find((i) => i.id === action.id)
      return found
        ? state.map((i) => (i.id === action.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state, { id: action.id, qty: 1 }]
    }
    case 'qty':
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty + action.delta } : i))
        .filter((i) => i.qty > 0)
    case 'remove':
      return state.filter((i) => i.id !== action.id)
    case 'clear':
      return []
    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, null, () => load('bazario-cart', []))
  const [wishlist, setWishlist] = useState(() => load('bazario-wishlist', []))
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const timer = useRef()

  useEffect(() => localStorage.setItem('bazario-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('bazario-wishlist', JSON.stringify(wishlist)), [wishlist])

  const notify = useCallback((message) => {
    clearTimeout(timer.current)
    setToast({ message, key: Date.now() })
    timer.current = setTimeout(() => setToast(null), 2600)
  }, [])

  const value = useMemo(() => {
    const items = cart
      .map((c) => ({ ...PRODUCTS.find((p) => p.id === c.id), qty: c.qty }))
      .filter((i) => i.name)
    return {
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.price, 0),
      wishlist,
      cartOpen,
      toast,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      notify,
      addToCart: (p) => {
        dispatch({ type: 'add', id: p.id })
        notify(`${p.name} added to cart`)
      },
      changeQty: (id, delta) => dispatch({ type: 'qty', id, delta }),
      removeItem: (id) => dispatch({ type: 'remove', id }),
      clearCart: () => dispatch({ type: 'clear' }),
      toggleWishlist: (p) => {
        const has = wishlist.includes(p.id)
        setWishlist(has ? wishlist.filter((id) => id !== p.id) : [...wishlist, p.id])
        notify(has ? 'Removed from wishlist' : `${p.name} saved to wishlist`)
      },
    }
  }, [cart, wishlist, cartOpen, toast, notify])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
