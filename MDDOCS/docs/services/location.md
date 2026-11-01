# :material-map-marker: کدپستی و مکان

استعلام کدپستی، آدرس، مختصات، رهیگیری مرسوله و سرویس‌های IP. قالب پاسخ هر خانواده در [کدهای پاسخ و خطا](../errors.md) مستند است.

!!! note "دربارهٔ نمونه‌های فراخوانی"

    در همهٔ نمونه‌ها متد (GET/POST) صریح ذکر شده و **بدنهٔ درخواست (body) عمداً درج نشده است** — طبق ستون «ورودی‌های الزامی»، بدنهٔ JSON بعداً به هر کرل اضافه می‌شود.

## خانوادهٔ api.ir (پیشوند `/apiir/sw1/`)

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| کدپستی | `/apiir/sw1/PostalCodeInfo` | POST | `postalCode` | استعلام کدپستی |
| کدپستی Pro | `/apiir/sw1/PostalCodePro` | POST | `postalCode` | استعلام کدپستی — نسخهٔ کامل |
| رهیگیری مرسوله | `/apiir/sw1/PostalTracking` | POST | `trackingCode` | رهیگیری بستهٔ پستی |
| لوکیشن کدپستی | `/apiir/sw1/PostalCodeLocation` | POST | `postalCode` | دریافت لوکیشن با کدپستی |
| آدرس از مختصات | `/apiir/sw1/GeoToAddress` | POST | `latitude`، `longitude` | تبدیل مختصات به آدرس |
| موقعیت IP | `/apiir/sw1/IPLocation` | POST | `ip` | تشخیص موقعیت IP |
| IP ایرانی | `/apiir/sw1/IPIsIran` | POST | `ip` | تشخیص IP ایرانی |
| MyIP | `/apiir/sw1/MyIP` | POST | — | دریافت IP کلاینت |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# کدپستی — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/PostalCodeInfo" -H "apikey: YOUR_API_KEY"

# کدپستی Pro — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/PostalCodePro" -H "apikey: YOUR_API_KEY"

# رهیگیری مرسوله — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/PostalTracking" -H "apikey: YOUR_API_KEY"

# لوکیشن کدپستی — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/PostalCodeLocation" -H "apikey: YOUR_API_KEY"

# آدرس از مختصات — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/GeoToAddress" -H "apikey: YOUR_API_KEY"

# موقعیت IP — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/IPLocation" -H "apikey: YOUR_API_KEY"

# IP ایرانی — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/IPIsIran" -H "apikey: YOUR_API_KEY"

# MyIP — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/MyIP" -H "apikey: YOUR_API_KEY"
```

## سایر خانواده‌ها — Ehraz و زحل

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| کدپستی | `/ehraz/info/address-info` | POST | `code` | استعلام کدپستی |
| مختصات کدپستی | `/ehraz/info/postal-coordinates` | POST | `code` | استعلام مختصات کدپستی |
| اطلاعات صنفی | `/ehraz/info/corporation-identity-info` | POST | `code` | استعلام اطلاعات صنفی |
| کدپستی | `/services/inquiry/postal_code_inquiry` | POST | طبق مرجع | استعلام کدپستی |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# کدپستی — POST
curl -X POST "http://2.144.22.190:9080/ehraz/info/address-info" -H "apikey: YOUR_API_KEY"

# مختصات کدپستی — POST
curl -X POST "http://2.144.22.190:9080/ehraz/info/postal-coordinates" -H "apikey: YOUR_API_KEY"

# اطلاعات صنفی — POST
curl -X POST "http://2.144.22.190:9080/ehraz/info/corporation-identity-info" -H "apikey: YOUR_API_KEY"

# کدپستی — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/postal_code_inquiry" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"
```

!!! note "هدر Host برای خانوادهٔ زحل (پیشوند `/services/`)"

    درخواست‌های این خانواده باید هدر `Host: service.zohal.io` را نیز داشته باشند (پاسخ 400 بدون آن) — در نمونه‌های بالا لحاظ شده است.
