import time
import os
import random
import multiprocessing as mp

from python_parallel.sub.called_random import f as f2

def f(index: int, seed: int) -> int:
    random.seed(seed)
    for _ in range(5):
        print(seed, _, random.random())
        time.sleep(random.random())
    f2(seed)
    # time.sleep(3 + random.random() * 3)
    return index

if __name__ == "__main__":
    with mp.Pool(mp.cpu_count()) as pool:
        jobs = [pool.apply_async(f, args=(index, random.randint(0, 3))) for index in range(50)]
        for job in jobs:
            result = job.get()
