import time
import os
import random
import multiprocessing as mp

def f(x: int) -> int:
    cp = mp.current_process()
    print(f"in {cp._identity[0]} {os.getpid()} {x}")
    time.sleep(10)
    time.sleep(random.random() * 10)
    print(f"ou {cp._identity[0]} {os.getpid()} {x}")
    return x * x

if __name__ == "__main__":
    with mp.Pool(mp.cpu_count()) as pool:
        jobs = [pool.apply_async(f, args=(index,)) for index in range(50)]
        for job in jobs:
            result = job.get()
