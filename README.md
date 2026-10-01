# Сайт-визитка для психологов (Гештальт-терапия)

Интерактивный сайт-визитка для двух практикующих психологов в гештальт-подходе. Сайт выполнен в mobile-first стиле с адаптивной версткой и интерактивными карточками с flip-анимацией.

## 🎨 Особенности

- **Mobile-first дизайн** — оптимизирован для мобильных устройств
- **Интерактивные портреты** — при клике/тапе карточки переворачиваются, показывая информацию о психологе
- **Адаптивная верстка** — корректно отображается на всех устройствах
- **Плавные анимации** — flip-эффект, fade-in, floating элементы
- **Accessibility** — поддержка клавиатурной навигации

## 🛠 Технологии

- **React 18** — UI библиотека
- **TypeScript** — типизация
- **Vite** — сборщик
- **Tailwind CSS** — стилизация
- **Google Fonts** — шрифты (Cormorant Garamond, Inter)

## 📋 Требования

- Node.js 18+ 
- npm 9+

## 🚀 Локальный запуск (для разработки)

### 1. Клонирование репозитория

```bash
git clone <url-репозитория>
cd <название-папки>
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Запуск dev-сервера

```bash
npm run dev
```

Сайт будет доступен по адресу: `http://localhost:5173`

### 4. Сборка для продакшена

```bash
npm run build
```

Собранные файлы появятся в папке `dist/`

### 5. Предпросмотр продакшен-сборки

```bash
npm run preview
```

## 🌐 Развёртывание на хостинге

### Вариант 1: Статический хостинг (Beget, TimeWeb, Reg.ru, и др.)

#### Шаг 1: Сборка проекта

```bash
npm run build
```

#### Шаг 2: Загрузка файлов

1. Зайдите в панель управления хостингом
2. Откройте файловый менеджер или подключитесь по FTP/SFTP
3. Перейдите в корневую папку сайта (обычно `public_html/`, `www/` или `htdocs/`)
4. Загрузите **всё содержимое** папки `dist/` в корневую папку сайта

**Структура на сервере должна быть:**
```
public_html/
├── index.html
├── assets/
│   ├── index-xxxxx.css
│   └── index-xxxxx.js
└── (другие файлы из dist/)
```

#### Шаг 3: Настройка .htaccess (опционально)

Создайте файл `.htaccess` в корневой папке:

```apache
# Кэширование статических файлов
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Gzip сжатие
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# SPA routing (если нужно)
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

### Вариант 2: VPS/VDS (Ubuntu/Debian)

#### Шаг 1: Установка Nginx

```bash
sudo apt update
sudo apt install nginx
```

#### Шаг 2: Сборка проекта локально

```bash
npm run build
```

#### Шаг 3: Загрузка файлов на сервер

```bash
# Создайте папку для сайта
sudo mkdir -p /var/www/psychologists

