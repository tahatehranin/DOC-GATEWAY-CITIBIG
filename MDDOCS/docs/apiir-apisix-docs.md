# داکیومنت سرویس api.ir روی گیت‌وی APISIX

> 📌 **به‌روزرسانی معماری (اکتبر ۲۰۲۶):** تمام روت‌های این سرویس در سرویس جامع **CITIBIG-GATEWAY** نیز در دسترس‌اند (پلاگین‌ها در سطح روت). سرویس مستقل `apiir` هم با کانفیگ کامل (upstream + proxy-rewrite + key-auth) موجود است؛ مسیرهای فعلی از طریق CITIBIG-GATEWAY سرو می‌شوند و برای برگرداندن روت‌ها به این سرویس فقط تغییر `service_id` کافی است. اطلاعات مدیریتی: [citibig-gateway-apisix-docs.md](citibig-gateway-apisix-docs.md).

> نسخه: اکتبر ۲۰۲۶ — سرویس «apiir» با **۶۷ وب‌سرویس** (همه POST) روی APISIX 3.17.0 مستقر شده است.
> منابع رسمی: [Scalar](https://s.api.ir/scalar/v1) · [Swagger](https://s.api.ir/swagger/index.html) · [Postman](https://documenter.getpostman.com/view/40733477/2sBYB1N8Dv) · OpenAPI: `https://s.api.ir/swagger/v1/swagger.json`

---

## ۱. معماری و جریان درخواست

```
کلاینت ──> APISIX (9080)                    سرویس «apiir»                    api.ir
          POST http://2.144.22.190:9080
          /apiir/sw1/MyIP
          هدر: apikey: APIIR_KEY_2026   ──>  1) key-auth: بررسی apikey
                                             2) proxy-rewrite:
                                                مسیر: /apiir/(.*)  →  /api/$1
                                                تزریق: Authorization: Bearer <کلید api.ir>
                                          ──>  3) upstream «apiir»
                                              https://s.api.ir:443
                                              pass_host=node (Host: s.api.ir)
```

- مسیر گیت‌وی **آینهٔ مسیر بک‌اند** است: `/apiir/sw1/ActiveLoans` ← `/api/sw1/ActiveLoans`
- کلاینت **هیچ توکن api.ir را نمی‌فرستد**؛ فقط `apikey` گیت‌وی. تزریق توکن خودکار است.
- مشکل Host مثل zohal وجود ندارد چون upstream با `pass_host: node` تنظیم شده و همیشه `Host: s.api.ir` ارسال می‌شود.

## ۲. اطلاعات اتصال

| مورد | مقدار |
|---|---|
| Base URL گیت‌وی | `http://2.144.22.190:9080` |
| پیشوند همه روت‌ها | `/apiir/...` |
| هدر احراز گیت‌وی (الزامی) | `apikey: APIIR_KEY_2026` |
| Consumer گیت‌وی | `apiir` |
| توکن سمت api.ir (تزریق خودکار) | `Bearer PqWb3/x0Abl7ZlZrUSdKSy6/HAPZbltO77tMBt2wPct6pUvdLE00bsZR0B6lv/FnVodS/ZPJ28WZITsPqqHXoYsIxz1hu9z5nU0RNa6tqUc=` |
| Admin API | `http://2.144.22.190:8005/apisix/admin` با هدر `X-API-Key: edd1c9f034335f136f87ad84b625c8f1` |

> ⚠️ **مهم — توکن فعلی، توکن «نمونه» خود داکیومنت api.ir است** و فقط برای `Sandbox/Echo` جواب می‌دهد؛ سرویس‌های واقعی (`/apiir/sw1/...`) از سمت api.ir خطای 401 می‌دهند.
> برای مصرف واقعی: در پنل [api.ir](https://api.ir) از منوی «برنامه نویسان → کلید apikey» یک کلید تولید کنید و طبق بخش ۸ جایگزین کنید. (تست مستقیم با این توکن روی MyIP هم 401 داد؛ یعنی محدودیت سمت api.ir است نه گیت‌وی.)

## ۳. اجزای ساخته‌شده در APISIX

### Upstream
```json
{
  "name": "apiir",
  "desc": "api.ir web services (s.api.ir)",
  "scheme": "https",
  "type": "roundrobin",
  "pass_host": "node",
  "nodes": { "s.api.ir:443": 1 }
}
```

### Service
```json
{
  "name": "apiir",
  "upstream_id": "apiir",
  "plugins": {
    "proxy-rewrite": {
      "regex_uri": ["^/apiir/(.*)$", "/api/$1"],
      "headers": { "set": { "Authorization": "Bearer <کلید api.ir>" } }
    },
    "key-auth": {}
  }
}
```

### Consumer
```json
{
  "username": "apiir",
  "desc": "api.ir gateway client key",
  "plugins": { "key-auth": { "key": "APIIR_KEY_2026" } }
}
```

### الگوی روت‌ها (هر ۶۷ روت بدون پلاگین — از سرویس ارث می‌برند)
```json
{ "name": "apiir-MyIP", "id": "apiir-MyIP", "uris": ["/apiir/sw1/MyIP"], "methods": ["POST"], "service_id": "apiir" }
```

## ۴. فرمت پاسخ api.ir

```json
{ "data": {...}, "success": true, "code": 0, "message": "درخواست شما با موفقت انجام شد" }
```
- `success: true` + `code: 0` ← موفق
- `code: 400` → ورودی ناقص/نامعتبر (متن `message` نام فیلد را می‌گوید)
- `code: 401` → کلید api.ir نامعتبر یا بدون مجوز این سرویس
- `tokenStatus` در بعضی پاسخ‌ها: false یعنی کلید فعلی محدودیت دارد

## ۵. فهرست کامل ۶۷ روت (بر اساس دسته)

### تست و Sandbox

| نام | مسیر گیت‌وی | متد | ورودی‌های بدنه | توضیح |
|---|---|---|---|---|
| `Echo` | `/apiir/Sandbox/Echo` | POST | `name` (string, الزامی) | Echo |

### احراز هویت و استعلام هویتی

| نام | مسیر گیت‌وی | متد | ورودی‌های بدنه | توضیح |
|---|---|---|---|---|
| `Shahkar` | `/apiir/sw1/Shahkar` | POST | `nationalCode` (string, الزامی)، `mobile` (string, الزامی)، `isCompany` (boolean, الزامی) | احراز هویت شاهکار |
| `ShahkarLite` | `/apiir/sw1/ShahkarLite` | POST | `nationalCode` (string, الزامی)، `mobile` (string, الزامی) | احراز هویت شاهکار Lite |
| `ShahkarPro` | `/apiir/sw1/ShahkarPro` | POST | `nationalCode` (string, الزامی)، `mobile` (string, الزامی)، `isCompany` (boolean, الزامی) | احراز هویت شاهکار Pro |
| `PersonInfo` | `/apiir/sw1/PersonInfo` | POST | `nationalCode` (string, الزامی)، `birthDate` (string, الزامی) | استعلام مشخصات هویتی |
| `PersonData` | `/apiir/sw1/PersonData` | POST | `nationalCode` (string, الزامی)، `birthDate` (string, الزامی) | استعلام مشخصات هویتی 2 |
| `Sana` | `/apiir/sw1/Sana` | POST | `nationalCode` (string, الزامی)، `isCompany` (boolean, الزامی) | استعلام سامانه ثنا |
| `MilitaryStatus` | `/apiir/sw1/MilitaryStatus` | POST | `nationalCode` (string, الزامی)، `birthDate` (string, الزامی) | استعلام خدمت سربازی |
| `NationalityStatus` | `/apiir/sw1/NationalityStatus` | POST | `code` (string, الزامی)، `codeType` (integer, الزامی) | استعلام وضعیت اتباع |
| `PassportStatus` | `/apiir/sw1/PassportStatus` | POST | `nationalCode` (string, الزامی)، `mobile` (string, الزامی) | استعلام وضعیت پاسپورت |
| `VideoVerify` | `/apiir/sw1/VideoVerify` | POST | `nationalCode` (string, الزامی)، `birthDate` (string, الزامی)، `serialNumber` (string, الزامی)، `videoBase64` (string, الزامی)، `matchingThreshold` (integer, اختیاری)، `livenessThreshold` (integer, اختیاری)، `speechThreshold` (integer, اختیاری)، `speechText` (string, الزامی) | احراز ویدئویی بایومتریک |
| `VideoVerifySpeechText` | `/apiir/sw1/VideoVerifySpeechText` | POST | — | VideoVerifySpeechText |

### بانکی، کارت، شبا و چک

| نام | مسیر گیت‌وی | متد | ورودی‌های بدنه | توضیح |
|---|---|---|---|---|
| `CardMatch` | `/apiir/sw1/CardMatch` | POST | `nationalCode` (string, الزامی)، `birthDate` (string, الزامی)، `cardNumber` (string, الزامی) | تطبیق کد ملی با کارت بانکی |
| `CardMobileMatch` | `/apiir/sw1/CardMobileMatch` | POST | `mobile` (string, الزامی)، `cardNumber` (string, الزامی) | تطبیق کارت بانکی با موبایل |
| `IbanMatch` | `/apiir/sw1/IbanMatch` | POST | `nationalCode` (string, الزامی)، `birthDate` (string, الزامی)، `iban` (string, الزامی) | تطبیق کد ملی با شبا |
| `IbanMatchPro` | `/apiir/sw1/IbanMatchPro` | POST | `nationalCode` (string, الزامی)، `iban` (string, الزامی) | تطبیق کد ملی با شبا پرو (سیاح) |
| `CardInfo` | `/apiir/sw1/CardInfo` | POST | `cardNumber` (string, الزامی) | استعلام نام مالک کارت بانکی |
| `CardToIban` | `/apiir/sw1/CardToIban` | POST | `cardNumber` (string, الزامی) | سرویس تبدیل کارت به شبا |
| `IbanInfo` | `/apiir/sw1/IbanInfo` | POST | `iban` (string, الزامی) | استعلام نام دارنده شبا |
| `BankAccountInfo` | `/apiir/sw1/BankAccountInfo` | POST | `accountNumber` (string, الزامی)، `bankCode` (null/string, اختیاری) | استعلام شبا با شماره حساب |
| `BankCardInfo` | `/apiir/sw1/BankCardInfo` | POST | `cardNumber` (string, الزامی) | استعلام مشخصات کارت بانکی |
| `ActiveLoans` | `/apiir/sw1/ActiveLoans` | POST | `nationalCode` (string, الزامی) | استعلام تسهیلات فعال بانکی |
| `UnpaidCheque` | `/apiir/sw1/UnpaidCheque` | POST | `nationalCode` (string, الزامی) | استعلام تعداد چک برگشتی |
| `UnpaidChequeLite` | `/apiir/sw1/UnpaidChequeLite` | POST | `nationalCode` (string, الزامی) | استعلام تعداد چک برگشتی Lite |
| `UnpaidChequePro` | `/apiir/sw1/UnpaidChequePro` | POST | `nationalCode` (string, الزامی) | استعلام تعداد چک برگشتی پرو |
| `ChequeColor` | `/apiir/sw1/ChequeColor` | POST | `nationalCode` (string, الزامی)، `isCompany` (boolean, الزامی) | استعلام رنگ چک صیادی |
| `ChequeInfo` | `/apiir/sw1/ChequeInfo` | POST | `chequeID` (string, الزامی) | استعلام مشخصات چک صیادی |

### خودرو و گواهینامه

| نام | مسیر گیت‌وی | متد | ورودی‌های بدنه | توضیح |
|---|---|---|---|---|
| `ActivePlates` | `/apiir/sw1/ActivePlates` | POST | `nationalCode` (string, الزامی)، `mobile` (string, الزامی) | استعلام پلاک های فعال |
| `PlateHistory` | `/apiir/sw1/PlateHistory` | POST | `nationalCode` (string, الزامی)، `plateNumber` (string, الزامی) | استعلام تاریخچه پلاک |
| `VehicleCard` | `/apiir/sw1/VehicleCard` | POST | `nationalCode` (string, الزامی)، `plateNumber` (string, الزامی) | استعلام کارت و سند خودرو |
| `VehicleInfo` | `/apiir/sw1/VehicleInfo` | POST | `nationalCode` (string, الزامی)، `plateNumber` (string, الزامی) | استعلام مشخصات و مدل خودرو |
| `VehicleViolation` | `/apiir/sw1/VehicleViolation` | POST | `nationalCode` (string, الزامی)، `mobile` (string, الزامی)، `plateNumber` (string, الزامی) | وب سرویس استعلام خلافی خودرو |
| `DrivingLicense` | `/apiir/sw1/DrivingLicense` | POST | `nationalCode` (string, الزامی)، `mobile` (string, الزامی) | استعلام گواهینامه رانندگی جدید |
| `DrivingLisense` | `/apiir/sw1/DrivingLisense` | POST | `nationalCode` (string, الزامی)، `mobile` (string, الزامی) | استعلام گواهینامه رانندگی قدیم |
| `DrivingScore` | `/apiir/sw1/DrivingScore` | POST | `nationalCode` (string, الزامی)، `mobile` (string, الزامی)، `licenseNumber` (string, الزامی) | استعلام نمره منفی گواهینامه |

### پیامک، تماس و صوت

| نام | مسیر گیت‌وی | متد | ورودی‌های بدنه | توضیح |
|---|---|---|---|---|
| `Call` | `/apiir/sw1/Call` | POST | `voiceID` (string, الزامی)، `numbers` (array<string>, الزامی) | وب سرویس تماس تلفنی |
| `CallOTP` | `/apiir/sw1/CallOTP` | POST | `code` (string, الزامی)، `number` (string, الزامی) | وب سرویس OTP تلفنی |
| `CallOTPalt` | `/apiir/sw1/CallOTPalt` | POST | `code` (string, الزامی)، `number` (string, الزامی) | وب سرویس OTP تلفنی alt |
| `SmsOTP` | `/apiir/sw1/SmsOTP` | POST | `code` (string, الزامی)، `mobile` (string, الزامی)، `template` (integer, اختیاری) | وب سرویس OTP پیامکی |
| `SendSms` | `/apiir/sw1/SendSms` | POST | `message` (string, الزامی)، `mobiles` (array<string>, الزامی) | ارسال پیامک خدماتی |
| `TextToSpeech` | `/apiir/sw1/TextToSpeech` | POST | `text` (string, الزامی)، `male` (boolean, الزامی)، `ttsEngine` (integer, الزامی) | تبدیل متن به صوت با هوش مصنوعی بومی |

### قبوض آب، گاز و برق

| نام | مسیر گیت‌وی | متد | ورودی‌های بدنه | توضیح |
|---|---|---|---|---|
| `WatterBill` | `/apiir/sw1/WatterBill` | POST | `billID` (string, الزامی) | وب سرویس قبض آب |
| `WatterBillInfo` | `/apiir/sw1/WatterBillInfo` | POST | `billID` (string, الزامی) | وب سرویس قبض آب با جزئیات |
| `GasBill` | `/apiir/sw1/GasBill` | POST | `billID` (string, الزامی) | وب سرویس قبض گاز |
| `GasBillInfo` | `/apiir/sw1/GasBillInfo` | POST | `billID` (string, الزامی) | وب سرویس قبض گاز با جزئیات |
| `PowerBill` | `/apiir/sw1/PowerBill` | POST | `billID` (string, الزامی) | وب سرویس قبض برق |
| `PowerBillInfo` | `/apiir/sw1/PowerBillInfo` | POST | `billID` (string, الزامی) | وب سرویس قبض برق با جزئیات |

### شرکت‌ها، مجوزها و کسب‌وکار

| نام | مسیر گیت‌وی | متد | ورودی‌های بدنه | توضیح |
|---|---|---|---|---|
| `CompanyInfo` | `/apiir/sw1/CompanyInfo` | POST | `nationalID` (string, الزامی) | استعلام شخص حقوقی |
| `CompanyMembers` | `/apiir/sw1/CompanyMembers` | POST | `nationalID` (string, الزامی) | استعلام اعضای هیئت مدیره |
| `CompanyNewspapers` | `/apiir/sw1/CompanyNewspapers` | POST | `nationalID` (string, الزامی) | استعلام اگهی های روزنامه رسمی |
| `CompanySignatories` | `/apiir/sw1/CompanySignatories` | POST | `nationalID` (string, الزامی) | استعلام صاحبین حق امضا شرکت‌ها |
| `TaxRecords` | `/apiir/sw1/TaxRecords` | POST | `inquiryCode` (string, الزامی) | استعلام پرونده ها مالیاتی |
| `License` | `/apiir/sw1/License` | POST | `trackingCode` (string, الزامی) | استعلام اعتبار مجوز شغلی |
| `MedicalLicense` | `/apiir/sw1/MedicalLicense` | POST | `medicalCode` (string, الزامی) | استعلام اعتبار پروانه پزشکی |
| `Enamad` | `/apiir/sw1/Enamad` | POST | `domain` (string, الزامی) | استعلام دارنده اینماد |

### پست، کدپستی و مکان

| نام | مسیر گیت‌وی | متد | ورودی‌های بدنه | توضیح |
|---|---|---|---|---|
| `PostalCodeInfo` | `/apiir/sw1/PostalCodeInfo` | POST | `postalCode` (string, الزامی) | سرویس استعلام کدپستی |
| `PostalCodePro` | `/apiir/sw1/PostalCodePro` | POST | `postalCode` (string, الزامی) | سرویس استعلام کدپستی نسخه Pro |
| `PostalTracking` | `/apiir/sw1/PostalTracking` | POST | `trackingCode` (string, الزامی) | سرویس رهیگیری بسته پستی |
| `PostalCodeLocation` | `/apiir/sw1/PostalCodeLocation` | POST | `postalCode` (string, الزامی) | سرویس دریافت لوکیشن با کدپستی |
| `GeoToAddress` | `/apiir/sw1/GeoToAddress` | POST | `latitude` (number, الزامی)، `longitude` (number, الزامی) | تبدیل لوکیشن به آدرس |
| `IPLocation` | `/apiir/sw1/IPLocation` | POST | `ip` (string, الزامی) | وب سرویس تشخیص موقعیت IP |
| `IPIsIran` | `/apiir/sw1/IPIsIran` | POST | `ip` (string, الزامی) | وب سرویس تشخیص IP ایرانی |
| `MyIP` | `/apiir/sw1/MyIP` | POST | — | وب سرویس دریافت IP برنامه (کلاینت) |

### ابزارها و متفرقه

| نام | مسیر گیت‌وی | متد | ورودی‌های بدنه | توضیح |
|---|---|---|---|---|
| `CheckEmail` | `/apiir/sw1/CheckEmail` | POST | `email` (string, الزامی) | اعتبار سنجی ایمیل |
| `IsHoliday` | `/apiir/sw1/IsHoliday` | POST | `weekend` (boolean, اختیاری) | استعلام تعطیلی امروز |
| `Wallpaper` | `/apiir/sw1/Wallpaper` | POST | — | وب سرویس بگراند پویا برنامه |
| `ChatGPT` | `/apiir/sw1/ChatGPT` | POST | `command` (string, الزامی)، `data` (string, الزامی)، `temperature` (number, اختیاری) | وب سرویس Chat GPT |

## ۶. نمونه فراخوانی

### تست سلامت (Sandbox — با توکن فعلی کار می‌کند)
```bash
curl -X POST http://2.144.22.190:9080/apiir/Sandbox/Echo \
  -H "apikey: APIIR_KEY_2026" \
  -H "Content-Type: application/json" \
  -d '{"name":"test"}'
```

### نمونه سرویس واقعی (پس از جایگزینی کلید api.ir)
```bash
# استعلام نام مالک شبا
curl -X POST http://2.144.22.190:9080/apiir/sw1/IbanInfo \
  -H "apikey: APIIR_KEY_2026" \
  -H "Content-Type: application/json" \
  -d '{"iban":"IR820540102618026817609"}'

# تطبیق کد ملی با موبایل (شاهکار)
curl -X POST http://2.144.22.190:9080/apiir/sw1/ShahkarLite \
  -H "apikey: APIIR_KEY_2026" \
  -H "Content-Type: application/json" \
  -d '{"nationalCode":"0012345678","mobile":"09121234567"}'
```

## ۷. عیب‌یابی

| خطا | معنی | راه‌حل |
|---|---|---|
| `{"message":"Missing API key in request"}` (401 گیت‌وی) | هدر apikey فرستاده نشده | هدر `apikey: APIIR_KEY_2026` را اضافه کنید |
| `{"message":"Invalid API key in request"}` (401 گیت‌وی) | apikey اشتباه | مقدار هدر را بررسی کنید |
| `{"success":false,"code":401,"message":"Unauthorized set valid api key..."}` (401 بک‌اند) | کلید api.ir تزریق‌شده معتبر نیست یا مجوز این سرویس را ندارد | کلید واقعی از پنل api.ir بگیرید و طبق بخش ۸ جایگزین کنید (توکن فعلی فقط Sandbox) |
| `{"success":false,"code":400,"message":"...(Name required)"}` | ورودی ناقص | فیلدهای الزامی جدول بخش ۵ را بفرستید |
| 404 از گیت‌وی | مسیر اشتباه | دقیقاً مطابق جدول: `/apiir/sw1/<Name>` |

## ۸. مدیریت با Admin API

```bash
ADMIN="http://2.144.22.190:8005/apisix/admin"
XAPI="X-API-Key: edd1c9f034335f136f87ad84b625c8f1"

# مشاهده همه روت‌های apiir
curl -s "$ADMIN/routes" -H "$XAPI" | python3 -c "import json,sys; [print(i['value']['name'], i['value']['uris'][0]) for i in json.load(sys.stdin)['list'] if i['value'].get('name','').startswith('apiir-')]"

# جایگزینی کلید api.ir (بعد از ساخت کلید واقعی در پنل api.ir) — فقط همین یک دستور برای همه ۶۷ روت:
curl -s -X PATCH "$ADMIN/services/apiir" -H "$XAPI" -H "Content-Type: application/json" \
  -d '{"plugins":{"proxy-rewrite":{"regex_uri":["^/apiir/(.*)$","/api/$1"],"headers":{"set":{"Authorization":"Bearer کلید-واقعی-شما"}}},"key-auth":{}}}'

# تغییر کلید گیت‌وی (apikey کلاینت‌ها)
curl -s -X PATCH "$ADMIN/consumers/apiir" -H "$XAPI" -H "Content-Type: application/json" \
  -d '{"plugins":{"key-auth":{"key":"کلید-جدید"}}}'

# افزودن روت جدید
curl -s -X PUT "$ADMIN/routes/apiir-MyNewRoute" -H "$XAPI" -H "Content-Type: application/json" \
  -d '{"name":"apiir-MyNewRoute","id":"apiir-MyNewRoute","uris":["/apiir/sw1/MyNewRoute"],"methods":["POST"],"service_id":"apiir"}'

# حذف یک روت
curl -s -X DELETE "$ADMIN/routes/apiir-Wallpaper" -H "$XAPI"
```

## ۹. نکات نگهداری

- بازسازی کامل از صفر: `bash apiir_setup.sh` (idempotent — اجرای مکرر بی‌ضرر است)
- فایل‌های مرتبط: `apiir_setup.sh` (نصب)، `apisix_state/apiir_swagger.json` (OpenAPI خام)، `apisix_state/apiir_routes_full.json` (متادیتای روت‌ها با ورودی‌ها)
- مسیر هر روت = مسیر Swagger منهای `/api` به‌علاوهٔ `/apiir`؛ نام روت APISIX = `apiir-<Name>`
- برای دیدن اسکیمای کامل ورودی/خروجی هر سرویس: [Swagger UI](https://s.api.ir/swagger/index.html)
- سرویس‌های پولی به اعتبار کلید api.ir شما خرج می‌زنند؛ `key-auth` گیت‌وی را حذف نکنید.
