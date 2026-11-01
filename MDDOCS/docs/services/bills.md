# :material-receipt: قبوض آب، گاز و برق

استعلام قبوض آب، گاز، برق و تلفن — با شناسهٔ قبض. قالب پاسخ هر خانواده در [کدهای پاسخ و خطا](../errors.md) مستند است.

!!! note "دربارهٔ نمونه‌های فراخوانی"

    در همهٔ نمونه‌ها متد (GET/POST) صریح ذکر شده و **بدنهٔ درخواست (body) عمداً درج نشده است** — طبق ستون «ورودی‌های الزامی»، بدنهٔ JSON بعداً به هر کرل اضافه می‌شود.

## استعلام قبض — خانوادهٔ api.ir (پیشوند `/apiir/sw1/`)

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| قبض آب | `/apiir/sw1/WatterBill` | POST | `billID` | استعلام قبض آب |
| قبض آب با جزئیات | `/apiir/sw1/WatterBillInfo` | POST | `billID` | استعلام قبض آب با جزئیات کامل |
| قبض گاز | `/apiir/sw1/GasBill` | POST | `billID` | استعلام قبض گاز |
| قبض گاز با جزئیات | `/apiir/sw1/GasBillInfo` | POST | `billID` | استعلام قبض گاز با جزئیات کامل |
| قبض برق | `/apiir/sw1/PowerBill` | POST | `billID` | استعلام قبض برق |
| قبض برق با جزئیات | `/apiir/sw1/PowerBillInfo` | POST | `billID` | استعلام قبض برق با جزئیات کامل |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# قبض آب — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/WatterBill" -H "apikey: YOUR_API_KEY"

# قبض آب با جزئیات — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/WatterBillInfo" -H "apikey: YOUR_API_KEY"

# قبض گاز — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/GasBill" -H "apikey: YOUR_API_KEY"

# قبض گاز با جزئیات — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/GasBillInfo" -H "apikey: YOUR_API_KEY"

# قبض برق — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/PowerBill" -H "apikey: YOUR_API_KEY"

# قبض برق با جزئیات — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/PowerBillInfo" -H "apikey: YOUR_API_KEY"
```

## قبوض تلفن و همراه — خانوادهٔ زحل (پیشوند `/services/inquiry/`)

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| قبض تلفن ثابت | `/services/inquiry/bill/fixed_line` | POST | طبق مرجع | استعلام قبض تلفن ثابت |
| قبض همراه اول | `/services/inquiry/bill/mci` | POST | طبق مرجع | استعلام قبض همراه اول |
| قبض ایرانسل | `/services/inquiry/bill/irancell` | POST | طبق مرجع | استعلام قبض ایرانسل |
| قبض رایتل | `/services/inquiry/bill/rightel` | POST | طبق مرجع | استعلام قبض رایتل |
| قبض برق | `/services/inquiry/bill/electricity` | POST | طبق مرجع | استعلام قبض برق |
| قبض گاز | `/services/inquiry/bill/gas` | POST | طبق مرجع | استعلام قبض گاز |
| قبض آب | `/services/inquiry/bill/water` | POST | طبق مرجع | استعلام قبض آب |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# قبض تلفن ثابت — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/bill/fixed_line" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# قبض همراه اول — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/bill/mci" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# قبض ایرانسل — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/bill/irancell" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# قبض رایتل — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/bill/rightel" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# قبض برق — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/bill/electricity" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# قبض گاز — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/bill/gas" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# قبض آب — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/bill/water" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"
```

!!! note "هدر Host برای خانوادهٔ زحل (پیشوند `/services/`)"

    درخواست‌های این خانواده باید هدر `Host: service.zohal.io` را نیز داشته باشند (پاسخ 400 بدون آن) — در نمونه‌های بالا لحاظ شده است.
