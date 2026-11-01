# :material-car-info: خودرو و گواهینامه

استعلام پلاک، خلافی، سند و مشخصات خودرو، گواهینامهٔ رانندگی و نمرهٔ منفی. قالب پاسخ هر خانواده در [کدهای پاسخ و خطا](../errors.md) مستند است.

!!! note "دربارهٔ نمونه‌های فراخوانی"

    در همهٔ نمونه‌ها متد (GET/POST) صریح ذکر شده و **بدنهٔ درخواست (body) عمداً درج نشده است** — طبق ستون «ورودی‌های الزامی»، بدنهٔ JSON بعداً به هر کرل اضافه می‌شود.

## خانوادهٔ api.ir (پیشوند `/apiir/sw1/`)

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| پلاک‌های فعال | `/apiir/sw1/ActivePlates` | POST | `nationalCode`، `mobile` | استعلام پلاک‌های فعال |
| تاریخچهٔ پلاک | `/apiir/sw1/PlateHistory` | POST | `nationalCode`، `plateNumber` | استعلام تاریخچهٔ پلاک |
| کارت و سند خودرو | `/apiir/sw1/VehicleCard` | POST | `nationalCode`، `plateNumber` | استعلام کارت و سند خودرو |
| مشخصات خودرو | `/apiir/sw1/VehicleInfo` | POST | `nationalCode`، `plateNumber` | استعلام مشخصات و مدل خودرو |
| خلافی خودرو | `/apiir/sw1/VehicleViolation` | POST | `nationalCode`، `mobile`، `plateNumber` | استعلام خلافی خودرو |
| گواهینامهٔ جدید | `/apiir/sw1/DrivingLicense` | POST | `nationalCode`، `mobile` | استعلام گواهینامهٔ رانندگی جدید |
| گواهینامهٔ قدیم | `/apiir/sw1/DrivingLisense` | POST | `nationalCode`، `mobile` | استعلام گواهینامهٔ رانندگی قدیم |
| نمرهٔ منفی | `/apiir/sw1/DrivingScore` | POST | `nationalCode`، `mobile`، `licenseNumber` | استعلام نمرهٔ منفی گواهینامه |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# پلاک‌های فعال — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/ActivePlates" -H "apikey: YOUR_API_KEY"

# تاریخچهٔ پلاک — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/PlateHistory" -H "apikey: YOUR_API_KEY"

# کارت و سند خودرو — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/VehicleCard" -H "apikey: YOUR_API_KEY"

# مشخصات خودرو — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/VehicleInfo" -H "apikey: YOUR_API_KEY"

# خلافی خودرو — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/VehicleViolation" -H "apikey: YOUR_API_KEY"

# گواهینامهٔ جدید — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/DrivingLicense" -H "apikey: YOUR_API_KEY"

# گواهینامهٔ قدیم — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/DrivingLisense" -H "apikey: YOUR_API_KEY"

# نمرهٔ منفی — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/DrivingScore" -H "apikey: YOUR_API_KEY"
```

## خانوادهٔ زحل (پیشوند `/services/inquiry/`)

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| خلافی — مجموع | `/services/inquiry/vehicle_inquiry/total_violations` | POST | طبق مرجع | استعلام مجموع خلافی خودرو |
| خلافی — جزئیات | `/services/inquiry/vehicle_inquiry/violations_details` | POST | طبق مرجع | استعلام جزئیات خلافی خودرو |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# خلافی — مجموع — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/vehicle_inquiry/total_violations" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# خلافی — جزئیات — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/vehicle_inquiry/violations_details" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"
```

!!! note "هدر Host برای خانوادهٔ زحل (پیشوند `/services/`)"

    درخواست‌های این خانواده باید هدر `Host: service.zohal.io` را نیز داشته باشند (پاسخ 400 بدون آن) — در نمونه‌های بالا لحاظ شده است.
