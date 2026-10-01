# Сайт-визитка для психологов (Гештальт-терапия)

Одностраничный сайт-визитка для двух практикующих психологов в гештальт-подходе.
Mobile-first, адаптивная вёрстка, интерактивные карточки с flip-анимацией.

Весь контент вынесен в **один файл** — [`src/data/psychologists.ts`](src/data/psychologists.ts).
Чтобы поменять тексты, имена, телефоны и фотографии, правьте только его.

## 🎨 Особенности

- **Mobile-first дизайн** — оптимизирован под мобильные устройства
- **Интерактивные портреты** — по клику карточка переворачивается и показывает биографию
- **Длинные тексты не ломают карточку** — биография прокручивается внутри карточки,
  телефон и кнопка «вернуться» остаются на виду
- **Клавиатурная навигация** — карточки открываются с клавиатуры (Enter / Пробел)
- **Уважение к `prefers-reduced-motion`** — анимации отключаются у пользователей,
  которым они мешают
- **Телефон кликабелен** — `tel:`-ссылка на рубашке карточки
- **Лёгкий вес** — в продакшене ~50 КБ JS и ~5.7 КБ CSS (gzip), изображения ~100 КБ

## 🛠 Стек

- **React 18** + **TypeScript** (strict)
- **Vite 6** — сборщик и dev-сервер
- **Tailwind CSS 4** — CSS-first конфигурация, тема задаётся в `src/index.css` (блок `@theme`),
  отдельного `tailwind.config.js` в проекте нет
- **ESLint 10** + **typescript-eslint**
- Шрифты Google: Cormorant Garamond, Inter

## 📋 Требования

Node.js 18+ (проверено на 22), npm 9+.

## 🚀 Команды

| Команда               | Что делает                                              |
| --------------------- | ------------------------------------------------------- |
| `npm install`         | Установка зависимостей                                 |
| `npm run dev`         | Dev-сервер на **http://localhost:3000**                |
| `npm run build`       | Проверка типов + продакшен-сборка в `dist/`            |
| `npm run preview`     | Локальный просмотр собранного `dist/` на порту 3000    |
| `npm run typecheck`   | Только проверка типов (`tsc --noEmit`)                 |
| `npm run lint`        | ESLint                                                 |

Порт 3000 зафиксирован в `vite.config.js` (`strictPort`), чтобы не расходился
с настройками окружения.

## 📁 Структура проекта

```
.
├── eslint.config.js          # ESLint flat config
├── index.html                # HTML-шаблон, мета-теги, OG-теги
├── package.json
├── photos-source/            # оригиналы фото и исходник OG-картинки (в dist/ НЕ попадают)
│   ├── Mariya.jpeg
│   ├── Valeriya.jpeg
│   └── og-image.svg
├── public/
│   ├── favicon.svg
│   ├── og-image.jpg          # 1200×630 — превью ссылки в мессенджерах
│   └── images/               # ← СЮДА КЛАДЁТЕ СВОИ ФОТОГРАФИИ
│       ├── Mariya.webp
│       └── Valeriya.webp
├── src/
│   ├── App.tsx               # Сборка страницы
│   ├── main.tsx              # Точка входа
│   ├── index.css             # @theme (цвета), анимации, стили карточки
│   ├── components/
│   │   ├── ParticleBackground.tsx
│   │   ├── PsychologistCard.tsx      # карточка с flip-анимацией
│   │   └── PsychologistPhoto.tsx     # фото + заглушка, если файл не загрузился
│   └── data/
│       └── psychologists.ts # ← ВСЕ ТЕКСТЫ, ФОТО, ТЕЛЕФОНЫ
├── tsconfig.json
└── vite.config.js
```

## 🖼 Как загрузить свои фотографии

1. Положите файл в `public/images/` — например `public/images/portrait.jpg`.
   Файлы из `public/` копируются в `dist/` как есть и отдаются по пути
   `/images/portrait.jpg`. Имя файла может быть любым — важно только чтобы оно
   совпадало с тем, что указано в данных (регистр букв тоже важен на Linux).
2. Пропишите путь в `src/data/psychologists.ts`:

   ```ts
   photo: {
     src: '/images/portrait.jpg',   // путь от корня сайта, без public/
     alt: 'Портрет Марии, гештальт-терапевта',
     width: 836,                    // размеры файла — см. пункт про object-cover
     height: 1254,
   },
   ```

3. Готово. Больше нигде путь к картинке не упоминается.

**Если картинки нет или она не загрузилась** — вместо неё показывается
аккуратная заглушка с инициалами, сайт при этом не ломается. Такое же происходит,
если в `src` попал неверный путь: Vite отдаст по нему `index.html`, картинка не
раскодируется и включится заглушка.

### Требования к фотографии

- Формат: **WebP** (лучший баланс качества и веса), подойдут также JPG и PNG
- Соотношение сторон: примерно **4:5** (портрет)
- Ширина: 800–1200 px
- Вес: желательно до 200 КБ

Обрезать и сжать:

```bash
# через npx (ничего не ставится глобально)
npx --yes sharp-cli@5 -i photo.jpg -o public/images/portrait.webp -f webp -q 82

# или воспользуйтесь онлайн-сервисами: squoosh.app, tinypng.com
```

Сжатие л lossy: если результат не устроит, вернитесь к оригиналу. Поэтому
необработанные файлы кладите в **`photos-source/`**, а не в `public/` — из `public/`
они попадут в `dist/` и уедут на хостинг вместе с сайтом. Текущие оригиналы
(`Mariya.jpeg` 318 КБ и `Valeriya.jpeg` 185 КБ) дают после сжатия 73 КБ и 29 КБ.

