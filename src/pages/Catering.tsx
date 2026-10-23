import { useState, type FormEvent } from "react";

const WHATSAPP_NUMBER = "18482339105";

type MenuItem = {
  name: string;
  prices: (number | null)[];
};

type MenuSection = {
  title: string;
  description?: string;
  items: MenuItem[];
};

const traySizes = [
  { name: "Half Shallow", guests: "8–10 People", capacity: "84 fl oz" },
  { name: "Half Deep", guests: "15–20 People", capacity: "120 fl oz" },
  { name: "Large Medium", guests: "25–30 People", capacity: "228 fl oz" },
  { name: "Large Deep", guests: "30–40 People", capacity: "346 fl oz" },
];

const trayMenu: MenuSection[] = [
  {
    title: "Appetizers",
    description: "Catering trays for vegetarian and non-vegetarian starters.",
    items: [
      { name: "All Veg Appetizers", prices: [45, 65, 120, 180] },
      { name: "All Gobi / Paneer Appetizers", prices: [50, 70, 135, 205] },
      { name: "All Egg Appetizers", prices: [45, 65, 120, 180] },
      { name: "All Chicken Appetizers", prices: [50, 70, 135, 205] },
      { name: "All Mutton Appetizers", prices: [55, 75, 150, 225] },
      { name: "All Fish / Shrimp Appetizers", prices: [60, 85, 165, 245] },
      { name: "Lobster Appetizers", prices: [95, 135, 260, 385] },
    ],
  },
  {
    title: "Tandoor",
    items: [
      { name: "All Tandoor Veg", prices: [45, 65, 120, 180] },
      { name: "All Tandoor Paneer", prices: [50, 70, 135, 205] },
      { name: "All Tandoor Chicken", prices: [50, 70, 135, 205] },
      { name: "Tandoor Lamb Chops", prices: [75, 105, 205, 305] },
      // The original sheet reads "car"; verify the item name with the restaurant.
      { name: "Car (as listed on supplied sheet)", prices: [60, 85, 165, 245] },
    ],
  },
  {
    title: "Entrées",
    items: [
      { name: "All Veg Entrées", prices: [40, 55, 110, 160] },
      { name: "All Premium Veg / Paneer Entrées", prices: [45, 65, 120, 180] },
      { name: "All Egg Entrées", prices: [40, 55, 110, 160] },
      { name: "All Chicken Entrées", prices: [45, 65, 120, 180] },
      { name: "All Premium Chicken Entrées", prices: [50, 70, 135, 205] },
      { name: "All Mutton Entrées", prices: [50, 70, 135, 205] },
      { name: "All Fish / Shrimp Entrées", prices: [50, 70, 135, 205] },
      { name: "Lobster Entrées", prices: [80, 115, 220, 325] },
    ],
  },
  {
    title: "Breads",
    items: [
      { name: "All Naan Breads", prices: [40, 55, 110, 160] },
      { name: "All Naan Breads with Toppings", prices: [45, 65, 120, 180] },
      { name: "All Rotis", prices: [45, 65, 120, 180] },
    ],
  },
  {
    title: "Biryani & Rice",
    items: [
      { name: "Jeera Rice / Basmati Rice", prices: [40, 55, 110, 160] },
      { name: "Veg Biryani", prices: [45, 65, 120, 180] },
      { name: "Chicken Biryani", prices: [50, 70, 135, 205] },
      { name: "Lamb & Goat Biryani", prices: [55, 75, 150, 225] },
      { name: "Shrimp Biryani", prices: [55, 75, 150, 225] },
    ],
  },
  {
    title: "Indo-Chinese",
    items: [
      { name: "Indo-Chinese Appetizer Veg", prices: [45, 65, 120, 180] },
      { name: "Indo-Chinese Appetizer Paneer", prices: [50, 70, 135, 205] },
      { name: "Indo-Chinese Appetizer Chicken", prices: [50, 70, 135, 205] },
      { name: "Indo-Chinese Appetizer Fish / Shrimp", prices: [60, 85, 165, 245] },
      { name: "Veg Fried Rice / Noodles", prices: [45, 65, 120, 180] },
      { name: "Chicken Fried Rice / Noodles", prices: [50, 70, 135, 205] },
      { name: "Shrimp Fried Rice / Noodles", prices: [55, 75, 150, 225] },
    ],
  },
  {
    title: "Desserts",
    items: [
      { name: "Ice Cream", prices: [40, 80, 120, 160] },
      { name: "Indian Desserts", prices: [50, 100, 150, 200] },
      { name: "Cakes", prices: [50, 100, 150, 200] },
    ],
  },
];

