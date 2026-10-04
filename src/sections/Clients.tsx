import type { Clients as ClientsContent } from '@/content.types';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHeading } from '@/components/Section';
import { asset } from '@/lib/cn';

/**
 * 取引先のロゴ。Works の直後に置き、作品の裏付けとして読ませる。
 *
 * ロゴは色を変えずに載せる。単色化・白抜きはロゴ使用規定で禁じられて
 * いることが多いので、暗い地の上に明るい板（paper）を敷き、その上に
 * 原色のまま置いている。素材側の白地は透過に起こしてあるため、板の色は
 * ここの CSS が決める（変換の手順は README の「素材の差し替え方」）。
 */
export function Clients({ clients }: { clients: ClientsContent }) {
  return (
    <Section tone="alt">
      <SectionHeading title={clients.heading} tracking="2px" />

      {/*
        grid ではなく flex。auto-fit の grid は1社しか無いとき、
        カードが列幅いっぱいまで伸びて帯のように見えてしまう。
        基準幅を持たせた flex なら、1社なら中央に1枚、増えれば折り返る
      */}
      <ul className="mt-12 flex flex-wrap justify-center gap-7">
        {clients.items.map((item) => (
          <Reveal as="li" key={item.name} className="w-[clamp(240px,78vw,350px)]">
            {/* ロゴは縦横比がまちまちなので、高さを揃えて中で contain させる。
                揃えないと横長と正方形が並んだとき面積が桁違いになる */}
            <div className="flex h-[140px] items-center justify-center bg-paper px-7 py-6">
              <img
                src={asset(item.logo)}
                alt={item.name}
                loading="lazy"
                decoding="async"
                className="max-h-full w-full object-contain"
              />
            </div>

            {item.note ? (
              <p className="mt-3.5 text-center font-mono text-[10px] tracking-[0.16em] text-cool uppercase">
                {item.note}
              </p>
            ) : null}
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
