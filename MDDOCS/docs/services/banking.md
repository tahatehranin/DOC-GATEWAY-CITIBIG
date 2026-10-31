# :material-credit-card-outline: سرویس‌های بانکی

استعلام شبا، کارت، حساب، تطبیق نام و سرویس‌های چک — کامل‌ترین کاتالوگ بانکی با یک کلید. قالب پاسخ هر خانواده در [کدهای پاسخ و خطا](../errors.md) مستند است.

## تبدیل و استعلام (خانوادهٔ `/apiir/sw1/` — POST)

| سرویس | مسیر | ورودی‌های الزامی | توضیح |
|---|---|---|---|
| تطبیق کد ملی با کارت | `/apiir/sw1/CardMatch` | `nationalCode`، `birthDate`، `cardNumber` | تطبیق کد ملی با کارت بانکی |
| تطبیق کد ملی با موبایل و کارت | `/apiir/sw1/CardMobileMatch` | `mobile`، `cardNumber` | تطبیق کارت با موبایل |
| تطبیق کد ملی با شبا | `/apiir/sw1/IbanMatch` | `nationalCode`، `birthDate`، `iban` | تطبیق کد ملی با شبا |
| تطبیق کد ملی با شبا Pro | `/apiir/sw1/IbanMatchPro` | `nationalCode`، `iban` | تطبیق کد ملی با شبا (سیاح) |
| نام مالک کارت | `/apiir/sw1/CardInfo` | `cardNumber` | استعلام نام مالک کارت بانکی |
| کارت به شبا | `/apiir/sw1/CardToIban` | `cardNumber` | تبدیل کارت به شبا |
| نام مالک شبا | `/apiir/sw1/IbanInfo` | `iban` | استعلام نام دارندهٔ شبا |
| شبا با شمارهٔ حساب | `/apiir/sw1/BankAccountInfo` | `accountNumber` (+`bankCode` اختیاری) | استعلام شبا با شمارهٔ حساب |
| مشخصات کارت | `/apiir/sw1/BankCardInfo` | `cardNumber` | استعلام مشخصات کارت بانکی |
| تسهیلات فعال | `/apiir/sw1/ActiveLoans` | `nationalCode` | استعلام تسهیلات فعال بانکی |
| چک برگشتی | `/apiir/sw1/UnpaidCheque` | `nationalCode` | استعلام تعداد چک برگشتی |
| چک برگشتی Lite | `/apiir/sw1/UnpaidChequeLite` | `nationalCode` | استعلام تعداد چک برگشتی — نسخهٔ سبک |
| چک برگشتی Pro | `/apiir/sw1/UnpaidChequePro` | `nationalCode` | استعلام تعداد چک برگشتی — نسخهٔ کامل |
| رنگ چک صیادی | `/apiir/sw1/ChequeColor` | `nationalCode`، `isCompany` | استعلام رنگ چک صیادی |
| مشخصات چک صیادی | `/apiir/sw1/ChequeInfo` | `chequeID` | استعلام مشخصات چک صیادی |

## تبدیل و تطبیق (خانوادهٔ `/ehraz/` — POST)

| سرویس | مسیر | ورودی‌های الزامی | توضیح |
|---|---|---|---|
| حساب به شبا | `/ehraz/convert/deposit-number-to-iban` | `bank`، `number` | تبدیل شماره حساب به شبا |
| استعلام شبا | `/ehraz/info/iban-info` | `value` | استعلام شبا |
| استعلام کارت | `/ehraz/info/card-info` | `number` | استعلام کارت |
| کارت به حساب | `/ehraz/convert/card-to-deposit-number` | `number` | تبدیل کارت به حساب |
| کارت به شبا | `/ehraz/convert/card-to-iban` | `number` | تبدیل کارت به شبا |
| کدملی با شبا | `/ehraz/match/iban-with-national` | `iban`، `nationalCode`، `birthDate` | همخوانی کدملی با شبا |
| نام با شبا | `/ehraz/match/iban-with-name` | `iban`، `name` | همخوانی نام با شبا |
| نام با کارت | `/ehraz/match/card-with-name` | `cardNumber`، `name` | همخوانی نام با کارت |
| نام با حساب | `/ehraz/match/deposit-number-with-name` | `bank`، `depositNumber`، `name` | همخوانی نام با حساب |
| کدملی با کارت | `/ehraz/match/card-with-national` | `cardNumber`، `nationalCode`، `birthDate` | همخوانی کدملی با کارت |
| شبا با شناسهٔ ملی حقوقی | `/ehraz/match/iban-with-legal-national` | `iban`، `legalNationalCode` | تطبیق شبا و شناسهٔ ملی حقوقی |
| چک صیادی | `/ehraz/info/cheque-info` | `nationalCode`، `sayadId` | استعلام چک صیادی |
| چک برگشتی — درخواست رمز | `/ehraz/cheque/bounced/otp` | `nationalCode`، `mobileNumber` | دریافت رمز استعلام چک برگشتی |
| چک برگشتی — استعلام | `/ehraz/cheque/bounced/count` | `nationalCode`، `mobileNumber`، `otpCode`، `referenceCode` | تعداد چک‌های برگشتی (پس از دریافت رمز) |

## استعلام‌های تطبیقی (خانوادهٔ `/services/inquiry/` — POST)

| سرویس | مسیر | ورودی‌های الزامی | توضیح |
|---|---|---|---|
| حساب به شبا | `/services/inquiry/account_to_iban` | طبق مرجع | تبدیل شماره حساب به شبا |
| کارت به حساب | `/services/inquiry/card_to_account` | طبق مرجع | تبدیل کارت به حساب |
| کارت به شبا | `/services/inquiry/card_to_iban` | طبق مرجع | تبدیل کارت به شبا |
| استعلام شبا | `/services/inquiry/iban` | طبق مرجع | استعلام اطلاعات شبا |
| استعلام کارت | `/services/inquiry/card_inquiry` | طبق مرجع | استعلام کارت بانکی |
| نام با کارت | `/services/inquiry/check_card_with_name` | طبق مرجع | تطبیق نام با کارت |
| کدملی با کارت | `/services/inquiry/check_card_with_national_code` | طبق مرجع | تطبیق کدملی با کارت |
| نام با شبا | `/services/inquiry/check_iban_with_name` | طبق مرجع | تطبیق نام با شبا |
| کدملی با شبا | `/services/inquiry/check_iban_with_national_code` | طبق مرجع | تطبیق کدملی با شبا |

!!! note "هدر Host برای خانوادهٔ `/services/`"

    درخواست‌های این خانواده باید هدر `Host: service.zohal.io` را نیز داشته باشند (پاسخ 400 بدون آن).
