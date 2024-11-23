GCP において

- Packer
- with Ansible

をためす

```
cd packer-sample

packer init ./
packer build -var-file="variables.pkrvars.hcl" ./
```