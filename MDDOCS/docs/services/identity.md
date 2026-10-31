# :material-badge-account: سرویس‌های هویتی

استعلام و تطبیق اطلاعات هویتی اشخاص حقیقی — از شاهکار و ثبت احوال تا احراز هویت ویدئویی. قالب پاسخ هر خانواده در [کدهای پاسخ و خطا](../errors.md) مستند است.

## خانوادهٔ `/apiir/sw1/` (POST)

| سرویس | مسیر | ورودی‌های الزامی | توضیح |
|---|---|---|---|
| شاهکار | `/apiir/sw1/Shahkar` | `nationalCode`، `mobile`، `isCompany` | تطبیق موبایل با کد ملی |
| شاهکار Lite | `/apiir/sw1/ShahkarLite` | `nationalCode`، `mobile` | تطبیق موبایل با کد ملی — نسخهٔ سبک |
| شاهکار Pro | `/apiir/sw1/ShahkarPro` | `nationalCode`، `mobile`، `isCompany` | تطبیق موبایل با کد ملی — نسخهٔ کامل |
| مشخصات هویتی | `/apiir/sw1/PersonInfo` | `nationalCode`، `birthDate` | استعلام مشخصات هویتی |
| مشخصات هویتی ۲ | `/apiir/sw1/PersonData` | `nationalCode` `birthDate` | استعلام مشخصات هویتی — نسخهٔ ۲ |
| ثنا | `/apiir/sw1/Sana` | `nationalCode`، `isCompany` | استعلام وضعیت ثنا |
| نظام وظیفه | `/apiir/sw1/MilitaryStatus` | `nationalCode`، `birthDate` | استعلام وضعیت خدمت سربازی |
| اتباع | `/apiir/sw1/NationalityStatus` | `code`، `codeType` | استعلام وضعیت اتباع |
| پاسپورت | `/apiir/sw1/PassportStatus` | `nationalCode`، `mobile` | استعلام وضعیت پاسپورت |
| احراز ویدئویی | `/apiir/sw1/VideoVerify` | `nationalCode`، `birthDate`، `serialNumber`، `videoBase64`، `speechText` (+ آستانه‌های اختیاری) | احراز هویت ویدئویی بایومتریک |
| VideoVerifySpeechText | `/apiir/sw1/VideoVerifySpeechText` | — | متن گفتار احراز ویدئویی |

## خانوادهٔ `/ehraz/` (POST)

| سرویس | مسیر | ورودی‌های الزامی | توضیح |
|---|---|---|---|
| ثبت احوال کامل | `/ehraz/info/identity-info` | `nationalCode`، `birthDate` | استعلام کامل مشخصات هویتی |
| ثبت احوال مقایسه‌ای | `/ehraz/info/identity-similarity` | `nationalCode`، `birthDate`، `firstName`، `lastName`، `fullName`، `fatherName` | تطبیق هویتی مقایسه‌ای |
| اتباع خارجی | `/ehraz/info/foreigner-identity-info` | `fida` | استعلام اطلاعات اتباع خارجی |
| نظام وظیفه | `/ehraz/info/military-service-status` | `nationalCode` | استعلام وضعیت نظام وظیفه |
| ثنا | `/ehraz/info/sana-status` | `nationalCode`، `mobileNumber` | استعلام وضعیت ثنا |
| شاهکار | `/ehraz/match/national-with-mobile` | `nationalCode`، `mobileNumber` | تطبیق موبایل با کدملی |

## خانوادهٔ `/services/` (POST)

| سرویس | مسیر | ورودی‌های الزامی | توضیح |
|---|---|---|---|
| شاهکار | `/services/inquiry/shahkar` | `nationalCode`، `mobile` | تطبیق موبایل با کدملی |
| هویتی (ثبت احوال) | `/services/inquiry/national_identity_inquiry` | `nationalCode`، `birthDate` | استعلام مشخصات هویتی |
| OCR کارت ملی | `/services/inquiry/national_card_ocr` | تصویر کارت ملی | استخراج اطلاعات کارت ملی از تصویر |
| احراز ویدئویی — آپلود | `/services/biometric/media` | مدارک و ویدیو | آپلود مدارک احراز هویت ویدئویی |
| احراز ویدئویی — زنده‌بودگی | `/services/biometric/session/liveness` | شناسهٔ جلسه | بررسی زنده‌بودگی (Liveness) |
| احراز ویدئویی — نتیجه | `/services/biometric/session/*` | شناسهٔ جلسه | دریافت نتیجهٔ جلسه (GET) |

!!! note "جریان احراز هویت ویدئویی"

    ترتیب فراخوانی: **آپلود** (`media`) ← **زنده‌بودگی** (`liveness`) ← **نتیجه** (`session result`).

!!! note "هدر Host برای خانوادهٔ `/services/`"

    درخواست‌های این خانواده باید هدر `Host: service.zohal.io` را نیز داشته باشند (پاسخ 400 بدون آن).
