# APISIX + PostgREST — راهنمای دستورات (host 2.144.22.190)

Data-plane بازه (بدون احراز هویت):  `http://2.144.22.190:9080`
Admin API (فقط برای ساخت/تغییر روت): `http://2.144.22.190:8005`
Admin Key: `edd1c9f034335f136f87ad84b625c8f1`
سرویس واحد: `media-svc`  →  PostgREST (2.144.22.190:3000)

====================================================================
۱) پنج روت فعال (همه روی :9080، بدون auth)
====================================================================

■ فیلم‌های جدید (۱۰ تا، جدیدترین)
  curl "http://2.144.22.190:9080/api/movies/recent"

■ جستجوی فیلم با نام
  curl "http://2.144.22.190:9080/api/movies/search?Name=ilike.*shawshank*"
  (بجای shawshank هر کلمه‌ای: godfather , dark , mission)

■ سریال‌های جدید (۱۰ تا، جدیدترین + نام فیلم)
  curl "http://2.144.22.190:9080/api/series/recent"

■ جستجوی سریال با شماره فیلم (FilmId عددیه → eq)
  curl "http://2.144.22.190:9080/api/series/search?FilmId=eq.6369"

■ فیلتر فیلم (Id, Name, Year, Country, IMDB)
  curl "http://2.144.22.190:9080/api/movies/filter?limit=2"
  curl "http://2.144.22.190:9080/api/movies/filter?Id=eq.1"
  curl "http://2.144.22.190:9080/api/movies/filter?Name=ilike.*godfather*&limit=3"
  curl "http://2.144.22.190:9080/api/movies/filter?Year=eq.2025&limit=3"
  curl "http://2.144.22.190:9080/api/movies/filter?IMDB=gt.9&limit=3"
  curl "http://2.144.22.190:9080/api/movies/filter?Year=eq.2025&Name=ilike.*mission*"
  # کشور فارسی ذخیره شده:
  curl "http://2.144.22.190:9080/api/movies/filter?Country=ilike.*آمریکا*"

====================================================================
۲) سینتکس فیلتر PostgREST (برای فیلدهای بیشتر)
====================================================================
  شامل متن      :  Name=ilike.*کلمه*
  دقیق عددی     :  FilmId=eq.6369
  بزرگتر از     :  IMDB=gt.9
  کوچکتر از     :  Year=lt.2000
  AND چندتایی   :  ?Year=eq.2025&Name=ilike.*mission*
  مرتب‌سازی     :  &order=Id.desc   (یا  &order=Year.asc)
  محدودیت       :  &limit=10

====================================================================
۳) دیدن/مدیریت روت‌ها (Admin API روی :8005)
====================================================================

■ لیست همه روت‌ها
  curl -s "http://2.144.22.190:8005/apisix/admin/routes" \
       -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" | python3 -m json.tool

■ دیدن یک روت
  curl -s "http://2.144.22.190:8005/apisix/admin/routes/movies-recent" \
       -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1"

■ ساخت روت جدید (مثال: فیلم‌های پربازدید)
  curl -X PUT "http://2.144.22.190:8005/apisix/admin/routes/movies-top" \
       -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" \
       -H "Content-Type: application/json" \
       -d '{"uri":"/api/movies/top","service_id":"media-svc",
            "plugins":{"proxy-rewrite":{"uri":"/FilmTbl?select=Id,Name,Year,Score,IMDB,Image&limit=10&order=Score.desc"}}}'

■ حذف روت
  curl -X DELETE "http://2.144.22.190:8005/apisix/admin/routes/movies-top" \
       -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1"

====================================================================
۴) پیت‌فال‌های مهم (گیر نیفتی)
====================================================================
  ✗ proxy-rewrite فیلد "query" رو نادیده می‌گیره → کوئری رو مستقیم توی "uri" بذار
      درست:  "proxy-rewrite":{"uri":"/FilmTbl?limit=10"}
      غلط:   "proxy-rewrite":{"uri":"/FilmTbl","query":{"limit":"10"}}
  ✗ وقتی اسم پارامتر ورودی = اسم ستون، عملگر ilike می‌پره → از q استفاده کن
  ✗ سریال دو تا FK به فیلم داره → برای join حتماً بنویس:
      FilmTbl!SeriesTbl_FilmId_fkey(Name)
  ✗ کشور فارسیه → Country=ilike.*آمریکا*

====================================================================
۵) نمونه خروجی واقعی
====================================================================
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

GET /api/series/search?FilmId=eq.6369  →
  [{"Id":138,"FilmId":6369,"Session":1, ... "FilmTbl":{"Name":"Man vs. Bee"}}]
