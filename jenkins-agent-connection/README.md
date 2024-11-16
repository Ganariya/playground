# Jenkins-Agent-Connection

Jenkins において

- master
- agent node

の連携方法を学習したときのコードです。

terraform によって GCP 上に以下のリソースを立ち上げます。

- VPC
- NAT
- VM
  - master
  - agent

## セットアップ方法

```txt
# terraform.tfvars を修正する
project_id = "ganyariya" # apply するときの gcp project の id に変更する
region     = "asia-northeast1"
zone       = "asia-northeast1-a"
```

```bash
terraform apply
```

上記でリソースが立ち上がります。

master node には jenkins がすでにインストールされ、グローバルIPをつかって `http://xx.yy.zz.ww:8080` でアクセスできます。
agent node には jdk がすでにインストールされています。

エージェント同士の接続については後続の記事を参考にしてください。

## 実装時に参考にさせていただいた記事

https://cloud.google.com/docs/terraform/get-started-with-terraform?hl=ja
vhttps://qiita.com/ryysud/items/a38bcc856069801878e9
