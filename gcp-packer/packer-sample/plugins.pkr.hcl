packer {
  required_plugins {
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