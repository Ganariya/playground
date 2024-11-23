build {
    sources = [
        "source.googlecompute.yqimage"
    ]

    provisioner "ansible" {
        playbook_file = "./scripts/ansible-playbook.yaml"
        user = "packer"
        extra_arguments = ["-vvvv"]
    }
}