
# VK ID One Tap Demo

Это минимальный пример интеграции VK ID One Tap с редиректом через code.

## 🔧 Настройка
1. Замените `redirectUrl` в `initOneTap.js` на свой.
2. Разместите код на Vercel:
   - Framework: Other
   - Output Directory: `.`

## 🧪 Что делает
1. Показывает кнопку One Tap
2. Получает `code` от VK ID
3. Перенаправляет на `/api/vk/callback?code=...`

## 📌 Важно
Вы должны настроить backend-обработчик `/api/vk/callback`, чтобы обменять `code` на access_token.
