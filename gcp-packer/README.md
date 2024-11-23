GCP において

- Packer
- with Ansible

をためす

```bash
cd packer-sample

packer init ./
# var-file は明示的に指定しないといけない
packer validate -var-file="variables.pkrvars.hcl" ./
packer build -var-file="variables.pkrvars.hcl" ./
```