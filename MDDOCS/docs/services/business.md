# :material-office-building: کسب‌وکار و اشخاص حقوقی

اطلاعات شرکت‌ها، اعضا و امضاداران، مالیات، مجوزها و اینماد. قالب پاسخ هر خانواده در [کدهای پاسخ و خطا](../errors.md) مستند است.

## خانوادهٔ `/apiir/sw1/` (POST)

| سرویس | مسیر | ورودی‌های الزامی | توضیح |
|---|---|---|---|
| اطلاعات شرکت | `/apiir/sw1/CompanyInfo` | `nationalID` | استعلام شخص حقوقی |
| هیئت مدیره | `/apiir/sw1/CompanyMembers` | `nationalID` | استعلام اعضای هیئت‌مدیره |
| روزنامهٔ رسمی | `/apiir/sw1/CompanyNewspapers` | `nationalID` | استعلام آگهی‌های روزنامهٔ رسمی |
| امضاداران | `/apiir/sw1/CompanySignatories` | `nationalID` | استعلام صاحبین حق امضا |
| پروندهٔ مالیاتی | `/apiir/sw1/TaxRecords` | `inquiryCode` | استعلام پرونده‌های مالیاتی |
| مجوز شغلی | `/apiir/sw1/License` | `trackingCode` | استعلام اعتبار مجوز شغلی |
| پروانهٔ پزشکی | `/apiir/sw1/MedicalLicense` | `medicalCode` | استعلام اعتبار پروانهٔ پزشکی |
| اینماد | `/apiir/sw1/Enamad` | `domain` | استعلام دارندهٔ اینماد |

## خانوادهٔ `/ehraz/legal/` (POST)

| سرویس | مسیر | ورودی‌های الزامی | توضیح |
|---|---|---|---|
| اطلاعات حقوقی | `/ehraz/legal/company-info` | `nationalCode` | اطلاعات حقوقی شرکت |
| مجوزهای شرکت | `/ehraz/legal/certificates` | `nationalCode` | مجوزهای شرکت |
| شرکت مادر | `/ehraz/legal/parents` | `nationalCode` | شرکت‌های مادر |
| زیرمجموعه‌ها | `/ehraz/legal/children` | `nationalCode` | شرکت‌های زیرمجموعه |
| مدیرعامل | `/ehraz/legal/ceo` | `nationalCode` | مدیرعامل شرکت |
| اعضا | `/ehraz/legal/members` | `nationalCode` | اعضای شرکت |
| امضاداران | `/ehraz/legal/sign-holders` | `nationalCode` | امضاداران شرکت |
| روزنامهٔ رسمی | `/ehraz/legal/official-gazette` | `nationalCode` | آگهی‌های روزنامهٔ رسمی شرکت |

## خانوادهٔ `/services/inquiry/` (POST)

| سرویس | مسیر | ورودی‌های الزامی | توضیح |
|---|---|---|---|
| اطلاعات شرکت | `/services/inquiry/company_inquiry` | طبق مرجع | استعلام اطلاعات شرکت |
| هیئت مدیره | `/services/inquiry/company_inquiry/board_members` | طبق مرجع | اعضای هیئت‌مدیرهٔ شرکت |
| تاریخچهٔ هیئت مدیره | `/services/inquiry/company_inquiry/board_members/history` | طبق مرجع | تاریخچهٔ هیئت‌مدیرهٔ شرکت |

!!! note "هدر Host برای خانوادهٔ `/services/`"

    درخواست‌های این خانواده باید هدر `Host: service.zohal.io` را نیز داشته باشند (پاسخ 400 بدون آن).
