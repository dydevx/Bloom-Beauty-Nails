import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, ArrowUpRight, CaretLeft, CaretRight, Clock,
  InstagramLogo, List, MapPin, Phone, Sparkle, X,
} from '@phosphor-icons/react'
import { getBerlinStatus, hours } from './businessHours.js'

const PHONE = 'tel:+4915730884603'
const MAPS = 'https://maps.app.goo.gl/UVycHLW39aff8YX29'
const INSTAGRAM = 'https://www.instagram.com/bloom.nailsandbeauty/'
const FACEBOOK = 'https://www.facebook.com/p/Bloom-BeautyNails-61576919972089/'

const nav = [['Startseite', 'startseite'], ['Über uns', 'ueber-uns'], ['Leistungen', 'leistungen'], ['Galerie', 'galerie'], ['Öffnungszeiten', 'oeffnungszeiten'], ['Kontakt', 'kontakt']]
const gallery = [
  ['image_1784708364595.jpg', 'Rosafarbenes Nageldesign mit feinen Blüten'],
  ['image_1784708364596.jpg', 'Orange French Nails mit floralen Details'],
  ['image_1784708364600.jpg', 'Elegante rosa Nägel mit weißen Blüten'],
  ['image_1784708364601.jpg', 'Pinkes Nageldesign mit dreidimensionalen Blüten'],
  ['image_1784708364598.jpg', 'Fliederfarbene Nägel mit Glitzer'],
  ['image_1784708364599.jpg', 'Nude Nails mit braunen grafischen Akzenten'],
  ['image_1784708364602.jpg', 'Blaues French Design mit Schmuckdetails'],
  ['image_1784708364604.jpg', 'Lila Nageldesign mit Schmetterling'],
  ['image_1784708364605.jpg', 'Verspielte kurze Nägel mit bunten Motiven'],
  ['image_1784708365258.jpg', 'Glänzende rosa Stiletto Nails'],
  ['image_1784708365551.jpg', 'Zartes Nude Design mit Blüten'],
  ['image_1784708365606.jpg', 'Mehrfarbiges Nail Art Design'],
  ['image_1784708366153.jpg', 'Kurze Nägel mit farbigen Akzenten'],
  ['image_1784708366963.jpg', 'Weiße French Nails mit feinem Design'],
  ['image_1784708367633.jpg', 'Rosafarbene Almond Nails'],
  ['image_1784708368069.jpg', 'Glitzerndes Rosé-Nageldesign'],
  ['image_1784708368584.jpg', 'Rosa und weiße Nägel mit Blütenmuster'],
  ['image_1784708369173.jpg', 'Leuchtend pinkes Nageldesign'],
]

function ExternalLink({ href, children, className = '' }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>
}

function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const node = ref.current
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && node.classList.add('is-visible'), { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function usePageMotion() {
  useEffect(() => {
    document.documentElement.classList.add('motion-ready')
    const targets = document.querySelectorAll('.motion-watch, .contact')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    targets.forEach((target) => observer.observe(target))
    return () => { observer.disconnect(); document.documentElement.classList.remove('motion-ready') }
  }, [])
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const sentinel = document.querySelector('.header-sentinel')
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    if (sentinel) observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    const close = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', close)
    return () => { document.body.classList.remove('menu-open'); document.removeEventListener('keydown', close) }
  }, [open])
  return <>
    <header className={`site-header ${scrolled || open ? 'solid' : ''}`}>
      <a className="brand" href="#startseite" aria-label="Bloom Beauty&Nails Startseite"><img src="/media/logo.jpg" alt="" /><span>Bloom <small>Beauty & Nails</small></span></a>
      <nav className="desktop-nav" aria-label="Hauptnavigation">{nav.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <a className="button header-cta" href={PHONE}><Phone size={18} /> Termin vereinbaren</a>
      <button className="menu-toggle" type="button" aria-label={open ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <List />}</button>
    </header>
    <div className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open}><nav aria-label="Mobile Navigation">{nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}<ArrowUpRight /></a>)}<a className="button" href={PHONE}><Phone /> Termin vereinbaren</a></nav></div>
  </>
}

