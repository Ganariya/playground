#!/bin/bash

# for ((i=0;i<1000;i++)) ; do ./inc-wrong-lock.sh & done; for ((i=0;i<1000;i++)); do wait; done
# 上記で呼び出すが、うまく count されない
# これは、 lock ファイルがないことをプロセス 1 ~ 30 が同時に確認し、 lock ファイル作成 & count + 1 を行ってしまうため

while : ; do
  # lock ファイルがないのであれば break する
  # 他プロセスが lock ファイルを作成して +1 している間は loop で待機する
  if [ ! -e lock ] ; then
    break
  fi
done

touch lock
TMP=$(cat count)
echo $((TMP + 1)) > count

rm -f lock