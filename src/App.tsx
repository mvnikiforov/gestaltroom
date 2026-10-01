import { useState, useEffect } from 'react';

const PSYCHOLOGIST_1_IMAGE = "https://image.qwenlm.ai/generated-images/7059da63-1e2f-4a1d-8636-e63b07db396f/_result.png";
const PSYCHOLOGIST_2_IMAGE = "https://image.qwenlm.ai/generated-images/2f3eafa5-7b50-457c-beae-3dc31c8919ff/_result.png";

interface PsychologistCardProps {
  image: string;
  name: string;
  subtitle: string;
  text: string;
  accentColor: string;
  delay: number;
}

function PsychologistCard({ image, name, subtitle, text, accentColor, delay }: PsychologistCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`card-container w-full max-w-[340px] sm:max-w-[380px] md:max-w-[400px] h-[520px] sm:h-[580px] md:h-[620px] cursor-pointer mx-auto transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`Узнать больше о ${name}`}
    >
      <div className={`card-inner ${isFlipped ? '' : ''}`} style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        {/* Front - Photo */}
        <div className="card-front shadow-2xl">
          <div className="relative w-full h-full">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="gradient-overlay absolute inset-0" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white mb-1">
                {name}
              </h3>
              <p className="text-warm-200 text-sm sm:text-base font-light">
                {subtitle}
              </p>
            </div>
            {/* Tap hint */}
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 19.945l1.475-2.106M4.222 14.5l2.106 1.475M19.778 9.5l-2.897-.777" />
              </svg>
              <span className="text-white text-xs font-light">нажмите</span>
            </div>
          </div>
        </div>

        {/* Back - Text */}
        <div className={`card-back shadow-2xl ${accentColor}`}>
          <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-0.5 bg-current opacity-40"></div>
                <span className="text-xs uppercase tracking-widest opacity-60">О себе</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-4 leading-tight">
                {name}
              </h3>
              <div className="text-sm sm:text-base leading-relaxed opacity-90 whitespace-pre-line font-light">
                {text}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 opacity-60">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-xs">нажмите, чтобы вернуться</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ParticleBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-sage-200/30 blur-3xl float-animation" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-warm-200/30 blur-3xl float-animation" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-sage-100/40 blur-2xl float-animation" style={{ animationDelay: '4s' }} />
      <div className="absolute -bottom-10 left-1/4 w-60 h-60 rounded-full bg-warm-100/50 blur-3xl float-animation" style={{ animationDelay: '3s' }} />
    </div>
  );
}

function App() {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    setHeaderVisible(true);
  }, []);

  const psychologist1Text = `Я практикующий гештальт-терапевт и магистр психологии. Мне 41 год.

Работаю там, где привычные способы справляться больше не работают: утрата, тревога, депрессия, сложные отношения, жизненные тупики.

В терапии можно не знать, как правильно и всё равно постепенно находить своё.`;

  const psychologist2Text = `Привет! Меня зовут Валерия, мне 38 лет.

Я — мама, жена, магистрант-этнопсихолог (мультикультурное психологическое консультирование, МГППУ) и гештальт-практик (МИГИП). Также инструктор интегративной кундалини-йоги и тренер ДАО-практик.

Около 20 лет я практикую трансперсональные методы: телесные, дыхательные и медитативные техники. Это мой личный опыт, который я бережно интегрирую в работу с клиентами около 5 лет.

Я верю, что каждый человек по своей природе целостен, но часто забывает об этом из-за травм, стрессов и культурных установок. Моя задача — создать безопасное пространство, где вы встречаетесь со своей природной мудростью.

🌺 Работаю ОНЛАЙН и ОФЛАЙН — индивидуально, в мини-группах и с коллективами.

Я создаю пространство в партнёрстве с вами, где вы учитесь слышать СВОЮ природную мудрость.

Тело хранит всё, что вы привыкли сдерживать: стресс, незавершённые гештальты, напряжение. Во время практики и терапевтических сессий вы возвращаете себе живость, текучесть, силы, ясность.

Приходите не за техниками. Приходите за СОСТОЯНИЕМ, из которого рождаются ваши лучшие решения, отношения и дело.

📞 Запись: 8 962 321 21 73`;

  return (
    <div className="min-h-screen bg-warm-50 relative">
      <ParticleBackground />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 md:py-16 min-h-screen">
        
        {/* Header */}
        <header className={`text-center mb-10 sm:mb-14 md:mb-20 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 h-px bg-warm-400"></div>
            <span className="text-warm-500 text-xs sm:text-sm uppercase tracking-[0.3em] font-light">Гештальт-терапия</span>
            <div className="w-8 sm:w-12 h-px bg-warm-400"></div>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-warm-800 mb-3 sm:mb-4 leading-tight">
            Пространство<br className="sm:hidden" /> для ваших<br className="sm:hidden" /> перемен
          </h1>
          <p className="text-warm-600 text-sm sm:text-base md:text-lg font-light max-w-md mx-auto leading-relaxed">
            Две практики. Два пути. Одна цель — помочь вам обрести себя.
          </p>
          <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 text-warm-400">
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-xs font-light">нажмите на портрет</span>
          </div>
        </header>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 sm:gap-10 md:gap-14 w-full max-w-6xl">
          <PsychologistCard
            image={PSYCHOLOGIST_1_IMAGE}
            name="Анна"
            subtitle="Гештальт-терапевт • Магистр психологии"
            text={psychologist1Text}
            accentColor="bg-warm-800 text-warm-100"
            delay={300}
          />
          <PsychologistCard
            image={PSYCHOLOGIST_2_IMAGE}
            name="Валерия"
            subtitle="Гештальт-практик • Этнопсихолог • Йога-инструктор"
            text={psychologist2Text}
            accentColor="bg-sage-800 text-sage-100"
            delay={500}
          />
        </div>

        {/* Footer */}
        <footer className={`mt-12 sm:mt-16 md:mt-20 text-center transition-all duration-1000 delay-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-px bg-warm-300"></div>
            <div className="w-2 h-2 rounded-full bg-sage-400"></div>
            <div className="w-16 h-px bg-warm-300"></div>
          </div>
          <p className="text-warm-500 text-xs sm:text-sm font-light">
            Гештальт-подход • Работа с телом и сознанием • Осознанность
          </p>
          <p className="text-warm-400 text-xs mt-2 font-light">
            Москва • Онлайн и офлайн
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
