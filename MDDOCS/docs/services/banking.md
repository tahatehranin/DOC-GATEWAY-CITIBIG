# :material-credit-card-outline: سرویس‌های بانکی

استعلام شبا، کارت، حساب، تطبیق نام و سرویس‌های چک — کامل‌ترین کاتالوگ بانکی با یک کلید.

!!! note "دربارهٔ نمونه‌های فراخوانی"

    در همهٔ نمونه‌ها متد (GET/POST) صریح ذکر شده و **بدنهٔ درخواست (body) عمداً درج نشده است** — طبق ستون «ورودی‌های الزامی»، بدنهٔ JSON بعداً به هر کرل اضافه می‌شود.

## تبدیل و استعلام — خانوادهٔ `/apiir/sw1/`

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| تطبیق کد ملی با کارت | `/apiir/sw1/CardMatch` | POST | `nationalCode`، `birthDate`، `cardNumber` | تطبیق کد ملی با کارت بانکی |
| تطبیق کارت با موبایل | `/apiir/sw1/CardMobileMatch` | POST | `mobile`، `cardNumber` | تطبیق کارت با موبایل |
| تطبیق کد ملی با شبا | `/apiir/sw1/IbanMatch` | POST | `nationalCode`، `birthDate`، `iban` | تطبیق کد ملی با شبا |
| تطبیق کد ملی با شبا Pro | `/apiir/sw1/IbanMatchPro` | POST | `nationalCode`، `iban` | تطبیق کد ملی با شبا (سیاح) |
| نام مالک کارت | `/apiir/sw1/CardInfo` | POST | `cardNumber` | استعلام نام مالک کارت بانکی |
| کارت به شبا | `/apiir/sw1/CardToIban` | POST | `cardNumber` | تبدیل کارت به شبا |
| نام مالک شبا | `/apiir/sw1/IbanInfo` | POST | `iban` | استعلام نام دارندهٔ شبا |
| شبا با شمارهٔ حساب | `/apiir/sw1/BankAccountInfo` | POST | `accountNumber` (+`bankCode` اختیاری) | استعلام شبا با شمارهٔ حساب |
| مشخصات کارت | `/apiir/sw1/BankCardInfo` | POST | `cardNumber` | استعلام مشخصات کارت بانکی |
| تسهیلات فعال | `/apiir/sw1/ActiveLoans` | POST | `nationalCode` | استعلام تسهیلات فعال بانکی |
| چک برگشتی | `/apiir/sw1/UnpaidCheque` | POST | `nationalCode` | استعلام تعداد چک برگشتی |
| چک برگشتی Lite | `/apiir/sw1/UnpaidChequeLite` | POST | `nationalCode` | استعلام تعداد چک برگشتی — نسخهٔ سبک |
| چک برگشتی Pro | `/apiir/sw1/UnpaidChequePro` | POST | `nationalCode` | استعلام تعداد چک برگشتی — نسخهٔ کامل |
| رنگ چک صیادی | `/apiir/sw1/ChequeColor` | POST | `nationalCode`، `isCompany` | استعلام رنگ چک صیادی |
| مشخصات چک صیادی | `/apiir/sw1/ChequeInfo` | POST | `chequeID` | استعلام مشخصات چک صیادی |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# تطبیق کد ملی با کارت — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/CardMatch" -H "apikey: YOUR_API_KEY"

# تطبیق کارت با موبایل — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/CardMobileMatch" -H "apikey: YOUR_API_KEY"

# تطبیق کد ملی با شبا — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/IbanMatch" -H "apikey: YOUR_API_KEY"

# تطبیق کد ملی با شبا Pro — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/IbanMatchPro" -H "apikey: YOUR_API_KEY"

# نام مالک کارت — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/CardInfo" -H "apikey: YOUR_API_KEY"

# کارت به شبا — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/CardToIban" -H "apikey: YOUR_API_KEY"

