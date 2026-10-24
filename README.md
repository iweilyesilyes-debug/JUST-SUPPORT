# 🎮 L'Big Time Community — Site Officiel

الواجهة الرسمية متاع سيرفر **L'Big Time Community**: تعريف بالكوميونيتي، فريق الستاف، لوغات Discord محمية بالرولات، لوحة صلاحيات للـ owner، وأربع ألعاب تونسية صغيرة (شكوكة، دومينو، X/O، ذاكرة).

- **Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS
- **Login:** Discord OAuth2 (من غير NextAuth) + session cookie مشفّر
- **Design:** dark / silver / gold، واجهة عربية `dir="rtl"` مع لمسات لاتينية gaming
- **Cursor:** الكورسور المخصص متاعك (`.ani` → 5 frames PNG + أنيميشن JS)

---

## 1. Quick start

```bash
npm install
copy .env.example .env.local   # PowerShell: Copy-Item .env.example .env.local
npm run dev
```

افتح **http://localhost:3000**

> 🟡 إذا ما حطّيتش مفاتيح Discord، الموقع يخدم في **Preview mode**: كل الصلاحيات محلولة، اللوغات تظهر بيانات تجريبية، وكاين badge أسفل اليسار. عمّر `.env.local` وعاود شغّل السيرفر باش يختفي.

### Scripts

| امر | شنوة يعمل |
|---|---|
| `npm run dev` | سيرفر التطوير |
| `npm run build` | build production |
| `npm run start` | تشغيل الـ build |
| `npm run assets` | يعاود يولد اللوغو والكورسور من الملفات الأصلية |
| `npx tsc --noEmit` | type-check |

---

## 2. Discord setup (مرة وحدة)

### أ) OAuth2 — باش الناس يعملو login

