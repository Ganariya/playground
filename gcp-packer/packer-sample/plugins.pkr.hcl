# https://developer.hashicorp.com/packer/tutorials/docker-get-started/docker-get-started-build-image
packer {
  # 必要になるプラグインを各種インストールする
  required_plugins {
    # source 句で指定することになる
    googlecompute = {
      version = "~> 1.1.1"
      source  = "github.com/hashicorp/googlecompute"
    }
    ansible = {
      version = "~> 1.1.1"
      source  = "github.com/hashicorp/ansible"
    }
  }
}