# نام مالک شبا — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/IbanInfo" -H "apikey: YOUR_API_KEY"

# شبا با شمارهٔ حساب — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/BankAccountInfo" -H "apikey: YOUR_API_KEY"

# مشخصات کارت — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/BankCardInfo" -H "apikey: YOUR_API_KEY"

# تسهیلات فعال — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/ActiveLoans" -H "apikey: YOUR_API_KEY"

# چک برگشتی — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/UnpaidCheque" -H "apikey: YOUR_API_KEY"

# چک برگشتی Lite — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/UnpaidChequeLite" -H "apikey: YOUR_API_KEY"

# چک برگشتی Pro — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/UnpaidChequePro" -H "apikey: YOUR_API_KEY"

# رنگ چک صیادی — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/ChequeColor" -H "apikey: YOUR_API_KEY"

# مشخصات چک صیادی — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/ChequeInfo" -H "apikey: YOUR_API_KEY"
```

## تبدیل و تطبیق — خانوادهٔ `/ehraz/`

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| موجودی کیف پول | `/ehraz/account/wallet-balance` | GET | — | موجودی کیف پول |
| حساب به شبا | `/ehraz/convert/deposit-number-to-iban` | POST | `bank`، `number` | تبدیل شماره حساب به شبا |
| استعلام شبا | `/ehraz/info/iban-info` | POST | `value` | استعلام شبا |
| استعلام کارت | `/ehraz/info/card-info` | POST | `number` | استعلام کارت |
| کارت به حساب | `/ehraz/convert/card-to-deposit-number` | POST | `number` | تبدیل کارت به حساب |
| کارت به شبا | `/ehraz/convert/card-to-iban` | POST | `number` | تبدیل کارت به شبا |
| کدملی با شبا | `/ehraz/match/iban-with-national` | POST | `iban`، `nationalCode`، `birthDate` | همخوانی کدملی با شبا |
| نام با شبا | `/ehraz/match/iban-with-name` | POST | `iban`، `name` | همخوانی نام با شبا |
| نام با کارت | `/ehraz/match/card-with-name` | POST | `cardNumber`، `name` | همخوانی نام با کارت |
| نام با حساب | `/ehraz/match/deposit-number-with-name` | POST | `bank`، `depositNumber`، `name` | همخوانی نام با حساب |
| کدملی با کارت | `/ehraz/match/card-with-national` | POST | `cardNumber`، `nationalCode`، `birthDate` | همخوانی کدملی با کارت |
| شبا با شناسهٔ ملی حقوقی | `/ehraz/match/iban-with-legal-national` | POST | `iban`، `legalNationalCode` | تطبیق شبا و شناسهٔ ملی حقوقی |
| چک صیادی | `/ehraz/info/cheque-info` | POST | `nationalCode`، `sayadId` | استعلام چک صیادی |
| چک برگشتی — درخواست رمز | `/ehraz/cheque/bounced/otp` | POST | `nationalCode`، `mobileNumber` | دریافت رمز استعلام چک برگشتی |
| چک برگشتی — استعلام | `/ehraz/cheque/bounced/count` | POST | `nationalCode`، `mobileNumber`، `otpCode`، `referenceCode` | تعداد چک‌های برگشتی (پس از دریافت رمز) |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# موجودی کیف پول — GET
curl -X GET "http://2.144.22.190:9080/ehraz/account/wallet-balance" -H "apikey: YOUR_API_KEY"

# حساب به شبا — POST
curl -X POST "http://2.144.22.190:9080/ehraz/convert/deposit-number-to-iban" -H "apikey: YOUR_API_KEY"

# استعلام شبا — POST
curl -X POST "http://2.144.22.190:9080/ehraz/info/iban-info" -H "apikey: YOUR_API_KEY"

# استعلام کارت — POST
curl -X POST "http://2.144.22.190:9080/ehraz/info/card-info" -H "apikey: YOUR_API_KEY"

# کارت به حساب — POST
curl -X POST "http://2.144.22.190:9080/ehraz/convert/card-to-deposit-number" -H "apikey: YOUR_API_KEY"

# کارت به شبا — POST
curl -X POST "http://2.144.22.190:9080/ehraz/convert/card-to-iban" -H "apikey: YOUR_API_KEY"

# کدملی با شبا — POST
curl -X POST "http://2.144.22.190:9080/ehraz/match/iban-with-national" -H "apikey: YOUR_API_KEY"

# نام با شبا — POST
curl -X POST "http://2.144.22.190:9080/ehraz/match/iban-with-name" -H "apikey: YOUR_API_KEY"

# نام با کارت — POST
curl -X POST "http://2.144.22.190:9080/ehraz/match/card-with-name" -H "apikey: YOUR_API_KEY"

# نام با حساب — POST
curl -X POST "http://2.144.22.190:9080/ehraz/match/deposit-number-with-name" -H "apikey: YOUR_API_KEY"

# کدملی با کارت — POST
curl -X POST "http://2.144.22.190:9080/ehraz/match/card-with-national" -H "apikey: YOUR_API_KEY"

# شبا با شناسهٔ ملی حقوقی — POST
curl -X POST "http://2.144.22.190:9080/ehraz/match/iban-with-legal-national" -H "apikey: YOUR_API_KEY"

# چک صیادی — POST
curl -X POST "http://2.144.22.190:9080/ehraz/info/cheque-info" -H "apikey: YOUR_API_KEY"

# چک برگشتی — درخواست رمز — POST
curl -X POST "http://2.144.22.190:9080/ehraz/cheque/bounced/otp" -H "apikey: YOUR_API_KEY"

# چک برگشتی — استعلام — POST
curl -X POST "http://2.144.22.190:9080/ehraz/cheque/bounced/count" -H "apikey: YOUR_API_KEY"
```

