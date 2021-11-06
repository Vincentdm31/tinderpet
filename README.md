# Tinderpet

TP01 Dev Fullstack - Site de rencontre d'animaux

### Install

```shell
git clone git@github.com:Vincentdm31/tinderpet.git
```

```shell
cd tinderpet/
```

```shell
npm i
```

```shell
nx serve back
```

```shell
nx serve front
```

## Configure workspace

```json

"serve": {
          "executor": "@nx-plus/vue:dev-server",
          "options": {
            "browserTarget": "front:build",
            "devServer": {
              "proxy": {
                "^/api": {
                  "target": "http://<your-ip>:3333",
                  "changeOrigin": true,
                  "secure": false
                }
              }
            }
          },

```
