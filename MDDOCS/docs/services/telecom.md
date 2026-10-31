# :material-message-text: پیامک، تماس و صوت

سرویس‌های ارتباطی: OTP پیامکی و صوتی، ارسال پیامک خدماتی، تماس تلفنی و تبدیل متن به گفتار. قالب پاسخ هر خانواده در [کدهای پاسخ و خطا](../errors.md) مستند است.

## خانوادهٔ `/apiir/sw1/` (POST)

| سرویس | مسیر | ورودی‌های الزامی | توضیح |
|---|---|---|---|
| OTP پیامکی | `/apiir/sw1/SmsOTP` | `code`، `mobile` (+`template` اختیاری) | ارسال رمز یکبار مصرف پیامکی |
| OTP صوتی | `/apiir/sw1/CallOTP` | `code`، `number` | ارسال رمز یکبار مصرف با تماس تلفنی |
| OTP صوتی (alt) | `/apiir/sw1/CallOTPalt` | `code`، `number` | OTP تلفنی — مسیر جایگزین |
| تماس تلفنی | `/apiir/sw1/Call` | `voiceID`، `numbers` | پخش پیام صوتی روی شماره‌ها |
| ارسال پیامک | `/apiir/sw1/SendSms` | `message`، `mobiles` | ارسال پیامک خدماتی گروهی |
| متن به گفتار | `/apiir/sw1/TextToSpeech` | `text`، `male`، `ttsEngine` | تبدیل متن به صوت با هوش مصنوعی بومی |

## خانوادهٔ `/services/inquiry/` (POST)

| سرویس | مسیر | ورودی‌های الزامی | توضیح |
|---|---|---|---|
| OTP صوتی | `/services/inquiry/voice_otp` | طبق مرجع | ارسال رمز یکبار مصرف با تماس صوتی |

!!! note "هدر Host برای خانوادهٔ `/services/`"

    درخواست‌های این خانواده باید هدر `Host: service.zohal.io` را نیز داشته باشند (پاسخ 400 بدون آن).
