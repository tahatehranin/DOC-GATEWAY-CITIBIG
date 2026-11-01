# :material-rocket-launch: شروع سریع

در چند دقیقه اولین درخواست خود را به CITIBIG API ارسال کنید. نمونه‌ها بدون بدنه (body) هستند؛ بدنهٔ JSON هر سرویس طبق ستون «ورودی‌های الزامی» در [مرجع سرویس‌ها](services/identity.md) بعداً اضافه می‌شود.

## پیش‌نیازها

- یک کلید API فعال (دریافت کلید از CITIBIG)
- هر ابزار HTTP استاندارد: `curl`، Postman یا هر زبان برنامه‌نویسی

## آدرس سرویس (Base URL)

```text
http://2.144.22.190:9080
```

## ساختار کلی درخواست

```text
{BASE}/{service-prefix}/{endpoint}
```

هر خانوادهٔ سرویس پیشوند اختصاصی خودش را دارد (مثلاً `/apiir/sw1/` (api.ir)، `/ehraz/` (Ehraz)، `/services/` (زحل)). فهرست کامل مسیرها در [مرجع سرویس‌ها](services/identity.md) آمده است.

## اولین درخواست

=== "curl"

    ```bash
    curl -X POST "http://2.144.22.190:9080/apiir/Sandbox/Echo" \
      -H "apikey: YOUR_API_KEY"
    ```

=== "Python"

    ```python
    import requests
    r = requests.post("http://2.144.22.190:9080/apiir/Sandbox/Echo",
                      headers={"apikey": "YOUR_API_KEY"})
    print(r.json())
    ```

=== "Node.js"

    ```js
    const r = await fetch("http://2.144.22.190:9080/apiir/Sandbox/Echo", {
      method: "POST",
      headers: { apikey: "YOUR_API_KEY" },
    });
    console.log(await r.json());
    ```

## گام بعدی

- [مرجع تعاملی API](api-reference.html) — همهٔ ۱۴۳ اندپوینت با اجرای آزمایشی و نمونه‌کد

- [احراز هویت](authentication.md) — ساختار هدرها و مدیریت کلید
- [مرجع سرویس‌ها](services/identity.md) — کاتالوگ کامل ۱۴۳ اندپوینت
- [کدهای پاسخ و خطا](errors.md) — معنای هر پاسخ
