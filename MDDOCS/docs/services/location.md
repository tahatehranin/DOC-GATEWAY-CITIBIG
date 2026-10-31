# :material-map-marker: کدپستی و مکان

استعلام کدپستی، آدرس، مختصات، رهیگیری مرسوله و سرویس‌های IP. قالب پاسخ هر خانواده در [کدهای پاسخ و خطا](../errors.md) مستند است.

## خانوادهٔ `/apiir/sw1/` (POST)

| سرویس | مسیر | ورودی‌های الزامی | توضیح |
|---|---|---|---|
| کدپستی | `/apiir/sw1/PostalCodeInfo` | `postalCode` | استعلام کدپستی |
| کدپستی Pro | `/apiir/sw1/PostalCodePro` | `postalCode` | استعلام کدپستی — نسخهٔ کامل |
| رهیگیری مرسوله | `/apiir/sw1/PostalTracking` | `trackingCode` | رهیگیری بستهٔ پستی |
| لوکیشن کدپستی | `/apiir/sw1/PostalCodeLocation` | `postalCode` | دریافت لوکیشن با کدپستی |
| آدرس از مختصات | `/apiir/sw1/GeoToAddress` | `latitude`، `longitude` | تبدیل مختصات به آدرس |
| موقعیت IP | `/apiir/sw1/IPLocation` | `ip` | تشخیص موقعیت IP |
| IP ایرانی | `/apiir/sw1/IPIsIran` | `ip` | تشخیص IP ایرانی |
| MyIP | `/apiir/sw1/MyIP` | — | دریافت IP کلاینت |

## سایر خانواده‌ها

| سرویس | مسیر | ورودی‌های الزامی | توضیح |
|---|---|---|---|
| کدپستی | `/ehraz/info/address-info` | `code` | استعلام کدپستی |
| مختصات کدپستی | `/ehraz/info/postal-coordinates` | `code` | استعلام مختصات کدپستی |
| اطلاعات صنفی | `/ehraz/info/corporation-identity-info` | `code` | استعلام اطلاعات صنفی |
| کدپستی | `/services/inquiry/postal_code_inquiry` | طبق مرجع | استعلام کدپستی |

!!! note "هدر Host برای خانوادهٔ `/services/`"

    درخواست‌های این خانواده باید هدر `Host: service.zohal.io` را نیز داشته باشند (پاسخ 400 بدون آن).
