# Toolchain installation

**Status: Implemented** — verified on Ubuntu 24.04, Linux x86-64, using an
unprivileged account. No APT repository, system configuration or sudo was
needed.

## Verified versions and provenance

| Component | Version               | Source                                                 |
| --------- | --------------------- | ------------------------------------------------------ |
| Node.js   | 24.20.0 LTS (Krypton) | Official nodejs.org Linux x64 archive                  |
| npm       | 11.19.0               | Bundled in the verified Node archive                   |
| Corepack  | 0.35.0                | Bundled in the verified Node archive                   |
| pnpm      | 10.34.5               | Exact root packageManager pin, activated with Corepack |

The release was selected from the
[official Node release index](https://nodejs.org/dist/index.json) as a stable
Node 24 LTS release. The archive is
[node-v24.20.0-linux-x64.tar.xz](https://nodejs.org/dist/v24.20.0/node-v24.20.0-linux-x64.tar.xz).
Its computed SHA-256 matched the entry in the official
[SHASUMS256.txt](https://nodejs.org/dist/v24.20.0/SHASUMS256.txt):

```text
2f2c0da162318f0de47665410c7c8c2ed3d36c8f3105de4bbc61176c70a7cbf2
```

This verification used SHA-256 and HTTPS retrieval of the published checksums;
it does not claim a separate GPG signature verification. The verified archive
was extracted into `$HOME/.local/share/nodejs/node-v24.20.0-linux-x64`, and
executable symlinks were created in `$HOME/.local/bin`. No existing executable
was overwritten. The existing Ubuntu login profile picks up that directory;
shell profiles were not edited. Existing terminal sessions may need the PATH
export below.

## Reproduce on a fresh Linux x86-64 account

Use a trusted system Python 3.12 or newer and the standard `tar`, `sha256sum`
and `curl` utilities already available on the host. Stop if an installation
destination or executable already exists; inspect it instead of overwriting it.
Other host architectures require their matching official archive and a fresh
checksum review.

The commands below reproduce the archive download, SHA-256 check and user-local
installation. Downloaded content is never piped to a shell interpreter.

```sh
set -e
node_version=24.20.0
node_archive="node-v${node_version}-linux-x64.tar.xz"
node_download_dir="$(mktemp -d)"
node_install_root="$HOME/.local/share/nodejs"
node_install_dir="$node_install_root/node-v${node_version}-linux-x64"
test "$(id -u)" -ne 0
test "$(uname -m)" = x86_64
test ! -e "$node_install_dir"
test ! -L "$node_install_dir"
for executable in node npm npx corepack; do
  test ! -e "$HOME/.local/bin/$executable"
  test ! -L "$HOME/.local/bin/$executable"
done
cd "$node_download_dir"
curl --fail --location --proto '=https' --tlsv1.2 \
  --output "$node_archive" "https://nodejs.org/dist/v${node_version}/$node_archive"
curl --fail --location --proto '=https' --tlsv1.2 \
  --output SHASUMS256.txt "https://nodejs.org/dist/v${node_version}/SHASUMS256.txt"
sha256sum --check --ignore-missing SHASUMS256.txt
mkdir -p "$node_install_root" "$HOME/.local/bin"
python3 - "$node_archive" "$node_install_root" <<'PYTHON'
import sys
import tarfile

with tarfile.open(sys.argv[1], "r:xz") as archive:
    archive.extractall(sys.argv[2], filter="data")
PYTHON
for executable in node npm npx corepack; do
  ln -s "$node_install_dir/bin/$executable" "$HOME/.local/bin/$executable"
done
export PATH="$HOME/.local/bin:$PATH"
node --version
npm --version
which node
which npm
```

The archive was originally fetched with Python's standard HTTPS client and
verified with `hashlib.sha256` before the same safe extraction. The shell
procedure above uses equivalent SHA-256 verification and no additional
installation package. Retain the downloaded checksums as local evidence, outside
the source repository.

## Activate the pinned package manager

The existing `packageManager` value is exactly `pnpm@10.34.5`. Its public
registry metadata declares Node `>=18.12`, compatible with Node 24. Corepack
0.35.0 worked without a signature error, key override or fallback installation.

Following the
[official pnpm Corepack method](https://pnpm.io/10.x/installation#using-corepack),
activate the exact version without changing the project manifest:

```sh
corepack --version
corepack enable --install-directory "$HOME/.local/bin" pnpm
corepack prepare pnpm@10.34.5 --activate
pnpm --version
which pnpm
```

Both Node and pnpm resolve through `$HOME/.local/bin`. Never use
`sudo npm install -g`, disable signature checks or switch to an unpinned package
manager. If a different environment lacks Corepack, review the documented
[pnpm installation alternatives](https://pnpm.io/10.x/installation#using-npm)
and use a current-user prefix; no fallback was needed on this host.

Return to the project checkout and run the complete
[development suite](development.md). No GitHub account, paid service, artifact
upload or hosted runner is required.
