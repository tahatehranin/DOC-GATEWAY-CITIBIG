# DOC-GATEWAY-CITIBIG — پورتال مستندات دروازه سرویس CITIBIG

مستندات رسمی و پورتال نمایش **CITIBIG API** — پلتفرم یکپارچهٔ سرویس‌های داده و استعلام — شامل کاتالوگ کامل سرویس‌ها، UI شرکتی (روشن/شب)، لوگو، صفحهٔ اول، حق کپی‌رایت و لایسنس GPL-3.0.

- **مخزن GitHub:** https://github.com/tahatehranin/DOC-GATEWAY-CITIBIG — نگهداری توسط تیم tahavey18
- **مخزن GitLab (hamgit.ir):** https://hamgit.ir/tahavey18/DOC-GATEWAY-CITIBIG
- **لایسنس:** [GPL-3.0](LICENSE) · © ۲۰۲۶ CITIBIG — تمام حقوق محفوظ است.

---

## ۱. ساختار پروژه

```
DOC-GATEWAY-CITIBIG/
├── MDDOCS/                  ← پروژهٔ MkDocs Material
│   ├── mkdocs.yml           ← کانفیگ (RTL فارسی، تم شرکتی، nav)
│   ├── docs/                ← تک‌تک مستندات (Markdown)
│   │   ├── index.md               ← صفحهٔ اول: کاور، ویژگی‌ها، کپی‌رایت
│   │   ├── getting-started.md     ← شروع سریع
│   │   ├── authentication.md      ← احراز هویت
│   │   ├── errors.md              ← کدهای پاسخ و خطا
│   │   ├── license.md             ← حق نشر و لایسنس (کوتاه)
│   │   └── services/              ← مرجع ۹ خانوادهٔ سرویس
│   │       ├── identity.md / banking.md / bills.md
│   │       ├── telecom.md / vehicle.md / business.md
│   │       └── location.md / media.md / tools.md
│   ├── docs/assets/         ← لوگو + فونت وزیرمتن (کاملاً آفلاین)
│   └── docs/stylesheets/    ← استایل شرکتی (extra.css)
├── deploy/nginx.conf        ← کانفیگ nginx کانتینر (charset utf-8 + healthz)
├── Dockerfile               ← بیلد دو مرحله‌ای (mkdocs --strict → nginx)
├── docker-compose.yml       ← با DOCS_PORT قابل‌تنظیم (پیش‌فرض 3100)
├── .env.example             ← نمونهٔ تنظیمات
├── .github/workflows/sync-to-gitlab.yml  ← سینک خودکار به hamgit.ir
└── LICENSE                  ← GNU General Public License v3.0
```

## ۲. اجرای محلی با داکر

```bash
cp .env.example .env          # اختیاری — پورت پیش‌فرض 3100
docker compose up -d --build
# → http://localhost:3100
```

تغییر پورت به 3101 (یا هر پورت دیگر):

```bash
DOCS_PORT=3101 docker compose up -d
```

پیش‌نمایش محلی بدون داکر (رندر زندهٔ MkDocs Material):

```bash
python -m pip install "mkdocs-material~=9.5"
python -m mkdocs serve          # از داخل پوشهٔ MDDOCS
# → http://localhost:8000
```

> بیلد نهایی با `python -m mkdocs build --strict` انجام می‌شود؛ در حالت strict هر لینک شکسته یا هشدار مارک‌داون بیلد را متوقف می‌کند — یعنی مستندات همیشه سالم بیلد می‌شوند.

## 3. استقرار در Dokploy (از روی مخزن GitLab)

Dokploy از روی همین مخزن ایمیج را می‌سازد و اجرا می‌کند.

**روش پیشنهادی — Docker Compose:**
1. در Dokploy یک سرویس از نوع **Compose** بسازید و مخزن `hamgit.ir/tahavey18/DOC-GATEWAY-CITIBIG` را وصل کنید.
2. Dokploy خودش `docker-compose.yml` را تشخیص می‌دهد.
3. پورت میزبان را در Dokploy (تب Network → Host Port) یا با متغیر محیطی `DOCS_PORT` تنظیم کنید — پیش‌فرض 3100؛ 3101 هم می‌شود.
4. Domain: پورت کانتینر `80` را مپ کنید.

**روش دوم — Application (Dockerfile):**
1. سرویس از نوع **Application** با Build Type = Dockerfile.
2. Dockerfile Path = `./Dockerfile` و **Container Port = 80**.
3. پورت بیرونی هر عددی (3100/3101/…) در UI داکپولی.

> سلامت سرویس: `GET /healthz` همیشه `ok` برمی‌گرداند — به‌عنوان Health Check در داکپولی قابل ثبت است.

## ۴. سینک خودکار GitHub → hamgit.ir

Workflow ی `sync-to-gitlab.yml` روی هر پوش (همهٔ برنچ‌ها یا تگ‌ها) تاریخچهٔ کامل را آینه‌ای به مخزن خصوصی hamgit.ir می‌پوش می‌کند.

**یک‌بار تنظیم لازم (الزامی):**

1. در GitHub به `Settings → Secrets and variables → Actions` بروید و **New repository secret** بزنید.
2. Name: `GITLAB_TOKEN` — Value: توکن شخصی hamgit.ir (همان `glpat-…` در اختیار شما).
3. بعد از آن، هر پوش به GitHub خودکار به GitLab هم پوش می‌شود. اجرای دستی: تب **Actions → Mirror to GitLab (hamgit.ir) → Run workflow**.

> ⚠️ توکن در هیچ فایلی ذخیره نمی‌شود و فقط از `secrets.GITLAB_TOKEN` خوانده می‌شود. برای امنیت بیشتر، چون توکن فعلی در چت اشتراک شده، پیشنهاد می‌شود توکن جدیدی با محدودهٔ `write_repository` در hamgit.ir بسازید و همان را در Secrets بگذارید.

## ۵. افزودن مستند جدید

1. فایل `.md` را در `MDDOCS/docs/` بگذارید و در `MDDOCS/mkdocs.yml` بخش `nav:` یک خط اضافه کنید.
2. پیش‌نمایش محلی: `python -m mkdocs serve`
3. کامیت و پوش — بیلد داکر و مخزن GitLab خودکار به‌روز می‌شوند.

## 6. نکات نگهداری

- **امنیت:** در مستندات کلیدهای واقعی درج شده؛ هر دو مخزن باید خصوصی بمانند.
- فونت وزیرمتن، marked.js و لوگو داخل مخزن هستند — سایت کاملاً آفلاین و بدون CDN کار می‌کند.
- بازسازی ایمیج: `docker compose build --no-cache`
- لایسنس مخزن GPL-3.0 است؛ هر استفاده باید مطابق آن باشد.
