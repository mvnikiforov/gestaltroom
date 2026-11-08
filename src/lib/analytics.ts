/**
 * Яндекс Метрика.
 *
 * Номер счётчика берётся из `VITE_YM_ID` (файл `.env.local` локально или
 * переменная GitHub Actions при сборке). Если переменная не задана, аналитика
 * молча отключается — сайт и сборка продолжают работать.
 *
 * Цели с такими же идентификаторами нужно создать в интерфейсе Метрики:
 * «Цели» → «JavaScript-событие».
 */
/** Действия на карточке, для которых есть отдельные цели по психологу. */
type CardGoal = 'card_open' | 'phone_click' | 'max_click' | 'telegram_click';

type AnalyticsGoal =
  | CardGoal
  | 'messenger_click'
  | 'map_click'
  | 'quick_start_view'
  /** Отдельная цель карточки: `<id психолога>_<действие>`. */
  | `${string}_${CardGoal}`;

type AnalyticsParams = Record<string, string | number | boolean>;

type YandexMetrica = {
  (...args: unknown[]): void;
  a?: unknown[][];
  l?: number;
};

declare global {
  interface Window {
    ym?: YandexMetrica;
  }
}

const COUNTER_ID = (import.meta.env.VITE_YM_ID as string | undefined)?.trim();

export function initAnalytics(): void {
  if (!COUNTER_ID || typeof document === 'undefined' || window.ym) return;

  // Очередь вызовов до загрузки tag.js — как в стандартном сниппете Метрики.
  const ym = ((...args: unknown[]) => {
    (ym.a = ym.a ?? []).push(args);
  }) as YandexMetrica;

  ym.l = Date.now();
  window.ym = ym;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://mc.yandex.ru/metrika/tag.js';
  document.head.appendChild(script);

  ym(COUNTER_ID, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    trackHash: false,
  });
}

export function reachGoal(goal: AnalyticsGoal, params?: AnalyticsParams): void {
  if (!COUNTER_ID || !window.ym) return;
  window.ym(COUNTER_ID, 'reachGoal', goal, params);
}

/**
 * Цель клика по мессенджеру. У MAX и Telegram отдельные цели, чтобы в Метрике
 * сравнивать каналы между собой; для прочих ссылок остаётся общая
 * `messenger_click`.
 */
export function messengerGoal(messenger: string): CardGoal | 'messenger_click' {
  if (messenger === 'max') return 'max_click';
  if (messenger === 'telegram') return 'telegram_click';
  return 'messenger_click';
}

/**
 * Цель действия на карточке: отправляет общую цель и отдельную для психолога.
 * Например, клик по телефону Валерии — `phone_click` и `valeriya_phone_click`.
 * Для нераспознанного мессенджера отдельной цели нет.
 */
export function reachCardGoal(
  goal: CardGoal | 'messenger_click',
  psychologist: string,
  params?: AnalyticsParams,
): void {
  reachGoal(goal, params);
  if (goal === 'messenger_click') return;
  reachGoal(`${psychologist}_${goal}`, params);
}
