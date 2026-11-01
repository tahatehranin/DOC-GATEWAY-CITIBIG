# :material-tools: ابزارهای کمکی

سرویس‌های متفرقه و کمکی برای تکمیل سناریوهای کاربردی. قالب پاسخ هر خانواده در [کدهای پاسخ و خطا](../errors.md) مستند است.

!!! note "دربارهٔ نمونه‌های فراخوانی"

    در همهٔ نمونه‌ها متد (GET/POST) صریح ذکر شده و **بدنهٔ درخواست (body) عمداً درج نشده است** — طبق ستون «ورودی‌های الزامی»، بدنهٔ JSON بعداً به هر کرل اضافه می‌شود.

## خانوادهٔ api.ir (پیشوند `/apiir/sw1/`)

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| اعتبارسنجی ایمیل | `/apiir/sw1/CheckEmail` | POST | `email` | اعتبارسنجی ایمیل |
| تعطیلی امروز | `/apiir/sw1/IsHoliday` | POST | `weekend` (اختیاری) | استعلام تعطیلی امروز |
| پس‌زمینهٔ پویا | `/apiir/sw1/Wallpaper` | POST | — | دریافت تصویر پس‌زمینهٔ پویا |
| ChatGPT | `/apiir/sw1/ChatGPT` | POST | `command`، `data` (+`temperature` اختیاری) | سرویس هوش مصنوعی گفتگو |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# اعتبارسنجی ایمیل — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/CheckEmail" -H "apikey: YOUR_API_KEY"

# تعطیلی امروز — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/IsHoliday" -H "apikey: YOUR_API_KEY"

# پس‌زمینهٔ پویا — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/Wallpaper" -H "apikey: YOUR_API_KEY"

# ChatGPT — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/ChatGPT" -H "apikey: YOUR_API_KEY"
```

## خانوادهٔ زحل (پیشوند `/services/inquiry/`)

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| فارسی به فینگلیش | `/services/inquiry/persian_to_finglish` | POST | طبق مرجع | تبدیل متن فارسی به فینگلیش |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# فارسی به فینگلیش — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/persian_to_finglish" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"
```

## تست سلامت

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| Echo | `/apiir/Sandbox/Echo` | POST | `name` | تست اتصال و سلامت کلید |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# Echo — POST
curl -X POST "http://2.144.22.190:9080/apiir/Sandbox/Echo" -H "apikey: YOUR_API_KEY"
```

!!! note "هدر Host برای خانوادهٔ زحل (پیشوند `/services/`)"

    درخواست‌های این خانواده باید هدر `Host: service.zohal.io` را نیز داشته باشند (پاسخ 400 بدون آن) — در نمونه‌های بالا لحاظ شده است.
