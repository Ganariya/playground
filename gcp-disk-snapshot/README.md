# 2025/02 gcp-disk-snapshot

https://zenn.dev/ganariya/scraps/c762810b8339f3

GCP の disk snapshot の挙動がわからなかったため、適当な instance を立てたうえで試行錯誤しながら学びます。

```
cd gcp-disk-snapshot/terraform

# setup ADC
gcloud auth application-default login

# terraform
terraform init
terraform plan --var 'project_id=your_project_id'
terraform apply --var 'project_id=your_project_id'
```

## ref

https://qiita.com/YSasago/items/a5eb1448114b3e177868
https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_disk
