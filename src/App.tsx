import { useCallback, useEffect, useRef, useState } from 'react';
import { content } from '@/content';
import { Drawer } from '@/components/Drawer';
import { Footer } from '@/components/Footer';
import { Grain, Loader } from '@/components/Loader';
import { Header } from '@/components/Header';
import { BackToTop, SideDots } from '@/components/SideDots';
import { About } from '@/sections/About';
import { Contact } from '@/sections/Contact';
import { Equipment } from '@/sections/Equipment';
import { Gram } from '@/sections/Gram';
import { Hero } from '@/sections/Hero';
import { Works } from '@/sections/Works';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollPast } from '@/hooks/useScrollPast';
import { cn } from '@/lib/cn';

// useActiveSection に渡す配列は毎回作り直さない（監視を張り直してしまうため）
const SECTION_IDS = content.dots.map((item) => item.id);

/** ドロワーが閉じ始めてからスクロールを走らせるまでの間。原本と同じ長さ */
const CLOSE_BEFORE_SCROLL_MS = 320;

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const showBackToTop = useScrollPast(500);
  // goTo を作り直さずに「いま開いているか」を読むための控え
  const menuOpenRef = useRef(menuOpen);
  menuOpenRef.current = menuOpen;

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

  useEffect(() => {
    document.title = `${content.brand.name} — 映像制作`;
  }, []);

  const goTo = useCallback((id: string) => {
    // 開いていたら、ドロワーが引っ込み始めるのを待ってからスクロールする。
    // 同時に動かすと本文が横に流れながら縦にも走って何が起きたか読めない
    const wait = menuOpenRef.current ? CLOSE_BEFORE_SCROLL_MS : 0;
    setMenuOpen(false);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, wait);
  }, []);

  const goHome = useCallback(() => goTo('home'), [goTo]);

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

      {/* ドロワーを開くと本文ごと左へ寄る。position:fixed の要素は
          変形した親の中に入れると固定が解けてしまうので、ヘッダーと
          「先頭へ戻る」は外に置いたまま同じぶんだけ個別に寄せている */}
      <div
        className={cn(
          'transition-transform duration-500 ease-brand',
          menuOpen && '-translate-x-panel',
        )}
      >
        <main>
          <Hero hero={content.hero} />
          <Works works={content.works} />
          <About about={content.about} />
          <Equipment equipment={content.equipment} />
          <Contact contact={content.contact} />
          <Gram gram={content.gram} />
        </main>

        <Footer brand={content.brand} footer={content.footer} />
      </div>

      <BackToTop visible={showBackToTop} shifted={menuOpen} />
    </>
  );
}
