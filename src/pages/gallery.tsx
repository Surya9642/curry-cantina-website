
import {
  Eyebrow,
  Ornament,
  GalleryGrid,
  CTA,
} from "../components/restaurant";

export default function GalleryPage() {
  return (
    <main className="inner-page">
      <section className="page-intro container">
        <Eyebrow>FOOD. SPIRIT. ATMOSPHERE.</Eyebrow>

        <h1>
          The Cantina, <em>In Focus.</em>
        </h1>

        <Ornament />

        <p>A little taste of the moments that bring us together.</p>
      </section>

      <section className="container section gallery-page">
        <GalleryGrid />

        <p className="sample-note">
          Illustrative food and interior imagery. Restaurant photography
          will be added when available.
        </p>
      </section>

      <CTA />
    </main>
  );
}
