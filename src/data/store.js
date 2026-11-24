// ─────────────────────────────────────────────────────────────
// Everything customizable lives here: brand text, categories,
// products, reviews, links. Swap images in /public/img.
// ─────────────────────────────────────────────────────────────
export const STORE = {
  name: 'Bazario',
  currency: 'DH',
  freeShippingThreshold: 75,
  email: 'hello@bazario.com',
  phone: '+1 (555) 014-2290',
  address: '24 Market Street, Suite 8, New York, NY',
}

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
  { label: 'Categories', href: '#categories' },
  { label: 'About Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
]

export const CATEGORIES = [
  { id: 'tools', name: 'Hair Styling Tools', count: 86, image: '/img/cat-tools.jpg' },
  { id: 'haircare', name: 'Hair Care & Oils', count: 124, image: '/img/cat-haircare.jpg' },
  { id: 'makeup', name: 'Makeup & Cosmetics', count: 210, image: '/img/cat-makeup.jpg' },
  { id: 'skincare', name: 'Skincare & Beauty', count: 98, image: '/img/cat-skincare.jpg' },
]

export const PRODUCT_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'tools', label: 'Hair Tools' },
  { id: 'haircare', label: 'Hair Care' },
  { id: 'makeup', label: 'Makeup' },
  { id: 'skincare', label: 'Skincare' },
]

export const PRODUCTS = [
  // Your product — first in the grid. Edit the placeholder price (price: 99) whenever you like.
  { id: 9, name: 'ENZO Professional Hot Air Styling Set', description: 'Hot air styler with 5 versatile attachments. Model EN-4142B.', category: 'tools', price: 99, badge: 'New', reviews: 0, image: '/img/p-enzo-hot-air-set.png', zoom: 1.55 },
  { id: 1, name: 'Ceramic Hair Straightener', category: 'tools', price: 89, oldPrice: 119, badge: 'Sale', rating: 4.8, reviews: 412, image: '/img/p-straightener.jpg' },
  { id: 2, name: 'Ionic Pro Hair Dryer', category: 'tools', price: 79, badge: 'Best seller', rating: 4.9, reviews: 538, image: '/img/p-dryer.jpg' },
  { id: 3, name: 'Waves Curling Iron', category: 'tools', price: 64, oldPrice: 85, badge: 'Sale', rating: 4.7, reviews: 226, image: '/img/p-curler.jpg' },
  { id: 4, name: 'Nourishing Hair Oil', category: 'haircare', price: 28, badge: 'New', rating: 4.8, reviews: 301, image: '/img/p-oil.jpg' },
  { id: 5, name: 'Restorative Hair Mask', category: 'haircare', price: 34, oldPrice: 42, badge: 'Sale', rating: 4.7, reviews: 187, image: '/img/p-mask.jpg' },
  { id: 6, name: 'Makeup Brush Set', category: 'makeup', price: 45, rating: 4.6, reviews: 164, image: '/img/p-brushes.jpg' },
  { id: 7, name: 'Silk Hydrating Cream', category: 'skincare', price: 38, badge: 'New', rating: 4.8, reviews: 215, image: '/img/p-serum.jpg' },
  { id: 8, name: 'Glow Makeup Collection', category: 'makeup', price: 56, oldPrice: 75, badge: 'Sale', rating: 4.9, reviews: 342, image: '/img/p-makeup.jpg' },
]

export const FEATURES = [
  { icon: 'Truck', title: 'Free Shipping', text: 'On every order over 75 DH, delivered in 2–4 days.' },
  { icon: 'ShieldCheck', title: 'Secure Payment', text: '256-bit encryption on every single transaction.' },
  { icon: 'Gem', title: 'Premium Quality', text: 'Every beauty product is hand-picked and quality checked.' },
  { icon: 'Headset', title: 'Customer Support', text: 'Real people, available 7 days a week.' },
]

export const REVIEWS = [
  { name: 'Sarah M.', role: 'Verified buyer', rating: 5, text: 'My hair has never looked this smooth. The straightener heats fast and the packaging felt truly premium.' },
  { name: 'Emma K.', role: 'Verified buyer', rating: 5, text: 'Easiest checkout I have used. Support helped me pick the right hair mask in minutes. My go-to beauty store.' },
  { name: 'Amira L.', role: 'Verified buyer', rating: 4, text: 'Great selection of makeup and hair tools at fair prices. The brush set is gorgeous and feels high-end.' },
]
