# :material-receipt: قبوض آب، گاز و برق

استعلام قبوض آب، گاز، برق و تلفن — با شمارهٔ قبض یا شناسهٔ قبض. قالب پاسخ هر خانواده در [کدهای پاسخ و خطا](../errors.md) مستند است.

## استعلام قبض (خانوادهٔ `/apiir/sw1/` — POST)

| سرویس | مسیر | ورودی‌های الزامی | توضیح |
|---|---|---|---|
| قبض آب | `/apiir/sw1/WatterBill` | `billID` | استعلام قبض آب |
| قبض آب با جزئیات | `/apiir/sw1/WatterBillInfo` | `billID` | استعلام قبض آب با جزئیات کامل |
| قبض گاز | `/apiir/sw1/GasBill` | `billID` | استعلام قبض گاز |
| قبض گاز با جزئیات | `/apiir/sw1/GasBillInfo` | `billID` | استعلام قبض گاز با جزئیات کامل |
| قبض برق | `/apiir/sw1/PowerBill` | `billID` | استعلام قبض برق |
| قبض برق با جزئیات | `/apiir/sw1/PowerBillInfo` | `billID` | استعلام قبض برق با جزئیات کامل |

## قبوض تلفن (خانوادهٔ `/services/inquiry/` — POST)

| سرویس | مسیر | ورودی‌های الزامی | توضیح |
|---|---|---|---|
| قبض تلفن ثابت | `/services/inquiry/bill/fixed_line` | طبق مرجع | استعلام قبض تلفن ثابت |
| قبض همراه اول | `/services/inquiry/bill/mci` | طبق مرجع | استعلام قبض همراه اول |
| قبض ایرانسل | `/services/inquiry/bill/irancell` | طبق مرجع | استعلام قبض ایرانسل |
| قبض رایتل | `/services/inquiry/bill/rightel` | طبق مرجع | استعلام قبض رایتل |
| قبض برق | `/services/inquiry/bill/electricity` | طبق مرجع | استعلام قبض برق |
| قبض گاز | `/services/inquiry/bill/gas` | طبق مرجع | استعلام قبض گاز |
| قبض آب | `/services/inquiry/bill/water` | طبق مرجع | استعلام قبض آب |

!!! note "هدر Host برای خانوادهٔ `/services/`"

    درخواست‌های این خانواده باید هدر `Host: service.zohal.io` را نیز داشته باشند (پاسخ 400 بدون آن).

## نمونهٔ فراخوانی

```bash
curl -X POST "http://2.144.22.190:9080/apiir/sw1/GasBill" \
  -H "apikey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"billID":"<شناسهٔ قبض>"}'
```
