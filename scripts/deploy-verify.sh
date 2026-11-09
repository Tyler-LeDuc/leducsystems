#!/usr/bin/env bash
# Build, publish to gh-pages, then wait for GitHub Pages to actually serve it.
# GitHub's Pages deploy sometimes stalls in "syncing_files" and times out
# ("Page build failed") even though the push worked, which leaves new pages 404.
# This waits for the build, re-requests it up to 2 times if it errors, then
# checks each URL given as an argument returns 200.
#   scripts/deploy-verify.sh https://leducsystems.com/tools/new-page/ ...
set -euo pipefail
cd "$(dirname "$0")/.."
REPO=Tyler-LeDuc/leducsystems

npm run build
npx gh-pages -d build -r "https://github.com/$REPO.git"
sha=$(git ls-remote "https://github.com/$REPO.git" gh-pages | cut -f1)
echo "pushed gh-pages $sha"

wait_build() { # prints built|errored once the latest build for $sha finishes; ~15 min max
  for _ in $(seq 1 60); do
    line=$(gh api "repos/$REPO/pages/builds/latest" --jq '.status+" "+.commit')
    case "$line" in
      "built $sha"|"errored $sha") echo "${line%% *}"; return;;
    esac
    timeout 15 tail -f /dev/null || true
  done
  echo timeout
}

for attempt in 1 2 3; do
  result=$(wait_build)
  echo "pages build attempt $attempt: $result"
  [ "$result" = built ] && break
  [ "$attempt" = 3 ] && { echo "GitHub Pages build still failing; check https://github.com/$REPO/actions" >&2; exit 1; }
  gh api -X POST "repos/$REPO/pages/builds" --jq .status
done

fail=0
for url in "$@"; do
  code=000
  for _ in $(seq 1 20); do # the CDN can lag the build by a minute or two
    code=$(curl -s -o /dev/null -w '%{http_code}' "$url?v=$sha")
    [ "$code" = 200 ] && break
    timeout 15 tail -f /dev/null || true
  done
  echo "$code $url"
  [ "$code" = 200 ] || fail=1
done
exit $fail
