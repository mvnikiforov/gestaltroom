import { useEffect, useId, useRef, useState } from 'react';
import type { Psychologist } from '../data/psychologists';
import PsychologistPhoto from './PsychologistPhoto';

interface PsychologistCardProps {
  psychologist: Psychologist;
}

export default function PsychologistCard({ psychologist }: PsychologistCardProps) {
  const { name, subtitle, bio, accent, fade, delay, phone, phoneHref, channelLabel, channelUrl } =
    psychologist;
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const backId = useId();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const isScrollable = el.scrollHeight > el.clientHeight + 4;
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
      setShowScrollHint(isScrollable && !isAtBottom);
    };

    update();
    el.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => {
      el.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, [isFlipped]);

  return (
    <div
      className={`card-container w-full max-w-[340px] sm:max-w-[380px] md:max-w-[400px] h-[520px] sm:h-[580px] md:h-[620px] mx-auto transition-all duration-500 motion-reduce:transition-none ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div
        className="card-inner"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Лицевая сторона: портрет. Клик только здесь — на рубашке нельзя
            случайно перевернуть карточку, прокручивая длинный текст. */}
        <button
          type="button"
          onClick={() => setIsFlipped(true)}
          aria-expanded={isFlipped}
          aria-controls={backId}
          aria-hidden={isFlipped}
          tabIndex={isFlipped ? -1 : 0}
          aria-label={`Открыть карточку и прочитать биографию: ${name}`}
          className="card-face card-front group relative block w-full h-full cursor-pointer shadow-2xl"
        >
          <PsychologistPhoto psychologist={psychologist} />
          <div className="gradient-overlay absolute inset-0" />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white mb-1">
              {name}
            </h3>
            <p className="text-warm-200 text-sm sm:text-base font-light">{subtitle}</p>
          </div>

          <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 19.945l1.475-2.106M4.222 14.5l2.106 1.475M19.778 9.5l-2.897-.777"
              />
            </svg>
            <span className="text-white text-xs font-light">нажмите</span>
          </span>
        </button>

        {/* Оборотная сторона: биография. */}
        <div
          id={backId}
          aria-hidden={!isFlipped}
          className={`card-face card-back relative w-full h-full ${accent}`}
        >
          <div className="w-full h-full p-6 sm:p-8 flex flex-col">
            <div className="shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-0.5 bg-current opacity-40" />
                <span className="text-xs uppercase tracking-widest opacity-60">О себе</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-4 leading-tight">
                {name}
              </h3>
            </div>

            {/* Биография прокручивается отдельно: телефон и кнопка «вернуться»
                остаются на виду, а прокрутка текста никогда не переворачивает карточку. */}
            <div className="relative min-h-0 flex-1">
              <div
                ref={scrollRef}
                className="h-full overflow-y-auto overscroll-contain text-[13px] sm:text-sm md:text-[15px] leading-relaxed opacity-90 font-light space-y-3"
              >
                {bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Подсказка «есть что дочитать» — исчезает, когда текст доскроллен. */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t ${fade} to-transparent transition-opacity duration-300 motion-reduce:transition-none ${
                  showScrollHint ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>

            <div className="shrink-0 pt-4">
              {phone && phoneHref && (
                <div className="pb-3">
                  <a
                    href={phoneHref}
                    tabIndex={isFlipped ? 0 : -1}
                    aria-hidden={!isFlipped}
                    className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 transition-colors px-4 py-2.5 text-sm font-medium no-underline motion-reduce:transition-none"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                    Запись: {phone}
                  </a>
                </div>
              )}

              {/* Ссылка на канал в мессенджере — вторая кнопкой, телефон
                  первым. Рендерится, только если заданы оба поля. */}
              {channelLabel && channelUrl && (
                <div className="pb-4">
                  <a
                    href={channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={isFlipped ? 0 : -1}
                    aria-hidden={!isFlipped}
                    className="inline-flex items-center gap-2 rounded-full border border-current opacity-80 hover:opacity-100 active:opacity-100 transition-opacity px-4 py-2.5 text-sm font-medium no-underline motion-reduce:transition-none"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M6 12L3.269 3.125A59.769 59.769 0 0121.485 12 59.77 59.77 0 013.27 20.875L5.999 12zm0 0h7.5"
                      />
                    </svg>
                    {channelLabel}
                  </a>
                </div>
              )}

              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                tabIndex={isFlipped ? 0 : -1}
                aria-hidden={!isFlipped}
                className="inline-flex items-center gap-2 rounded-full opacity-70 hover:opacity-100 transition-opacity motion-reduce:transition-none"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="text-xs">вернуться к портрету</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}