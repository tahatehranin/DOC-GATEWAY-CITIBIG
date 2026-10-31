# داکیومنت جامع CITIBIG-GATEWAY

> نسخه: اکتبر ۲۰۲۶ — تمام ارائه‌دهنده‌ها در **یک سرویس واحد** به نام `CITIBIG-GATEWAY` ادغام شدند.
> گیت‌وی: APISIX 3.17.0 — پروکسی: `http://2.144.22.190:9080` — Admin API: `http://2.144.22.190:8005/apisix/admin`

---

## ۱. معماری جدید

قبلاً هر ارائه‌دهنده سرویس جداگانه داشت (zohal، apiir، ehraz، ...) و پلاگین‌ها در سطح سرویس بودند. حالا پلاگین‌های اختصاصی هر ارائه‌دهنده به سطح روت منتقل شده‌اند و سرویس واحد فقط احراز هویت مشترک را نگه می‌دارد:

```
                     ┌──────────────────────────────────────┐
                     │      SERVICE: CITIBIG-GATEWAY        │
                     │      plugins: { key-auth }           │
                     └──────────────────────────────────────┘
                                      │
      ┌───────────────────────────────┼───────────────────────────────┐
      │                               │                               │
 روت‌های zohal (37)             روت‌های apiir (67)              روت‌های ehraz (33)
 /services/...                  /apiir/...                      /ehraz/...
 upstream_id: zohal             upstream_id: apiir              upstream_id: ehraz
 proxy-rewrite (روت‌سطح)        proxy-rewrite (روت‌سطح)         proxy-rewrite (روت‌سطح)
      │                               │                               │
 upstream zohal                 upstream apiir                  upstream ehraz
 service.zohal.io:443           s.api.ir:443                    ehraz.io:443
```

**قاعده:** یک سرویس APISIX فقط یک‌ست پلاگین دارد؛ چون هر ارائه‌دهنده proxy-rewrite متفاوت دارد (regex و توکن جدا)، پلاگین اختصاصی هر ارائه‌دهنده در **سطح روت** است. هیچ روتی حذف یا تغییر مسیر نداده — فقط `service_id` و upstream/پلاگین‌ها جابه‌جا شده‌اند.

۳ روت قدیمی مستقل (`1`، `movihouse`، `movtihouse`) که از قبل هیچ سرویسی نداشتند، دست‌نخورده ماندند تا رفتارشان تغییر نکند.

**سرویس‌های ارائه‌دهنده هم موجود و مستقل‌اند:** پنج سرویس `zohal`، `apiir`، `ehraz`، `media-svc` و `svc-movtihouse` با کانفیگ کامل اصلی‌شان (upstream + پلاگین‌های خودشان) بازسازی شده‌اند. چون در APISIX هر روت فقط می‌تواند به یک سرویس وصل باشد، مسیرهای فعلی از طریق CITIBIG-GATEWAY سرو می‌شوند؛ اگر روزی خواستید روت‌های یک ارائه‌دهنده به سرویس مستقل خودش برگردند، فقط کافی است `service_id` روت‌هایش تغییر کند (پلاگین‌ها از قبل در سرویس موجودند) — تغییر یک‌خطی برای هر روت.

## ۲. ارائه‌دهنده‌های موجود در CITIBIG-GATEWAY

| ارائه‌دهنده | پیشوند مسیر | upstream | هدر تزریقی (سطح روت) | تعداد روت | کلید گیت‌وی |
|---|---|---|---|---|---|
| Zohal | `/services/...` | `zohal` → service.zohal.io:443 | `Authorization: Bearer 455748a1...` | 37 | `455748a161c9547d58c7bf67867c173b94aa8d11` |
| api.ir | `/apiir/...` | `apiir` → s.api.ir:443 | `Authorization: Bearer PqWb3/...` (توکن نمونه — فقط Sandbox) | 67 | `APIIR_KEY_2026` |
| Ehraz | `/ehraz/...` | `ehraz` → ehraz.io:443 | `Authorization: Token YOUR_API_TOKEN` (placeholder — نیاز به توکن واقعی) | 33 | `EHRAZ_KEY_2026` |
| Media | مسیرهای مستقل movies-*/series-* | inline `2.144.22.190:3000` | — (proxy-rewrite روت‌سطحی از قبل) | 5 | همه کلیدها |
| Movtihouse | `/mov-svc/...` | `postgrest` | — (proxy-rewrite + cors روت‌سطحی) | 1 | همه کلیدها |

جمع: **۱۴۳ روت** روی CITIBIG-GATEWAY (+ ۳ روت مستقل خارج از سرویس)

## ۳. احراز هویت گیت‌وی (key-auth)

پلاگین `key-auth` روی سرویس واحد است و چون key-auth مصرف‌کننده‌محور است، **همه کلیدهای موجود روی همه مسیرها کار می‌کنند** (این از قبل هم همین‌طور بود — هیچ تغییر رفتاری رخ نداده):

| Consumer | کلید |
|---|---|
| `zohal` | `455748a161c9547d58c7bf67867c173b94aa8d11` |
| `apiir` | `APIIR_KEY_2026` |
| `ehraz` | `EHRAZ_KEY_2026` |
| `movtihouse` | `MOVTIHOUSE_KEY_2026` |
| `apiuser` / `demo_user` | `MY_API_KEY_123` |

ساخت کلید جدید:

