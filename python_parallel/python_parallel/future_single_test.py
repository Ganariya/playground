from concurrent.futures import ProcessPoolExecutor, wait

import os
import time
import random


def f(idx: int, x: int) -> tuple[int, int]:
    print(f"index:{idx} process: {os.getpid()}")
    time.sleep(random.random() * 2)
    xxx = x ** 3
    return idx, xxx


if __name__ == "__main__":
    executer = ProcessPoolExecutor(max_workers=4)
    future = executer.submit(f, 10, 20)

    wait([future])
    if future.done():
        print(future.result())
