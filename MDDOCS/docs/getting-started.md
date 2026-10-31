# :material-rocket-launch: شروع سریع

در چند دقیقه اولین درخواست خود را به CITIBIG API ارسال کنید.

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

هر خانوادهٔ سرویس پیشوند اختصاصی خودش را دارد (مثلاً `/apiir/sw1/`، `/ehraz/`، `/services/`). فهرست کامل مسیرها در [مرجع سرویس‌ها](services/identity.md) آمده است.

## اولین درخواست

=== "curl"

    ```bash
    curl -X POST "http://2.144.22.190:9080/apiir/Sandbox/Echo" \
      -H "apikey: YOUR_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{"name":"test"}'
    ```

=== "Python"

    ```python
    import requests
    r = requests.post("http://2.144.22.190:9080/apiir/Sandbox/Echo",
                      headers={"apikey": "YOUR_API_KEY"},
                      json={"name": "test"})
    print(r.json())
    ```

=== "Node.js"

    ```js
    const r = await fetch("http://2.144.22.190:9080/apiir/Sandbox/Echo", {
      method: "POST",
      headers: { apikey: "YOUR_API_KEY", "Content-Type": "application/json" },
      body: JSON.stringify({ name: "test" }),
    });
    console.log(await r.json());
    ```

## گام بعدی

- [احراز هویت](authentication.md) — ساختار هدرها و مدیریت کلید
- [مرجع سرویس‌ها](services/identity.md) — کاتالوگ کامل ۱۳۰+ اندپوینت
- [کدهای پاسخ و خطا](errors.md) — معنای هر پاسخ
