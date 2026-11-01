
FROM python:3.12-slim AS build

ARG PIP_INDEX_URL=https://pypi.org/simple
ENV PIP_INDEX_URL=${PIP_INDEX_URL} \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    NO_MKDOCS_2_WARNING=1

WORKDIR /app
COPY MDDOCS/ /app/

RUN pip install --no-cache-dir "mkdocs-material~=9.5" \
    && python -m mkdocs build --strict --site-dir site

FROM nginx:stable-alpine3.24

WORKDIR /usr/share/nginx/html

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/site/ .

EXPOSE 3100

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://127.0.0.1:3100/healthz >/dev/null 2>&1 || exit 1
    