function Hero() {
  return <section className="hero" id="startseite">
    <span className="header-sentinel" aria-hidden="true" />
    <div className="hero-copy">
      <p className="kicker">Nagelstudio & Beauty in Stockach</p>
      <h1>Schönheit, Eleganz und <em>perfekte Nägel</em></h1>
      <p>Professionelle Nagel- und Beautybehandlungen in entspannter Atmosphäre.</p>
      <div className="hero-actions"><a className="button" href={PHONE}><Phone /> Termin vereinbaren</a><a className="text-link" href="#leistungen">Unsere Leistungen <ArrowRight /></a></div>
    </div>
    <div className="hero-media">
      <video autoPlay muted loop playsInline poster="/media/image_1784708368584.jpg" aria-label="Einblicke in Bloom Beauty&Nails"><source src="/media/-_Facebook_Reel_HD.mp4" type="video/mp4" /></video>
      <div className="hero-photo"><img src="/media/image_1784708368584.jpg" alt="Elegantes rosafarbenes Nageldesign bei Bloom Beauty&Nails" /></div>
      <ExternalLink className="route-chip" href={MAPS}><MapPin /> Kirchhalde 10, Stockach <ArrowUpRight /></ExternalLink>
    </div>
  </section>
}

function About() {
  return <section className="section about" id="ueber-uns"><Reveal className="about-grid">
    <div className="about-collage"><img className="about-main" src="/media/image_1784708367633.jpg" alt="Rosafarbene Nägel, frisch gestaltet bei Bloom Beauty&Nails" loading="lazy" /><img className="about-detail" src="/media/image_1784708369173.jpg" alt="Detailaufnahme eines pinken Nageldesigns" loading="lazy" /></div>
    <div className="about-copy"><p className="section-label">Willkommen bei Bloom</p><h2>Ihre kleine Auszeit in Stockach</h2><p>Bei uns stehen Ihre Schönheit, Ihr Wohlbefinden und Ihre individuellen Wünsche im Mittelpunkt. Mit viel Liebe zum Detail, hochwertigen Produkten und modernen Techniken sorgen wir für gepflegte Hände, schöne Nägel und besondere Beauty-Momente.</p><div className="signature"><Sparkle weight="thin" /><span>Schönheit beginnt mit Zeit für sich selbst.</span></div></div>
  </Reveal></section>
}

