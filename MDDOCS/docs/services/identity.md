# :material-badge-account: سرویس‌های هویتی

استعلام و تطبیق اطلاعات هویتی اشخاص حقیقی — از شاهکار و ثبت احوال تا احراز هویت ویدئویی.

!!! note "دربارهٔ نمونه‌های فراخوانی"

    در همهٔ نمونه‌ها متد (GET/POST) صریح ذکر شده و **بدنهٔ درخواست (body) عمداً درج نشده است** — طبق ستون «ورودی‌های الزامی»، بدنهٔ JSON بعداً به هر کرل اضافه می‌شود.

## خانوادهٔ api.ir (پیشوند `/apiir/sw1/`)

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| شاهکار | `/apiir/sw1/Shahkar` | POST | `nationalCode`، `mobile`، `isCompany` | تطبیق موبایل با کد ملی |
| شاهکار Lite | `/apiir/sw1/ShahkarLite` | POST | `nationalCode`، `mobile` | تطبیق موبایل با کد ملی — نسخهٔ سبک |
| شاهکار Pro | `/apiir/sw1/ShahkarPro` | POST | `nationalCode`، `mobile`، `isCompany` | تطبیق موبایل با کد ملی — نسخهٔ کامل |
| مشخصات هویتی | `/apiir/sw1/PersonInfo` | POST | `nationalCode`، `birthDate` | استعلام مشخصات هویتی |
| مشخصات هویتی ۲ | `/apiir/sw1/PersonData` | POST | `nationalCode`، `birthDate` | استعلام مشخصات هویتی — نسخهٔ ۲ |
| ثنا | `/apiir/sw1/Sana` | POST | `nationalCode`، `isCompany` | استعلام وضعیت ثنا |
| نظام وظیفه | `/apiir/sw1/MilitaryStatus` | POST | `nationalCode`، `birthDate` | استعلام وضعیت خدمت سربازی |
| اتباع | `/apiir/sw1/NationalityStatus` | POST | `code`، `codeType` | استعلام وضعیت اتباع |
| پاسپورت | `/apiir/sw1/PassportStatus` | POST | `nationalCode`، `mobile` | استعلام وضعیت پاسپورت |
| احراز ویدئویی | `/apiir/sw1/VideoVerify` | POST | `nationalCode`، `birthDate`، `serialNumber`، `videoBase64`، `speechText` (+ آستانه‌های اختیاری) | احراز هویت ویدئویی بایومتریک |
| VideoVerifySpeechText | `/apiir/sw1/VideoVerifySpeechText` | POST | — | متن گفتار احراز ویدئویی |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# شاهکار — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/Shahkar" -H "apikey: YOUR_API_KEY"

# شاهکار Lite — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/ShahkarLite" -H "apikey: YOUR_API_KEY"

# شاهکار Pro — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/ShahkarPro" -H "apikey: YOUR_API_KEY"

# مشخصات هویتی — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/PersonInfo" -H "apikey: YOUR_API_KEY"

# مشخصات هویتی ۲ — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/PersonData" -H "apikey: YOUR_API_KEY"

# ثنا — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/Sana" -H "apikey: YOUR_API_KEY"

# نظام وظیفه — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/MilitaryStatus" -H "apikey: YOUR_API_KEY"

# اتباع — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/NationalityStatus" -H "apikey: YOUR_API_KEY"

# پاسپورت — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/PassportStatus" -H "apikey: YOUR_API_KEY"

# احراز ویدئویی — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/VideoVerify" -H "apikey: YOUR_API_KEY"