# Загрузите файлы через SCP
scp -r dist/* user@your-server:/var/www/psychologists/

# Установите права
sudo chown -R www-data:www-data /var/www/psychologists
sudo chmod -R 755 /var/www/psychologists
```

#### Шаг 4: Настройка Nginx

Создайте конфигурационный файл:

```bash
sudo nano /etc/nginx/sites-available/psychologists
```

Добавьте конфигурацию:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/psychologists;
    index index.html;

    # Кэширование
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Активируйте сайт:

```bash
sudo ln -s /etc/nginx/sites-available/psychologists /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Шаг 5: Настройка SSL (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Вариант 3: Netlify

#### Способ 1: Через веб-интерфейс

1. Соберите проект: `npm run build`
2. Зайдите на [netlify.com](https://netlify.com)
3. Перетащите папку `dist/` в зону деплоя
4. Готово! Сайт автоматически развернётся

#### Способ 2: Через Netlify CLI

```bash
# Установите Netlify CLI
npm install -g netlify-cli

# Войдите в аккаунт
netlify login

# Разверните сайт
netlify deploy --prod --dir=dist
```

#### Способ 3: Автоматический деплой из Git

1. Загрузите код в GitHub/GitLab
2. Подключите репозиторий к Netlify
3. Настройте команды:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

### Вариант 4: Vercel

#### Способ 1: Через веб-интерфейс

1. Зайдите на [vercel.com](https://vercel.com)
2. Нажмите "New Project"
3. Импортируйте репозиторий из GitHub/GitLab
4. Vercel автоматически определит Vite и настроит сборку
5. Нажмите "Deploy"

#### Способ 2: Через Vercel CLI

```bash
# Установите Vercel CLI
npm install -g vercel

# Войдите в аккаунт
vercel login

# Разверните проект
vercel --prod
```

### Вариант 5: GitHub Pages

#### Шаг 1: Настройте Vite для GitHub Pages

Отредактируйте `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/название-репозитория/',
  // ... остальные настройки
})
```

#### Шаг 2: Создайте GitHub Actions workflow

Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### Шаг 3: Активируйте GitHub Pages

1. Зайдите в Settings → Pages
2. Выберите Source: "Deploy from a branch"
3. Branch: "gh-pages" / "root"

### Вариант 6: Cloudflare Pages

1. Зайдите на [pages.cloudflare.com](https://pages.cloudflare.com)
2. Нажмите "Create a project"
3. Подключите Git-репозиторий
4. Настройте сборку:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Нажмите "Save and Deploy"

## 📁 Структура проекта

```
├── public/              # Статические файлы
├── src/
│   ├── App.tsx         # Главный компонент
│   ├── main.tsx        # Точка входа
│   └── index.css       # Глобальные стили
├── dist/               # Собранные файлы (после build)
├── index.html          # HTML шаблон
├── package.json        # Зависимости
├── tsconfig.json       # Конфигурация TypeScript
├── tailwind.config.js  # Конфигурация Tailwind
└── vite.config.ts      # Конфигурация Vite
```

## 🔧 Настройка и кастомизация

### Изменение текстов психологов

Откройте `src/App.tsx` и найдите переменные:
- `psychologist1Text` — текст для первого психолога
- `psychologist2Text` — текст для второго психолога

### Изменение изображений

Замените константы в начале файла `src/App.tsx`:

```typescript
const PSYCHOLOGIST_1_IMAGE = "путь/к/изображению1.jpg";
const PSYCHOLOGIST_2_IMAGE = "путь/к/изображению2.jpg";
```

Рекомендуется поместить изображения в папку `public/images/` и использовать пути:
```typescript
const PSYCHOLOGIST_1_IMAGE = "/images/psychologist1.jpg";
```

### Изменение цветовой схемы

Откройте `src/index.css` и измените CSS-переменные в блоке `@theme`:

```css
@theme {
  --color-warm-50: #fdf8f4;  /* Основной фон */
  --color-sage-500: #5a7f5a; /* Акцентный цвет */
  /* ... другие цвета */
}
```

## 📱 Оптимизация изображений

Перед деплоем рекомендуется оптимизировать изображения:

```bash
# Установите sharp-cli
npm install -g sharp-cli

# Или используйте онлайн-сервисы:
# - TinyPNG (https://tinypng.com)
# - Squoosh (https://squoosh.app)
# - ImageOptim (Mac)
```

Рекомендуемые форматы:
- **WebP** — лучший выбор для современных браузеров
- **JPEG** — для фотографий (качество 80-85%)
- **PNG** — только если нужна прозрачность

## 🐛 Решение проблем

### Проблема: Белый экран после деплоя

**Решение:**
1. Проверьте консоль браузера (F12) на наличие ошибок
2. Убедитесь, что все пути в `vite.config.ts` корректны
3. Для GitHub Pages добавьте `base: '/название-репозитория/'`

### Проблема: Изображения не загружаются

**Решение:**
1. Проверьте пути к изображениям
2. Убедитесь, что изображения находятся в папке `public/`
3. Проверьте регистр символов в именах файлов (Linux чувствителен к регистру)

### Проблема: Стили не применяются

**Решение:**
1. Очистите кэш браузера (Ctrl+Shift+R)
2. Проверьте, что Tailwind CSS правильно настроен
3. Убедитесь, что `npm run build` выполнен успешно

## 📞 Поддержка

При возникновении вопросов или проблем:
1. Проверьте консоль браузера на наличие ошибок
2. Убедитесь, что все зависимости установлены (`npm install`)
3. Попробуйте удалить `node_modules` и `package-lock.json`, затем переустановить

## 📄 Лицензия

Этот проект создан для конкретного заказчика. Все права на контент и изображения принадлежат их авторам.

---

**Создано с ❤️ для психологов Анны и Валерии**