Поменять `og-image.jpg` можно через исходник `photos-source/og-image.svg`:

```bash
# отредактируйте SVG (текст, цвета) и пересоберите картинку
npx --yes sharp-cli@5 -i photos-source/og-image.svg -o public/og-image.jpg -f jpeg -q 86
```

Фото показывается через `object-cover`: кадр вписывается в карточку по большей
стороне, лишнее обрезается по центру. Если важное оказалось срезано —
исправьте это в самом файле, изменить кадрирование одой настройкой нельзя.
Текущий кадр проверяется на реальных устройствах: для двухпанельных снимков
центрирование может разрезать композицию.

## ✏️ Как поменять тексты и другие данные

Всё в `src/data/psychologists.ts`:

```ts
export const psychologists: Psychologist[] = [
  {
    id: 'mariya',
    name: 'Мария',
    subtitle: 'Гештальт-терапевт • Магистр психологии',
    bio: [
      'Первый абзац.',
      'Второй абзац.',
    ],
    phone: '8 962 321 21 73',        // как показывать
    phoneHref: 'tel:+79623212173',   // как звонить (E.164, без пробелов)
    photo: { src: '/images/portrait.jpg', alt: '...' },
    accent: 'bg-warm-800 text-warm-100',  // цвета рубашки карточки
    fade: 'from-warm-800',                 // цвет подсказки «есть что дочитать»
    delay: 300,                            // задержка появления, мс
  },
];
```

- `bio` — массив абзацев. Каждый элемент рендерится отдельным `<p>` с отступом.
- Телефон можно убрать, удалив `phone` и `phoneHref`. У обоих психологов
  телефон отображается одинаково, если нужно по-разному — сделайте их
  необязательными и рендерите отдельно.
- `accent` и `fade` — классы Tailwind: `bg-*` задаёт фон рубашки, `text-*` — цвет
  текста. `fade` должен совпадать с фоном из `accent`, иначе подсказка
  «есть что дочитать» будет видна как тёмное пятно.

Заголовок, подзаголовок и подвал — объект `site` в этом же файле.

## 🎨 Как поменять цвета

Блок `@theme` в `src/index.css`. Две палитры:

- `warm-*` — тёплая (фон сайта, рубашка карточки Марии)
- `sage-*` — зелёная (рубашка карточки Валерии)

```css
@theme {
  --color-warm-50: #fdf8f4;   /* основной фон страницы */
  --color-sage-500: #5a7f5a;  /* акцент */
}
```

После правки переменных классы вида `bg-warm-50`, `text-sage-100`
пересчитаются автоматически.

## 🖼 Как поменять иконку и превью ссылки

- **Фавиконка:** `public/favicon.svg` (подключена в `index.html`)
- **Превью в мессенджерах:** `public/og-image.jpg`, размер 1200×630.
  В `index.html` указан относительный путь — для части соцсетей и мессенджеров
  нужен **абсолютный** URL, поэтому после заливки на домен замените
  `content="/og-image.jpg"` на полный адрес вида `https://ваш-домен/og-image.jpg`.

## 🌐 Развёртывание

Сайт полностью статический: бэкенда нет, всё что нужно — папка `dist/`.

### 1. Сборка

```bash
npm run build
```

### 2. Статический хостинг (Beget, TimeWeb, Reg.ru, FTP)

Загрузите **содержимое** `dist/` в корневую папку сайта (`public_html/`,
`www/` или `htdocs/`). Для Apache можно добавить `.htaccess` с кэшированием
статики на год:

```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
</IfModule>
```

### 3. VPS / VDS (Nginx)

```bash
sudo mkdir -p /var/www/psychologists
sudo scp -r dist/* user@your-server:/var/www/psychologists/
sudo chown -R www-data:www-data /var/www/psychologists
```

`/etc/nginx/sites-available/psychologists`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/psychologists;
    index index.html;

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/javascript image/svg+xml;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/psychologists /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

SSL — Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 4. Netlify / Vercel / Cloudflare Pages

Подключите репозиторий и укажите:

- **Build command:** `npm run build`
- **Publish / output directory:** `dist`

Vercel и Netlify определяют Vite автоматически, руками ничего указывать не нужно.
Быстрый деплой без Git:

```bash
npx netlify-cli deploy --prod --dir=dist   # Netlify
npx vercel --prod                          # Vercel
```

### 5. GitHub Pages

В `vite.config.js` добавьте `base: '/имя-репозитория/'`, затем соберите и
выложите `dist/` в ветку `gh-pages` (через `peaceiris/actions-gh-pages`).

## 🐛 Решение проблем

**Белый экран после загрузки на хостинге**
Проверьте консоль браузера (F12). Для GitHub Pages не забудьте `base` в
`vite.config.js`.

**Фото не отображаются**
Проверьте, что файл лежит в `public/images/`, путь в `psychologists.ts`
начинается с `/` и не содержит `public/`, а имя файла совпадает по регистру
(Linux регистрозависим). Вместо фото должна появиться заглушка с инициалами —
если её нет, браузер вообще не запрашивал картинку, проверьте атрибут `src`.

**Шрифты или цвета выглядят не так**
Очистите кэш (`Ctrl+Shift+R`). Палитра задаётся в `@theme` файла
`src/index.css`, отдельного `tailwind.config.js` нет.

**`npm run lint` ругается на `setState` в эффекте**
Это новое правило `react-hooks`. Появление карточек сделано через CSS-анимации
(`reveal-down` / `reveal-up`), а не через состояние — так правильнее.

## 📄 Лицензия

Проект создан для конкретного заказчика. Права на тексты и фотографии
принадлежат их авторам.

---

**Создано с ❤️ для психологов Марии и Валерии**