const individualMenu: MenuSection[] = [
  {
    title: "Appetizers",
    description: "Original serving guide: 4–6, 8–10, 10–15 and 20–25 people.",
    items: [
      { name: "Medhu Vada / Masala Vada (per piece)", prices: [2.5, null, null, null] },
      { name: "Idly (per piece)", prices: [2.5, null, null, null] },
      { name: "Samosa (per piece)", prices: [2.5, null, null, null] },
      { name: "Chinese Appetizers – Veg", prices: [50, 75, 110, 150] },
      { name: "Pakora / Cut Mirchi / Punugulu", prices: [40, 65, 100, 140] },
      { name: "Paneer Appetizers", prices: [55, 85, 140, 170] },
      { name: "Chicken Appetizers", prices: [55, 85, 140, 170] },
      { name: "Tandoori Chicken / Paneer Tikka / Kebab", prices: [60, 90, 150, 180] },
      { name: "Mutton / Lamb / Shrimp Appetizers", prices: [75, 120, 180, 240] },
      { name: "Pomfret Fish Fry (per piece)", prices: [3, null, null, null] },
    ],
  },
  {
    title: "Curries",
    description: "Original serving guide: ¼ tray (8–10), ½ tray (10–15), medium (20–25), large (35–40).",
    items: [
      { name: "Sambar / Rasam", prices: [30, 45, 70, 80] },
      { name: "Vegetable Curries", prices: [45, 70, 110, 140] },
      { name: "Vegetable Fry Items", prices: [50, 75, 120, 150] },
      { name: "Paneer Curries", prices: [55, 80, 125, 160] },
      { name: "Chicken Tikka Masala / Butter Chicken", prices: [60, 85, 125, 165] },
      { name: "Chicken Curries", prices: [55, 80, 120, 160] },
      { name: "Mutton / Lamb / Fish / Shrimp Curries", prices: [70, 100, 150, 190] },
    ],
  },
  {
    title: "Biryanis",
    description: "Original serving guide: ¼ tray (4–5), ½ tray (8–9), medium (12–15), large (20–25).",
    items: [
      { name: "Rice", prices: [20, 30, 45, 60] },
      { name: "Veg Biryani / Pulav / Pongal / Upma", prices: [40, 65, 100, 130] },
      { name: "Paneer Biryani", prices: [45, 70, 110, 150] },
      { name: "Chicken Dum Biryani", prices: [50, 75, 120, 160] },
      { name: "Vijayawada Chicken Biryani", prices: [50, 80, 120, 160] },
      { name: "Mutton / Lamb / Shrimp Biryani", prices: [60, 90, 140, 190] },
    ],
  },
  {
    title: "Kothu / Fried Rice & Noodles",
    items: [
      { name: "Veg", prices: [40, 65, 100, 130] },
      { name: "Egg", prices: [45, 70, 110, 140] },
      { name: "Chicken", prices: [50, 80, 120, 150] },
    ],
  },
  {
    title: "Desserts & Extras",
    items: [
      { name: "Gulab Jamun (per piece)", prices: [1.5, null, null, null] },
      { name: "Rasmalai & Kala Jamun (per piece)", prices: [2, null, null, null] },
      { name: "Double Ka Meetha / Payasam / Kesari", prices: [45, 75, 110, 150] },
      { name: "Mango Lassi (per gallon)", prices: [40, null, null, null] },
      { name: "Malabar Paratha (per piece)", prices: [2, null, null, null] },
    ],
  },
];