1. اذهب لـ [Discord Developer Portal](https://discord.com/developers/applications) → **New Application**.
2. **OAuth2 → General**:
   - انسخ **Client ID** و **Client Secret**.
   - **Redirects** زيد:
     - `http://localhost:3000/api/auth/callback`
     - في production: `https://your-domain.com/api/auth/callback`
3. **OAuth2 → URL Generator**: اختار scopes `identify` و `guilds.members.read` (الموقع يستعملهم باش يجيب الرولات).
4. حط القيم في `.env.local`:

```env
DISCORD_CLIENT_ID=...
DISCORD_CLIENT_SECRET=...
DISCORD_REDIRECT_URI=http://localhost:3000/api/auth/callback
SESSION_SECRET=...   # long random
```

### ب) Bot — لقراءة اللوغات والأعضاء

الموقع **read-only**: ما يبعتش رسائل، ما يعملش kick/ban، برك يقرا.

1. **Bot → Add Bot** → انسخ **Token** → `DISCORD_BOT_TOKEN`.
2. فعّل **Server Members Intent** في **Bot → Privileged Gateway Intents**.
3. **OAuth2 → URL Generator**: scopes `bot`، وصل البوت للسيرفر هاداك.
4. صلاحيات البوت المطلوبة:
   - **View Channels**
   - **Read Message History**
   - **View Server Insights** (اختياري، للإحصائيات)
5. حط `DISCORD_GUILD_ID` (Server Settings → Copy Server ID — فعّل Developer Mode أول).

> ⚠️ إذا البوت ما عندوش access لقناة لوغ، التبويب متاعها يرجع فارغ / خطأ. تأكد من channel permissions.

### ج) آي دي القنوات والرولات

فعّل **User Settings → Advanced → Developer Mode**، من بعد:

- **Role ID:** Server Settings → Roles → right click على الرول → Copy Role ID
- **Channel ID:** right click على القناة → Copy Channel ID

---

## 3. التعديل في الموقع (بلا كود)

### `src/config/community.ts` — الملف الرئيسي

كل حاجة قابلة للتبديل من هنا:

| شنوة | فين |
|---|---|
| الاسم، الـ tagline، الوصف | `name`, `shortName`, `tagline`, `description` |
| لينك الديسكورد | `serverInvite`, `welcome.cta.href`, `socials` |
| رسالة الترحيب | `welcome.title`, `welcome.message`, `welcome.note`, `welcome.showOnEveryVisit` |
| إظهار/إخفاء الأقسام | `sections.hero / staff / games / rules / about / stats` |
| القوانين | `rules` |
| ستاف الكاردات | `staff` (`name`, `role`, `roleId`, `avatar`, `tagline`, `accent`, `featured`) |
| ستاف حسب رولات Discord | `staffRoles` (`roleId`, `label`, `accent`, `featured`) |
| Owner roles | `ownerRoleIds` |
| قنوات اللوغات | `logSources[].channelId` |
| الألعاب | `games[].enabled` |
| الإحصائيات الاحتياطية | `fallbackStats` |
| SEO | `seo` |

بعد أي تعديل: عاود شغّل السيرفر (أو اعمل refresh في dev).

### ستاف أوتوماتيكي من Discord

- من **`/staff/panel` → Staff roles**، زيد **Role ID** (ولا اختار رول من Discord) → Save.
- كل عضو **non-bot** عندو الرول يظهر تلقائياً في `/staff` بالاسم، الصورة، username، وتاريخ الانضمام، مع **أعلى رتبة ستاف** عندو.
- `staffRoles` في `src/config/community.ts` هي القائمة الافتراضية. أول Save من اللوحة يكتب `data/staff.json` ويولي هو المرجع.
- باش ترجع للقائمة الافتراضية: امسح `data/staff.json`.
- إذا البوت ولا Guild ID ما موجودش، ولا Discord عاطل، الموقع يرجع للكاردات اليدوية في `staff`.
- الـ members cache يتحدّث كل 60 ثانية.

### اللوغو والكورسور

- اللوغو: `public/logo.png` (يتولّد من `public/logo-original.png` بـ `npm run assets`).
- الكورسور: `public/cursors/frame-00.png … frame-04.png` + `manifest.json`، والأنيميشن في `src/components/CursorFX.tsx`.
- الكورسور يتفكّر في `localStorage` (`lbt_cursor`) وكاين toggle في الهيدر.

---

## 4. الصلاحيات — Role based

الصلاحيات **مربوطة برولات Discord**، ماشي بأفراد.

| Permission | شنوة تحل |
|---|---|
| `play_games` | قسم الألعاب `/games` |
| `view_logs` | صفحة اللوغات `/logs` |
| `view_rules_logs` | كاتيغوري **Rules** الخاصة داخل `/logs` (تظهر كان للرولات إلي عندها الصلاحية) |
| `manage_rules` | كتابة/تعديل/حذف القوانين في `/rules` (القراية للكل) |
| `manage_store` | إدارة خدمات المتجر والأسعار في `/staff/store` + حذف التيكيات |
| `view_staff_area` | لوحة الستاف `/staff/panel` + يشوف تيكيات المتجر في `/staff/store` |
| `view_staff_private` | Discord IDs والملاحظات الداخلية في `/staff` |
| `manage_permissions` | تعديل صلاحيات الرولات (خطيرة) |

### كيفاش تعطي صلاحيات

1. ادخل بـ حساب عندو رول موجود في `ownerRoleIds` (ولا `DISCORD_OWNER_ROLE_IDS`).
2. افتح **`/staff/panel`**.
3. زيد **Role ID** (16–22 رقم) واختار الصلاحيات → Save.

- الرولات الـ owner عندها `*` تلقائياً.
- `everyone` = كل عضو داخل للسيرفر (ماشي الزوار).
- التخزين في `data/permissions.json` (يتخلق وحده أول قراءة).
- القيم الافتراضية في `src/config/permissions.ts` — تتطبق غير إذا الملف ما موجودش أو عملت Reset.

> 💡 في production، `data/` لازم يكون **persistent volume**. على Vercel serverless الملفات ما تبقاش — استعمل VPS/Docker، ولا بدّل `src/lib/permissions.ts` لـ DB.

---

## 5. الصفحات

| Route | Access |
|---|---|
| `/` | العام — hero، ستاف، ألعاب، قوانين، إحصائيات |
| `/staff` | العام (المعلومات الخاصة تحتاج `view_staff_private`) |
| `/games` | `play_games` |
| `/games/chkobba` | `play_games` — شكوكة ضد AI |
| `/games/domino` | `play_games` — دومينو ضد AI |
| `/games/xo` | `play_games` — X/O بـ minimax |
| `/games/memory` | `play_games` — ذاكرة 4×4 |
| `/logs` | `view_logs` — لوغات Discord (read-only)، وكاتيغوري **Rules** تحتاج زادة `view_rules_logs` |
| `/rules` | العام — الكل يقرا؛ الكتابة تحتاج `manage_rules` |
| `/store` | العام — كاتيغوري الخدمات والأسعار |
| `/store/[slug]` | العام — تفاصيل الخدمة + contact + فورم الأوردر (الأوردر يحتاج login + membership) |
| `/store/tickets` | مسجّل — تيكيات الزبون متاعو + شات مع الستاف |
| `/staff/store` | `view_staff_area` ولا `manage_store` — تيكيات المتجر (accept/chat/status)؛ تعديل الأسعار/الخدمات يحتاج `manage_store` |
| `/staff/panel` | `view_staff_area` + `manage_permissions` للتعديل |

النتائج والأفضلية (best scores) تتخزن في `localStorage` متاع الزائر.

### صفحة القوانين `/rules`

- القوانين تتخزن في `data/rules.json` (تتعمر أول مرة من `community.rules`).
- الصور تتخزن في `data/uploads/rules/` وتتعرّض عبر `/api/rules/media/[file]`.
- الرفع (`POST /api/rules/upload`) يقبل PNG/JPEG/WEBP/GIF، أقصى **4 MB**، ويتحقّق من الملف بالـmagic bytes ماشي بالـContent-Type.
- الكتابة/التعديل/الحذف + رفع الصور: صلاحية `manage_rules` فقط.

### المتجر `/store`

- الخدمات (11 خدمة seed) تتخزن في `data/store.json` وتتعمر أول مرة من `src/config/store.ts`.
- كل خدمة عندها صفحة `/store/<slug>` فيها الوصف الكامل، **السعر**، و**contact** (Discord/موقع/بوت/ألعاب/FiveM/SAMP).
- الأسعار حرة (string): `From 30 DT`، `Contact us`… يتعدلو من `/staff/store` → **Items & prices** (صلاحية `manage_store`). زادة تنجم تكليكي مباشرة على السعر في ليستة الخدمات وتبدلو في بلاصتو (inline) بلا ما تفتح الفورم.
- كل خدمة تنجم يكون عندها **صورة** تظهر في كارطة `/store`، في هيدر صفحة `/store/<slug>` وفي التيزر متاع الهوم. تترفع من نفس الفورم (**Add photo / Change photo**) وحدودها PNG/JPEG/WEBP/GIF و4 MB.
- الصور تتخزن في `data/uploads/store/` وتتقدم من `GET /api/store/media/<file>`؛ الرفع `POST /api/store/upload` والحذف `DELETE /api/store/upload?name=<file>` (الزوز محميين بـ`manage_store`). كي تبدّل/تحيّد الصورة ولا تحذف الخدمة، الفيشي القديم يتنقّى وحدو.
- الصور كي تتحقق من نوعها بـmagic bytes (ماشي غير `Content-Type`)، والأسماء UUID فقط — ما فماش path traversal.
- كي يعمل عضو أوردر → يتخلق **ticket** في `data/store-orders.json` بالكود `BT-XXXXXX` ويظهر في `/staff/store` لكل ستاف عندو `view_staff_area`.
- **Staff team:** في `/staff/store` فما كاتيغوري `Staff team` (كل التيكيات اللي قبلها ستاف) + زر **Accept** ياخذ التيكي على اسمو ويحوّلو لـ`in_progress`. الزبون ينجم يشوف شكون قبله.
- **Chat:** كل تيكي فيه thread رسائل بين الزبون والستاف. الستاف يجاوب من `/staff/store` والزبون من `/store/tickets`؛ الرسائل تظهر وحدها (polling كل 8 ثواني) وEnter يبعث. رسالة الأوردر الأولى هي أول bubble.
- الستاف ينجم يبدّل الحالة: `open → in_progress → done / cancelled`، ويحذف التيكي (كان `manage_store`). لوكان يحوّل لـ`open` التيكي يرجع للكوّ و يتنحى الـassignee.
- API: `POST /api/store/orders/[id]/messages` (زبون صاحب التيكي ولا ستاف، 1000 حرف للرسالة، 500 رسالة كحد أقصى). الـGET `/api/store/orders` يرجع للستاف الكل، وللزبون غير متاعو (ولا `?mine=1` للستاف).
- حدود: 5 تيكيات مفتوحة لكل عضو، 4000 حرف للوصف، 2000 حرف للرسالة.

---

## 6. Environment variables

| Key | إلزامي | شنوة |
|---|---|---|
| `DISCORD_CLIENT_ID` | ✅ | OAuth2 Client ID |
| `DISCORD_CLIENT_SECRET` | ✅ | OAuth2 Client Secret |
| `DISCORD_REDIRECT_URI` | ✅ | callback URL (يطابق Discord بالضبط) |
| `DISCORD_BOT_TOKEN` | للوغات/ستاف | Bot token |
| `DISCORD_GUILD_ID` | للوغات/ستاف | Server ID |
| `DISCORD_OWNER_ROLE_IDS` | مستحسن | comma-separated owner role IDs |
| `SESSION_SECRET` | ✅ في production | تشفير cookie |
| `NEXT_PUBLIC_SITE_URL` | مستحسن | `https://your-domain.com` |
| `DATA_DIR` | اختياري | مسار ملفات `data/` (permissions, rules, store, uploads) |

بدون `DISCORD_CLIENT_ID` + `DISCORD_CLIENT_SECRET` → Preview mode.

---

## 7. Deploy

```bash
npm run build
npm run start
```

- استعمل **HTTPS** (Discord redirect URI لازم HTTPS في production).
- بدّل `DISCORD_REDIRECT_URI` و `NEXT_PUBLIC_SITE_URL` للدومين الحقيقي.
- `SESSION_SECRET` طويل وعشوائي، وما يكونش في git.
- خلّي `data/` على volume دائم، ولا اربط `DATA_DIR`.
- إذا تستعمل reverse proxy (Nginx/Caddy)، مرّر الهيدرز عادي — الـ OAuth يعتمد على `DISCORD_REDIRECT_URI`.

### Docker (مثال سريع)

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "start"]
```

مع volume: `-v lbigtime_data:/app/data`

---

## 8. Troubleshooting

| مشكلة | حل |
|---|---|
| badge «Preview mode» | `.env.local` ناقص ولا السيرفر ما تعاودش تشغيل |
| `redirect_uri` error | الـ URI في Discord ما يطابقش `DISCORD_REDIRECT_URI` حرف بحرف |
| اللوغات فارغة | البوت ما عندوش access للقناة، ولا `channelId` غالط، ولا Members Intent مطفي |
| «ما عندكش صلاحية» | رولك ما عندوش الصلاحية — زيدها من `/staff/panel` ولا حط رولك في `ownerRoleIds` |
| الصلاحيات ما تحفظتش | `data/` read-only ولا ما عندوش persistent storage |
| الكورسور ما يظهرش | زيد جرّب toggle في الهيدر؛ بعض المتصفحات تحب interaction أول |
| الصور ما تبدلتش | شغّل `npm run assets` |

---

## 9. Structure

```
src/
  app/            صفحات + API routes (auth, logs, permissions, discord/roles)
  components/     Header, Footer, Hero, Staff, Games, Logs, Panel, CursorFX…
  config/         community.ts (كل شيء) + permissions.ts (defaults)
  lib/            auth, discord, permissions, viewer, demo, stats
data/             permissions.json (runtime)
public/           logo, favicon, cursors/
scripts/          build-assets.mjs
```

---

## 10. Security notes

- الـ session cookie: `httpOnly`, `sameSite=lax`, مشفّر بـ `SESSION_SECRET`.
- ما كاينش أي action إداري على Discord — اللوغات قراءة فقط.
- `manage_permissions` صلاحية حساسة: عطيها غير للـ owner/head admin.
- ما تعملش commit لـ `.env.local` ولا `data/permissions.json`.

---

صنع بحب في تونس 🇹🇳 — **الدار دارنا، الڨوسطو كبير** 🎮
