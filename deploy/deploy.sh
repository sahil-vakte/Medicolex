#!/usr/bin/env bash
set -Eeuo pipefail
revision=${1:?Commit SHA required}
[[ "$revision" =~ ^[a-f0-9]{40}$ ]] || exit 2
root=/srv/medicolex
exec 9>"$root/deploy.lock"
flock -w 120 9
release="$root/releases/$revision"
archive="$root/incoming/$revision.tar.gz"
previous=$(readlink -f "$root/current" || true)
if [[ ! -d "$release" ]]; then
  mkdir "$release"
  tar -xzf "$archive" -C "$release" --no-same-owner
fi
test -f "$release/server.js"
printf 'DEPLOY_REVISION=%s\n' "$revision" > "$release/revision.env"
ln -sfn "$release" "$root/current.next"
mv -Tf "$root/current.next" "$root/current"
rollback() {
  echo 'Deployment failed; restoring previous release' >&2
  if [[ -n "$previous" && -f "$previous/server.js" ]]; then
    ln -sfn "$previous" "$root/current.next"
    mv -Tf "$root/current.next" "$root/current"
    sudo /usr/bin/systemctl restart medicolex
  fi
}
trap rollback ERR
sudo /usr/bin/systemctl restart medicolex
healthy=false
for attempt in $(seq 1 30); do
  if curl -fsS http://127.0.0.1:3035/api/health | grep -q "$revision"; then
    healthy=true
    break
  fi
  sleep 2
done
[[ "$healthy" == true ]]
curl -fsS -o /dev/null http://127.0.0.1:3035/
trap - ERR
rm -f "$archive"
# Keep the current release and four recent releases for recovery.
find "$root/releases" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' | sort -rn | tail -n +6 | cut -d' ' -f2- | while IFS= read -r old; do
  [[ "$old" == "$release" || "$old" == "$previous" ]] || rm -rf -- "$old"
done
echo "Deployed $revision"