const PriceRow = ({ name, neu, fill }) => <div className="price-row"><span>{name}</span><span>{neu}</span>{fill !== undefined && <span>{fill}</span>}</div>
function Services() {
  return <section className="section services" id="leistungen"><div className="section-heading"><p className="section-label">Leistungen & Preise</p><h2>Pflege, die zu Ihnen passt</h2><p>Von zeitlos gepflegt bis ausdrucksstark gestaltet. Wir beraten Sie persönlich zu Form, Farbe und Design.</p></div>
    <div className="prices-grid">
      <Reveal className="price-feature"><div className="price-photo"><img src="/media/image_1784708364600.jpg" alt="Rosa Acryl-Nägel mit weißen Blüten" loading="lazy" /></div><div className="price-content"><h3>Neumodellage & Auffüllen</h3><div className="price-head"><span>Acryl Pulver Gel</span><span>Neu</span><span>Auf.</span></div><PriceRow name="Natur" neu="ab 35 €" fill="ab 30 €" /><PriceRow name="Farben" neu="ab 45 €" fill="ab 40 €" /><PriceRow name="French" neu="ab 45 €" fill="ab 40 €" /><a className="text-link" href={PHONE}>Termin anfragen <Phone /></a></div></Reveal>
      <Reveal className="price-list"><h3>Maniküre & Pediküre</h3><PriceRow name="Maniküre" neu="15 €" /><PriceRow name="Mit Normal Farben" neu="20 €" /><PriceRow name="Mit Shellac" neu="30 €" /><PriceRow name="Pediküre" neu="25 €" /><PriceRow name="Mit Normal Farben" neu="30 €" /><PriceRow name="Mit Shellac" neu="40 €" /><a className="text-link" href={PHONE}>Termin anfragen <Phone /></a></Reveal>
      <Reveal className="price-list"><h3>Extras</h3><PriceRow name="Strasssteine" neu="ab 0,50 €" /><PriceRow name="Ablösen" neu="10 €" /><PriceRow name="Nagelreparatur" neu="pro Nagel ab 5 €" /><PriceRow name="Nageldesign" neu="ab 5 €" /><PriceRow name="Extra Nagellänge bis 2 cm" neu="ab 5 €" /><a className="text-link" href={PHONE}>Termin anfragen <Phone /></a></Reveal>
      <Reveal className="lash-block"><div><h3>Wimpernverlängerung</h3><p>Für einen ausdrucksstarken Blick, passend zu Ihrem Stil.</p></div><div className="lash-prices"><PriceRow name="Neu" neu="ab 70 €" /><PriceRow name="Auffüllen nach 2 Wochen" neu="35 €" /><PriceRow name="Auffüllen nach 3 Wochen" neu="45 €" /><PriceRow name="Auffüllen nach 4 Wochen" neu="55 €" /><PriceRow name="Wimpernwelle" neu="30 €" /><PriceRow name="Wimpernwelle mit Farben" neu="40 €" /><PriceRow name="Augenbrauen Farben" neu="20 €" /></div><a className="button secondary" href={PHONE}>Termin anfragen</a></Reveal>
    </div>
  </section>
}

function Lightbox({ index, setIndex }) {
  const closeRef = useRef(null)
  const touch = useRef(null)
  useEffect(() => {
    closeRef.current?.focus()
    const key = (event) => {
      if (event.key === 'Escape') setIndex(null)
      if (event.key === 'ArrowRight') setIndex((index + 1) % gallery.length)
      if (event.key === 'ArrowLeft') setIndex((index - 1 + gallery.length) % gallery.length)
      if (event.key === 'Tab') event.preventDefault()
    }
    document.addEventListener('keydown', key); document.body.classList.add('menu-open')
    return () => { document.removeEventListener('keydown', key); document.body.classList.remove('menu-open') }
  }, [index, setIndex])
  const move = (direction) => setIndex((index + direction + gallery.length) % gallery.length)
  return <div className="lightbox" role="dialog" aria-modal="true" aria-label="Vergrößerte Galerieansicht" onPointerDown={(e) => { if (e.target === e.currentTarget) setIndex(null) }} onTouchStart={(e) => { touch.current = e.touches[0].clientX }} onTouchEnd={(e) => { const delta = e.changedTouches[0].clientX - touch.current; if (Math.abs(delta) > 50) move(delta < 0 ? 1 : -1) }}>
    <button ref={closeRef} className="lightbox-close" onClick={() => setIndex(null)} aria-label="Galerie schließen"><X /></button><button className="lightbox-prev" onClick={() => move(-1)} aria-label="Vorheriges Bild"><CaretLeft /></button><figure><img src={`/media/${gallery[index][0]}`} alt={gallery[index][1]} /><figcaption>{gallery[index][1]} <span>{index + 1} / {gallery.length}</span></figcaption></figure><button className="lightbox-next" onClick={() => move(1)} aria-label="Nächstes Bild"><CaretRight /></button>
  </div>
}

function Gallery() {
  const [index, setIndex] = useState(null)
  return <section className="section gallery" id="galerie"><div className="section-heading motion-watch"><p className="section-label">Galerie</p><h2>Inspiration für Ihren nächsten Look</h2></div><div className="gallery-grid motion-watch">{gallery.map(([src, alt], i) => <button key={src} className="gallery-item" style={{ '--i': Math.min(i, 12) }} onClick={() => setIndex(i)} aria-label={`${alt} vergrößern`}><img src={`/media/${src}`} alt={alt} loading="lazy" /><span><ArrowUpRight /></span></button>)}</div><ExternalLink className="button secondary instagram-cta" href={INSTAGRAM}><InstagramLogo /> Mehr auf Instagram entdecken</ExternalLink>{index !== null && <Lightbox index={index} setIndex={setIndex} />}</section>
}

