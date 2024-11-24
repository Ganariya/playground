# https://developer.hashicorp.com/packer/tutorials/docker-get-started/docker-get-started-build-image#source-block
# `build.sources` に指定された source block が実行される
# source block は 2 つの重要なラベルをもつ
# 1. builder type = "googlecompute"
# 2. builder name = "yqimage"

# https://developer.hashicorp.com/packer/integrations/hashicorp/googlecompute/latest/components/builder/googlecompute
source "googlecompute" "yqimage" {
  project_id          = "ganyariya"
  source_image_family = local.img_fam
  preemptible         = true
  disk_size           = 10
  disk_type           = "pd-standard"
  machine_type        = "e2-medium"
  # GCP 上で作成されるイメージの名前
  # image_name          = "packer-ganyariya-{{timestamp}}"
  image_name          = var.image_name
  # packer というユーザを作成したうえで
  # packer user でイマージの作成（プロビジョニング）が実行される
  ssh_username        = "packer"
  zone                = "asia-northeast1-b"
  tags                = ["packer"]
}