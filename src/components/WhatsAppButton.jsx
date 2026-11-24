import { WhatsAppIcon, WHATSAPP_URL } from './ui'

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,.7)] transition duration-300 hover:-translate-y-1 hover:bg-[#1ebe5b] hover:shadow-[0_16px_36px_-8px_rgba(37,211,102,.85)] active:scale-95 sm:bottom-7 sm:right-7"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]" />
      <WhatsAppIcon size={30} className="transition duration-300 group-hover:rotate-[8deg] group-hover:scale-110" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:ml-2.5 group-hover:max-w-[8rem] group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  )
}
