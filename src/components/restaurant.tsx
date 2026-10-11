import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Leaf,
  Flame,
} from "lucide-react";

import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import logo from "../assets/curry-cantina-logo.png";
import {
  ORDER_ONLINE_URL,
  restaurant,
  gallery,
  type Dish,
} from "../lib/restaurant";

const navigation = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function OrderButton({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);

  if (ORDER_ONLINE_URL) {
    return (
      <Button asChild className={`gold-button ${className}`}>
        <a
          href={ORDER_ONLINE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ShoppingBag />
          Order Online
          <ArrowUpRight />
        </a>
      </Button>
    );
  }

  return (
    <>
      <Button
        className={`gold-button ${className}`}
        onClick={() => setOpen(true)}
      >
        <ShoppingBag />
        Order Online
        <ArrowUpRight />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle className="font-display text-3xl text-primary">
            Your next craving awaits
          </DialogTitle>
          <DialogDescription className="leading-7">
            Online ordering is not connected yet. No orders or payments are
            being accepted through this website.
          </DialogDescription>
          <Button
            asChild
            variant="outline"
            className="outline-button"
            onClick={() => setOpen(false)}
          >
            <Link to="/menu">
              Browse the sample menu <ArrowRight />
            </Link>
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-inner">
        <Link
          to="/"
          aria-label="Curry Cantina home"
          onClick={() => setOpen(false)}
        >
          <img
            className="header-logo"
            src={logo}
            alt="Curry Cantina — Indo Mexican Restaurant and Bar"
            width="142"
            height="113"
          />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <OrderButton />
          <Button
            variant="ghost"
            size="icon"
            className="mobile-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <MenuIcon />}
          </Button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {item.label}
              <ArrowUpRight size={18} />
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <span />◇<span />
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function MenuCard({ dish }: { dish: Dish }) {
  return (
    <article className={`menu-card ${dish.signature ? "signature" : ""}`}>
      {dish.image && (
        <div className="dish-image">
          <img
            src={dish.image}
            alt={dish.name}
            width="640"
            height="480"
            loading="lazy"
          />
          {dish.signature && (
            <span className="signature-badge">CANTINA SIGNATURE</span>
          )}
        </div>
      )}

      <div className="dish-content">
        <div className="dish-title">
          <h3>{dish.name}</h3>
          <span
            className="diet"
            title={dish.vegetarian ? "Vegetarian" : "Non-vegetarian"}
          >
            {dish.vegetarian ? (
              <Leaf size={15} />
            ) : (
              <span className="nonveg-dot" />
            )}
          </span>
        </div>

        <p>{dish.description}</p>

        <div className="dish-meta">
          <span className="dish-price">
            {dish.price != null
              ? `$${dish.price.toFixed(2)}`
              : "Price unavailable"}
          </span>

          <span
            className="spice"
            aria-label={`Spice level: ${
              dish.spice === 0
                ? "mild"
                : dish.spice === 1
                ? "gentle"
                : "medium"
            }`}
          >
            {Array.from(
              { length: dish.spice ?? 0 },
              (_, i) => (
                <Flame key={i} size={13} />
              )
            )}
          </span>
        </div>
      </div>
    </article>
  );
}

export function GalleryGrid({ preview = false }: { preview?: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);
  const current = selected === null ? undefined : gallery[selected];

  return (
    <>
      <div className={`gallery-grid ${preview ? "preview" : ""}`}>
        {gallery.map((image, i) => (
          <Button
            key={image.title}
            variant="ghost"
            className="gallery-image"
            aria-label={`Open image: ${image.title}`}
            onClick={() => setSelected(i)}
          >
            <img
              src={image.src}
              alt={image.title}
              width="1280"
              height="960"
              loading="lazy"
            />
            <span className="gallery-overlay">
              <span>
                {image.category}
                <strong>{image.title}</strong>
              </span>
              <ArrowUpRight />
            </span>
          </Button>
        ))}
      </div>

      <Dialog
        open={selected !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelected(null);
        }}
      >
        <DialogContent className="lightbox">
          <DialogTitle className="font-display text-2xl">
            {current?.title}
          </DialogTitle>
          <DialogDescription>
            Illustrative Curry Cantina imagery
          </DialogDescription>

          {current && (
            <img
              src={current.src}
              alt={current.title}
              width="1280"
              height="960"
            />
          )}

          <div className="flex justify-between">
            <Button
              variant="outline"
              aria-label="Previous image"
              onClick={() =>
                setSelected((i) => ((i ?? 0) + gallery.length - 1) % gallery.length)
              }
            >
              ← Previous
            </Button>
            <Button
              variant="outline"
              aria-label="Next image"
              onClick={() =>
                setSelected((i) => ((i ?? 0) + 1) % gallery.length)
              }
            >
              Next →
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function CTA() {
  return (
    <section className="final-cta">
      <Ornament />
      <Eyebrow>COME FOR THE FLAVOURS. STAY FOR THE FEELING.</Eyebrow>
      <h2>
        Your Table. Your Cravings.
        <br />
        <em>Your Cantina.</em>
      </h2>
      <p>Ready to explore bold flavours and unforgettable combinations?</p>
      <div className="button-row">
        <OrderButton />
        <Button asChild variant="outline" className="outline-button">
          <Link to="/contact">
            Contact Us <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}




export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* Column 1: Logo and tagline */}
        <div>
          <Link to="/" aria-label="Curry Cantina home">
            <img
              src={logo}
              alt="Curry Cantina"
              width="175"
              height="140"
              className="footer-logo"
              loading="lazy"
            />
          </Link>

          <p>
            Indian soul. Mexican spirit.
            <br />
            Bold flavours, memorable evenings.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h3>Explore the Cantina</h3>

          {navigation.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Column 3: Contact information */}
        <div>
          <h3>Find us</h3>

          <p className="icon-line">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0"
            >
              <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>

            <a
              href="https://www.google.com/maps/search/?api=1&query=520+NJ-33%2C+Millstone+Township%2C+NJ+08535%2C+United+States"
              target="_blank"
              rel="noopener noreferrer"
            >
              520 NJ-33, Millstone Township,
              NJ 08535, United States
            </a>
          </p>

          <p className="icon-line">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92Z" />
            </svg>

            <a href="tel:+18482339105">+1 (848) 233-9105</a>
          </p>

          <p className="icon-line">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>

            <a href="mailto:currycantina1@gmail.com">
              currycantina1@gmail.com
            </a>
          </p>

          <div className="icon-line">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>

            <div className="min-w-0">
              <p>Opening hours</p>

              <div className="mt-2 space-y-1 text-sm">
                <p>Monday – Thursday: To be confirmed</p>
                <p>Friday – Saturday: To be confirmed</p>
                <p>Sunday: To be confirmed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 4: Order button and social icons */}
        <div>
          <h3>A little cantina, wherever you are.</h3>

          <OrderButton />

          <div className="social-links">
            {restaurant.instagramUrl ? (
              <a
                href={restaurant.instagramUrl}
                aria-label="Instagram"
                title="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.8"
                    fill="currentColor"
                  />
                </svg>
              </a>
            ) : (
              <span
                aria-label="Instagram link to be added"
                title="Instagram link to be added"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.8"
                    fill="currentColor"
                  />
                </svg>
              </span>
            )}

            {restaurant.facebookUrl ? (
              <a
                href={restaurant.facebookUrl}
                aria-label="Facebook"
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z" />
                </svg>
              </a>
            ) : (
              <span
                aria-label="Facebook link to be added"
                title="Facebook link to be added"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z" />
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Original bottom bar */}
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Curry Cantina. All rights reserved.
        </span>

        <span>INDO MEXICAN RESTAURANT &amp; BAR</span>
      </div>
    </footer>
  );
}



