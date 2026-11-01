# :material-message-text: پیامک، تماس و صوت

سرویس‌های ارتباطی: OTP پیامکی و صوتی، ارسال پیامک خدماتی، تماس تلفنی و تبدیل متن به گفتار. قالب پاسخ هر خانواده در [کدهای پاسخ و خطا](../errors.md) مستند است.

!!! note "دربارهٔ نمونه‌های فراخوانی"

    در همهٔ نمونه‌ها متد (GET/POST) صریح ذکر شده و **بدنهٔ درخواست (body) عمداً درج نشده است** — طبق ستون «ورودی‌های الزامی»، بدنهٔ JSON بعداً به هر کرل اضافه می‌شود.

## خانوادهٔ api.ir (پیشوند `/apiir/sw1/`)

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| OTP پیامکی | `/apiir/sw1/SmsOTP` | POST | `code`، `mobile` (+`template` اختیاری) | ارسال رمز یکبار مصرف پیامکی |
| OTP صوتی | `/apiir/sw1/CallOTP` | POST | `code`، `number` | ارسال رمز یکبار مصرف با تماس تلفنی |
| OTP صوتی (alt) | `/apiir/sw1/CallOTPalt` | POST | `code`، `number` | OTP تلفنی — مسیر جایگزین |
| تماس تلفنی | `/apiir/sw1/Call` | POST | `voiceID`، `numbers` | پخش پیام صوتی روی شماره‌ها |
| ارسال پیامک | `/apiir/sw1/SendSms` | POST | `message`، `mobiles` | ارسال پیامک خدماتی گروهی |
| متن به گفتار | `/apiir/sw1/TextToSpeech` | POST | `text`، `male`، `ttsEngine` | تبدیل متن به صوت با هوش مصنوعی بومی |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# OTP پیامکی — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/SmsOTP" -H "apikey: YOUR_API_KEY"

# OTP صوتی — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/CallOTP" -H "apikey: YOUR_API_KEY"

# OTP صوتی (alt) — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/CallOTPalt" -H "apikey: YOUR_API_KEY"

# تماس تلفنی — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/Call" -H "apikey: YOUR_API_KEY"

# ارسال پیامک — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/SendSms" -H "apikey: YOUR_API_KEY"

# متن به گفتار — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/TextToSpeech" -H "apikey: YOUR_API_KEY"
```

## خانوادهٔ زحل (پیشوند `/services/inquiry/`)

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| OTP صوتی | `/services/inquiry/voice_otp` | POST | طبق مرجع | ارسال رمز یکبار مصرف با تماس صوتی |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# OTP صوتی — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/voice_otp" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"
```

!!! note "هدر Host برای خانوادهٔ زحل (پیشوند `/services/`)"

    درخواست‌های این خانواده باید هدر `Host: service.zohal.io` را نیز داشته باشند (پاسخ 400 بدون آن) — در نمونه‌های بالا لحاظ شده است.
