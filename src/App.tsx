import { useCallback, useEffect, useState } from 'react';
import { content } from '@/content';
import { Drawer } from '@/components/Drawer';
import { Footer } from '@/components/Footer';
import { Grain, Loader } from '@/components/Loader';
import { Header } from '@/components/Header';
import { BackToTop, SideDots } from '@/components/SideDots';
import { About } from '@/sections/About';
import { Contact } from '@/sections/Contact';
import { Gram, Partners } from '@/sections/Gram';
import { Hero } from '@/sections/Hero';
import { Works } from '@/sections/Works';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollPast } from '@/hooks/useScrollPast';

// useActiveSection に渡す配列は毎回作り直さない（監視を張り直してしまうため）
const SECTION_IDS = content.dots.map((item) => item.id);

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const showBackToTop = useScrollPast(500);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

  useEffect(() => {
    document.title = `${content.brand.name} — 映像制作`;
  }, []);

  const goTo = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const goHome = useCallback(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Grain />
      <Loader />

      <Header
        brandName={content.brand.name}
        nav={content.nav}
        menuOpen={menuOpen}
        onToggleMenu={toggleMenu}
        onNavigate={goTo}
        onHome={goHome}
      />
      <Drawer nav={content.nav} open={menuOpen} onClose={closeMenu} onNavigate={goTo} />
      <SideDots dots={content.dots} active={active} onNavigate={goTo} />

      <main>
        <Hero hero={content.hero} />
        <Works works={content.works} />
        <About about={content.about} />
        <Contact contact={content.contact} />
        <Gram gram={content.gram} />
        <Partners partners={content.partners} note={content.partnersNote} />
      </main>

      <Footer brand={content.brand} footer={content.footer} />
      <BackToTop visible={showBackToTop} />
    </>
  );
}
