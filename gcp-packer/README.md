
## 概要

GCP において Packer で image をビルドするサンプルです。

以下が入ったイメージを作成します。

- yq
- docker

ansible module を利用することで必要なパッケージを簡潔にインストールできます。

## build

```bash
cd packer-sample

packer init ./
# var-file は明示的に指定しないといけない
packer validate -var-file="variables.pkrvars.hcl" ./
packer build -var-file="variables.pkrvars.hcl" ./
```
