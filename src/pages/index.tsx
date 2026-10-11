
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowDown,
  Utensils,
  Martini,
  Sparkles,
} from "lucide-react";

import { Button } from "../components/ui/button";
import {
  OrderButton,
  Ornament,
  Eyebrow,
  MenuCard,
  GalleryGrid,
  CTA,
} from "../components/restaurant";

import { images, dishes } from "../lib/restaurant";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="home-hero">
        <img
          className="hero-photo"
          src={images.feast}
          alt="Tandoori chicken tacos, butter chicken and a citrus cocktail"
          width="1920"
          height="1088"
          fetchPriority="high"
        />

        <div className="hero-shade" />

        <div className="container hero-content">
          <Eyebrow>
            <span className="tiny-rule" />
            AN INDULGENT FUSION EXPERIENCE
          </Eyebrow>

          <h1>
            Where India
            <br />
            Meets <em>Mexico.</em>
          </h1>

          <p className="hero-description">
            Bold Indian spices. Vibrant Mexican flavours.
            <br className="desktop-break" />
            One unforgettable dining experience at Curry Cantina.
          </p>

          <div className="button-row">
            <OrderButton />

            <Button
              asChild
              variant="outline"
              className="outline-button"
            >
              <Link to="/menu">
                Explore Our Menu
                <ArrowUpRight />
              </Link>
            </Button>
          </div>

          <div className="hero-caption">
            <span className="tiny-rule" />
            INDIAN SOUL. MEXICAN SPIRIT.
          </div>
        </div>

        <div className="hero-bottom">
          <span>
            CURRY CANTINA{" "}
            <span className="gold-dot">◆</span> RESTAURANT &amp; BAR
          </span>

          <a href="#welcome" aria-label="Discover more">
            <ArrowDown size={18} />
          </a>

          <span>GOOD FOOD. GREAT COMPANY.</span>
        </div>
      </section>

      {/* Flavour Band */}
      <div className="flavour-band">
        <span>BOLD SPICES</span>
        <span>✧</span>
        <span>FRESH FLAVOURS</span>
        <span>✧</span>
        <span>CRAFTED COCKTAILS</span>
        <span>✧</span>
        <span>UNFORGETTABLE MOMENTS</span>
      </div>

      {/* Welcome Section */}
      <section
        id="welcome"
        className="section container welcome-grid"
      >
        <div className="welcome-photo">
          <img
            src={images.interior}
            alt="A warm, elegant cantina dining room"
            width="1280"
            height="960"
            loading="lazy"
          />

          <span className="image-caption">
            A PLACE TO GATHER. A TASTE TO REMEMBER.
          </span>
        </div>

        <div className="welcome-copy">
          <Eyebrow>WELCOME TO CURRY CANTINA</Eyebrow>

          <h2>
            A Fusion
            <br />
            Worth <em>Savoring.</em>
          </h2>

          <Ornament />

          <p>
            Discover a vibrant blend of Indian spices and Mexican
            favourites, brought together through bold flavours,
            creative combinations, and a passion for memorable dining.
          </p>

          <Button
            asChild
            variant="outline"
            className="outline-button"
          >
            <Link to="/about">
              Discover Our Story
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>

      {/* Signature Favourites */}
      <section className="section signature-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>
                CRAFTED WITH PASSION. SERVED WITH SOUL.
              </Eyebrow>

              <h2>
                Signature <em>Favourites.</em>
              </h2>
            </div>

            <Button
              asChild
              variant="link"
              className="text-link"
            >
              <Link to="/menu">
                View Full Menu
                <ArrowUpRight />
              </Link>
            </Button>
          </div>

          <p className="sample-note">
            A taste of what’s possible — sample dishes; final menu
            and prices to be confirmed.
          </p>

          <div className="featured-grid">
            {dishes.slice(0, 3).map((dish) => (
              <MenuCard key={dish.name} dish={dish} />
            ))}
          </div>

          <div className="signature-order">
            <span>Something delicious on your mind?</span>
            <OrderButton />
          </div>
        </div>
      </section>

      {/* Cantina Experience */}
      <section className="section container experience-grid">
        <div>
          <Eyebrow>THE CANTINA EXPERIENCE</Eyebrow>

          <h2>
            More Than a Meal.
            <br />
            <em>An Experience.</em>
          </h2>

          <p>
            Spice-filled plates. Beautifully mixed drinks. Evenings
            that turn into memories. There’s always a reason to
            gather at the cantina.
          </p>

          <div className="experience-details">
            <span>
              <Utensils />
              Bold fusion food
            </span>

            <span>
              <Martini />
              Crafted drinks
            </span>

            <span>
              <Sparkles />
              Good company
            </span>
          </div>

          <Button
            asChild
            variant="link"
            className="text-link"
          >
            <Link to="/about">
              Step Inside
              <ArrowUpRight />
            </Link>
          </Button>
        </div>

        <div className="experience-photos">
          <img
            src={images.cocktails}
            alt="Citrus margarita and hibiscus cocktail"
            width="1280"
            height="960"
            loading="lazy"
          />

          <img
            src={images.interior}
            alt="Warm cantina atmosphere"
            width="1280"
            height="960"
            loading="lazy"
          />
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section gallery-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>A GLIMPSE OF THE GOOD LIFE</Eyebrow>

              <h2>
                Through the <em>Cantina Lens.</em>
              </h2>
            </div>

            <Button
              asChild
              variant="link"
              className="text-link"
            >
              <Link to="/gallery">
                Explore Our Gallery
                <ArrowUpRight />
              </Link>
            </Button>
          </div>

          <GalleryGrid preview />
        </div>
      </section>

      {/* Call to Action */}
      <CTA />
    </main>
  );
}
