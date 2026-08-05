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
import { PriceCta } from '@/sections/PriceCta';
import { PricePage } from '@/sections/PricePage';
import { Profile } from '@/sections/Profile';
import { Works } from '@/sections/Works';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollPast } from '@/hooks/useScrollPast';

// useActiveSection に渡す配列は毎回作り直さない（監視を張り直してしまうため）
const SECTION_IDS = content.dots.map((item) => item.id);

export function App() {
  const [page, setPage] = useState<'home' | 'price'>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const showBackToTop = useScrollPast(500);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

  useEffect(() => {
    document.title = `${content.brand.name} — 映像制作`;
  }, []);

  /** トップページの該当セクションへ送る。料金ページからでも戻ってから移動する */
  const goTo = useCallback(
    (id: string) => {
      setMenuOpen(false);
      if (id === 'price') {
        setPage('price');
        window.scrollTo({ top: 0 });
        return;
      }
      const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      if (page === 'price') {
        setPage('home');
        window.scrollTo({ top: 0 });
        setTimeout(scroll, 60);
      } else {
        scroll();
      }
    },
    [page],
  );

  const goHome = useCallback(() => {
    setMenuOpen(false);
    setPage('home');
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
      {page === 'home' && <SideDots dots={content.dots} active={active} onNavigate={goTo} />}

      <main>
        {page === 'home' ? (
          <>
            <Hero hero={content.hero} />
            <Works works={content.works} />
            <Profile profile={content.profile} />
            <About about={content.about} />
            <PriceCta price={content.priceCta} onOpen={() => goTo('price')} />
          </>
        ) : (
          <PricePage price={content.pricePage} onBack={goHome} />
        )}

        {/* Contact 以降はどちらのページでも共通で出る */}
        <Contact contact={content.contact} />
        <Gram gram={content.gram} />
        <Partners partners={content.partners} note={content.partnersNote} />
      </main>

      <Footer brand={content.brand} footer={content.footer} />
      <BackToTop visible={showBackToTop} />
    </>
  );
}
