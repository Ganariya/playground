# https://developer.hashicorp.com/packer/tutorials/docker-get-started/docker-get-started-build-image#the-build-block
build {
  sources = [
    "source.googlecompute.yqimage"
  ]

  provisioner "ansible" {
    playbook_file   = "./scripts/ansible-playbook.yaml"
    user            = "packer"
    extra_arguments = ["-vvvv"]
  }
}