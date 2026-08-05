import type { Equipment as EquipmentContent } from '@/content.types';
import { Section, SectionHeading } from '@/components/Section';

/** 使用機材。ロゴは持たず、社名を Six Caps で組んで型番を等幅で添える */
export function Equipment({ equipment }: { equipment: EquipmentContent }) {
  return (
    <Section>
      <SectionHeading title={equipment.heading} tracking="2px" reveal={false} />

      <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-7">
        {equipment.items.map((item) => (
          <div
            key={item.brand}
            className="flex h-[110px] flex-col items-center justify-center gap-2 border border-white/8"
          >
            <span className="font-display text-[34px] leading-none tracking-[2px] text-white/85 uppercase">
              {item.brand}
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-cool uppercase">
              {item.model}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
