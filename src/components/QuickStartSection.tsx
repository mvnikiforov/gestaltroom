import { quickStart } from '../data/psychologists';

const ROWS: { label: string; field: 'format' | 'schedule' | 'time' | 'price' }[] = [
  { label: 'Формат', field: 'format' },
  { label: 'Когда', field: 'schedule' },
  { label: 'Время', field: 'time' },
  { label: 'Стоимость', field: 'price' },
];

export default function QuickStartSection() {
  return (
    <section
      aria-labelledby="quick-start-title"
      className="reveal-up w-full max-w-[340px] sm:max-w-[380px] md:max-w-[400px] lg:max-w-none lg:col-span-2 mx-auto rounded-3xl bg-olive-500 shadow-2xl shadow-warm-900/20 p-6 sm:p-8 lg:p-10 text-left"
    >
      <h2 id="quick-start-title" className="sr-only">
        {quickStart.title}
      </h2>

      {/* Eyebrow-строка — та же вёрстка, что «Гештальт-терапия» в шапке.
          На оливковом фоне текст тёмный: белый дал бы контраст ~2.9:1. */}
      <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
        <div className="w-8 sm:w-12 h-px bg-warm-900/30" />
        <span className="text-warm-900 text-xs sm:text-sm uppercase tracking-[0.3em] font-light">
          {quickStart.title}
        </span>
        <div className="w-8 sm:w-12 h-px bg-warm-900/30" />
      </div>

      <ol className="divide-y divide-warm-900/15">
        {quickStart.items.map((item) => (
          <li key={item.id} className="py-6 sm:py-7 first:pt-0 last:pb-0">
            <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-warm-900 mb-3 sm:mb-4 leading-tight">
              {item.title}
            </h3>

            <dl className="space-y-1.5 sm:space-y-2 text-sm sm:text-[15px] leading-relaxed">
              {ROWS.map(({ label, field }) => (
                <div key={field} className="flex gap-3 sm:gap-5">
                  <dt className="w-20 sm:w-28 shrink-0 text-warm-800 uppercase tracking-wider text-[11px] sm:text-xs pt-[3px]">
                    {label}
                  </dt>
                  <dd className="text-warm-900 font-light">{item[field]}</dd>
                </div>
              ))}
            </dl>

            {item.note && (
              <p className="mt-3 sm:mt-4 text-sm sm:text-[15px] text-warm-800 font-light italic">
                {item.note}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
