#!/bin/bash

false &
wait $!

echo "false コマンドが終了しました $?"
