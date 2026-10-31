# :material-car-info: خودرو و گواهینامه

استعلام پلاک، خلافی، سند و مشخصات خودرو، گواهینامهٔ رانندگی و نمرهٔ منفی. قالب پاسخ هر خانواده در [کدهای پاسخ و خطا](../errors.md) مستند است.

## خانوادهٔ `/apiir/sw1/` (POST)

| سرویس | مسیر | ورودی‌های الزامی | توضیح |
|---|---|---|---|
| پلاک‌های فعال | `/apiir/sw1/ActivePlates` | `nationalCode`، `mobile` | استعلام پلاک‌های فعال |
| تاریخچهٔ پلاک | `/apiir/sw1/PlateHistory` | `nationalCode`، `plateNumber` | استعلام تاریخچهٔ پلاک |
| کارت و سند خودرو | `/apiir/sw1/VehicleCard` | `nationalCode`، `plateNumber` | استعلام کارت و سند خودرو |
| مشخصات خودرو | `/apiir/sw1/VehicleInfo` | `nationalCode`، `plateNumber` | استعلام مشخصات و مدل خودرو |
| خلافی خودرو | `/apiir/sw1/VehicleViolation` | `nationalCode`، `mobile`، `plateNumber` | استعلام خلافی خودرو |
| گواهینامهٔ جدید | `/apiir/sw1/DrivingLicense` | `nationalCode`، `mobile` | استعلام گواهینامهٔ رانندگی جدید |
| گواهینامهٔ قدیم | `/apiir/sw1/DrivingLisense` | `nationalCode`، `mobile` | استعلام گواهینامهٔ رانندگی قدیم |
| نمرهٔ منفی | `/apiir/sw1/DrivingScore` | `nationalCode`، `mobile`، `licenseNumber` | استعلام نمرهٔ منفی گواهینامه |

## خانوادهٔ `/services/inquiry/` (POST)

| سرویس | مسیر | ورودی‌های الزامی | توضیح |
|---|---|---|---|
| خلافی — مجموع | `/services/inquiry/vehicle_inquiry/total_violations` | طبق مرجع | استعلام مجموع خلافی خودرو |
| خلافی — جزئیات | `/services/inquiry/vehicle_inquiry/violations_details` | طبق مرجع | استعلام جزئیات خلافی خودرو |

!!! note "هدر Host برای خانوادهٔ `/services/`"

    درخواست‌های این خانواده باید هدر `Host: service.zohal.io` را نیز داشته باشند (پاسخ 400 بدون آن).
