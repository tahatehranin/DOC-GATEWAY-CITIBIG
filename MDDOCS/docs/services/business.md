# :material-office-building: کسب‌وکار و اشخاص حقوقی

اطلاعات شرکت‌ها، اعضا و امضاداران، مالیات، مجوزها و اینماد. قالب پاسخ هر خانواده در [کدهای پاسخ و خطا](../errors.md) مستند است.

!!! note "دربارهٔ نمونه‌های فراخوانی"

    در همهٔ نمونه‌ها متد (GET/POST) صریح ذکر شده و **بدنهٔ درخواست (body) عمداً درج نشده است** — طبق ستون «ورودی‌های الزامی»، بدنهٔ JSON بعداً به هر کرل اضافه می‌شود.

## خانوادهٔ `/apiir/sw1/`

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| اطلاعات شرکت | `/apiir/sw1/CompanyInfo` | POST | `nationalID` | استعلام شخص حقوقی |
| هیئت مدیره | `/apiir/sw1/CompanyMembers` | POST | `nationalID` | استعلام اعضای هیئت‌مدیره |
| روزنامهٔ رسمی | `/apiir/sw1/CompanyNewspapers` | POST | `nationalID` | استعلام آگهی‌های روزنامهٔ رسمی |
| امضاداران | `/apiir/sw1/CompanySignatories` | POST | `nationalID` | استعلام صاحبین حق امضا |
| پروندهٔ مالیاتی | `/apiir/sw1/TaxRecords` | POST | `inquiryCode` | استعلام پرونده‌های مالیاتی |
| مجوز شغلی | `/apiir/sw1/License` | POST | `trackingCode` | استعلام اعتبار مجوز شغلی |
| پروانهٔ پزشکی | `/apiir/sw1/MedicalLicense` | POST | `medicalCode` | استعلام اعتبار پروانهٔ پزشکی |
| اینماد | `/apiir/sw1/Enamad` | POST | `domain` | استعلام دارندهٔ اینماد |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# اطلاعات شرکت — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/CompanyInfo" -H "apikey: YOUR_API_KEY"

# هیئت مدیره — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/CompanyMembers" -H "apikey: YOUR_API_KEY"

# روزنامهٔ رسمی — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/CompanyNewspapers" -H "apikey: YOUR_API_KEY"

# امضاداران — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/CompanySignatories" -H "apikey: YOUR_API_KEY"

# پروندهٔ مالیاتی — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/TaxRecords" -H "apikey: YOUR_API_KEY"

# مجوز شغلی — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/License" -H "apikey: YOUR_API_KEY"

# پروانهٔ پزشکی — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/MedicalLicense" -H "apikey: YOUR_API_KEY"

# اینماد — POST
curl -X POST "http://2.144.22.190:9080/apiir/sw1/Enamad" -H "apikey: YOUR_API_KEY"
```

## خانوادهٔ `/ehraz/legal/`

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| اطلاعات حقوقی | `/ehraz/legal/company-info` | POST | `nationalCode` | اطلاعات حقوقی شرکت |
| مجوزهای شرکت | `/ehraz/legal/certificates` | POST | `nationalCode` | مجوزهای شرکت |
| شرکت مادر | `/ehraz/legal/parents` | POST | `nationalCode` | شرکت‌های مادر |
| زیرمجموعه‌ها | `/ehraz/legal/children` | POST | `nationalCode` | شرکت‌های زیرمجموعه |
| مدیرعامل | `/ehraz/legal/ceo` | POST | `nationalCode` | مدیرعامل شرکت |
| اعضا | `/ehraz/legal/members` | POST | `nationalCode` | اعضای شرکت |
| امضاداران | `/ehraz/legal/sign-holders` | POST | `nationalCode` | امضاداران شرکت |
| روزنامهٔ رسمی | `/ehraz/legal/official-gazette` | POST | `nationalCode` | آگهی‌های روزنامهٔ رسمی شرکت |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# اطلاعات حقوقی — POST
curl -X POST "http://2.144.22.190:9080/ehraz/legal/company-info" -H "apikey: YOUR_API_KEY"

# مجوزهای شرکت — POST
curl -X POST "http://2.144.22.190:9080/ehraz/legal/certificates" -H "apikey: YOUR_API_KEY"

# شرکت مادر — POST
curl -X POST "http://2.144.22.190:9080/ehraz/legal/parents" -H "apikey: YOUR_API_KEY"

# زیرمجموعه‌ها — POST
curl -X POST "http://2.144.22.190:9080/ehraz/legal/children" -H "apikey: YOUR_API_KEY"

# مدیرعامل — POST
curl -X POST "http://2.144.22.190:9080/ehraz/legal/ceo" -H "apikey: YOUR_API_KEY"

# اعضا — POST
curl -X POST "http://2.144.22.190:9080/ehraz/legal/members" -H "apikey: YOUR_API_KEY"

# امضاداران — POST
curl -X POST "http://2.144.22.190:9080/ehraz/legal/sign-holders" -H "apikey: YOUR_API_KEY"

# روزنامهٔ رسمی — POST
curl -X POST "http://2.144.22.190:9080/ehraz/legal/official-gazette" -H "apikey: YOUR_API_KEY"
```

## خانوادهٔ `/services/inquiry/`

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| اطلاعات شرکت | `/services/inquiry/company_inquiry` | POST | طبق مرجع | استعلام اطلاعات شرکت |
| هیئت مدیره | `/services/inquiry/company_inquiry/board_members` | POST | طبق مرجع | اعضای هیئت‌مدیرهٔ شرکت |
| تاریخچهٔ هیئت مدیره | `/services/inquiry/company_inquiry/board_members/history` | POST | طبق مرجع | تاریخچهٔ هیئت‌مدیرهٔ شرکت |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# اطلاعات شرکت — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/company_inquiry" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# هیئت مدیره — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/company_inquiry/board_members" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"

# تاریخچهٔ هیئت مدیره — POST
curl -X POST "http://2.144.22.190:9080/services/inquiry/company_inquiry/board_members/history" -H "apikey: YOUR_API_KEY" -H "Host: service.zohal.io"
```

!!! note "هدر Host برای خانوادهٔ `/services/`"

    درخواست‌های این خانواده باید هدر `Host: service.zohal.io` را نیز داشته باشند (پاسخ 400 بدون آن) — در نمونه‌های بالا لحاظ شده است.
