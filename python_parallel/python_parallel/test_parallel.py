import time
import os
import random
import multiprocessing as mp

def f(x: int) -> int:
    print(f"{os.getpid()} {x}")
    time.sleep(5)
    time.sleep(random.random() * 20)
    return x * x

if __name__ == "__main__":
    with mp.Pool(mp.cpu_count()) as pool:
        jobs = [pool.apply_async(f, args=(index,)) for index in range(50)]
        for job in jobs:
            result = job.get()
