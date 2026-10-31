# برگهٔ تقلب APISIX + PostgREST — راهنمای سریع

> **میزبان:** `2.144.22.190` · Data-plane (باز، بدون احراز هویت): `http://2.144.22.190:9080` · Admin API (فقط ساخت/تغییر روت): `http://2.144.22.190:8005`
> سرویس واحد: `media-svc` → PostgREST (`2.144.22.190:3000`)

## ۱. پنج روت فعال (روی 9080)

### فیلم‌های جدید (۱۰ تای جدیدترین)

```bash
curl "http://2.144.22.190:9080/api/movies/recent"
```

### جستجوی فیلم با نام

```bash
curl "http://2.144.22.190:9080/api/movies/search?Name=ilike.*shawshank*"
```

بجای `shawshank` هر کلمه‌ای: `godfather` ، `dark` ، `mission`

### سریال‌های جدید (۱۰ تای جدیدترین + نام فیلم)

```bash
curl "http://2.144.22.190:9080/api/series/recent"
```

### جستجوی سریال با شمارهٔ فیلم (FilmId عددی است → eq)

```bash
curl "http://2.144.22.190:9080/api/series/search?FilmId=eq.6369"
```

### فیلتر فیلم (Id / Name / Year / Country / IMDB)

```bash
curl "http://2.144.22.190:9080/api/movies/filter?limit=2"
curl "http://2.144.22.190:9080/api/movies/filter?Id=eq.1"
curl "http://2.144.22.190:9080/api/movies/filter?Name=ilike.*godfather*&limit=3"
curl "http://2.144.22.190:9080/api/movies/filter?Year=eq.2025&limit=3"
curl "http://2.144.22.190:9080/api/movies/filter?IMDB=gt.9&limit=3"
curl "http://2.144.22.190:9080/api/movies/filter?Year=eq.2025&Name=ilike.*mission*"
curl "http://2.144.22.190:9080/api/movies/filter?Country=ilike.*آمریکا*"
```

### سینتکس فیلتر PostgREST

| عملیات | سینتکس |
|---|---|
| شامل متن | `Name=ilike.*کلمه*` |
| دقیق عددی | `FilmId=eq.6369` |
| بزرگ‌تر از | `IMDB=gt.9` |
| کوچک‌تر از | `Year=lt.2000` |
| AND چندتایی | `?Year=eq.2025&Name=ilike.*mission*` |
| مرتب‌سازی | `&order=Id.desc` یا `&order=Year.asc` |
| محدودیت | `&limit=10` |

### پیت‌فال‌های مهم (گیر نیفتی)

- ✗ `proxy-rewrite` فیلد `query` را نادیده می‌گیرد → کوئری را مستقیم در `uri` بگذار:
  - درست: `"proxy-rewrite":{"uri":"/FilmTbl?limit=10"}`
  - غلط: `"proxy-rewrite":{"uri":"/FilmTbl","query":{"limit":"10"}}`
- ✗ وقتی اسم پارامتر ورودی = اسم ستون، عملگر `ilike` می‌پرد → از `q` استفاده کن
- ✗ سریال دو FK به فیلم دارد → برای join حتماً: `FilmTbl!SeriesTbl_FilmId_fkey(Name)`
- ✗ کشور فارسی ذخیره شده → `Country=ilike.*آمریکا*`

## ۲. مدیریت روت‌ها با Admin API (پورت 8005)

### لیست همه روت‌ها

```bash
curl -s "http://2.144.22.190:8005/apisix/admin/routes" \
     -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" | python3 -m json.tool
```

### دیدن یک روت

```bash
curl -s "http://2.144.22.190:8005/apisix/admin/routes/movies-recent" \
     -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" | python3 -m json.tool
```

### ساخت روت جدید (نمونه: فیلم‌های پربازدید)

```bash
curl -X PUT "http://2.144.22.190:8005/apisix/admin/routes/movies-top" \
     -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" \
     -H "Content-Type: application/json" \
     -d '{"uri":"/api/movies/top","service_id":"media-svc",
          "plugins":{"proxy-rewrite":{"uri":"/FilmTbl?select=Id,Name,Year,Score,IMDB,Image&limit=10&order=Score.desc"}}}'
```

### حذف روت

```bash
curl -X DELETE "http://2.144.22.190:8005/apisix/admin/routes/movies-top" \
     -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1"
```

### نمونهٔ خروجی واقعی

```text
GET /api/movies/recent  →
  {"Id":6373,"Name":"I Swear","Year":2025,"Country":"انگلستان",
   "Director":"","Score":"0","IMDB":"8.4",
   "Image":"http://dl5.moviehouse-app.ir/6373/Poster.jpg"}

GET /api/movies/search?Name=ilike.*shawshank*  →
  [{"Id":1,"Name":"The Shawshank Redemption", ...}]

GET /api/series/recent  →
  {"Id":138,"FilmId":6369,"Session":1,"Episode":1,
   "Link720":"http://dl4.mymoviehouse.ir/6369/",
   "Link1080":"http://dl4.mymoviehouse.ir/6369/",
   "Active":1,"FilmTbl":{"Name":"Man vs. Bee"}}
```

## ۳. پیوندها

- [داکیومنت جامع CITIBIG-GATEWAY](citibig-gateway-apisix-docs.md)
