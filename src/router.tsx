import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes, useLocation, useNavigationType } from "react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocalBusinessLd } from "@/components/Meta";

// Every page is its own chunk, fetched on first visit.
const Home = lazy(() => import("@/pages/Home"));
const Work = lazy(() => import("@/pages/Work"));
const Services = lazy(() => import("@/pages/Services"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/** New navigations start at the top (or at the #anchor); back/forward keeps the browser's own restoration. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const type = useNavigationType();
  useEffect(() => {
    if (type === "POP") return;
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // The target may live in a lazy page that is still loading; retry for ~1s.
    let tries = 0;
    let raf = 0;
    const seek = () => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView();
      else if (tries++ < 60) raf = requestAnimationFrame(seek);
    };
    seek();
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash, type]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <a href="#main" className="fixed left-4 top-4 z-[110] -translate-y-24 bg-ink px-4 py-3 text-sm text-paper focus:translate-y-0">
        Skip to content
      </a>
      <LocalBusinessLd />
      <Header />
      <main id="main" className="min-h-svh">
        <Suspense fallback={<div className="min-h-svh" />}>
          {/* keyed so every route gets a short fade; no layout motion */}
          <div key={pathname} className="page-enter">
            <Outlet />
          </div>
        </Suspense>
      </main>
      <Footer />
      <ScrollManager />
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
