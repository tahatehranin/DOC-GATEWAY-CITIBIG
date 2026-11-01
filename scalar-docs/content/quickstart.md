---
title: شروع سریع
---

# شروع سریع

در چند دقیقه اولین درخواست خود را به CITIBIG API ارسال کنید.

## ۱. کلید بگیرید

کلید API از CITIBIG دریافت کنید. تمام درخواست‌ها هدر `apikey` لازم دارند.

## ۲. آدرس سرویس

```http
http://2.144.22.190:9080
```

## ۳. اولین درخواست

=== "curl"

    ```bash
    curl -X POST "http://2.144.22.190:9080/apiir/sw1/IbanInfo" -H "apikey: YOUR_API_KEY"
    ```

=== "Python"

    ```python
    import requests
    r = requests.post("http://2.144.22.190:9080/ehraz/info/iban-info",
                      headers={"apikey": "YOUR_API_KEY"})
    print(r.json())
    ```

=== "Node.js"

    ```js
    const r = await fetch("http://2.144.22.190:9080/apiir/sw1/IbanInfo", {
      method: "POST",
      headers: { apikey: "YOUR_API_KEY" },
    });
    console.log(await r.json());
    ```

## گام بعدی

- بدنهٔ JSON هر سرویس: ستون «ورودی‌های الزامی» در مرجع API
- کدهای پاسخ و خطا: صفحهٔ «کدهای پاسخ و خطا» در مرجع کامل مستندات
