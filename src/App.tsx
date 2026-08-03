import { useCallback, useEffect, useState } from 'react';
import { content } from '@/content';
import { Drawer } from '@/components/Drawer';
import { Footer } from '@/components/Footer';
import { Grain, Loader } from '@/components/Loader';
import { Header } from '@/components/Header';
import { BackToTop, SideDots } from '@/components/SideDots';
import { Contact } from '@/sections/Contact';
import { Hero } from '@/sections/Hero';
import { Profile } from '@/sections/Profile';
import { Service } from '@/sections/Service';
import { Works } from '@/sections/Works';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollPast } from '@/hooks/useScrollPast';

// useActiveSection に渡す配列は毎回作り直さない（監視を張り直してしまうため）
const SECTION_IDS = content.nav.map((item) => item.id);

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const showBackToTop = useScrollPast(500);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

  useEffect(() => {
    document.title = `${content.brand.name} — 映像制作`;
  }, []);

  return (
    <>
      <Grain />
      <Loader />

      <Header
        brandName={content.brand.name}
        nav={content.nav}
        active={active}
        menuOpen={menuOpen}
        onToggleMenu={toggleMenu}
      />
      <Drawer nav={content.nav} open={menuOpen} onClose={closeMenu} />
      <SideDots nav={content.nav} active={active} />

      {/* セクションの並び順を変えるとナビの順（content.nav）と背景の交互も追従する */}
      <main>
        <Hero hero={content.hero} />
        <Works works={content.works} />
        <Profile profile={content.profile} brandName={content.brand.name} />
        <Service service={content.service} />
        <Contact contact={content.contact} />
      </main>

      <Footer brand={content.brand} footer={content.footer} />
      <BackToTop visible={showBackToTop} />
    </>
  );
}
