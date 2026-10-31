<div class="citibig-cover" markdown>

![CITIBIG](assets/img/logo.png){ .citibig-logo }

# CITIBIG API

پلتفرم یکپارچهٔ سرویس‌های داده و استعلام — با **یک کلید API** به به بیش از **۱۳۰ سرویس** دسترسی داشته باشید.

[:material-rocket-launch: شروع سریع](getting-started.md){ .md-button .md-button--primary }
[:material-book-open-page-variant: مرجع سرویس‌ها](services/identity.md){ .md-button }

</div>

---

## چرا CITIBIG API؟

| | |
|---|---|
| :material-key-variant: **یک کلید، همهٔ سرویس‌ها** | به‌جای چندین پنل و حساب جداگانه، با یک کلید به کل کاتالوگ سرویس‌ها دسترسی دارید. |
| :material-shield-check: **امنیت استاندارد** | احراز هویت ساده و استاندارد با هدر `apikey` در تمام درخواست‌ها. |
| :material-api: **REST و JSON** | همهٔ سرویس‌ها RESTful هستند و با JSON کار می‌کنند؛ یکپارچه‌سازی سریع. |
| :material-currency-usd: **مصرف شفاف** | هزینه فقط به‌ازای هر فراخوانی موفق؛ بدون هزینهٔ راه‌اندازی. |
| :material-server: **زیرساخت پایدار** | دروازهٔ اختصاصی با مانیتورینگ و کنترل دسترسی. |

## سرویس‌ها در یک نگاه

| | |
|---|---|
| :material-badge-account: [**سرویس‌های هویتی**](services/identity.md) | شاهکار، ثبت احوال، ثنا، نظام وظیفه، پاسپورت، احراز هویت ویدئویی |
| :material-credit-card-outline: [**سرویس‌های بانکی**](services/banking.md) | شبا، کارت، حساب، تطبیق نام، چک صیادی و برگشتی، تسهیلات |
| :material-receipt: [**قبوض**](services/bills.md) | آب، گاز، برق، تلفن ثابت و همراه |
| :material-message-text: [**پیامک، تماس و صوت**](services/telecom.md) | OTP پیامکی و صوتی، ارسال پیامک، تبدیل متن به گفتار |
| :material-car-info: [**خودرو و گواهینامه**](services/vehicle.md) | پلاک، خلافی، سند و مشخصات خودرو، گواهینامه و نمره منفی |
| :material-office-building: [**کسب‌وکار و اشخاص حقوقی**](services/business.md) | اطلاعات شرکت، اعضا، امضاداران، مالیات، مجوزها، اینماد |
| :material-map-marker: [**کدپستی و مکان**](services/location.md) | کدپستی، آدرس، مختصات، رهیگیری مرسوله، موقعیت IP |
| :material-movie-open: [**رسانه**](services/media.md) | فیلم و سریال — جستجو، جدیدترین‌ها، فیلتر پیشرفته |
| :material-tools: [**ابزارهای کمکی**](services/tools.md) | اعتبارسنجی ایمیل، تعطیلات، IP، متن به گفتار |

## شروع سریع

```bash
curl -X POST "http://2.144.22.190:9080/apiir/sw1/IbanInfo" \
  -H "apikey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"iban":"IR820540102618026817609"}'
```

برای آشنایی با ساختار درخواست‌ها [شروع سریع](getting-started.md) را ببینید.

---

**© 2026 CITIBIG — تمام حقوق محفوظ است.** · [حق نشر و لایسنس](license.md)
