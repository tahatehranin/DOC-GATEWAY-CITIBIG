# CITIBIG Docs Portal (MDDOCS) — nginx static docs portal
# پورت داخلی کانتینر 80 است؛ پورت میزبان از طریق DOCS_PORT قابل تغییر است.
FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="CITIBIG Docs Portal (MDDOCS)" \
      org.opencontainers.image.description="Corporate documentation portal for the CITIBIG API Gateway (APISIX)" \
      org.opencontainers.image.licenses="GPL-3.0-only" \
      org.opencontainers.image.source="https://github.com/tahatehranin/DOC-GATEWAY-CITIBIG"

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY MDDOCS/ /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:80/healthz >/dev/null 2>&1 || exit 1
