#!/usr/bin/env bash
set -Eeuo pipefail
# Run as root from a directory containing deploy.sh, nginx.conf,
# medicolex.service and the dedicated deployment public key deploy.pub.
source_dir=$(cd "$(dirname "$0")" && pwd)
if ! id medicolex >/dev/null 2>&1; then
  useradd --system --create-home --home-dir /srv/medicolex --shell /bin/bash medicolex
fi
install -d -o medicolex -g medicolex -m 750 /srv/medicolex/{incoming,releases,shared,.ssh}
install -o medicolex -g medicolex -m 600 "$source_dir/deploy.pub" /srv/medicolex/.ssh/authorized_keys
if [[ ! -x /opt/medicolex-node/bin/node ]]; then
  temp=$(mktemp -d)
  cd "$temp"
  curl -fsSLO https://nodejs.org/dist/latest-v22.x/SHASUMS256.txt
  archive=$(awk '$2 ~ /^node-v22\..*-linux-x64.tar.xz$/ {print $2}' SHASUMS256.txt)
  test -n "$archive"
  curl -fsSLO "https://nodejs.org/dist/latest-v22.x/$archive"
  grep " $archive$" SHASUMS256.txt | sha256sum -c -
  install -d /opt/medicolex-node
  tar -xJf "$archive" -C /opt/medicolex-node --strip-components=1
  cd "$source_dir"
  rm -rf "$temp"
fi
if [[ ! -f /srv/medicolex/shared/app.env ]]; then
  printf 'NEXT_PUBLIC_SITE_URL=http://92.205.160.39:8081\nFORM_WEBHOOK_URL=\nFORM_WEBHOOK_SECRET=\n' > /srv/medicolex/shared/app.env
  chown root:medicolex /srv/medicolex/shared/app.env
  chmod 640 /srv/medicolex/shared/app.env
fi
install -o root -g root -m 755 "$source_dir/deploy.sh" /usr/local/bin/medicolex-deploy
install -o root -g root -m 644 "$source_dir/medicolex.service" /etc/systemd/system/medicolex.service
printf 'medicolex ALL=(root) NOPASSWD: /usr/bin/systemctl restart medicolex\n' > /etc/sudoers.d/medicolex
chmod 440 /etc/sudoers.d/medicolex
visudo -cf /etc/sudoers.d/medicolex
install -o root -g root -m 644 "$source_dir/nginx.conf" /etc/nginx/sites-available/medicolex
ln -sfn /etc/nginx/sites-available/medicolex /etc/nginx/sites-enabled/medicolex
nginx -t
systemctl daemon-reload
systemctl enable medicolex
systemctl reload nginx
ufw allow 8081/tcp comment 'Medicolex preview'
/opt/medicolex-node/bin/node --version
