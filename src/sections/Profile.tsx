import type { Profile as ProfileContent } from '@/content.types';
import { Placeholder } from '@/components/Placeholder';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHeading } from '@/components/Section';
import { asset } from '@/lib/cn';

export function Profile({ profile, brandName }: { profile: ProfileContent; brandName: string }) {
  return (
    <Section id="profile">
      <SectionHeading title={profile.heading} />

      <Reveal className="grid grid-cols-1 items-center gap-9 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
        {profile.portrait ? (
          <img
            src={asset(profile.portrait)}
            alt={brandName}
            className="aspect-[4/5] min-h-[280px] w-full object-cover"
          />
        ) : (
          <Placeholder className="aspect-[4/5] min-h-[280px]">{profile.portraitNote}</Placeholder>
        )}

        <div>
          {profile.body.map((paragraph, i) => (
            <p key={i} className="mb-5 text-pretty text-white/70">
              {paragraph}
            </p>
          ))}

          <dl className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-x-[26px] gap-y-[18px]">
            {profile.meta.map((entry) => (
              <div key={entry.label}>
                <dt className="mb-1 text-xs font-bold tracking-[0.1em] uppercase">{entry.label}</dt>
                <dd className="m-0 text-sm leading-[1.7] text-white/70">{entry.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}