```bash
curl -s -X PUT "$ADMIN/consumers/<نام>" -H "$XAPI" -H "Content-Type: application/json" \
  -d '{"username":"<نام>","plugins":{"key-auth":{"key":"<کلید-جدید>"}}}'
```

## ۴. نمونه فراخوانی هر ارائه‌دهنده

```bash
# Zohal — هدر Host سمت کلاینت الزامی است (رفع‌شدهٔ مشکل X-Forwarded-Host)
curl -X POST http://2.144.22.190:9080/services/inquiry/bill/electricity \
  -H "apikey: 455748a161c9547d58c7bf67867c173b94aa8d11" \
  -H "Host: service.zohal.io" \
  -H "Content-Type: application/json" \
  -d '{"billIdentifier":"..."}'

# api.ir — Sandbox با توکن نمونه کار می‌کند؛ سرویس‌های واقعی کلید پنل می‌خواهند
curl -X POST http://2.144.22.190:9080/apiir/Sandbox/Echo \
  -H "apikey: APIIR_KEY_2026" \
  -H "Content-Type: application/json" \
  -d '{"name":"test"}'

# Ehraz — تا ثبت توکن واقعی، پاسخ 401 خود ehraz یعنی زنجیره سالم است
curl -X POST http://2.144.22.190:9080/ehraz/info/iban-info \
  -H "apikey: EHRAZ_KEY_2026" \
  -H "Content-Type: application/json" \
  -d '{"value":"IR062960000000100324200001"}'
```

## ۵. مدیریت

### جایگزینی توکن یک ارائه‌دهنده (توکن‌ها حالا روت‌سطح هستند)
```bash
export APISIX_ADMIN_KEY="<کلید Admin API>"   # از متغیر محیطی خوانده می‌شود، نه داخل اسکریپت
python3 citibig_update_token.py <upstream_id> "<مقدار کامل Authorization>"
# مثال‌ها:
python3 citibig_update_token.py ehraz "Token توکن-واقعی-از-پنل"
python3 citibig_update_token.py apiir "Bearer کلید-واقعی-از-پنل"
python3 citibig_update_token.py zohal "Bearer 455748a161c9547d58c7bf67867c173b94aa8d11"
```

### افزودن ارائه‌دهنده جدید
1. upstream بسازید (https + pass_host: node)
2. برای هر اندپوینت روت بسازید: `service_id: "CITIBIG-GATEWAY"` + `upstream_id` + پلاگین `proxy-rewrite` سطح روت (rewrite مسیر + تزریق توکن)
3. تست از طریق پورت 9080

### سایر دستورات
```bash
# مشاهده روت‌های یک ارائه‌دهنده (مثال ehraz)
curl -s "$ADMIN/routes" -H "$XAPI" | python3 -c "import json,sys; [print(i['value']['id']) for i in json.load(sys.stdin)['list'] if i['value'].get('upstream_id')=='ehraz']"

# حذف یک روت
curl -s -X DELETE "$ADMIN/routes/<route-id>" -H "$XAPI"
```

## ۶. عیب‌یابی

| خطا | معنی | راه‌حل |
|---|---|---|
| Missing/Invalid API key (401 گیت‌وی) | کلید گیت‌وی | هدر `apikey` با یکی از کلیدهای بخش ۳ |
| zohal 403 permission_denied | IP سرور در پنل زحل ثبت نشده | ثبت IP `2.144.22.190` در پنل زحل |
| api.ir 401 بک‌اند | توکن نمونه فقط Sandbox | کلید واقعی از پنل api.ir + تعویض با اسکریپت بخش ۵ |
| ehraz 401 بک‌اند | توکن placeholder | توکن واقعی از پنل ehraz.io + تعویض با اسکریپت بخش ۵ |
| 404 گیت‌وی | مسیر اشتباه | جداول روت‌ها در داکیومنت هر ارائه‌دهنده |
| خطای media/movtihouse | مشکل upstream داخلی | بررسی `2.144.22.190:3000` و سرویس postgrest |

## ۷. نگهداری

- **اسکریپت‌های راه‌اندازی اولیه**: `apiir_setup.sh` و `ehraz_setup.sh` — idempotent هستند و کانفیگ سرویس‌های مستقل `apiir` و `ehraz` را (که حالا موجودند) بازنویسی می‌کنند بدون تغییر رفتار. اسکریپت نصب zohal در این پوشه موجود نیست؛ روت‌های zohal زنده در APISIX هستند و در `apisix_state/routes_after.json` اسنپ‌شات شده‌اند.
- **اسکریپت مهاجرت:** `apisix_state/citibig_migrate.py` (ساخت سرویس واحد + انتقال پلاگین‌ها به سطح روت)
- **اسکریپت تعویض توکن:** `citibig_update_token.py` (کلید Admin API را از متغیر محیطی `APISIX_ADMIN_KEY` می‌خواند؛ URL هم با `APISIX_ADMIN_URL` قابل تغییر است و فقط مقصد عمومی http/https می‌پذیرد)
- **اسنپ‌شات وضعیت:** `apisix_state/*.json`
- **داکیومنت‌های تفصیلی هر ارائه‌دهنده** (جداول کامل روت‌ها، ورودی‌ها، فرمت پاسخ، عیب‌یابی اختصاصی): `apiir-apisix-docs.md`، `ehraz-apisix-docs.md` (داکیومنت اختصاصی zohal در این پوشه موجود نیست؛ اطلاعات اتصال zohal در بخش ۲ همین فایل است)
