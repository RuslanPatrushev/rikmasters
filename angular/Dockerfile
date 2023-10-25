# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM node:18-bullseye-slim as builder

ARG API_URL="__API_URL__"
ENV API_URL="${API_URL}"

RUN mkdir /project
WORKDIR /project

RUN <<EOF
#  set -Eeo pipefail
  sed -i "s|__API_URL__|${API_URL}|"  src/index.html
    exec "$@"
EOF

RUN npm install -g @angular/cli@16

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0"]

FROM builder as dev-envs

RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

CMD ["ng", "serve", "--host", "0.0.0.0"]
