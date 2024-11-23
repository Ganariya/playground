# https://developer.hashicorp.com/packer/tutorials/docker-get-started/docker-get-started-build-image#the-build-block
build {
  sources = [
    "source.googlecompute.yqimage"
  ]

  # https://developer.hashicorp.com/packer/tutorials/docker-get-started/docker-get-started-provision
  provisioner "shell" {
    environment_vars = [
      "HOGE=hello, world!"
    ]

    # /home/packer/example.txt ができる
    # そのため source.googlecompute.yqimage の ssh_username 配下がデフォルトワークスペースとなっている
    inline = [
      "echo Add hello, world! text file",
      "echo \"$HOGE ${var.image_name}\" > example.txt",
    ]
  }

  provisioner "file" {
    source = "nomi"
    # /home/packer/nomi におかれる
    destination = "nomi"
  }

  provisioner "ansible" {
    playbook_file   = "./scripts/ansible-playbook.yaml"
    # ansible が実行されるときのユーザ
    user            = "packer"
    extra_arguments = ["-vvvv"]
  }
}