# VideoVerifySpeechText — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/VideoVerifySpeechText" -H "apikey: YOUR_API_KEY"
```

## خانوادهٔ Ehraz (پیشوند `/ehraz/`)

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| ثبت احوال کامل | `/ehraz/info/identity-info` | POST | `nationalCode`، `birthDate` | استعلام کامل مشخصات هویتی |
| ثبت احوال مقایسه‌ای | `/ehraz/info/identity-similarity` | POST | `nationalCode`، `birthDate`، `firstName`، `lastName`، `fullName`، `fatherName` | تطبیق هویتی مقایسه‌ای |
| اتباع خارجی | `/ehraz/info/foreigner-identity-info` | POST | `fida` | استعلام اطلاعات اتباع خارجی |
| نظام وظیفه | `/ehraz/info/military-service-status` | POST | `nationalCode` | استعلام وضعیت نظام وظیفه |
| ثنا | `/ehraz/info/sana-status` | POST | `nationalCode`، `mobileNumber` | استعلام وضعیت ثنا |
| شاهکار | `/ehraz/match/national-with-mobile` | POST | `nationalCode`، `mobileNumber` | تطبیق موبایل با کدملی |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# ثبت احوال کامل — POST
curl -X POST "http://2.144.22.190:9080/ehraz/info/identity-info" -H "apikey: YOUR_API_KEY"

# ثبت احوال مقایسه‌ای — POST
curl -X POST "http://2.144.22.190:9080/ehraz/info/identity-similarity" -H "apikey: YOUR_API_KEY"

# اتباع خارجی — POST
curl -X POST "http://2.144.22.190:9080/ehraz/info/foreigner-identity-info" -H "apikey: YOUR_API_KEY"

# نظام وظیفه — POST
curl -X POST "http://2.144.22.190:9080/ehraz/info/military-service-status" -H "apikey: YOUR_API_KEY"

# ثنا — POST
curl -X POST "http://2.144.22.190:9080/ehraz/info/sana-status" -H "apikey: YOUR_API_KEY"

# شاهکار — POST
curl -X POST "http://2.144.22.190:9080/ehraz/match/national-with-mobile" -H "apikey: YOUR_API_KEY"
```

## خانوادهٔ زحل (پیشوند `/services/`)

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| شاهکار | `/services/inquiry/shahkar` | POST | `nationalCode`، `mobile` | تطبیق موبایل با کدملی |
| هویتی (ثبت احوال) | `/services/inquiry/national_identity_inquiry` | POST | `nationalCode`، `birthDate` | استعلام مشخصات هویتی |
| OCR کارت ملی | `/services/inquiry/national_card_ocr` | POST | تصویر کارت ملی | استخراج اطلاعات کارت ملی از تصویر |
| احراز ویدئویی — آپلود | `/services/biometric/media` | POST | مدارک و ویدیو | آپلود مدارک احراز هویت ویدئویی |
| احراز ویدئویی — زنده‌بودگی | `/services/biometric/session/liveness` | POST | شناسهٔ جلسه | بررسی زنده‌بودگی (Liveness) |
| احراز ویدئویی — نتیجه | `/services/biometric/session/*` | GET | شناسهٔ جلسه | دریافت نتیجهٔ جلسه |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# شاهکار — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/shahkar" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# هویتی (ثبت احوال) — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/national_identity_inquiry" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# OCR کارت ملی — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/national_card_ocr" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# احراز ویدئویی — آپلود — POST
curl -X POST "http://2.144.22.190:9080/services/biometric/media" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# احراز ویدئویی — زنده‌بودگی — POST
curl -X POST "http://2.144.22.190:9080/services/biometric/session/liveness" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# احراز ویدئویی — نتیجه — GET
curl -X GET "http://2.144.22.190:9080/services/biometric/session/{sessionId}" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"
```

!!! note "جریان احراز هویت ویدئویی"

    ترتیب فراخوانی: **آپلود** (`media`) ← **زنده‌بودگی** (`liveness`) ← **نتیجه** (`session result`).

!!! note "هدر Host برای خانوادهٔ زحل (پیشوند `/services/`)"

    درخواست‌های این خانواده باید هدر `Host: service.zohal.io` را نیز داشته باشند (پاسخ 400 بدون آن) — در نمونه‌های بالا لحاظ شده است.
