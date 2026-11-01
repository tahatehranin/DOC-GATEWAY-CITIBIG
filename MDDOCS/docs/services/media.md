# :material-movie-open: رسانه — فیلم و سریال

جستجو و دریافت اطلاعات فیلم و سریال با فیلترهای پیشرفته. سرویس‌های این صفحه روی پیشوند `/api/` سرو می‌شوند و پاسخ به‌صورت مستقیم (بدون wrapper) برمی‌گردد.

!!! note "دربارهٔ نمونه‌های فراخوانی"

    در همهٔ نمونه‌ها متد (GET/POST) صریح ذکر شده و **بدنهٔ درخواست (body) عمداً درج نشده است** — پارامترهای فیلتر به‌صورت query string ارسال می‌شوند.

## سرویس‌های فیلم و سریال

| سرویس | مسیر | متد | ورودی‌های الزامی | توضیح |
|---|---|---|---|---|
| جدیدترین فیلم‌ها | `/api/movies/recent` | GET | — | ۱۰ فیلم آخر |
| جستجوی فیلم | `/api/movies/search` | GET | پارامترهای فیلتر | جستجو با فیلترهای پیشرفته |
| فیلتر فیلم | `/api/movies/filter` | GET | پارامترهای فیلتر | فهرست فیلم‌ها با ستون‌های پایه |
| جدیدترین سریال‌ها | `/api/series/recent` | GET | — | ۱۰ قسمت آخر + نام فیلم |
| جستجوی سریال | `/api/series/search` | GET | `FilmId` | جستجوی قسمت‌های سریال |

**نمونهٔ فراخوانی (بدون بدنه):**

```bash
# جدیدترین فیلم‌ها — GET
curl -X GET "http://2.144.22.190:9080/api/movies/recent" -H "apikey: YOUR_API_KEY"

# جستجوی فیلم — GET
curl -X GET "http://2.144.22.190:9080/api/movies/search" -H "apikey: YOUR_API_KEY"

# فیلتر فیلم — GET
curl -X GET "http://2.144.22.190:9080/api/movies/filter" -H "apikey: YOUR_API_KEY"

# جدیدترین سریال‌ها — GET
curl -X GET "http://2.144.22.190:9080/api/series/recent" -H "apikey: YOUR_API_KEY"

# جستجوی سریال — GET
curl -X GET "http://2.144.22.190:9080/api/series/search" -H "apikey: YOUR_API_KEY"
```

## سینتکس فیلتر (query string)

| عملیات | سینتکس |
|---|---|
| شامل متن | `Name=ilike.*کلمه*` |
| دقیق عددی | `FilmId=eq.6369` |
| بزرگ‌تر از | `IMDB=gt.9` |
| کوچک‌تر از | `Year=lt.2000` |
| AND چندتایی | `?Year=eq.2025&Name=ilike.*mission*` | 
| مرتب‌سازی | `&order=Id.desc` یا `&order=Year.asc` |
| محدودیت | `&limit=10` |

!!! tip "نکتهٔ join سریال"

    سریال دو ارتباط (FK) به جدول فیلم دارد؛ برای join نام فیلم از سینتکس `FilmTbl!SeriesTbl_FilmId_fkey(Name)` استفاده کنید.
