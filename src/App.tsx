import ParticleBackground from './components/ParticleBackground';
import PsychologistCard from './components/PsychologistCard';
import QuickStartSection from './components/QuickStartSection';
import { psychologists, site } from './data/psychologists';

export default function App() {
  return (
    <div className="min-h-screen bg-warm-50 relative">
      <ParticleBackground />

      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 md:py-16 min-h-screen">
        <header className="reveal-down text-center mb-10 sm:mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 h-px bg-warm-400" />
            <span className="text-warm-500 text-xs sm:text-sm uppercase tracking-[0.3em] font-light">
              {site.eyebrow}
            </span>
            <div className="w-8 sm:w-12 h-px bg-warm-400" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-warm-800 mb-3 sm:mb-4 leading-tight">
            {site.title}
          </h1>

          <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 text-warm-400">
            <svg
              className="w-4 h-4 animate-bounce motion-reduce:animate-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <span className="text-xs font-light">нажмите на портрет</span>
          </div>
        </header>

        {/* Ряд карточек и блок «Быстрый старт» — один контейнер. На lg он
            grid с колонками по ширине карточки, поэтому секция на `col-span-2`
            идёт ровно от левого края фото Марии до правого края фото Валерии.
            Секция стоит первой и занимает всю ширину, карточки — вторую строку. */}
        <div className="flex flex-col lg:grid lg:grid-cols-[repeat(2,minmax(0,400px))] lg:justify-center items-center lg:items-start gap-8 sm:gap-10 md:gap-14 lg:gap-x-14 lg:gap-y-12 w-full max-w-6xl">
          <QuickStartSection />

          {psychologists.map((psychologist) => (
            <PsychologistCard key={psychologist.id} psychologist={psychologist} />
          ))}
        </div>

        <footer className="reveal-up mt-12 sm:mt-16 md:mt-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-px bg-warm-300" />
            <div className="w-2 h-2 rounded-full bg-sage-400" />
            <div className="w-16 h-px bg-warm-300" />
          </div>
          <p className="text-warm-500 text-xs sm:text-sm font-light">{site.footerTop}</p>
          <p className="text-warm-400 text-xs mt-2 font-light">{site.footerBottom}</p>
        </footer>
      </div>
    </div>
  );
}