# :material-movie-open: رسانه — فیلم و سریال

جستجو و دریافت اطلاعات فیلم و سریال با فیلترهای پیشرفته. سرویس‌های این صفحه روی پیشوند `/api/` سرو می‌شوند و پاسخ به‌صورت مستقیم (بدون wrapper) برمی‌گردد.

## سرویس‌های فیلم (POST جز `filter` و `recent` که GET است)

| سرویس | مسیر | ورودی‌های الزامی | توضیح |
|---|---|---|---|
| جدیدترین فیلم‌ها | `/api/movies/recent` | — (GET) | ۱۰ فیلم آخر |
| جستجوی فیلم | `/api/movies/search` | پارامترهای فیلتر (GET) | جستجو با فیلترهای پیشرفته |
| فیلتر فیلم | `/api/movies/filter` | پارامترهای فیلتر (GET) | فهرست فیلم‌ها با ستون‌های پایه |
| جدیدترین سریال‌ها | `/api/series/recent` | — (GET) | ۱۰ قسمت آخر + نام فیلم |
| جستجوی سریال | `/api/series/search` | `FilmId` (GET) | جستجوی قسمت‌های سریال |

## سینتکس فیلتر

| عملیات | سینتکس |
|---|---|
| شامل متن | `Name=ilike.*کلمه*` |
| دقیق عددی | `FilmId=eq.6369` |
| بزرگ‌تر از | `IMDB=gt.9` |
| کوچک‌تر از | `Year=lt.2000` |
| AND چندتایی | `?Year=eq.2025&Name=ilike.*mission*` |
| مرتب‌سازی | `&order=Id.desc` یا `&order=Year.asc` |
| محدودیت | `&limit=10` |

## نمونهٔ فراخوانی

```bash
# جدیدترین فیلم‌ها
curl "http://2.144.22.190:9080/api/movies/recent" -H "apikey: YOUR_API_KEY"

# جستجوی فیلم با نام
curl "http://2.144.22.190:9080/api/movies/search?Name=ilike.*shawshank*" -H "apikey: YOUR_API_KEY"

# فیلتر ترکیبی
curl "http://2.144.22.190:9080/api/movies/filter?Year=eq.2025&Name=ilike.*mission*" -H "apikey: YOUR_API_KEY"
```

## نمونهٔ پاسخ

```json
{
  "Id": 6373,
  "Name": "I Swear",
  "Year": 2025,
  "Country": "انگلستان",
  "Director": "",
  "Score": "0",
  "IMDB": "8.4",
  "Image": "..."
}
```

!!! tip "نکتهٔ join سریال"

    سریال دو ارتباط (FK) به جدول فیلم دارد؛ برای join نام فیلم از سینتکس `FilmTbl!SeriesTbl_FilmId_fkey(Name)` استفاده کنید.
