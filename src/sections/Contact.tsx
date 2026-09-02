import { useState, type FormEvent } from 'react';
import type { Contact as ContactContent } from '@/content.types';
import { Reveal } from '@/components/Reveal';

const FIELD =
  'h-14 border border-white/44 bg-transparent p-3 text-[15px] text-white outline-none placeholder:text-white/50 focus:border-warm';

/**
 * idle → sending → sent / error。error からは送り直せる（idle と同じ扱いに戻す）。
 * 以前は sent しか存在せず、押した瞬間に必ず「Thank you」になっていた。
 */
type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact({ contact }: { contact: ContactContent }) {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // 既定の送信はページ遷移を伴う。fetch で投げて画面に留まる
    event.preventDefault();
    if (status === 'sending' || status === 'sent') return;

    // await をまたぐと currentTarget は null になる。先に掴んでおく
    const form = event.currentTarget;
    setStatus('sending');

    // 送信先が未設定のあいだは黙って成功にしない。
    // 「送ったつもりの人が出て、こちらは気付かない」状態を作らないことがこの画面の要件。
    if (!contact.endpoint) {
      setStatus('error');
      return;
    }

    try {
      const response = await fetch(contact.endpoint, {
        method: 'POST',
        // これが無いと Formspree は自前のサンクスページへリダイレクトさせる。
        // JSON で返させることで、遷移せずに成否だけ受け取れる
        headers: { Accept: 'application/json' },
        // FormData をそのまま渡す。Content-Type は fetch が boundary 付きで組むので指定しない
        body: new FormData(form),
      });
      if (!response.ok) throw new Error(`送信に失敗した（HTTP ${response.status}）`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  const label =
    status === 'sending'
      ? contact.sendingLabel
      : status === 'sent'
        ? contact.sentLabel
        : contact.sendLabel;

  return (
    <section
      id="contact"
      className="flex min-h-screen items-center bg-bg-alt px-6 py-[110px]"
    >
      <div className="mx-auto w-full max-w-[760px]">
        <Reveal className="text-center">
          <h2 className="font-display text-[clamp(64px,9vw,96px)] leading-none tracking-[1px] uppercase">
            {contact.heading}
          </h2>
        </Reveal>
        <p className="mb-12 text-center text-base text-white/68">{contact.lead}</p>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
            <input
              type="text"
              name="name"
              required
              aria-label={contact.fields.name}
              placeholder={contact.fields.name}
              className={FIELD}
            />
            <input
              type="email"
              name="email"
              required
              aria-label={contact.fields.email}
              placeholder={contact.fields.email}
              className={FIELD}
            />
          </div>
          {/* Formspree は `_subject` をメールの件名に使う。ただの subject だと本文中の
              1項目になり、受信箱の一覧で用件が読めない */}
          <input
            type="text"
            name="_subject"
            required
            aria-label={contact.fields.subject}
            placeholder={contact.fields.subject}
            className={FIELD}
          />
          <textarea
            name="message"
            required
            aria-label={contact.fields.message}
            placeholder={contact.fields.message}
            className={`${FIELD} h-[150px] resize-y`}
          />
          {/* 罠。人には見えないので埋まっていれば bot と判断され、Formspree 側で捨てられる */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <button
            type="submit"
            disabled={status === 'sending' || status === 'sent'}
            aria-busy={status === 'sending'}
            className="w-full border-2 border-warm bg-[linear-gradient(to_top,var(--color-bg)_50%,var(--color-warm)_50%)] bg-[length:100%_200%] bg-[position:0_0] px-[33px] py-[13px] text-[13px] leading-[normal] font-bold tracking-[0.16em] text-bg uppercase transition-[background-position,color] duration-300 hover:bg-[position:0_100%] hover:text-warm disabled:pointer-events-none disabled:opacity-70"
          >
            {label}
          </button>
        </form>

        {/* form の外に出してある。中に置くと grid gap ぶんの隙間が常に空いてしまう。
            空のときは :empty で畳むので、送信前の見た目は元のまま */}
        <div
          role="status"
          aria-live="polite"
          className="mt-5 text-center text-sm empty:hidden"
        >
          {status === 'sent' && <span className="text-white/68">{contact.messages.sent}</span>}
          {status === 'error' && (
            // 暖色は「注意して見るもの」に当てる色。失敗はここで気付いてもらう必要がある
            <span className="text-warm">
              {contact.messages.error}
              {contact.fallbackEmail && (
                <>
                  {' '}
                  <a href={`mailto:${contact.fallbackEmail}`} className="underline">
                    {contact.fallbackEmail}
                  </a>
                </>
              )}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
