import { useState } from 'react'
import { StoreProvider } from './context/StoreContext'
import { PRODUCTS } from './data/store'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Products from './components/Products'
import Promo from './components/Promo'
import Features from './components/Features'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import { CartDrawer, Toast } from './components/CartDrawer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  const [filter, setFilter] = useState('all')
  // Category cards jump to the shop; categories without products fall back to "all".
  const selectCategory = (id) => setFilter(PRODUCTS.some((p) => p.category === id) ? id : 'all')

  return (
    <StoreProvider>
      <Navbar />
      <main>
        <Hero />
        <Categories onSelect={selectCategory} />
        <Products filter={filter} setFilter={setFilter} />
        <Promo />
        <Features />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
      <WhatsAppButton />
    </StoreProvider>
  )
}