## استعلام‌های تطبیقی — خانوادهٔ `/services/inquiry/`

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| حساب به شبا | `/services/inquiry/account_to_iban` | POST | طبق مرجع | تبدیل شماره حساب به شبا |
| کارت به حساب | `/services/inquiry/card_to_account` | POST | طبق مرجع | تبدیل کارت به حساب |
| کارت به شبا | `/services/inquiry/card_to_iban` | POST | طبق مرجع | تبدیل کارت به شبا |
| استعلام شبا | `/services/inquiry/iban` | POST | طبق مرجع | استعلام اطلاعات شبا |
| استعلام کارت | `/services/inquiry/card_inquiry` | POST | طبق مرجع | استعلام کارت بانکی |
| نام با کارت | `/services/inquiry/check_card_with_name` | POST | طبق مرجع | تطبیق نام با کارت |
| کدملی با کارت | `/services/inquiry/check_card_with_national_code` | POST | طبق مرجع | تطبیق کدملی با کارت |
| نام با شبا | `/services/inquiry/check_iban_with_name` | POST | طبق مرجع | تطبیق نام با شبا |
| کدملی با شبا | `/services/inquiry/check_iban_with_national_code` | POST | طبق مرجع | تطبیق کدملی با شبا |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# حساب به شبا — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/account_to_iban" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# کارت به حساب — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/card_to_account" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# کارت به شبا — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/card_to_iban" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# استعلام شبا — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/iban" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# استعلام کارت — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/card_inquiry" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# نام با کارت — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/check_card_with_name" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# کدملی با کارت — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/check_card_with_national_code" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# نام با شبا — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/check_iban_with_name" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# کدملی با شبا — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/check_iban_with_national_code" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"
```

!!! note "هدر Host برای خانوادهٔ `/services/`"

    درخواست‌های این خانواده باید هدر `Host: service.zohal.io` را نیز داشته باشند (پاسخ 400 بدون آن) — در نمونه‌های بالا لحاظ شده است.
