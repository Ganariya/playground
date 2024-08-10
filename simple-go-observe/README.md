# simple-go-observe

grafana, opentelemetry, flluentd, datadog などを理解したい
そのため、簡易的な web server を立ててこれらツールを導入してみる

## Run local with container

```bash
docker build -t simple-go-observe .
docker run --rm -p 1324:1323 simple-go-observe:latest
```