const money = (price: number | null) =>
  price === null ? "—" : `$${price.toFixed(2).replace(/\.00$/, "")}`;

function PriceTable({
  section,
  headers,
}: {
  section: MenuSection;
  headers: string[];
}) {
  return (
    <div className="mb-8 w-full max-w-full overflow-x-auto overscroll-x-contain rounded-sm border border-[#b58b43]/30">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead className="bg-[#c49a4a] text-black">
          <tr>
            <th className="px-4 py-4 text-sm font-bold">Menu Item</th>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-4 text-center text-xs font-bold sm:text-sm"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.items.map((item) => (
            <tr
              key={item.name}
              className="border-t border-white/10 hover:bg-white/[0.04]"
            >
              <td className="px-4 py-3 text-sm text-neutral-200">
                {item.name}
              </td>
              {item.prices.map((price, index) => (
                <td
                  key={`${item.name}-${index}`}
                  className="px-4 py-3 text-center text-sm font-semibold text-[#e2c17d]"
                >
                  {money(price)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {section.description && (
        <p className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-neutral-400">
          {section.description}
        </p>
      )}
    </div>
  );
}

export default function Catering() {
  const [selectedTray, setSelectedTray] = useState("Half Shallow");
  const [eventType, setEventType] = useState("Private Party");
  const [priceView, setPriceView] = useState<"trays" | "original">("trays");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;

    const action = submitter?.value;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const date = String(formData.get("date") || "Not specified");
    const guests = String(formData.get("guests") || "Not specified");
    const menu = String(formData.get("menu") || "Please suggest menu options");
    const details = String(formData.get("details") || "None");

    const message = [
      "Hello Curry Cantina! I would like to enquire about catering.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Event Type: ${eventType}`,
      `Event Date: ${date}`,
      `Number of Guests: ${guests}`,
      `Preferred Tray Size: ${selectedTray}`,
      `Menu Preferences: ${menu}`,
      `Additional Details: ${details}`,
      "",
      "Please confirm availability and share a catering quote.",
    ].join("\n");

    // Action 1: WhatsApp
    if (action === "whatsapp") {
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      return;
    }

    // Action 2: Email
    if (action === "email") {
      setIsSubmitting(true);
      setStatus("Sending your catering enquiry...");

      try {
        const response = await fetch(
          "https://currycantinanj.com/send-catering.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              phone,
              date,
              time: "Not specified",
              people: guests,
              deliveryType: eventType,
              deliveryAddress: "",
              orderDetails: `Preferred Tray: ${selectedTray}\nMenu Preferences: ${menu}`,
              dietary: "",
              notes: details,
            }),
          }
        );

        const responseText = await response.text();

        let data: { status?: string; message?: string };
        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error(
            "The server returned an invalid response. Please try again."
          );
        }

        if (!response.ok || data.status !== "success") {
          throw new Error(
            data.message || "Unable to send your catering enquiry."
          );
        }

        setStatus(
          "Thank you! Your catering enquiry has been emailed successfully."
        );
        form.reset();
        setEventType("Private Party");
        setSelectedTray("Half Shallow");
      } catch (error) {
        console.error("Catering email submission failed:", error);
        setStatus(
          error instanceof Error
            ? error.message
            : "Unable to send your enquiry. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  const whatsappLink =
    "https://wa.me/18482339105?text=" +
    encodeURIComponent(
      "Hello Curry Cantina! I would like to enquire about catering."
    );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0b0b0b] text-white">
      <section className="relative overflow-hidden border-b border-[#b58b43]/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(181,139,67,0.2),_transparent_65%)]" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-14 text-center sm:px-8 sm:py-20 lg:py-28">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#d7b56d]">
            Curry Cantina · Millstone Township, New Jersey
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            Catering for Every
            <span className="mt-2 block text-[#d7b56d]">Special Occasion</span>
          </h1>

          <p className="mx-auto mt-6 w-full max-w-lg text-center text-base leading-7 text-neutral-300 sm:text-lg">
            Bring the bold flavors of India and Mexico to your celebration.
            <br className="hidden sm:block" />
            Explore our catering trays, browse the menu, and tell us about
            <br className="hidden sm:block" />
            your event directly on WhatsApp.
          </p>

          <div className="mt-9 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
            <a
              href="#catering-menu"
              className="inline-flex min-h-14 w-full items-center justify-center bg-[#c49a4a] px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-black transition hover:bg-[#e0bd73] sm:w-auto sm:px-8"
            >
              Explore Catering Menu
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 w-full items-center justify-center border border-[#c49a4a] px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-[#e2c17d] transition hover:bg-[#c49a4a]/10 sm:w-auto sm:px-8"
            >
              Enquire on WhatsApp ↗
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Family Gatherings", "Share a memorable meal with family and friends."],
            ["Birthdays & Parties", "Make your special occasions delicious and easy."],
            ["Corporate Events", "Catering options for meetings, teams, and office events."],
            ["Weddings & Celebrations", "Explore tray options for your special day."],
          ].map(([title, text]) => (
            <div
              key={title}
              className="border border-[#b58b43]/30 bg-[#141414] p-6 transition hover:border-[#d7b56d]"
            >
              <div className="mb-4 h-1 w-12 bg-[#c49a4a]" />
              <h2 className="text-xl font-semibold text-[#e2c17d]">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-neutral-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#b58b43]/20 bg-[#111111]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d7b56d]">
              Plan Your Order
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
              Choose Your Tray Size
            </h2>
            <p className="mt-4 text-sm leading-6 text-neutral-400">
              Select a tray to highlight its pricing in the menu below.
              Guest estimates are based on the supplied catering sheet.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {traySizes.map((tray, index) => (
              <button
                key={tray.name}
                type="button"
                onClick={() => {
                  setSelectedTray(tray.name);
                  setPriceView("trays");
                }}
                className={`border p-6 text-left transition ${
                  selectedTray === tray.name && priceView === "trays"
                    ? "border-[#d7b56d] bg-[#c49a4a]/10"
                    : "border-[#333] bg-[#181818] hover:border-[#a8874a]"
                }`}
              >
                <p className="text-xs uppercase tracking-widest text-[#d7b56d]">
                  Tray {index + 1}
                </p>
                <h3 className="mt-3 text-xl font-semibold">
                  {tray.name}
                </h3>
                <p className="mt-2 text-sm text-neutral-300">{tray.guests}</p>
                <p className="mt-4 border-t border-white/10 pt-4 text-xs text-neutral-500">
                  Capacity: {tray.capacity}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-[#e2c17d]">
                  {selectedTray === tray.name && priceView === "trays"
                    ? "Selected ✓"
                    : "Select tray →"}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-5 text-center text-xs leading-5 text-neutral-500">
            Serving estimates can vary by dish and serving style. Please confirm
            portions with the restaurant before ordering.
          </p>
        </div>
      </section>

      <section
        id="catering-menu"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-8"
      >
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d7b56d]">
            From Our Kitchen
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
            Catering Menu & Pricing
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-neutral-400">
            Browse the tray-based price list or the original serving guide.
            All prices are in USD. A dash indicates that a price was not
            provided for that serving size in the supplied sheet.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setPriceView("trays")}
            className={`px-5 py-3 text-sm font-bold ${
              priceView === "trays"
                ? "bg-[#c49a4a] text-black"
                : "border border-[#b58b43]/40 text-[#e2c17d]"
            }`}
          >
            Tray Catering Prices
          </button>
          <button
            type="button"
            onClick={() => setPriceView("original")}
            className={`px-5 py-3 text-sm font-bold ${
              priceView === "original"
                ? "bg-[#c49a4a] text-black"
                : "border border-[#b58b43]/40 text-[#e2c17d]"
            }`}
          >
            Original Serving Guide
          </button>
        </div>

        {priceView === "trays" ? (
          <>
            <div className="mb-8 border border-[#b58b43]/30 bg-[#141414] p-5 sm:p-6">
              <p className="text-xs uppercase tracking-widest text-[#d7b56d]">
                Selected Tray
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-2xl font-bold">
                  {selectedTray}
                </h3>
                <span className="text-sm text-neutral-300">
                  {traySizes.find((tray) => tray.name === selectedTray)?.guests}
                </span>
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                The highlighted column shows pricing for your selected tray.
              </p>
            </div>

            {trayMenu.map((section) => (
              <div key={section.title} className="mb-10">
                <h3 className="mb-4 text-2xl font-bold text-[#e2c17d]">
                  {section.title}
                </h3>
                <div className="w-full max-w-full overflow-x-auto overscroll-x-contain rounded-sm border border-[#b58b43]/30">
                  <table className="w-full min-w-[640px] border-collapse text-left">
                    <thead className="bg-[#c49a4a] text-black">
                      <tr>
                        <th className="px-4 py-4 text-sm font-bold">Menu Item</th>
                        {traySizes.map((tray) => (
                          <th
                            key={tray.name}
                            className={`px-4 py-4 text-center text-xs font-bold ${
                              tray.name === selectedTray
                                ? "bg-[#e0bd73]"
                                : ""
                            }`}
                          >
                            <span className="block">{tray.name}</span>
                            <span className="mt-1 block">{tray.guests}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item) => (
                        <tr
                          key={item.name}
                          className="border-t border-white/10 hover:bg-white/[0.04]"
                        >
                          <td className="px-4 py-3 text-sm text-neutral-200">
                            {item.name}
                          </td>
                          {item.prices.map((price, index) => (
                            <td
                              key={`${item.name}-${index}`}
                              className={`px-4 py-3 text-center text-sm font-semibold ${
                                traySizes[index].name === selectedTray
                                  ? "bg-[#c49a4a]/10 text-[#e2c17d]"
                                  : "text-white"
                              }`}
                            >
                              {money(price)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="mb-8 border border-[#b58b43]/30 bg-[#141414] p-5">
              <h3 className="text-xl font-bold text-[#e2c17d]">
                Original Serving Guide
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-400">
                These prices come from the first supplied price list and use
                different tray sizes from the tray guide above. Per-piece and
                per-gallon prices are shown in the first price column.
              </p>
            </div>

            {individualMenu.map((section) => (
              <div key={section.title} className="mb-10">
                <h3 className="mb-4 text-2xl font-bold text-[#e2c17d]">
                  {section.title}
                </h3>
                <PriceTable
                  section={section}
                  headers={[
                    "4–6 / ¼ Tray",
                    "8–10 / ½ Tray",
                    "10–15 / Medium",
                    "20–25 / Large",
                  ]}
                />
              </div>
            ))}
          </>
        )}

        <p className="mt-6 text-xs leading-6 text-neutral-500">
          Please confirm the availability of menu items and all pricing with
          Curry Cantina before placing an order. The original sheet lists a
          Tandoor item as “car”; this has been preserved for confirmation.
        </p>
      </section>

      <section
        id="catering-inquiry"
        className="scroll-mt-20 border-t border-[#b58b43]/30 bg-[#111111]"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d7b56d]">
              Let's Plan Your Event
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Make Your Next Gathering
              <span className="block text-[#d7b56d]">Extra Special</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-neutral-400">
              Tell us about your event, guest count, and menu preferences.
              Submit the form to open WhatsApp with your enquiry ready to send.
            </p>

            <div className="mt-9 space-y-5 border-l-2 border-[#c49a4a] pl-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                  Call us
                </p>
                <a
                  href="tel:+18482339105"
                  className="mt-1 inline-block text-lg font-semibold text-[#e2c17d] hover:text-white"
                >
                  +1 (848) 233-9105
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                  Email
                </p>
                <a
                  href="mailto:currycantina1@gmail.com"
                  className="mt-1 inline-block break-all text-lg font-semibold text-[#e2c17d] hover:text-white"
                >
                  currycantina1@gmail.com
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                  Location
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=520+NJ-33%2C+Millstone+Township%2C+NJ+08535%2C+United+States"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-base leading-6 text-neutral-300 hover:text-[#e2c17d]"
                >
                  520 NJ-33, Millstone Township,
                  <br />
                  NJ 08535, United States
                </a>
              </div>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 bg-[#c49a4a] px-6 py-4 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-[#e0bd73]"
            >
              Chat on WhatsApp ↗
            </a>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 border border-[#b58b43]/30 bg-[#181818] p-4 sm:p-6 lg:p-8"
          >
            <h3 className="text-2xl font-semibold text-[#e2c17d]">
              Request a Catering Quote
            </h3>
            <p className="text-sm text-neutral-400">
              Complete the details and continue to WhatsApp.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-neutral-300">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full border border-neutral-700 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none focus:border-[#c49a4a]"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm text-neutral-300">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className="w-full border border-neutral-700 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none focus:border-[#c49a4a]"
                  placeholder="Your phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-neutral-300">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full border border-neutral-700 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none focus:border-[#c49a4a]"
                placeholder="you@example.com"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="eventType" className="mb-2 block text-sm text-neutral-300">
                  Event Type
                </label>
                <select
                  id="eventType"
                  value={eventType}
                  onChange={(event) => setEventType(event.target.value)}
                  className="w-full border border-neutral-700 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none focus:border-[#c49a4a]"
                >
                  <option>Private Party</option>
                  <option>Birthday</option>
                  <option>Wedding</option>
                  <option>Corporate Event</option>
                  <option>Family Gathering</option>
                  <option>Graduation</option>
                  <option>Pooja / Religious Event</option>
                  <option>Other Occasion</option>
                </select>
              </div>

              <div>
                <label htmlFor="date" className="mb-2 block text-sm text-neutral-300">
                  Event Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border border-neutral-700 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none focus:border-[#c49a4a]"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="guests" className="mb-2 block text-sm text-neutral-300">
                  Number of Guests
                </label>
                <input
                  id="guests"
                  name="guests"
                  type="number"
                  min="1"
                  placeholder="e.g. 25"
                  className="w-full border border-neutral-700 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none focus:border-[#c49a4a]"
                />
              </div>

              <div>
                <label htmlFor="tray" className="mb-2 block text-sm text-neutral-300">
                  Preferred Tray Size
                </label>
                <select
                  id="tray"
                  value={selectedTray}
                  onChange={(event) => setSelectedTray(event.target.value)}
                  className="w-full border border-neutral-700 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none focus:border-[#c49a4a]"
                >
                  {traySizes.map((tray) => (
                    <option key={tray.name} value={tray.name}>
                      {tray.name} — {tray.guests}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="menu" className="mb-2 block text-sm text-neutral-300">
                Menu Preferences
              </label>
              <textarea
                id="menu"
                name="menu"
                rows={2}
                className="w-full border border-neutral-700 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none focus:border-[#c49a4a]"
                placeholder="e.g. Veg biryani, chicken curry, appetizers"
              />
            </div>

            <div>
              <label htmlFor="details" className="mb-2 block text-sm text-neutral-300">
                Additional Details
              </label>
              <textarea
                id="details"
                name="details"
                rows={3}
                className="w-full resize-y border border-neutral-700 bg-[#0d0d0d] px-4 py-3 text-sm text-white outline-none focus:border-[#c49a4a]"
                placeholder="Venue, delivery needs, dietary requests, or other details"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="submit"
                name="submitAction"
                value="whatsapp"
                className="w-full bg-[#25D366] px-6 py-4 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-[#45e681]"
              >
                Submit via WhatsApp ↗
              </button>

              <button
                type="submit"
                name="submitAction"
                value="email"
                disabled={isSubmitting}
                className="w-full bg-[#c49a4a] px-6 py-4 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-[#e0bd73] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending Email..." : "Submit via Email"}
              </button>
            </div>

            {status && (
              <p
                role="status"
                aria-live="polite"
                className="text-sm leading-6 text-[#e2c17d]"
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}