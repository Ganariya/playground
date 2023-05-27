import os

pid = os.fork()

if pid == 0:
    print(
        f"I am child. [child process: pid = {os.getpid()}, parent process: pid = {os.getppid()}]"
    )
    """
    子プロセス自身のメモリを `/bin/echo` に書き換える
    """
    os.execve("/bin/echo", ["echo", f"pid={os.getpid()}"], {})
    exit()
elif pid > 0:
    print(
        f"I am parent. [child process: pid = {pid}, parent process: pid = {os.getpid()}]"
    )
    exit()
