
import { Eyebrow, Ornament, CTA } from "../components/restaurant";
import { images } from "../lib/restaurant";

export default function About() {
  return (
    <main className="inner-page">
      <section className="page-intro container">
        <Eyebrow>INDIAN SOUL. MEXICAN SPIRIT.</Eyebrow>

        <h1>
          The Art of
          <br />
          <em>Indo-Mexican Fusion.</em>
        </h1>

        <Ornament />

        <p>Two vibrant culinary worlds. One shared love of flavour.</p>
      </section>

      <section className="container about-editorial">
        <img
          src={images.interior}
          alt="Illustrative Curry Cantina dining room with warm lighting"
          width="1280"
          height="960"
        />

        <div>
          <Eyebrow>OUR CONCEPT</Eyebrow>

          <h2>
            A meeting of
            <br />
            <em>bold spirits.</em>
          </h2>

          <p>
            At Curry Cantina, we bring together the warmth of Indian spices
            and the vibrant spirit of Mexican cuisine. Our concept celebrates
            bold flavours, creative combinations, refreshing drinks, and the
            joy of sharing great food.
          </p>

          <p>
            From flavour-packed favourites to a lively restaurant atmosphere,
            Curry Cantina is designed for guests who love exploring something
            different.
          </p>
        </div>
      </section>

      <section className="section container about-values">
        {[
          {
            number: "01",
            title: "The Flavours We Celebrate",
            copy: "The depth of Indian spices meets the freshness of Mexican favourites. Smoky, tangy, rich and vibrant — flavours made to complement one another.",
          },
          {
            number: "02",
            title: "Food, Drinks and Atmosphere",
            copy: "Creative plates and refreshing drinks bring the table to life. A warm, welcoming setting gives every gathering its own cantina spirit.",
          },
          {
            number: "03",
            title: "Our Commitment to Hospitality",
            copy: "Great food is only part of the story. We believe in a genuine welcome, thoughtful service and the simple pleasure of sharing a memorable meal.",
          },
        ].map((item) => (
          <article key={item.number}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </section>

      <CTA />
    </main>
  );
}
