<div align="center">

<img src="MDDOCS/docs/assets/img/logo.png" alt="CITIBIG" width="340"/>

# DOC-GATEWAY-CITIBIG

**CITIBIG API** documentation portal — corporate docs built with MkDocs Material (RTL, dark/light), shipped as a Docker image, mirrored to GitLab and released automatically.

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)
[![Release](https://img.shields.io/github/v/release/tahatehranin/DOC-GATEWAY-CITIBIG?logo=github)](https://github.com/tahatehranin/DOC-GATEWAY-CITIBIG/releases)
[![Release CI](https://github.com/tahatehranin/DOC-GATEWAY-CITIBIG/actions/workflows/release.yml/badge.svg)](https://github.com/tahatehranin/DOC-GATEWAY-CITIBIG/actions/workflows/release.yml)
[![Mirror CI](https://github.com/tahatehranin/DOC-GATEWAY-CITIBIG/actions/workflows/sync-to-gitlab.yml/badge.svg)](https://github.com/tahatehranin/DOC-GATEWAY-CITIBIG/actions/workflows/sync-to-gitlab.yml)
[![Material for MkDocs](https://img.shields.io/badge/Material_for_MkDocs-526CFE?logo=materialformkdocs&logoColor=white)](https://squidfunk.github.io/mkdocs-material/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](#run-locally-with-docker)

**English** | [فارسی](README.FA.md)

</div>

---

## About

This repository holds the **official documentation portal of CITIBIG API** — a unified API platform for identity, banking, bills, telecom, vehicle, business, location and media services.

- Customer-facing docs: **9 service families, 143 endpoints** (every endpoint with a ready-to-use curl)
- Formal Persian (RTL) with an English-friendly code layout
- Corporate theme (navy/crimson palette, Vazirmatn font, bundled locally)
- Strict build (`mkdocs build --strict`) — broken links fail the build
- Multi-stage Docker image (build → nginx) with an editable host port

## Documentation structure

```
MDDOCS/
├── mkdocs.yml            # MkDocs Material config (RTL, corporate theme, nav)
└── docs/
    ├── index.md            # Home: cover, features, copyright
    ├── getting-started.md  # Quick start (curl / Python / Node.js tabs)
    ├── authentication.md   # API key authentication
    ├── errors.md           # Response & error codes
    ├── license.md          # Copyright & license (short)
    └── services/           # Developer reference (9 families)
        ├── identity.md   banking.md   bills.md
        ├── telecom.md    vehicle.md   business.md
        └── location.md   media.md     tools.md
```

## Run locally with Docker

```bash
cp .env.example .env          # optional — default host port is 3100
docker compose up -d --build
# → http://localhost:3100
```

Change the host port: `DOCS_PORT=3101 docker compose up -d`

## Local preview (no Docker)

```bash
python -m pip install "mkdocs-material~=9.5"
python -m mkdocs serve        # from the MDDOCS directory
# → http://localhost:8000
```

## Deploy on Dokploy

1. Create a **Compose** service pointing at this repository (GitHub or the GitLab mirror).
2. Dokploy detects `docker-compose.yml`; the container port is **80**.
3. Host port via the `DOCS_PORT` env var (default **3100**, changeable to 3101 etc.).
4. Health check: `GET /healthz` (always returns `ok`).

## Automated releases

Releases follow [Semantic Versioning](https://semver.org) with `vX.Y.Z` tags.

| Step | Action |
|---|---|
| 1 | Bump the `VERSION` file (e.g. `1.0.1`) and push to `main` |
| 2 | `release.yml` creates tag `v1.0.1` + a GitHub Release with auto-generated notes |
| 3 | Or run **Actions → Release → Run workflow** and type the version manually |

The release job is idempotent — it skips when the tag already exists.


## Adding a documentation page

1. Add a `.md` file under `MDDOCS/docs/` (service pages go to `docs/services/`).
2. Register it in the `nav:` section of `MDDOCS/mkdocs.yml`.
3. Preview with `mkdocs serve`, then commit — strict build keeps links/tables valid.

## Maintenance notes

- Docs embed **real service keys** — both remotes must stay **private**.
- Fonts, icons and the logo are bundled — the site works fully offline (no CDN).
- Rebuild from scratch: `docker compose build --no-cache`.

## License

Released under the [GNU GPL v3.0](LICENSE). Copyright © 2026 CITIBIG — all rights reserved.