function OpeningHours() {
  const [status, setStatus] = useState(() => getBerlinStatus())
  useEffect(() => { const timer = setInterval(() => setStatus(getBerlinStatus()), 60000); return () => clearInterval(timer) }, [])
  return <section className="section opening" id="oeffnungszeiten"><Reveal className="opening-panel"><div className="opening-intro"><Clock weight="thin" /><p className="section-label">Öffnungszeiten</p><h2>Zeit für schöne Momente</h2><p className={`status ${status.open ? 'is-open' : ''}`}>{status.label}</p><p>Termine vereinbaren Sie am einfachsten telefonisch. Wir freuen uns auf Sie.</p><a className="button" href={PHONE}><Phone /> Jetzt anrufen</a></div><div className="hours-list">{hours.map((day, index) => <div key={day.name} className={index === status.dayIndex ? 'today' : ''}><span>{day.name}{index === status.dayIndex && <small>Heute</small>}</span><strong>{day.opens ? `${day.opens}–${day.closes} Uhr` : 'Geschlossen'}</strong></div>)}</div></Reveal></section>
}

function Contact() {
  return <section className="section contact" id="kontakt"><div className="contact-copy"><p className="section-label">Kontakt & Anfahrt</p><h2>Wir freuen uns auf Ihren Besuch</h2><div className="contact-details"><a href={PHONE}><Phone /><span><small>Telefon</small>+49 1573 0884603</span></a><ExternalLink href={MAPS}><MapPin /><span><small>Adresse</small>Kirchhalde 10<br />78333 Stockach</span></ExternalLink></div><div className="contact-actions"><a className="button" href={PHONE}>Jetzt anrufen</a><ExternalLink className="button secondary" href={MAPS}>Route planen</ExternalLink></div></div><div className="map-wrap"><iframe title="Bloom Beauty&Nails auf Google Maps" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1338.6735148271543!2d9.0128776!3d47.852242!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479a67006b196703%3A0xb516c169f4fd11f!2sBloom%20Beauty%26Nails!5e0!3m2!1svi!2s!4v1784728454999!5m2!1svi!2s" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div></section>
}

function Footer() {
  return <footer><div className="footer-main"><div className="footer-brand"><img src="/media/logo.jpg" alt="Bloom Beauty&Nails Logo" /><p>Bloom Beauty&Nails</p><span>Schönheit, Eleganz und perfekte Nägel in Stockach.</span></div><div><h3>Besuchen Sie uns</h3><p>Kirchhalde 10<br />78333 Stockach</p><a href={PHONE}>+49 1573 0884603</a></div><div><h3>Entdecken</h3><ExternalLink href={INSTAGRAM}>Instagram</ExternalLink><ExternalLink href={FACEBOOK}>Facebook</ExternalLink><ExternalLink href={MAPS}>Google Maps</ExternalLink></div></div><div className="footer-bottom"><span>© 2026 Bloom Beauty&Nails. Alle Rechte vorbehalten.</span><span>Webdesign von <strong>HoangCaster</strong></span></div></footer>
}

function FloatingContact() {
  const [touched, setTouched] = useState(false)
  return <div className={`floating-contact ${touched ? 'touched' : ''}`} onPointerDown={() => setTouched(true)}><ExternalLink href={INSTAGRAM} className="float-social" aria-label="Bloom Beauty&Nails auf Instagram"><InstagramLogo /></ExternalLink><a href={PHONE} className="float-phone" aria-label="Bloom Beauty&Nails anrufen"><Phone weight="fill" /><span>Anrufen</span></a></div>
}

export default function App() {
  usePageMotion()
  return <><Header /><main><Hero /><About /><Services /><Gallery /><OpeningHours /><Contact /></main><Footer /><FloatingContact /></>
}
