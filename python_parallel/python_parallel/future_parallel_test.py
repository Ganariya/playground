from concurrent.futures import ProcessPoolExecutor, wait

import os
import time
import random


def f(idx: int, x: int) -> tuple[int, int]:
    print(f"index:{idx} process: {os.getpid()}")
    time.sleep(random.random() * 2)
    xxx = x ** 3
    return idx, xxx


# https://stackoverflow.com/questions/6785226/pass-multiple-parameters-to-concurrent-futures-executor-map
if __name__ == "__main__":
    with ProcessPoolExecutor(4) as executer:
        for data in executer.map(f, [x for x in range(10)], [x for x in range(10)]):
            print(data)
