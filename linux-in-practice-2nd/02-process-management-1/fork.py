import os

"""
親プロセスの場合
- pid = 子プロセスの pid

子プロセスの場合
- pid = 0
- 自身＋親プロセスの pid は関数呼び出しで取得する
"""
pid = os.fork()

if pid == 0:
    print(f"I am child. [child process: pid = {os.getpid()}, parent process: pid = {os.getppid()}]")
    exit()
elif pid > 0:
    print(f"I am parent. [child process: pid = {pid}, parent process: pid = {os.getpid()}]")
    exit()
