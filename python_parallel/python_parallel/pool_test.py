import os
import time
import random
from multiprocessing import Pool


def f(idx: int, x: int) -> tuple[int, int]:
    print(f"index:{idx} process: {os.getpid()}")
    time.sleep(random.random() * 2)
    xxx = x ** 3
    return idx, xxx


if __name__ == "__main__":
    print("start")
    with Pool(4) as pool:
        multiple_results = [pool.apply_async(f, args=(idx, idx)) for idx in range(100)]
        for result in multiple_results:
            print(result.get())

    print("done")
