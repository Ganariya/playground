source "googlecompute" "yqimage" {
  project_id          = "ganyariya"
  source_image_family = local.img_fam
  preemptible         = true
  ssh_username        = "packer"
  zone                = "asia-northeast1-b"
  image_name          = var.image-name
  tags                = ["packer"]
}