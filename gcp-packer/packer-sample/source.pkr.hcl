# https://developer.hashicorp.com/packer/tutorials/docker-get-started/docker-get-started-build-image#source-block
# `build.sources` に指定された source block が実行される
# source block は 2 つの重要なラベルをもつ
# 1. builder type = "googlecompute"
# 2. builder name = "yqimage"
source "googlecompute" "yqimage" {
  project_id          = "ganyariya"
  source_image_family = local.img_fam
  preemptible         = true
  ssh_username        = "packer"
  zone                = "asia-northeast1-b"
  image_name          = var.image-name
  tags                = ["packer"]
}