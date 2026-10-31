# داکیومنت سرویس ehraz روی گیت‌وی APISIX

> نسخه: اکتبر ۲۰۲۶ — سرویس «ehraz» با **۳۳ وب‌سرویس** (۳۲ POST + ۱ GET) روی APISIX 3.17.0 مستقر شده است.
> منبع رسمی: [مستندات ehraz.io](https://ehraz.io/docs/) · Base URL بک‌اند: `https://ehraz.io/api/v1`

---

## ۱. معماری و جریان درخواست

```
کلاینت ──> APISIX (9080)                    سرویس «ehraz»                    ehraz.io
          POST http://2.144.22.190:9080
          /ehraz/info/iban-info
          هدر: apikey: EHRAZ_KEY_2026   ──>  1) key-auth: بررسی apikey
                                             2) proxy-rewrite:
                                                مسیر: /ehraz/(.*)  →  /api/v1/$1
                                                تزریق: Authorization: Token <کلید ehraz>
                                          ──>  3) upstream «ehraz»
                                              https://ehraz.io:443
                                              pass_host=node (Host: ehraz.io)
```

- مسیر گیت‌وی **آینهٔ مسیر بک‌اند** است: `/ehraz/info/iban-info` ← `/api/v1/info/iban-info`
- کلاینت **هیچ توکن ehraz را نمی‌فرستد**؛ فقط `apikey` گیت‌وی. تزریق توکن خودکار است.
- upstream با `pass_host: node` تنظیم شده و همیشه `Host: ehraz.io` ارسال می‌شود.

## ۲. اطلاعات اتصال

| مورد | مقدار |
|---|---|
| Base URL گیت‌وی | `http://2.144.22.190:9080` |
| پیشوند همه روت‌ها | `/ehraz/...` |
| هدر احراز گیت‌وی (الزامی) | `apikey: EHRAZ_KEY_2026` |
| Consumer گیت‌وی | `ehraz` |
| توکن سمت ehraz (تزریق خودکار) | `Token YOUR_API_TOKEN` — **فعلاً placeholder است!** |
| Admin API | `http://2.144.22.190:8005/apisix/admin` با هدر `X-API-Key: edd1c9f034335f136f87ad84b625c8f1` |

> ⚠️ **مهم — توکن واقعی ehraz هنوز تنظیم نشده.** شما توکنی ارائه نکردید، پس هدر تزریق‌شده فعلاً مقدار placeholder `Token YOUR_API_TOKEN` دارد. همه اجزای گیت‌وی (روت‌ها، rewrite، key-auth) تست شده و کار می‌کنند؛ بک‌اند ehraz پاسخ 401 می‌دهد تا وقتی توکن واقعی جایگزین شود (بخش ۸).
> توکن را از پنل [ehraz.io](https://ehraz.io) دریافت کنید (توکن کامل فقط هنگام ساخت/بازسازی نمایش داده می‌شود). توجه: ehraz پشتیبانی اختیاری از **محدودیت IP** روی توکن دارد — در صورت فعال‌سازی، IP سرور گیت‌وی (`2.144.22.190`) را در پنل ثبت کنید.

## ۳. اجزای ساخته‌شده در APISIX

### Upstream
```json
{
  "name": "ehraz",
  "desc": "Ehraz.io web services (ehraz.io)",
  "scheme": "https",
  "type": "roundrobin",
  "pass_host": "node",
  "nodes": { "ehraz.io:443": 1 }
}
```

### Service
```json
{
  "name": "ehraz",
  "upstream_id": "ehraz",
  "plugins": {
    "proxy-rewrite": {
      "regex_uri": ["^/ehraz/(.*)$", "/api/v1/$1"],
      "headers": { "set": { "Authorization": "Token <توکن واقعی ehraz>" } }
    },
    "key-auth": {}
  }
}
```

### Consumer
```json
{
  "username": "ehraz",
  "desc": "Ehraz gateway client key",
  "plugins": { "key-auth": { "key": "EHRAZ_KEY_2026" } }
}
```

### الگوی روت‌ها (هر ۳۳ روت بدون پلاگین — از سرویس ارث می‌برند)
```json
{ "name": "ehraz-info-iban-info", "id": "ehraz-info-iban-info", "uris": ["/ehraz/info/iban-info"], "methods": ["POST"], "service_id": "ehraz" }
```

## ۴. فرمت پاسخ ehraz

- **پاسخ موفق:** آبجکت داده مستقیم برمی‌گردد (بدون wrapper)، مثال تبدیل حساب به شبا:
```json
{
  "number": "1234567890",
  "ibanInfo": { "iban": "IR062960000000100324200001", "bank": "MELI", "depositNumber": "1234567890" }
}
```
- **خطا:** `{"code": "...", "message": "..."}` با HTTP status متناظر.

**کدهای خطای ehraz:**

| code | معنی |
|---|---|
| 0 | درخواست پردازش شده؛ ساختار نتیجه را بررسی کنید |
| 1 | بدنه درخواست ناقص یا نامعتبر |
| 2 | بدنه درخواست خالی است |
| 3 | دامنه یا سرویس برای حساب معتبر نیست |
| 5 | دسترسی دامنه فعال نیست یا مجاز نیست |
| 6 | موجودی کیف پول کافی نیست |
| 7 | درخواست باید HTTPS باشد |
| 9 | سرویس موقتاً پاسخگو نیست |
| 401 | توکن نامعتبر، غیرفعال یا محدودیت IP |
| 27 | مسیر قابل استفاده نیست |

## ۵. فهرست کامل ۳۳ روت (بر اساس دسته)

### حساب و کیف پول (۱)

| نام | مسیر گیت‌وی | متد | ورودی‌های بدنه | توضیح |
|---|---|---|---|---|
| `ehraz-account-wallet-balance` | `/ehraz/account/wallet-balance` | GET | — | موجودی کیف پول |

### اطلاعات بانکی (۱۱)

| نام | مسیر گیت‌وی | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| `ehraz-convert-deposit-number-to-iban` | `/ehraz/convert/deposit-number-to-iban` | POST | `bank` (string)، `number` (string) | تبدیل شماره حساب به شبا |
| `ehraz-info-iban-info` | `/ehraz/info/iban-info` | POST | `value` (string) | استعلام شبا |
| `ehraz-info-card-info` | `/ehraz/info/card-info` | POST | `number` (string) | استعلام کارت |
| `ehraz-convert-card-to-deposit-number` | `/ehraz/convert/card-to-deposit-number` | POST | `number` (string) | تبدیل کارت به حساب |
| `ehraz-convert-card-to-iban` | `/ehraz/convert/card-to-iban` | POST | `number` (string) | تبدیل کارت به شبا |
| `ehraz-match-iban-with-national` | `/ehraz/match/iban-with-national` | POST | `iban`، `nationalCode`، `birthDate` (string) | همخوانی کدملی با شبا |
| `ehraz-match-iban-with-name` | `/ehraz/match/iban-with-name` | POST | `iban`، `name` (string) | همخوانی نام با شبا |
| `ehraz-match-card-with-name` | `/ehraz/match/card-with-name` | POST | `cardNumber`، `name` (string) | همخوانی نام با کارت |
| `ehraz-match-deposit-number-with-name` | `/ehraz/match/deposit-number-with-name` | POST | `bank`، `depositNumber`، `name` (string) | همخوانی نام با حساب |
| `ehraz-match-card-with-national` | `/ehraz/match/card-with-national` | POST | `cardNumber`، `nationalCode`، `birthDate` (string) | همخوانی کدملی با کارت |
| `ehraz-match-iban-with-legal-national` | `/ehraz/match/iban-with-legal-national` | POST | `iban`، `legalNationalCode` (string) | تطبیق شبا و شناسه ملی حقوقی |

### هویتی (۷)

| نام | مسیر گیت‌وی | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| `ehraz-match-national-with-mobile` | `/ehraz/match/national-with-mobile` | POST | `nationalCode`، `mobileNumber` (string) | همخوانی موبایل با کدملی (شاهکار) |
| `ehraz-info-identity-info` | `/ehraz/info/identity-info` | POST | `nationalCode`، `birthDate` (string) | ثبت احوال کامل |
| `ehraz-info-identity-similarity` | `/ehraz/info/identity-similarity` | POST | `nationalCode`، `birthDate`، `firstName`، `lastName`، `fullName`، `fatherName` (string) | ثبت احوال مقایسه‌ای (تطبیق هویتی) |
| `ehraz-match-deposit-number-with-national` | `/ehraz/match/deposit-number-with-national` | POST | `bank`، `depositNumber`، `nationalCode`، `birthDate` (string) | همخوانی کدملی با حساب |
| `ehraz-info-foreigner-identity-info` | `/ehraz/info/foreigner-identity-info` | POST | `fida` (string) | استعلام اطلاعات اتباع خارجی |
| `ehraz-info-military-service-status` | `/ehraz/info/military-service-status` | POST | `nationalCode` (string) | استعلام وضعیت نظام وظیفه |
| `ehraz-info-sana-status` | `/ehraz/info/sana-status` | POST | `nationalCode`، `mobileNumber` (string) | استعلام وضعیت ثنا |

### خدماتی (۳)

| نام | مسیر گیت‌وی | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| `ehraz-info-address-info` | `/ehraz/info/address-info` | POST | `code` (string) | استعلام کد پستی |
| `ehraz-info-postal-coordinates` | `/ehraz/info/postal-coordinates` | POST | `code` (string) | استعلام مختصات کد پستی |
| `ehraz-info-corporation-identity-info` | `/ehraz/info/corporation-identity-info` | POST | `code` (string) | استعلام اطلاعات صنفی |

### اشخاص حقوقی (۸)

| نام | مسیر گیت‌وی | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| `ehraz-legal-company-info` | `/ehraz/legal/company-info` | POST | `nationalCode` (string) | اطلاعات حقوقی شرکت |
| `ehraz-legal-certificates` | `/ehraz/legal/certificates` | POST | `nationalCode` (string) | مجوزهای شرکت |
| `ehraz-legal-parents` | `/ehraz/legal/parents` | POST | `nationalCode` (string) | شرکت‌های مادر |
| `ehraz-legal-children` | `/ehraz/legal/children` | POST | `nationalCode` (string) | شرکت‌های زیرمجموعه |
| `ehraz-legal-ceo` | `/ehraz/legal/ceo` | POST | `nationalCode` (string) | مدیرعامل شرکت |
| `ehraz-legal-members` | `/ehraz/legal/members` | POST | `nationalCode` (string) | اعضای شرکت |
| `ehraz-legal-sign-holders` | `/ehraz/legal/sign-holders` | POST | `nationalCode` (string) | امضاداران شرکت |
| `ehraz-legal-official-gazette` | `/ehraz/legal/official-gazette` | POST | `nationalCode` (string) | روزنامه رسمی / آگهی‌های شرکت |

### چک (۳)

| نام | مسیر گیت‌وی | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| `ehraz-info-cheque-info` | `/ehraz/info/cheque-info` | POST | `nationalCode`، `sayadId` (string) | استعلام چک صیادی |
| `ehraz-cheque-bounced-otp` | `/ehraz/cheque/bounced/otp` | POST | `nationalCode`، `mobileNumber` (string) | درخواست رمز استعلام چک برگشتی |
| `ehraz-cheque-bounced-count` | `/ehraz/cheque/bounced/count` | POST | `nationalCode`، `mobileNumber`، `otpCode`، `referenceCode` (string) | تعداد چک‌های برگشتی (پس از دریافت رمز از ep-bounced-otp) |

## ۶. نمونه فراخوانی

### تست ساختار (پاسخ 401 بک‌اند = زنجیره سالم است)
```bash
curl -X POST http://2.144.22.190:9080/ehraz/info/iban-info \
  -H "apikey: EHRAZ_KEY_2026" \
  -H "Content-Type: application/json" \
  -d '{"iban":"IR062960000000100324200001"}'
# پاسخ فعلی: {"code":"401","message":"Authentication credentials are missing or invalid."}
```

### پس از جایگزینی توکن واقعی
```bash
# استعلام شبا
curl -X POST http://2.144.22.190:9080/ehraz/info/iban-info \
  -H "apikey: EHRAZ_KEY_2026" \
  -H "Content-Type: application/json" \
  -d '{"value":"IR062960000000100324200001"}'

# موجودی کیف پول
curl http://2.144.22.190:9080/ehraz/account/wallet-balance \
  -H "apikey: EHRAZ_KEY_2026"
```

## ۷. عیب‌یابی

| خطا | معنی | راه‌حل |
|---|---|---|
| `{"message":"Missing API key in request"}` (401 گیت‌وی) | هدر apikey فرستاده نشده | هدر `apikey: EHRAZ_KEY_2026` را اضافه کنید |
| `{"message":"Invalid API key in request"}` (401 گیت‌وی) | apikey اشتباه | مقدار هدر را بررسی کنید |
| `{"code":"401","message":"Authentication credentials are missing or invalid."}` (401 بک‌اند) | توکن placeholder هنوز جایگزین نشده یا توکن نامعتبر است | طبق بخش ۸ توکن واقعی ehraz را PATCH کنید |
| `{"code":"6",...}` | موجودی کیف پول ehraz کافی نیست | کیف پول ehraz را شارژ کنید |
| `{"code":"3"/"5",...}` | سرویس/دامنه فعال نیست | وضعیت کسب‌وکار و سرویس‌ها را در پنل ehraz بررسی کنید |
| `{"code":"1"/"2",...}` | بدنه ناقص/خالی | فیلدهای الزامی جدول بخش ۵ را بفرستید |
| 404 از گیت‌وی | مسیر اشتباه | دقیقاً مطابق جدول: `/ehraz/<category>/<name>` |

## ۸. مدیریت با Admin API

```bash
ADMIN="http://2.144.22.190:8005/apisix/admin"
XAPI="X-API-Key: edd1c9f034335f136f87ad84b625c8f1"

# مشاهده همه روت‌های ehraz
curl -s "$ADMIN/routes" -H "$XAPI" | python3 -c "import json,sys; [print(i['value']['name'], i['value']['uris'][0]) for i in json.load(sys.stdin)['list'] if i['value'].get('name','').startswith('ehraz-')]"

# ⟵ جایگزینی توکن واقعی ehraz (فقط همین یک دستور برای همه ۳۳ روت):
curl -s -X PATCH "$ADMIN/services/ehraz" -H "$XAPI" -H "Content-Type: application/json" \
  -d '{"plugins":{"proxy-rewrite":{"regex_uri":["^/ehraz/(.*)$","/api/v1/$1"],"headers":{"set":{"Authorization":"Token توکن-واقعی-شما"}}},"key-auth":{}}}'

# تغییر کلید گیت‌وی (apikey کلاینت‌ها)
curl -s -X PATCH "$ADMIN/consumers/ehraz" -H "$XAPI" -H "Content-Type: application/json" \
  -d '{"plugins":{"key-auth":{"key":"کلید-جدید"}}}'

# افزودن روت جدید
curl -s -X PUT "$ADMIN/routes/ehraz-new-route" -H "$XAPI" -H "Content-Type: application/json" \
  -d '{"name":"ehraz-new-route","id":"ehraz-new-route","uris":["/ehraz/new/route"],"methods":["POST"],"service_id":"ehraz"}'

# حذف یک روت
curl -s -X DELETE "$ADMIN/routes/ehraz-info-address-info" -H "$XAPI"
```

## ۹. نکات نگهداری

- بازسازی کامل از صفر: `bash ehraz_setup.sh` (idempotent — اجرای مکرر بی‌ضرر است)
- فایل‌های مرتبط: `ehraz_setup.sh` (نصب)، `apisix_state/ehraz_docs.html` (داکیومنت خام)، `apisix_state/ehraz_endpoints.json` (متادیتای ۳۳ اندپوینت با پارامترها)
- مسیر هر روت = مسیر بک‌اند منهای `/api/v1/` به‌علاوهٔ `/ehraz/`؛ نام روت APISIX = `ehraz-` + مسیر با خط تیره
- سرویس‌ها پولی‌اند و از کیف پول ehraz کسر می‌شود؛ `key-auth` گیت‌وی را حذف نکنید.
- احراز هویت ehraz از نوع **Token auth** است (`Authorization: Token ...`) — برخلاف Bearer؛ در PATCH حتماً پیشوند `Token ` را نگه دارید.
