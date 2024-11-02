
## Abstract

Google Kubernetes Engine で PersistentVolume と PersistentVolumeClaim を立ち上げてみます

## Operations

```bash
kubectl apply -f nginx.yaml
kubectl exec -it -n nginx deployments/nginx-deployment -- /bin/bash
```

