#!/bin/bash

echo -n $(cat header.json) | base64
echo -n $(cat payload.json ) | base64

# eyAiYWxnIjogIkhTMjU2IiwgInR5cCI6ICJKV1QiIH0=.
# eyAic3ViIjogIjEyMzQ1Njc4OTAiLCAiaWF0IjogMTUxNjIzOTAyMiB9

# 署名なしトークンに　秘密鍵 `secret` で暗号化して base64にする
echo -n 'eyAiYWxnIjogIkhTMjU2IiwgInR5cCI6ICJKV1QiIH0=.eyAic3ViIjogIjEyMzQ1Njc4OTAiLCAiaWF0IjogMTUxNjIzOTAyMiB9' | \
openssl dgst -binary -sha256 -hmac 'secret' | \
base64

# /WqKlZGO1vwAK5HMy98oaO9dwsIaCsfax5Nv8vUPFQc=