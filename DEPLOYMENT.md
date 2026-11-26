# Deployment (Cloudflare Pages)

## Production at a glance

| | |
|---|---|
| Live domains | `https://airmeiz.com`, `https://www.airmeiz.com` |
| Cloudflare account | `33c877338d93a3cc446a9b1419a27d5b` (the account that also owns the `airmeiz.com` zone) |
| Pages project | `airmeiz` (`https://airmeiz.pages.dev`) — a **Direct Upload** project, not Git-connected |
| Deploys from | GitHub Actions workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) |
| Trigger | Every push to `main`, or manually via *Actions → Deploy to Cloudflare Pages (production) → Run workflow* |
| Build | `npm ci --prefix react-app` then `npm run build` → uploads `react-app/dist` |
| Static config | `public/_headers` and `public/_redirects` (copied into `react-app/dist` by Vite) |

Do **not** connect this repository to Cloudflare Pages through the Cloudflare GitHub app
(dashboard "Connect to Git"). Deployments go through the workflow above with an API token, so
the account and project are explicit in the repository. A Git-connected Pages project in another
account was the cause of an outage where pushes deployed successfully but never reached the live
domains (see *History* below).

## How a deployment works

1. A push to `main` starts the workflow. Production deployments are serialized
   (`concurrency: cloudflare-pages-production-airmeiz`): a newer push waits for the running one.
2. The workflow builds the React app and runs
   `wrangler pages deploy react-app/dist --project-name=airmeiz --branch=main` against account
   `33c877338d93a3cc446a9b1419a27d5b`, recording the commit hash on the Cloudflare deployment.
3. It then checks that both `airmeiz.com` and `www.airmeiz.com` serve the JavaScript bundle
   from this build, and fails the run if they don't within ~3 minutes.

## Required GitHub configuration

Repository secret (Settings → Secrets and variables → Actions → *New repository secret*):

| Secret | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | A Cloudflare API token limited to account `33c877338d93a3cc446a9b1419a27d5b` with **Account → Cloudflare Pages → Edit**. Nothing else is needed. |

Create the token at Cloudflare dashboard → *My Profile → API Tokens → Create Token → Custom token*:

- Permissions: `Account` · `Cloudflare Pages` · `Edit`
- Account resources: *Include* → the account that owns `airmeiz.com`
- Optionally set an expiry and rotate it by updating the secret.

The account ID and project name are not secrets; they are set in the workflow's `env` block.

## Manual deployment (fallback)

From a clean checkout of the commit you want live, logged in with `npx wrangler login`
to the account above:

```bash
npm ci --prefix react-app
npm run build
npx wrangler@4.160.1 pages deploy react-app/dist --project-name=airmeiz --branch=main
```

Rollback: Cloudflare dashboard → Workers & Pages → `airmeiz` → Deployments → pick a previous
production deployment → *Rollback to this deployment*.

## Caching

- `/assets/*` (Vite output, content-hashed filenames): `max-age=31536000, immutable`.
- HTML (`/`, `/*.html`, and SPA routes rewritten to `/index.html`): always revalidated
  (`max-age=0, must-revalidate`), so a new deployment is visible immediately and browsers never
  request bundles from an older deployment.
- Do not add a `Cache-Control` header to the `/*` rule in `public/_headers`: Cloudflare Pages
  merges every matching rule, so it would also apply to HTML.

## Local development

See [LOCAL_DEV.md](LOCAL_DEV.md). `npm run dev` serves `http://localhost:5173`.

## History

- **Jan 16 – Feb 9, 2026:** pushes were built by a Git-connected Pages project
  `airmeiz-portfolio` in account `33c877338d93a3cc446a9b1419a27d5b`.
- **Feb 20 – Nov 26, 2026:** pushes were built by a Git-connected Pages project also named
  `airmeiz-portfolio`, but in a different account (`8d2961f75cd8abdd89a2e3c1ad431d5a`). That
  project has no access to the `airmeiz.com` zone.
- **Aug 27, 2026:** the `airmeiz` Direct Upload project was created in the domain's account,
  commit `61006c3` was uploaded manually, and both custom domains were attached to it. From then
  on, pushes kept deploying to the other account and never reached the live site.
- **Nov 26, 2026:** production moved to the GitHub Actions workflow above, targeting `airmeiz`.
  Automatic deployments to `airmeiz-portfolio` in account `8d29…` are to be disabled and that
  project removed.
