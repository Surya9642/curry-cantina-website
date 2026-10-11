import { useState } from "react";
import { Leaf, Flame } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Eyebrow,
  Ornament,
  MenuCard,
} from "../components/restaurant";
import { dishes, categories } from "../lib/restaurant";

export default function MenuPage() {
  const [category, setCategory] = useState<string>("All");

  // Determine which categories to display: all of them or just the chosen one
  const visibleCategories =
    category === "All"
      ? categories
      : categories.filter((cat) => cat === category);

  return (
    <main className="inner-page">
      <section className="page-intro container">
        <Eyebrow>SPICE. SOUL. A LITTLE SOMETHING UNEXPECTED.</Eyebrow>

        <h1>
          A World of <em>Flavour.</em>
        </h1>

        <Ornament />

        <p>Indian inspiration. Mexican imagination. Made for your cravings.</p>
      </section>

      <section className="container menu-section">
        {/* Category Filter Buttons */}
        <div className="menu-filters" aria-label="Menu categories">
          {["All", ...categories].map((item) => (
            <Button
              key={item}
              variant="ghost"
              aria-pressed={category === item}
              className={category === item ? "selected" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </Button>
          ))}
        </div>

        {/* Dietary Legend */}
        <div className="menu-legend">
          <span>
            <Leaf size={15} />
            Vegetarian
          </span>

          <span>
            <span className="nonveg-dot" />
            Non-vegetarian
          </span>

          <span>
            <Flame size={15} />
            Spice level
          </span>
        </div>

        {/* Render Each Category with its Heading and Grid */}
        <div className="menu-categories-list">
          {visibleCategories.map((catName) => {
            const categoryDishes = dishes.filter(
              (dish) => dish.category === catName
            );

            // Skip empty categories if any
            if (categoryDishes.length === 0) return null;

            return (
              <div key={catName} className="menu-category-block" style={{ marginBottom: "3.5rem" }}>
                <div
                  className="menu-results-heading"
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    paddingBottom: "0.75rem",
                    marginBottom: "1.75rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <h2 style={{ fontSize: "1.6rem", color: "#c89d47", margin: 0 }}>
                    {catName}
                  </h2>
                  <span style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                    {categoryDishes.length}{" "}
                    {categoryDishes.length === 1 ? "dish" : "dishes"}
                  </span>
                </div>

                <div className="menu-grid">
                  {categoryDishes.map((dish) => (
                    <MenuCard key={dish.name} dish={dish} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="allergy-note">
          Dietary indicators are illustrative. Please confirm ingredients,
          allergens and dietary requirements with the restaurant before
          ordering.
        </p>
      </section>
    </main>
  );
}