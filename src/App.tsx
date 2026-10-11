import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header, Footer } from "./components/restaurant";

import Home from "./pages/index";
import About from "./pages/about";
import Menu from "./pages/menu";
import Gallery from "./pages/gallery";
import Contact from "./pages/contact";

import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
