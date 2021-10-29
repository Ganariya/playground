import time
import os
import random
import multiprocessing as mp

def f(index: int, seed: int) -> int:
    random.seed(seed)
    print(seed, index, random.random())
    # time.sleep(3 + random.random() * 3)
    return index

if __name__ == "__main__":
    with mp.Pool(mp.cpu_count()) as pool:
        jobs = [pool.apply_async(f, args=(index, random.randint(0, 10))) for index in range(50)]
        for job in jobs:
            result = job.get()
