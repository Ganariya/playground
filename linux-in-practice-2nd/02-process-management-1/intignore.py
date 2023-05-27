#!/usr/bin/python3
import signal

# sig_ign は無視ハンドラ
signal.signal(signal.SIGINT, signal.SIG_IGN)

while True:
    pass
