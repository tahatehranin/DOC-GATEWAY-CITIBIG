# =====================================================================
# CITIBIG Gateway Docs (MkDocs Material) — multi-stage build
# Stage 1: build the static site with mkdocs-material (--strict)
# Stage 2: serve it with nginx (internal port 80; host port via DOCS_PORT)
# =====================================================================
FROM python:3.12-slim AS build

# در صورت نیاز به mirror، در Dokploy این build-arg را تغییر دهید:
ARG PIP_INDEX_URL=https://pypi.org/simple
ENV PIP_INDEX_URL=${PIP_INDEX_URL} \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    NO_MKDOCS_2_WARNING=1

WORKDIR /app
COPY MDDOCS/ /app/

RUN pip install --no-cache-dir "mkdocs-material~=9.5" \
 && python -m mkdocs build --strict --site-dir site

FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="CITIBIG Docs Portal (MkDocs Material)" \
      org.opencontainers.image.description="Corporate documentation portal for the CITIBIG API Gateway (APISIX)" \
      org.opencontainers.image.licenses="GPL-3.0-only" \
      org.opencontainers.image.source="https://github.com/tahatehranin/DOC-GATEWAY-CITIBIG"

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/site/ /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:80/healthz >/dev/null 2>&1 || exit 1
