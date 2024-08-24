# simple-go-observe

o11y ツールを理解するために

- 簡易的な go http server を立てる
- go http server に go-opentelemetry を組み込む
- trace, logs を go-opentelemetry で計測して opentelemetry-collector に送信する
- それらのメトリクスを複数のツールで可視化する

をおこなう

## How to setup

```bash
docker-compose build && docker-compose down && docker-compose up -d --force-recreate
```

## Architecture

- opentelemetry-collector
  - go から SDK を通じて opentelemetry-collector にデータが送信される
  - opentelemetry-collector は processor で処理を行った後 exporter によって適切なエンドポイントにデータを転送する
- trace
  - opentelemetry-collector から zipkin, jaeger, tempo にトレースを送る
  - zipkin, jaeger はログストレージかつ UI も提供している
  - tempo はログストレージ単体として機能し grafana-server からリクエストが来たら tempo にトレースを転送する
- log
  - opentelemetry-collector から loki にログを送る
  - loki はログストレージ単体として機能し grafana-server からリクエストが来たら loki にログを転送する
- metrics
  - prometheus にメトリクスデータを保存し grafana-server からリクエストが来たら都度データを渡す
- 可視化
  - grafana
    - prometheus (metrics), loki (log), tempo (trace) を可視化する
    - grafana 自体にはデータを保存しない
    - grafana UI 上でクエリを実行したときに prometheus, loki, tempo というバックエンドサーバに取得しにいく

## Endpoint

- [rolldice](http://localhost:1340/rolldice)
- [zipkin ui](http://localhost:9411/)
- [jaeger ui](http://localhost:16686/)
- [prometheus ui](http://localhost:9090/)
- [grafana ui](http://localhost:3000/)
- [node-exporter metrics](http://localhost:9100/metrics)

