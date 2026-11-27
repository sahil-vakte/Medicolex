# Deployment

Website: https://medicolex.co.uk

CRM: https://app.medicolex.co.uk

The legacy IP preview redirects to the domains after cutover.

Every push or merge to `main` runs `.github/workflows/deploy.yml`: install the locked dependencies, typecheck, build, smoke-test the production server, upload an artifact, deploy, and verify the public commit revision. Pull requests run build checks without deploying. Changes made by Claude, Codex or a person deploy when committed to `main`; changes on other branches need merging first. Manual runs are available from GitHub Actions.

The deployment uses a dedicated `medicolex` SSH/service account, a pinned SSH host key, and an isolated Node 22 installation. GitHub holds `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`, and `DEPLOY_KNOWN_HOSTS` as encrypted Actions secrets. Never commit credentials.

The server keeps versioned builds in `/srv/medicolex/releases`, points `/srv/medicolex/current` at the active build, and restarts `medicolex.service`. Failed startup or health checks restore the previous release. Deployments are serialized. A service restart can cause a brief interruption. The latest five releases (plus the previous release if needed) are retained.

## Operations

```bash
sudo systemctl status medicolex
sudo journalctl -u medicolex -n 100 --no-pager
curl http://127.0.0.1:3035/api/health
```

Runtime configuration is in `/srv/medicolex/shared/app.env`. Set `FORM_WEBHOOK_URL` and `FORM_WEBHOOK_SECRET`, then restart the service, to enable form delivery. Without a webhook, production forms return an error rather than falsely reporting delivery. Do not submit real personal/medical data through the HTTP preview; configure HTTPS on the domain before accepting submissions.

## Connect a domain

1. Point the domain's A record at `92.205.160.39`.
2. Add an Nginx virtual host for that domain on port 80, proxying to `127.0.0.1:3035` using the settings in `nginx.conf`. Preserve the other applications' virtual hosts.
3. Obtain a TLS certificate and enable HTTPS for the domain.
4. Set the repository Actions variable `SITE_URL` to the HTTPS URL and update `NEXT_PUBLIC_SITE_URL` in the server environment file. Optionally set repository variable `GA_ID`.
5. Run the workflow again: public URLs are embedded at build time. Verify forms and domain routes before removing the preview listener/firewall rule.

## Initial setup

An administrator can run `bootstrap.sh` with the other deployment files and an SSH public key named `deploy.pub` in the same directory. It installs the isolated Node runtime, account, service, restricted restart permission, Nginx listener and firewall rule. Configure GitHub secrets before pushing `main`. Server configuration files require administrator installation when edited; ordinary application changes deploy automatically.


Domain cutover on 27 November 2026: `SITE_URL` is `https://medicolex.co.uk`; Nginx serves the website and CRM over HTTPS with automatic certificate renewal. `www.medicolex.co.uk` redirects to the apex domain. The CRM has its own service and preserves its existing SQLite data and encrypted storage.
