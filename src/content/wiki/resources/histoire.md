---
weight: 811
title: "📜 Notre Histoire"
description: "Faites un petit pas en arrière pour redécouvrir DEMOCRAFT lors de sa création en 2022..."
icon: "stars"
---

## À prendre en compte

- Lobby V1

## Idées

- Fonte après la neige sur le lobby v1 -> lobby v2

```nginx
# Reverse Proxy for MinIO Web Console
server {
    listen 443 ssl;
    server_name files.vaatigames.ovh;

    location / {
        proxy_pass http://localhost:9001;  # Port for MinIO Console
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Reverse Proxy for MinIO S3 API
server {
    listen 443 ssl;
    server_name s3.vaatigames.ovh;

    location / {
        proxy_pass http://localhost:9000;  # Port for MinIO S3 API
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name minio.vaatigames.ovh s3.vaatigames.ovh;
    return 301 https://$host$request_uri;
}
```