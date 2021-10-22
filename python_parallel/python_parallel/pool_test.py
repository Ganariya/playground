import os
import time
import random
from multiprocessing import Pool


def f(idx: int, x: int) -> tuple[int, int]:
    print(f"index:{idx} process: {os.getpid()}")
    time.sleep(random.random() * 2)
    xxx = x ** 3
    return idx, xxx


def g(x: int):
    print(f"index:{x} process: {os.getpid()}")
    time.sleep(random.random() * 4)
    return [x, "hello"]


if __name__ == "__main__":
    print("start")
    with Pool(4) as pool:
        multiple_results = [pool.apply_async(f, args=(idx, idx)) for idx in range(20)]
        for result in multiple_results:
            # get をすると結果が入っている
            print(result.get())

    print("done")
    time.sleep(5)

    with Pool(4) as pool:
        result = pool.map(g, list(range(30)))
        # result にはすべての結果が入っている
        print(result)
